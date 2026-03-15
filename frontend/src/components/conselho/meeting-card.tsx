'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, FileText, Download, Edit, Trash2 } from 'lucide-react';

interface MeetingCardProps {
  id: string;
  data: string;
  tipo: 'ORDINARIA' | 'EXTRAORDINARIA';
  pauta?: string | null;
  ata_url?: string | null;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function MeetingCard({
  data,
  tipo,
  pauta,
  ata_url,
  onEdit,
  onDelete,
}: MeetingCardProps) {
  const dataFormatada = new Date(data).toLocaleDateString('pt-BR', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  const tipoConfig = {
    ORDINARIA: { label: 'Ordinária', color: 'bg-blue-100 text-blue-800' },
    EXTRAORDINARIA: { label: 'Extraordinária', color: 'bg-orange-100 text-orange-800' },
  };

  const config = tipoConfig[tipo];

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#1A2F23]/10 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-[#1A2F23]" />
            </div>
            <div>
              <p className="font-medium text-[#1A2F23]">{dataFormatada}</p>
              <Badge className={`mt-1 ${config.color}`}>{config.label}</Badge>
            </div>
          </div>
          <div className="flex gap-1">
            {onEdit && (
              <Button variant="ghost" size="sm" onClick={onEdit}>
                <Edit className="w-4 h-4" />
              </Button>
            )}
            {onDelete && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onDelete}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>

        {pauta && (
          <div className="mt-3">
            <p className="text-sm text-gray-600">{pauta}</p>
          </div>
        )}

        <div className="mt-3 flex items-center justify-between">
          {ata_url ? (
            <Button variant="outline" size="sm" asChild>
              <a href={ata_url} download>
                <Download className="w-4 h-4 mr-2" />
                Baixar Ata
              </a>
            </Button>
          ) : (
            <span className="text-xs text-gray-400 flex items-center gap-1">
              <FileText className="w-3 h-3" />
              Ata não anexada
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
