"use client";

import { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertTriangle,
  Calendar,
  FileText,
  Building2,
  Volume2,
  Filter,
} from "lucide-react";

interface AlertaMunicipio {
  id: string;
  tipo: "SEM_REUNIAO" | "SEM_RELATORIO" | "CONSELHO_SUSPENSO";
  municipio_id: string;
  municipio_nome: string;
  codigo_ibge: string;
  dias_inatividade: number;
  ultimo_evento: string | null;
  contato: string | null;
  severidade: "CRITICA" | "ALTA" | "MEDIA";
}

interface AlertasResponse {
  resumo: {
    sem_reuniao: number;
    sem_relatorio: number;
    conselho_suspenso: number;
    total: number;
  };
  alertas: AlertaMunicipio[];
  total: number;
}

const tipoConfig = {
  SEM_REUNIAO: {
    label: "Sem Reunião",
    icon: Calendar,
    color: "text-orange-600 bg-orange-100",
  },
  SEM_RELATORIO: {
    label: "Sem Relatório",
    icon: FileText,
    color: "text-yellow-600 bg-yellow-100",
  },
  CONSELHO_SUSPENSO: {
    label: "Conselho Suspenso",
    icon: Building2,
    color: "text-red-600 bg-red-100",
  },
};

const severidadeConfig = {
  CRITICA: { label: "Crítica", color: "bg-red-500" },
  ALTA: { label: "Alta", color: "bg-orange-500" },
  MEDIA: { label: "Média", color: "bg-yellow-500" },
};

export default function AlertasPage() {
  const [data, setData] = useState<AlertasResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filtro, setFiltro] = useState("TODOS");
  const [quebrandoSilencio, setQuebrandoSilencio] = useState<string | null>(null);

  const fetchAlertas = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        ...(filtro !== "TODOS" && { tipo: filtro }),
      });

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/alertas?${params}`,
        { credentials: "include" }
      );

      if (response.ok) {
        const result = await response.json();
        setData(result);
      }
    } catch (error) {
      console.error("Erro ao carregar alertas:", error);
    } finally {
      setIsLoading(false);
    }
  }, [filtro]);

  useEffect(() => {
    fetchAlertas();
  }, [fetchAlertas]);

  const handleQuebrarSilencio = async (alertaId: string) => {
    setQuebrandoSilencio(alertaId);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/alertas/${alertaId}/quebrar-silencio`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (response.ok) {
        alert("Silêncio quebrado! O conselho será notificado.");
      }
    } catch (error) {
      console.error("Erro ao quebrar silêncio:", error);
    } finally {
      setQuebrandoSilencio(null);
    }
  };

  const formatarDias = (dias: number) => {
    if (dias >= 365) return "Mais de 1 ano";
    if (dias >= 30) return `${Math.floor(dias / 30)} meses`;
    return `${dias} dias`;
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Alertas de Inatividade</h1>
        <p className="text-gray-500">
          Municípios que precisam de atenção do gestor estadual
        </p>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <ResumoCard
          title="Total de Alertas"
          value={data?.resumo.total ?? 0}
          icon={AlertTriangle}
          color="bg-gray-100 text-gray-600"
          isLoading={isLoading}
        />
        <ResumoCard
          title="Sem Reunião (>90 dias)"
          value={data?.resumo.sem_reuniao ?? 0}
          icon={Calendar}
          color="bg-orange-100 text-orange-600"
          isLoading={isLoading}
        />
        <ResumoCard
          title="Sem Relatório (>30 dias)"
          value={data?.resumo.sem_relatorio ?? 0}
          icon={FileText}
          color="bg-yellow-100 text-yellow-600"
          isLoading={isLoading}
        />
        <ResumoCard
          title="Conselhos Suspensos"
          value={data?.resumo.conselho_suspenso ?? 0}
          icon={Building2}
          color="bg-red-100 text-red-600"
          isLoading={isLoading}
        />
      </div>

      {/* Filtros */}
      <div className="flex items-center gap-4 mb-6">
        <Filter className="w-4 h-4 text-gray-500" />
        <select
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="px-4 py-2 border rounded-lg bg-white"
        >
          <option value="TODOS">Todos os Alertas</option>
          <option value="SEM_REUNIAO">Sem Reunião</option>
          <option value="SEM_RELATORIO">Sem Relatório</option>
          <option value="CONSELHO_SUSPENSO">Conselho Suspenso</option>
        </select>
      </div>

      {/* Lista de Alertas */}
      <div className="space-y-4">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="bg-white rounded-lg border p-4">
              <Skeleton className="h-6 w-48 mb-2" />
              <Skeleton className="h-4 w-32" />
            </div>
          ))
        ) : data?.alertas.length === 0 ? (
          <div className="bg-white rounded-lg border p-8 text-center text-gray-500">
            Nenhum alerta encontrado. Todos os municípios estão em dia!
          </div>
        ) : (
          data?.alertas.map((alerta) => {
            const config = tipoConfig[alerta.tipo];
            const Icon = config.icon;

            return (
              <div
                key={alerta.id}
                className="bg-white rounded-lg border p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${config.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-800">
                          {alerta.municipio_nome}
                        </h3>
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-medium text-white ${
                            severidadeConfig[alerta.severidade].color
                          }`}
                        >
                          {severidadeConfig[alerta.severidade].label}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {config.label} — Inativo há {formatarDias(alerta.dias_inatividade)}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Código IBGE: {alerta.codigo_ibge}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuebrarSilencio(alerta.id)}
                    disabled={quebrandoSilencio === alerta.id}
                    className="gap-2"
                  >
                    <Volume2 className="w-4 h-4" />
                    {quebrandoSilencio === alerta.id
                      ? "Enviando..."
                      : "Quebrar Silêncio"}
                  </Button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

function ResumoCard({
  title,
  value,
  icon: Icon,
  color,
  isLoading,
}: {
  title: string;
  value: number;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  isLoading: boolean;
}) {
  return (
    <div className="bg-white rounded-lg border p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-600">{title}</span>
        <div className={`p-2 rounded-lg ${color}`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>
      {isLoading ? (
        <Skeleton className="h-8 w-16" />
      ) : (
        <span className="text-2xl font-bold text-gray-800">{value}</span>
      )}
    </div>
  );
}
