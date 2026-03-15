"use client";

import { GeoJSON, Tooltip } from "react-leaflet";
import { useRouter } from "next/navigation";
import { Feature, Geometry } from "geojson";
import { PathOptions } from "leaflet";

export interface GeoJSONFeatureProperties {
  codigo_ibge: string;
  nome: string;
  status: string;
  indice_antifome: number;
  populacao: number;
}

export interface GeoJSONFeature {
  type: "Feature";
  geometry: Geometry;
  properties: GeoJSONFeatureProperties;
}

export interface GeoJSONFeatureCollection {
  type: "FeatureCollection";
  features: GeoJSONFeature[];
}

interface BaseLayerProps {
  data: GeoJSONFeatureCollection;
}

// Cores por status
const statusColors: Record<string, string> = {
  ATIVO: "#22c55e",     // Verde
  ATRASADO: "#f59e0b",  // Amarelo/Laranja
  INATIVO: "#ef4444",   // Vermelho
  DESCONHECIDO: "#9ca3af", // Cinza
};

function getStyle(feature: Feature | undefined): PathOptions {
  const props = feature?.properties as GeoJSONFeatureProperties | undefined;
  const status = props?.status ?? "DESCONHECIDO";

  return {
    fillColor: statusColors[status] ?? statusColors.DESCONHECIDO,
    weight: 1,
    opacity: 1,
    color: "#374151",
    fillOpacity: 0.7,
  };
}

export function BaseLayer({ data }: BaseLayerProps) {
  const router = useRouter();

  const onEachFeature = (feature: Feature, layer: L.Layer) => {
    const props = feature.properties as GeoJSONFeatureProperties;

    // Adicionar tooltip ao hover
    layer.bindTooltip(
      `<div class="font-semibold">${props.nome}</div>
       <div>Status: ${props.status}</div>
       <div>Índice: ${props.indice_antifome?.toFixed(1) ?? "N/A"}</div>`,
      { sticky: true }
    );

    // Navegar ao clicar
    layer.on("click", () => {
      router.push(`/municipios/${props.codigo_ibge}`);
    });

    // Destacar ao hover
    layer.on("mouseover", () => {
      (layer as L.Path).setStyle({
        weight: 3,
        color: "#1f2937",
        fillOpacity: 0.9,
      });
    });

    layer.on("mouseout", () => {
      (layer as L.Path).setStyle(getStyle(feature));
    });
  };

  return (
    <GeoJSON
      data={data}
      style={getStyle}
      onEachFeature={onEachFeature}
    />
  );
}
