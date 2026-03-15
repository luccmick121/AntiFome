'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface CAISANCardProps {
  composicao: string;
  status: string;
}

export function CAISANCard({ composicao, status }: CAISANCardProps) {
  const isFuncionando = status === 'FUNCIONANDO';

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">CAISAN</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-semibold">Conselho de SAN</p>
            <p className="text-sm text-muted-foreground mt-1">{composicao}</p>
          </div>
          <div className="text-3xl">{isFuncionando ? '🏛️' : '⏸️'}</div>
        </div>
        <Badge className={`mt-3 ${isFuncionando ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {isFuncionando ? 'Funcionando' : 'Inativo'}
        </Badge>
      </CardContent>
    </Card>
  );
}
