'use client';

import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Ícone customizado para Cozinhas Solidárias
const cozinhaIcon = L.divIcon({
  className: 'custom-marker',
  html: '<div style="background-color: #FF8F00; width: 16px; height: 16px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>',
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

interface CozinhaData {
  id: string;
  nome: string;
  municipio: string;
  endereco: string;
  latitude: number;
  longitude: number;
  status: 'ATIVA' | 'INATIVA';
}

interface CozinhasLayerProps {
  data: CozinhaData[];
}

export function CozinhasLayer({ data }: CozinhasLayerProps) {
  // Dados mockados para demonstração - em produção virá da API
  const cozinhasMock: CozinhaData[] = data.length > 0 ? data : [];

  return (
    <>
      {cozinhasMock.map((cozinha) => (
        <Marker
          key={cozinha.id}
          position={[cozinha.latitude, cozinha.longitude]}
          icon={cozinhaIcon}
        >
          <Popup>
            <div className="text-sm">
              <div className="font-semibold text-[#1A2F23]">{cozinha.nome}</div>
              <div className="text-gray-600">{cozinha.municipio}</div>
              <div className="text-gray-500 text-xs mt-1">{cozinha.endereco}</div>
              <div className={`mt-1 text-xs font-medium ${cozinha.status === 'ATIVA' ? 'text-green-600' : 'text-red-600'}`}>
                {cozinha.status === 'ATIVA' ? 'Ativa' : 'Inativa'}
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </>
  );
}
