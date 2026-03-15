"use client";

import { usePathname, useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";
import { useAuth } from "@/contexts/auth-context";
import { Bell, LogOut, Menu, ShieldCheck, User } from "lucide-react";

interface HeaderProps {
  onToggleSidebar?: () => void;
}

const titles: Record<string, string> = {
  "/": "Dashboard Executivo",
  "/dashboard": "Dashboard Executivo",
  "/mapa": "Mapa Interativo do RS",
  "/ranking": "Ranking de Municípios",
  "/alertas": "Alertas de Inatividade",
  "/gestao": "Gestão CONSEA",
  "/design-system": "Design System Antifome RS",
};

export function Header({ onToggleSidebar }: HeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { usuario, logout } = useAuth();

  const title = titles[pathname] ?? "Plataforma Antifome RS";

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <header className="border-b border-default-200 bg-white shadow-[0_1px_0_rgba(16,24,40,0.05)]">
      <div className="page-shell flex flex-col gap-4 py-4 md:flex-row md:items-center md:justify-between md:py-5">
        <div className="flex items-start gap-4">
          <button
            onClick={onToggleSidebar}
            aria-label="Abrir navegação lateral"
            className="rounded-md border border-default-200 bg-white p-2 text-foreground shadow-panel-sm lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-foreground-500">
              Monitoramento estadual
            </p>
            <h1 className="mt-1 font-display text-2xl font-semibold text-foreground md:text-3xl">
              {title}
            </h1>
            <p className="mt-1 max-w-2xl text-sm text-foreground-500">
              Segurança alimentar com leitura executiva, evidência territorial e governança contínua.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Badge
            variant="success"
            startContent={<ShieldCheck className="h-4 w-4" />}
            className="border border-success/20 bg-success/10 text-success shadow-none"
          >
            Ambiente interno seguro
          </Badge>

          <Tooltip content="Central de notificações do monitoramento estadual">
            <Button aria-label="Abrir notificações" variant="outline" size="sm" className="bg-white shadow-none">
              <Bell className="h-4 w-4" />
            </Button>
          </Tooltip>

          <div className="flex items-center gap-3 rounded-md border border-default-200 bg-white px-3 py-2 shadow-panel-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
              <User className="h-5 w-5" />
            </div>
            <div className="hidden min-w-[180px] sm:block">
              <p className="truncate text-sm font-medium text-foreground">{usuario?.email}</p>
              <p className="text-xs uppercase tracking-[0.12em] text-foreground-500">
                {usuario?.role ?? "Usuário"}
              </p>
            </div>
            <Tooltip content="Encerrar sessão">
              <Button aria-label="Sair da plataforma" variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </Tooltip>
          </div>
        </div>
      </div>
    </header>
  );
}
