"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Calendar, TrendingUp, Users, Award } from "lucide-react";

interface ConselhoStats {
  totalMembros: number;
  totalReunioes: number;
  proximaReuniao: string | null;
  seloAtual: string | null;
  progressoProximoSelo: number;
  reunioesFaltando: number;
}

const seloVariantMap: Record<string, "success" | "warning" | "outline"> = {
  PLATINA: "success",
  OURO: "success",
  PRATA: "warning",
  BRONZE: "outline",
};

export default function ConselhoHomePage() {
  const [stats, setStats] = useState<ConselhoStats | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregarStats() {
      try {
        const res = await fetch("/api/conselhos/mine/stats");

        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (erro) {
        console.error("Erro ao carregar estatísticas:", erro);
      } finally {
        setCarregando(false);
      }
    }

    carregarStats();
  }, []);

  const cards = [
    {
      title: "Membros ativos",
      value: stats?.totalMembros ?? 0,
      icon: Users,
      description: "Equipe oficialmente cadastrada",
    },
    {
      title: "Reuniões realizadas",
      value: stats?.totalReunioes ?? 0,
      icon: Calendar,
      description: "Histórico operacional registrado",
    },
    {
      title: "Progresso do próximo selo",
      value: `${stats?.progressoProximoSelo ?? 0}%`,
      icon: TrendingUp,
      description: `${stats?.reunioesFaltando ?? 0} reuniões restantes`,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="font-display text-3xl font-semibold text-foreground">Painel do conselho</h2>
        <p className="text-foreground-500">
          Acompanhe atividade institucional, progresso do selo e próximos passos do município.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <Card key={card.title}>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm uppercase tracking-[0.12em] text-foreground-500">{card.title}</p>
                  <div className="rounded-md bg-primary/10 p-2 text-primary">
                    <Icon className="h-4 w-4" />
                  </div>
                </div>
                <p className="font-display text-4xl font-semibold text-foreground">
                  {carregando ? "—" : card.value}
                </p>
                <p className="text-sm text-foreground-500">{card.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(320px,0.8fr)]">
        <Card>
          <CardHeader>
            <CardTitle>Progresso institucional</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.12em] text-foreground-500">Selo atual</p>
                <div className="mt-2 flex items-center gap-3">
                  <Award className="h-5 w-5 text-primary" />
                  <Badge variant={seloVariantMap[stats?.seloAtual ?? ""] ?? "outline"}>
                    {stats?.seloAtual ?? "Sem selo"}
                  </Badge>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm uppercase tracking-[0.12em] text-foreground-500">Meta seguinte</p>
                <p className="mt-2 font-display text-3xl font-semibold text-foreground">
                  {stats?.progressoProximoSelo ?? 0}%
                </p>
              </div>
            </div>
            <Progress
              value={stats?.progressoProximoSelo ?? 0}
              color="success"
              label="Evolução rumo ao próximo selo"
              showValueLabel
            />
            <p className="text-sm text-foreground-500">
              {stats?.reunioesFaltando
                ? `Faltam ${stats.reunioesFaltando} reuniões para avançar ao próximo patamar.`
                : "Cadência operacional dentro do esperado para a próxima certificação."}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ações prioritárias</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link
              href="/conselho/reunioes"
              className="block rounded-md border border-default-100 bg-content2 p-4 transition-colors hover:bg-content3"
            >
              <p className="font-medium text-foreground">Registrar reunião</p>
              <p className="mt-1 text-sm text-foreground-500">
                Atualize pauta, presença e ata para manter o conselho ativo.
              </p>
            </Link>
            <Link
              href="/conselho/membros"
              className="block rounded-md border border-default-100 bg-content2 p-4 transition-colors hover:bg-content3"
            >
              <p className="font-medium text-foreground">Gerenciar membros</p>
              <p className="mt-1 text-sm text-foreground-500">
                Garanta composição atualizada e contatos válidos.
              </p>
            </Link>
            <Link
              href="/conselho/documentos"
              className="block rounded-md border border-default-100 bg-content2 p-4 transition-colors hover:bg-content3"
            >
              <p className="font-medium text-foreground">Revisar documentos</p>
              <p className="mt-1 text-sm text-foreground-500">
                Centralize atas, modelos e evidências de conformidade.
              </p>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
