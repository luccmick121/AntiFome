"use client";

import { useCallback, useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectItem } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { buildApiPath } from "@/lib/api";
import {
  AlertTriangle,
  Building2,
  Calendar,
  FileText,
  Volume2,
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
    label: "Sem reunião",
    icon: Calendar,
  },
  SEM_RELATORIO: {
    label: "Sem relatório",
    icon: FileText,
  },
  CONSELHO_SUSPENSO: {
    label: "Conselho suspenso",
    icon: Building2,
  },
};

const severityBadge: Record<AlertaMunicipio["severidade"], "urgency" | "warning" | "outline"> = {
  CRITICA: "urgency",
  ALTA: "warning",
  MEDIA: "outline",
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

      const response = await fetch(`${buildApiPath("/alertas")}?${params}`, {
        credentials: "include",
      });

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
      await fetch(buildApiPath(`/alertas/${alertaId}/quebrar-silencio`), {
        method: "POST",
        credentials: "include",
      });
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

  const resumoCards = [
    { title: "Total de alertas", value: data?.resumo.total ?? 0, tone: "outline" as const },
    { title: "Sem reunião", value: data?.resumo.sem_reuniao ?? 0, tone: "warning" as const },
    { title: "Sem relatório", value: data?.resumo.sem_relatorio ?? 0, tone: "warning" as const },
    { title: "Suspensos", value: data?.resumo.conselho_suspenso ?? 0, tone: "urgency" as const },
  ];

  return (
    <div className="page-shell space-y-6">
      <div className="grid gap-4 lg:grid-cols-4">
        {resumoCards.map((item) => (
          <Card key={item.title}>
            <CardContent className="space-y-2">
              <p className="text-sm uppercase tracking-[0.12em] text-foreground-500">{item.title}</p>
              {isLoading ? (
                <Skeleton className="h-10 w-20" />
              ) : (
                <div className="flex items-center gap-3">
                  <span className="font-display text-4xl font-semibold text-foreground">{item.value}</span>
                  <Badge variant={item.tone}>{item.tone === "urgency" ? "Crítico" : "Monitorado"}</Badge>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Alertas operacionais</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="max-w-xs">
            <Select
              label="Filtrar por tipo"
              labelPlacement="outside"
              selectedKeys={[filtro]}
              onSelectionChange={(keys) => {
                const nextValue = Array.from(keys)[0];
                setFiltro(String(nextValue));
              }}
            >
              <SelectItem key="TODOS">Todos os alertas</SelectItem>
              <SelectItem key="SEM_REUNIAO">Sem reunião</SelectItem>
              <SelectItem key="SEM_RELATORIO">Sem relatório</SelectItem>
              <SelectItem key="CONSELHO_SUSPENSO">Conselho suspenso</SelectItem>
            </Select>
          </div>

          <div className="space-y-4">
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <Card key={i}>
                  <CardContent className="space-y-3">
                    <Skeleton className="h-5 w-56" />
                    <Skeleton className="h-4 w-80" />
                  </CardContent>
                </Card>
              ))
            ) : data?.alertas.length === 0 ? (
              <Card>
                <CardContent className="py-10 text-center text-foreground-500">
                  Nenhum alerta encontrado. Os municípios monitorados estão em condição estável.
                </CardContent>
              </Card>
            ) : (
              data?.alertas.map((alerta) => {
                const config = tipoConfig[alerta.tipo];
                const Icon = config.icon;

                return (
                  <Card key={alerta.id} className="card-hover">
                    <CardContent className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div className="flex gap-4">
                        <div className="rounded-md bg-danger/10 p-3 text-danger">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="font-medium text-foreground">{alerta.municipio_nome}</p>
                            <Badge variant={severityBadge[alerta.severidade]}>
                              {alerta.severidade}
                            </Badge>
                          </div>
                          <p className="text-sm text-foreground-500">
                            {config.label} com inatividade de {formatarDias(alerta.dias_inatividade)}.
                          </p>
                          <div className="flex flex-wrap gap-4 text-xs uppercase tracking-[0.12em] text-foreground-400">
                            <span>IBGE {alerta.codigo_ibge}</span>
                            <span>{alerta.contato ? alerta.contato : "Sem contato cadastrado"}</span>
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => handleQuebrarSilencio(alerta.id)}
                        disabled={quebrandoSilencio === alerta.id}
                      >
                        <Volume2 className="h-4 w-4" />
                        {quebrandoSilencio === alerta.id ? "Enviando..." : "Quebrar silêncio"}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
