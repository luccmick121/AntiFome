"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Loader2, Mail, Lock } from "lucide-react";

// Schema de validação
const loginSchema = z.object({
  email: z.string().email("Email inválido").min(1, "Email é obrigatório"),
  senha: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const [erro, setErro] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setErro(null);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });

      const resultado = await response.json();

      if (!response.ok) {
        throw new Error(resultado.message || "Erro ao realizar login");
      }

      // Login bem-sucedido, redirecionar para dashboard
      router.push("/");
      router.refresh();
    } catch (err) {
      setErro(err instanceof Error ? err.message : "Erro ao realizar login. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1 text-center">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
            <span className="text-2xl font-bold text-white">AF</span>
          </div>
        </div>
        <CardTitle className="text-2xl font-bold">Antifome RS</CardTitle>
        <CardDescription>
          Sistema de Gestão da Segurança Alimentar
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Mensagem de erro */}
          {erro && (
            <div className="flex items-center gap-2 p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
              <AlertCircle className="w-4 h-4" />
              <span>{erro}</span>
            </div>
          )}

          {/* Campo de Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                className="pl-10"
                {...register("email")}
                disabled={isLoading}
              />
            </div>
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Campo de Senha */}
          <div className="space-y-2">
            <Label htmlFor="senha">Senha</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="senha"
                type="password"
                placeholder="Sua senha"
                className="pl-10"
                {...register("senha")}
                disabled={isLoading}
              />
            </div>
            {errors.senha && (
              <p className="text-sm text-red-500">{errors.senha.message}</p>
            )}
          </div>

          {/* Botão de Login */}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Entrando...
              </>
            ) : (
              "Entrar"
            )}
          </Button>

          {/* Link de recuperação */}
          <div className="text-center text-sm text-gray-500">
            <a href="/forgot-password" className="hover:text-green-600 underline">
              Esqueceu sua senha?
            </a>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
