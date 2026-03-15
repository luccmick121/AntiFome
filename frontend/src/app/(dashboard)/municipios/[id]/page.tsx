'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Building2,
  Users,
  Calendar,
  Award,
  MapPin,
  FileText,
  ArrowLeft,
  TrendingUp,
  AlertCircle,
} from 'lucide-react';

interface MunicipioDetalhe {
  id: string;
  codigo_ibge: string;
  nome: string;
  populacao: number;
  indice_antifome: number;
  status: string;
  latitude: number | null;
  longitude: number | null;
  estado: { nome: string; sigla: string };
  conselho: {
    id: string;
    nome: string;
    status: string;
    membros: Array<{ id: string; nome: string; cargo: string; email?: string }>;
    reunioes: Array<{ id: string; data: string; tipo: string; pauta?: string }>;
  } | null;
  selos: Array<{ id: string; tipo: string; conquistado_em: string }>;
  relatorios: Array<{ id: string; mes_ano: string; nivel_gravidade: string }>;
  resumo: {
    total_membros: number;
    total_reunioes: number;
    total_selos: number;
    total_relatorios: number;
  };
}

interface IndiceHistorico {
  atual: number;
  historico: Array<{ mes: string; indice: number }>;
}

const statusCores: Record<string, string> = {
  ATIVO: 'bg-green-100 text-green-800',
  INATIVO: 'bg-red-100 text-red-800',
  ATRASADO: 'bg-yellow-100 text-yellow-800',
};

const seloIcones: Record<string, string> = {
  BRONZE: '🥉',
  PRATA: '🥈',
  OURO: '🥇',
  PLATINA: '💎',
};

