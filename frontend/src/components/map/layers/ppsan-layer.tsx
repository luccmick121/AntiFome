'use client';

import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Ícone customizado para PPSAN
const ppsanIcon = L.divIcon({
  className: 'custom-marker',
  html: '<div style="background-color: #2E7D32; width: 16px; height: 16px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>',
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

interface PPSANData {
  id: string;
  nome: string;
  municipio: string;
  tipo: string;
  latitude: number;
  longitude: number;
  status: 'ATIVO' | 'INATIVO';
}

interface PPSANLayerProps {
  data: PPSANData[];
}

export function PPSANLayer({ data }: PPSANLayerProps) {
  // Dados mockados para demonstração - em produção virá da API
  const ppsanMock: PPSANData[] = data.length > 0 ? data : [];

  return (
    <>
      {ppsanMock.map((ppsan) => (
        <Marker
          key={ppsan.id}
          position={[ppsan.latitude, ppsan.longitude]}
          icon={ppsanIcon}
        >
          <Popup>
            <div className="text-sm">
              <div className="font-semibold text-[#1A2F23]">{ppsan.nome}</div>
              <div className="text-gray-600">{ppsan.municipio}</div>
              <div className="text-gray-500 text-xs mt-1">{ppsan.tipo}</div>
              <div className={`mt-1 text-xs font-medium ${ppsan.status === 'ATIVO' ? 'text-green-600' : 'text-red-600'}`}>
                {ppsan.status === 'ATIVO' ? 'Ativo' : 'Inativo'}
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </>
  );
}
