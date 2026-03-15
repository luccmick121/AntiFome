"use client";

import { useEffect, useState } from "react";
import { MapContainer as LeafletMap, TileLayer } from "react-leaflet";
import { LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";
import { BaseLayer, GeoJSONFeatureCollection } from "./layers/base-layer";
import { IAGLayer } from "./layers/iag-layer";
import { CozinhasLayer } from "./layers/cozinhas-layer";
import { PPSANLayer } from "./layers/ppsan-layer";
import { MapLegend } from "./map-legend";
import { LayerControls } from "./layer-controls";

// Centro do RS
const MAP_CENTER: LatLngTuple = [-30.0346, -51.2177];
const DEFAULT_ZOOM = 7;
const MIN_ZOOM = 6;
const MAX_ZOOM = 12;

export interface LayerState {
  base: boolean;
  iag: boolean;
  cozinhas: boolean;
  ppsan: boolean;
}

export default function MapContainer() {
  const [geojsonData, setGeojsonData] = useState<GeoJSONFeatureCollection | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [layers, setLayers] = useState<LayerState>({
    base: true,
    iag: false,
    cozinhas: false,
    ppsan: false,
  });

  useEffect(() => {
    const fetchGeoJSON = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/mapa/geojson`,
          { credentials: "include" }
        );

        if (response.ok) {
          const data = await response.json();
          setGeojsonData(data);
        }
      } catch (error) {
        console.error("Erro ao carregar GeoJSON:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGeoJSON();
  }, []);

  const toggleLayer = (layer: keyof LayerState) => {
    setLayers((prev) => ({ ...prev, [layer]: !prev[layer] }));
  };

  if (isLoading) {
    return (
      <div className="h-[calc(100vh-180px)] w-full flex items-center justify-center bg-gray-100 rounded-lg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4" />
          <p className="text-gray-500">Carregando dados do mapa...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="h-[calc(100vh-180px)] w-full rounded-lg overflow-hidden border shadow-sm">
        <LeafletMap
          center={MAP_CENTER}
          zoom={DEFAULT_ZOOM}
          minZoom={MIN_ZOOM}
          maxZoom={MAX_ZOOM}
          style={{ height: "100%", width: "100%" }}
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Camada Base - Choropleth */}
          {layers.base && geojsonData && (
            <BaseLayer data={geojsonData} />
          )}

          {/* Camada IAG - Heatmap de Gravidade */}
          {layers.iag && geojsonData && (
            <IAGLayer data={geojsonData} />
          )}

          {/* Camada Cozinhas Solidárias */}
          {layers.cozinhas && (
            <CozinhasLayer data={[]} />
          )}

          {/* Camada PPSAN */}
          {layers.ppsan && (
            <PPSANLayer data={[]} />
          )}

          {/* Controles de Zoom */}
          <div className="leaflet-top leaflet-right">
            <div className="leaflet-control-zoom leaflet-bar leaflet-control">
              <a className="leaflet-control-zoom-in" href="#" title="Zoom in" role="button">+</a>
              <a className="leaflet-control-zoom-out" href="#" title="Zoom out" role="button">−</a>
            </div>
          </div>
        </LeafletMap>
      </div>

      {/* Controles de Camadas */}
      <LayerControls layers={layers} onToggle={toggleLayer} />

      {/* Legenda */}
      <MapLegend />
    </div>
  );
}
