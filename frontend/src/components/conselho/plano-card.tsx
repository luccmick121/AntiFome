'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface PlanoCardProps {
  vigencia: string;
  status: string;
  percentual: number;
}

const statusLabels: Record<string, { label: string; color: string }> = {
  PENDENTE: { label: 'Pendente', color: 'bg-yellow-100 text-yellow-800' },
  EM_EXECUCAO: { label: 'Em Execução', color: 'bg-blue-100 text-blue-800' },
  CONCLUIDO: { label: 'Concluído', color: 'bg-green-100 text-green-800' },
};

export function PlanoCard({ vigencia, status, percentual }: PlanoCardProps) {
  const info = statusLabels[status] || statusLabels.PENDENTE;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">Plano Municipal SAN</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-semibold">Vigência: {vigencia}</p>
            <Badge className={`mt-2 ${info.color}`}>{info.label}</Badge>
          </div>
          <div className="text-3xl">📄</div>
        </div>
        <div className="mt-3">
          <div className="flex justify-between text-sm mb-1">
            <span>Execução</span>
            <span className="font-medium">{percentual}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all ${
                percentual >= 70 ? 'bg-green-500' : percentual >= 40 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${percentual}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
