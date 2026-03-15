'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SISANCard } from './sisan-card';
import { CAISANCard } from './caisan-card';
import { PlanoCard } from './plano-card';
import { SealProgressGrid } from './seal-progress';
import { Recommendations } from './recommendations';
import { MeetingTimeline } from './meeting-timeline';

interface StatusData {
  conselho: { id: string; nome: string; status: string };
  municipio: { nome: string; codigo_ibge: string; indice_antifome: number };
  sisan: { adesao: string; data_adesao: string | null };
  caisan: { composicao: string; status_funcionamento: string };
  plano_municipal: { vigencia: string; status_execucao: string; percentual_execucao: number };
  selos: Array<{
    tipo: string;
    progresso: number;
    atingido: boolean;
    detalhes: {
      reunioes: { atual: number; necessarias: number; progresso: number };
      relatorios: { atual: number; necessarios: number; progresso: number };
      membros: { atual: number; minimo: number; progresso: number };
    };
  }>;
  reunioes: { realizadas: number; necessarias: number; percentual: number };
  relatorios: { enviados: number; necessarios: number; percentual: number };
  progresso_geral: number;
  recomendacoes: string[];
  proximas_reunioes: Array<{ data: string; tipo: string; sugerida: boolean }>;
}

export function StatusDashboard() {
  const [data, setData] = useState<StatusData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStatus() {
      try {
        const response = await fetch('/api/conselhos/mine/status', {
          credentials: 'include',
        });
        if (!response.ok) throw new Error('Erro ao carregar status');
        const json = await response.json();
        setData(json);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    }
    fetchStatus();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error || !data) {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardContent className="pt-6">
          <p className="text-red-600">{error || 'Erro ao carregar dados'}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Cards de Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <SISANCard adesao={data.sisan.adesao} dataAdesao={data.sisan.data_adesao} />
        <CAISANCard composicao={data.caisan.composicao} status={data.caisan.status_funcionamento} />
        <PlanoCard
          vigencia={data.plano_municipal.vigencia}
          status={data.plano_municipal.status_execucao}
          percentual={data.plano_municipal.percentual_execucao}
        />
      </div>

      {/* Indicadores de Progresso */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Reuniões</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl font-bold">{data.reunioes.realizadas}</span>
              <span className="text-sm text-muted-foreground">/ {data.reunioes.necessarias}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all ${
                  data.reunioes.percentual >= 80 ? 'bg-green-500' :
                  data.reunioes.percentual >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${data.reunioes.percentual}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">{data.reunioes.percentual}% realizado</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Relatórios</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl font-bold">{data.relatorios.enviados}</span>
              <span className="text-sm text-muted-foreground">/ {data.relatorios.necessarios}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all ${
                  data.relatorios.percentual >= 80 ? 'bg-green-500' :
                  data.relatorios.percentual >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${data.relatorios.percentual}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">{data.relatorios.percentual}% realizado</p>
          </CardContent>
        </Card>
      </div>

      {/* Progresso dos Selos */}
      <SealProgressGrid selos={data.selos} />

      {/* Recomendações e Timeline */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Recommendations recomendacoes={data.recomendacoes} />
        <MeetingTimeline reunioes={data.proximas_reunioes} />
      </div>
    </div>
  );
}
