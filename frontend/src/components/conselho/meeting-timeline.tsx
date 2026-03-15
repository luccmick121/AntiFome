'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ReuniaoSugerida {
  data: string;
  tipo: string;
  sugerida: boolean;
}

interface MeetingTimelineProps {
  reunioes: ReuniaoSugerida[];
}

export function MeetingTimeline({ reunioes }: MeetingTimelineProps) {
  if (reunioes.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <span>📅</span> Próximas Reuniões
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-4">
            Todas as reuniões obrigatórias já foram realizadas!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <span>📅</span> Próximas Reuniões Sugeridas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Linha vertical */}
          <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gray-200"></div>

          <ul className="space-y-4">
            {reunioes.map((reuniao, index) => {
              const dataFormatada = new Date(reuniao.data + 'T12:00:00').toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
              });

              return (
                <li key={index} className="relative pl-8">
                  {/* Ponto na timeline */}
                  <div
                    className={`absolute left-1.5 w-3 h-3 rounded-full border-2 ${
                      reuniao.sugerida
                        ? 'bg-blue-100 border-blue-500'
                        : 'bg-green-100 border-green-500'
                    }`}
                  ></div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">{dataFormatada}</p>
                      <p className="text-xs text-muted-foreground">{reuniao.tipo}</p>
                    </div>
                    {reuniao.sugerida && (
                      <Badge variant="outline" className="text-xs">
                        Sugerida
                      </Badge>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
