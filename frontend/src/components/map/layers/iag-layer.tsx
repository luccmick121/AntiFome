'use client';

import { CircleMarker, Tooltip } from 'react-leaflet';
import { GeoJSONFeatureCollection } from './base-layer';

interface IAGLayerProps {
  data: GeoJSONFeatureCollection;
}

// Cores por faixa de Índice de Acesso a Alimentos
function getIAGColor(indice: number): string {
  if (indice >= 8) return '#15803d'; // Verde escuro - alto acesso
  if (indice >= 6) return '#22c55e'; // Verde - bom acesso
  if (indice >= 4) return '#facc15'; // Amarelo - acesso moderado
  if (indice >= 2) return '#f97316'; // Laranja - baixo acesso
  return '#dc2626'; // Vermelho - acesso crítico
}

function getIAGLabel(indice: number): string {
  if (indice >= 8) return 'Alto';
  if (indice >= 6) return 'Bom';
  if (indice >= 4) return 'Moderado';
  if (indice >= 2) return 'Baixo';
  return 'Crítico';
}

export function IAGLayer({ data }: IAGLayerProps) {
  return (
    <>
      {data.features.map((feature) => {
        const props = feature.properties;
        const coords = getCenter(feature);

        if (!coords) return null;

        const radius = Math.max(4, Math.min(15, props.populacao / 100000));
        const color = getIAGColor(props.indice_antifome);

        return (
          <CircleMarker
            key={props.codigo_ibge}
            center={[coords[1], coords[0]]}
            radius={radius}
            pathOptions={{
              fillColor: color,
              fillOpacity: 0.8,
              color: '#fff',
              weight: 1,
            }}
          >
            <Tooltip>
              <div className="text-sm">
                <div className="font-semibold">{props.nome}</div>
                <div>IAG: {props.indice_antifome?.toFixed(1)} ({getIAGLabel(props.indice_antifome)})</div>
                <div>Pop: {props.populacao?.toLocaleString('pt-BR')}</div>
              </div>
            </Tooltip>
          </CircleMarker>
        );
      })}
    </>
  );
}

// Calcular centro aproximado do feature
function getCenter(feature: GeoJSONFeatureCollection['features'][0]): [number, number] | null {
  const geom = feature.geometry;
  if (geom.type === 'Polygon') {
    const coords = (geom.coordinates as number[][][])[0];
    const sumLat = coords.reduce((sum, c) => sum + c[1], 0);
    const sumLng = coords.reduce((sum, c) => sum + c[0], 0);
    return [sumLng / coords.length, sumLat / coords.length];
  }
  if (geom.type === 'MultiPolygon') {
    const coords = (geom.coordinates as number[][][][])[0][0];
    const sumLat = coords.reduce((sum, c) => sum + c[1], 0);
    const sumLng = coords.reduce((sum, c) => sum + c[0], 0);
    return [sumLng / coords.length, sumLat / coords.length];
  }
  return null;
}
