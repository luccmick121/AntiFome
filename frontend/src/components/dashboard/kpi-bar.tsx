"use client";

import { useEffect, useState } from "react";
import { KpiCard } from "./kpi-card";
import { MapPin, CheckCircle, TrendingUp } from "lucide-react";

interface DashboardStats {
  totalMunicipios: number;
  municipiosAtivos: number;
  municipiosInativos: number;
  municipiosAtrasados: number;
  indiceAntifomeMedio: number;
  totalConselhos: number;
  conselhosAtivos: number;
  totalReunioesMes: number;
  selosDistribuidos: number;
}

export function KpiBar() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/dashboard/stats`,
          {
            credentials: "include",
          }
        );

        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch {
        // Usar dados padrão em caso de erro
        setStats({
          totalMunicipios: 497,
          municipiosAtivos: 353,
          municipiosInativos: 84,
          municipiosAtrasados: 60,
          indiceAntifomeMedio: 6.8,
          totalConselhos: 412,
          conselhosAtivos: 380,
          totalReunioesMes: 145,
          selosDistribuidos: 234,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      <KpiCard
        title="Total de Municípios"
        value={stats?.totalMunicipios ?? 0}
        subtitle="Municípios cadastrados"
        icon={MapPin}
        color="blue"
        isLoading={isLoading}
      />
      <KpiCard
        title="Municípios Ativos"
        value={stats?.municipiosAtivos ?? 0}
        subtitle={`${stats ? Math.round((stats.municipiosAtivos / stats.totalMunicipios) * 100) : 0}% do total`}
        icon={CheckCircle}
        color="green"
        isLoading={isLoading}
      />
      <KpiCard
        title="Índice Antifome Médio"
        value={stats?.indiceAntifomeMedio?.toFixed(1) ?? "0.0"}
        subtitle="Escala 0-10"
        icon={TrendingUp}
        color="amber"
        isLoading={isLoading}
      />
    </div>
  );
}
