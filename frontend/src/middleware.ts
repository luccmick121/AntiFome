import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Rotas que não precisam de autenticação
const rotasPublicas = ["/login", "/forgot-password", "/api"];

// Rotas por papel
const rotasPorPapel: Record<string, string[]> = {
  ADMIN: ["/", "/dashboard", "/mapa", "/ranking", "/alertas", "/conselho", "/gestao"],
  GESTOR_ESTADUAL: ["/", "/dashboard", "/mapa", "/ranking", "/alertas", "/gestao"],
  CONSELHEIRO_MUNICIPAL: ["/", "/conselho"],
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Permitir rotas públicas
  if (rotasPublicas.some((rota) => pathname.startsWith(rota))) {
    return NextResponse.next();
  }

  // Verificar token no cookie
  const token = request.cookies.get("access_token");

  if (!token) {
    // Redirecionar para login se não autenticado
    const url = new URL("/login", request.url);
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  // TODO: Decodificar JWT e verificar papel (requer configuração adicional)
  // Por enquanto, permitir acesso se tiver token
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Proteger todas as rotas exceto arquivos estáticos e API
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
};
