'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface SISANCardProps {
  adesao: string;
  dataAdesao: string | null;
}

const adesaoLabels: Record<string, { label: string; color: string }> = {
  NAO_ADESAO: { label: 'Não Aderiu', color: 'bg-red-100 text-red-800' },
  ADESAO: { label: 'Adesão', color: 'bg-yellow-100 text-yellow-800' },
  IMPLEMENTACAO: { label: 'Implementação', color: 'bg-blue-100 text-blue-800' },
  CONSOLIDACAO: { label: 'Consolidação', color: 'bg-green-100 text-green-800' },
};

export function SISANCard({ adesao, dataAdesao }: SISANCardProps) {
  const info = adesaoLabels[adesao] || adesaoLabels.NAO_ADESAO;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">SISAN</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-semibold">Sistema Nacional de SAN</p>
            <Badge className={`mt-2 ${info.color}`}>{info.label}</Badge>
          </div>
          <div className="text-3xl">
            {adesao === 'CONSOLIDACAO' ? '✅' : adesao === 'IMPLEMENTACAO' ? '🔄' : adesao === 'ADESAO' ? '📋' : '❌'}
          </div>
        </div>
        {dataAdesao && (
          <p className="text-xs text-muted-foreground mt-3">
            Adesão desde: {new Date(dataAdesao).toLocaleDateString('pt-BR')}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
