'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface SeloDetalhes {
  reunioes: { atual: number; necessarias: number; progresso: number };
  relatorios: { atual: number; necessarios: number; progresso: number };
  membros: { atual: number; minimo: number; progresso: number };
}

interface Selo {
  tipo: string;
  progresso: number;
  atingido: boolean;
  detalhes: SeloDetalhes;
}

interface SealProgressGridProps {
  selos: Selo[];
}

const seloIcons: Record<string, string> = {
  BRONZE: '🥉',
  PRATA: '🥈',
  OURO: '🥇',
  PLATINA: '💎',
};

const seloColors: Record<string, string> = {
  BRONZE: 'from-amber-600 to-amber-400',
  PRATA: 'from-gray-400 to-gray-300',
  OURO: 'from-yellow-500 to-yellow-300',
  PLATINA: 'from-purple-500 to-purple-300',
};

export function SealProgressGrid({ selos }: SealProgressGridProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Progresso para Selos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {selos.map((selo) => (
            <div key={selo.tipo} className="text-center">
              <div className="text-3xl mb-2">{seloIcons[selo.tipo]}</div>
              <p className="font-medium text-sm">{selo.tipo}</p>
              {selo.atingido ? (
                <Badge className="mt-1 bg-green-100 text-green-800">Atingido</Badge>
              ) : (
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                    <div
                      className={`h-2 rounded-full bg-gradient-to-r ${seloColors[selo.tipo]}`}
                      style={{ width: `${selo.progresso}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">{selo.progresso}%</p>
                </div>
              )}
              {/* Detalhes */}
              <div className="mt-2 text-xs text-muted-foreground space-y-1">
                <p>Reuniões: {selo.detalhes.reunioes.atual}/{selo.detalhes.reunioes.necessarias}</p>
                <p>Relatórios: {selo.detalhes.relatorios.atual}/{selo.detalhes.relatorios.necessarios}</p>
                {selo.detalhes.membros.minimo > 0 && (
                  <p>Membros: {selo.detalhes.membros.atual}/{selo.detalhes.membros.minimo}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
