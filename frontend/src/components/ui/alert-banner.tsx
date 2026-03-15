'use client';

import { useState } from 'react';
import { AlertTriangle, X, Info, CheckCircle } from 'lucide-react';
import { Button } from './button';

interface AlertBannerProps {
  tipo?: 'alerta' | 'info' | 'sucesso';
  titulo: string;
  mensagem?: string;
  fechavel?: boolean;
  onFechar?: () => void;
}

const estilosPorTipo = {
  alerta: {
    bg: 'bg-red-50 border-red-200',
    texto: 'text-red-800',
    icone: AlertTriangle,
    iconeCor: 'text-red-500',
  },
  info: {
    bg: 'bg-blue-50 border-blue-200',
    texto: 'text-blue-800',
    icone: Info,
    iconeCor: 'text-blue-500',
  },
  sucesso: {
    bg: 'bg-green-50 border-green-200',
    texto: 'text-green-800',
    icone: CheckCircle,
    iconeCor: 'text-green-500',
  },
};

export function AlertBanner({
  tipo = 'alerta',
  titulo,
  mensagem,
  fechavel = true,
  onFechar,
}: AlertBannerProps) {
  const [visivel, setVisivel] = useState(true);
  const estilo = estilosPorTipo[tipo];
  const Icon = estilo.icone;

  if (!visivel) return null;

  const handleFechar = () => {
    setVisivel(false);
    onFechar?.();
  };

  return (
    <div
      className={`flex items-start gap-3 p-4 border rounded-lg animate-slideUp ${estilo.bg}`}
      role="alert"
    >
      <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${estilo.iconeCor}`} />
      <div className="flex-1 min-w-0">
        <p className={`font-medium text-sm ${estilo.texto}`}>{titulo}</p>
        {mensagem && (
          <p className={`text-sm mt-1 ${estilo.texto} opacity-80`}>{mensagem}</p>
        )}
      </div>
      {fechavel && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleFechar}
          className={`${estilo.texto} hover:bg-black/5 -mt-1 -mr-1`}
        >
          <X className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
}
