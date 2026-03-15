"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { buildApiPath } from "@/lib/api";
import { AlertCircle, ArrowRight, Lock, Mail, ShieldCheck } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Informe um email válido"),
  senha: z.string().min(6, "A senha precisa ter pelo menos 6 caracteres"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const pillars = [
  "Monitoramento estadual com leitura territorial e alertas",
  "Portal do conselho com documentos, reuniões e membros",
  "Fluxo visual consistente com o design system institucional",
];

export function LoginForm() {
  const searchParams = useSearchParams();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      senha: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await fetch(buildApiPath("/auth/login"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
        cache: "no-store",
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(result?.message || "Não foi possível realizar o login.");
      }

      await fetch(buildApiPath("/auth/me"), {
        credentials: "include",
        cache: "no-store",
      }).catch(() => null);

      const redirectPath = searchParams.get("redirect") || "/dashboard";
      window.location.assign(redirectPath);
    } catch (error) {
      setError("root", {
        message: error instanceof Error ? error.message : "Erro inesperado ao realizar login.",
      });
    }
  };

  return (
    <div className="grid w-full gap-6 lg:grid-cols-[minmax(0,1.1fr)_420px] lg:items-stretch">
      <Card className="institutional-hero hidden overflow-hidden border-none text-white lg:flex">
        <CardContent className="relative flex h-full flex-col justify-between gap-10 p-10">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.04),transparent_45%,rgba(255,255,255,0.02))]" />

          <div className="relative z-10 space-y-6">
            <Badge className="border border-white/15 bg-white/12 text-white">
              Plataforma institucional
            </Badge>

            <div className="space-y-4">
              <h1 className="max-w-2xl font-display text-4xl font-semibold leading-tight">
                Antifome RS coordena governança, território e resposta rápida em um único sistema.
              </h1>
              <p className="max-w-xl text-base leading-7 text-white/82">
                Acesso para gestão estadual e conselhos municipais com leitura clara de risco, adesão,
                cadência de reuniões e documentação crítica.
              </p>
            </div>
          </div>

          <div className="relative z-10 grid gap-3">
            {pillars.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/10 px-4 py-4"
              >
                <ShieldCheck className="mt-0.5 h-4 w-4 text-white" />
                <p className="text-sm leading-6 text-white/84">{item}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="w-full border-default-300">
        <CardHeader className="space-y-5">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-success text-xl font-semibold text-white shadow-panel-sm">
              AF
            </div>
            <div className="space-y-1">
              <CardTitle className="text-3xl">Antifome RS</CardTitle>
              <CardDescription>Sistema de Gestão da Segurança Alimentar</CardDescription>
            </div>
          </div>

          <div className="grid gap-3 rounded-lg border border-default-200 bg-[#F8FAFC] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground-500">
              Acesso seguro
            </p>
            <p className="text-sm leading-6 text-foreground-600">
              Use suas credenciais institucionais para entrar no painel executivo ou no portal do conselho.
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-5">
          <form method="post" onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
            {errors.root?.message ? (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Falha no login</AlertTitle>
                <AlertDescription>{errors.root.message}</AlertDescription>
              </Alert>
            ) : null}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="gestor@antifome.rs"
                startContent={<Mail className="h-4 w-4 text-foreground-400" />}
                autoComplete="email"
                isDisabled={isSubmitting}
                isInvalid={!!errors.email}
                errorMessage={errors.email?.message}
                {...register("email")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="senha">Senha</Label>
              <Input
                id="senha"
                type="password"
                placeholder="Digite sua senha"
                startContent={<Lock className="h-4 w-4 text-foreground-400" />}
                autoComplete="current-password"
                isDisabled={isSubmitting}
                isInvalid={!!errors.senha}
                errorMessage={errors.senha?.message}
                {...register("senha")}
              />
            </div>

            <Button type="submit" className="w-full" size="lg" isLoading={isSubmitting}>
              {isSubmitting ? "Entrando no sistema..." : "Entrar no sistema"}
            </Button>
          </form>

          <div className="flex flex-col gap-3 border-t border-default-200 pt-4 text-sm text-foreground-500">
            <Link href="/conselho/login" className="inline-flex items-center gap-2 text-primary hover:underline">
              Acessar portal do conselho
              <ArrowRight className="h-4 w-4" />
            </Link>
            <span>
              Precisa de suporte? Solicite a redefinição com a coordenação responsável.
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
