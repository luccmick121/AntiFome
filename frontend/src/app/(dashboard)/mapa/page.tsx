"use client";

import dynamic from "next/dynamic";

// Carregar mapa dinamicamente (Leaflet requer window)
const MapContainer = dynamic(
  () => import("@/components/map/map-container"),
  { ssr: false, loading: () => <MapLoading /> }
);

function MapLoading() {
  return (
    <div className="h-[calc(100vh-180px)] w-full flex items-center justify-center bg-gray-100 rounded-lg">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4" />
        <p className="text-gray-500">Carregando mapa...</p>
      </div>
    </div>
  );
}

export default function MapaPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Mapa Interativo</h1>
        <p className="text-gray-500">
          Visualização geográfica da segurança alimentar no RS
        </p>
      </div>

      <MapContainer />
    </div>
  );
}