export default function MunicipioDetalhePage() {
  const params = useParams();
  const [municipio, setMunicipio] = useState<MunicipioDetalhe | null>(null);
  const [indiceHistorico, setIndiceHistorico] = useState<IndiceHistorico | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    async function carregarDados() {
      try {
        const [municipioRes, indiceRes] = await Promise.all([
          fetch(`/api/municipios/${params.id}`, { credentials: 'include' }),
          fetch(`/api/municipios/${params.id}/indice-historico`, { credentials: 'include' }),
        ]);

        if (!municipioRes.ok) {
          if (municipioRes.status === 404) {
            setErro('Município não encontrado');
          } else {
            setErro('Erro ao carregar dados do município');
          }
          return;
        }

        const municipioData = await municipioRes.json();
        setMunicipio(municipioData);

        if (indiceRes.ok) {
          const indiceData = await indiceRes.json();
          setIndiceHistorico(indiceData);
        }
      } catch (error) {
        setErro('Erro ao conectar com o servidor');
      } finally {
        setCarregando(false);
      }
    }

    carregarDados();
  }, [params.id]);

  if (carregando) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (erro || !municipio) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <AlertCircle className="w-16 h-16 text-red-400 mb-4" />
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          {erro || 'Município não encontrado'}
        </h2>
        <p className="text-gray-500 mb-4">
          O município solicitado não existe ou não pôde ser carregado.
        </p>
        <Button asChild variant="outline">
          <Link href="/ranking">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao Ranking
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/ranking">
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </Button>
            <h1 className="text-2xl font-bold text-[#1A2F23]">{municipio.nome}</h1>
            <Badge className={statusCores[municipio.status] || 'bg-gray-100'}>
              {municipio.status}
            </Badge>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <Building2 className="w-4 h-4" />
              IBGE: {municipio.codigo_ibge}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {municipio.estado.nome} ({municipio.estado.sigla})
            </span>
            <span>Pop: {municipio.populacao.toLocaleString('pt-BR')}</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-[#1A2F23]">
            {municipio.indice_antifome.toFixed(1)}
          </div>
          <p className="text-sm text-gray-500">Índice Antifome</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <Users className="w-8 h-8 text-[#1A2F23]" />
              <span className="text-2xl font-bold">{municipio.resumo.total_membros}</span>
            </div>
            <p className="text-sm text-gray-500 mt-2">Membros</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <Calendar className="w-8 h-8 text-[#1A2F23]" />
              <span className="text-2xl font-bold">{municipio.resumo.total_reunioes}</span>
            </div>
            <p className="text-sm text-gray-500 mt-2">Reuniões</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <Award className="w-8 h-8 text-[#1A2F23]" />
              <span className="text-2xl font-bold">{municipio.resumo.total_selos}</span>
            </div>
            <p className="text-sm text-gray-500 mt-2">Selos</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <FileText className="w-8 h-8 text-[#1A2F23]" />
              <span className="text-2xl font-bold">{municipio.resumo.total_relatorios}</span>
            </div>
            <p className="text-sm text-gray-500 mt-2">Relatórios</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Conselho */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Conselho</CardTitle>
            </CardHeader>
            <CardContent>
              {municipio.conselho ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Status</span>
                    <Badge className={municipio.conselho.status === 'ATIVO' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                      {municipio.conselho.status}
                    </Badge>
                  </div>
                  <div>
                    <p className="font-medium text-sm">{municipio.conselho.nome}</p>
                  </div>
                  {municipio.conselho.membros.length > 0 && (
                    <div>
                      <p className="text-sm text-gray-500 mb-2">Presidente:</p>
                      {municipio.conselho.membros
                        .filter(m => m.cargo === 'PRESIDENTE')
                        .map(m => (
                          <p key={m.id} className="font-medium text-sm">{m.nome}</p>
                        ))}
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-sm text-gray-500 text-center py-4">
                  Nenhum conselho ativo
                </p>
              )}
            </CardContent>
          </Card>

          {/* Selos */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Selos Conquistados</CardTitle>
            </CardHeader>
            <CardContent>
              {municipio.selos.length > 0 ? (
                <div className="grid grid-cols-2 gap-2">
                  {municipio.selos.map((selo) => (
                    <div key={selo.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                      <span className="text-xl">{seloIcones[selo.tipo] || '🏅'}</span>
                      <div>
                        <p className="text-sm font-medium">{selo.tipo}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(selo.conquistado_em).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 text-center py-4">
                  Nenhum selo conquistado ainda
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Charts and Timeline */}
        <div className="lg:col-span-2 space-y-4">
          {/* Índice Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Evolução do Índice Antifome
              </CardTitle>
            </CardHeader>
            <CardContent>
              {indiceHistorico && (
                <div className="space-y-2">
                  <div className="flex items-end justify-between h-32 gap-1">
                    {indiceHistorico.historico.map((ponto, i) => {
                      const altura = (ponto.indice / 10) * 100;
                      return (
                        <div
                          key={i}
                          className="flex-1 flex flex-col items-center"
                        >
                          <div
                            className="w-full bg-[#1A2F23] rounded-t transition-all hover:bg-[#2E7D32]"
                            style={{ height: `${altura}%`, minHeight: '4px' }}
                            title={`${ponto.mes}: ${ponto.indice}`}
                          />
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>{indiceHistorico.historico[0]?.mes}</span>
                    <span>Hoje</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Reuniões Recentes */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Reuniões Recentes</CardTitle>
            </CardHeader>
            <CardContent>
              {municipio.conselho && municipio.conselho.reunioes.length > 0 ? (
                <div className="space-y-3">
                  {municipio.conselho.reunioes.slice(0, 5).map((reuniao) => (
                    <div key={reuniao.id} className="flex items-start gap-3 pb-3 border-b last:border-0">
                      <div className="w-2 h-2 mt-2 rounded-full bg-[#1A2F23]" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-sm">
                            {new Date(reuniao.data).toLocaleDateString('pt-BR', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </p>
                          <Badge variant="outline" className="text-xs">
                            {reuniao.tipo}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          {reuniao.pauta || 'Sem pauta definida'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 text-center py-4">
                  Nenhuma reunião registrada
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button asChild variant="outline">
          <Link href={`/mapa?municipio=${municipio.id}`}>
            <MapPin className="w-4 h-4 mr-2" />
            Ver no Mapa
          </Link>
        </Button>
      </div>
    </div>
  );
}
