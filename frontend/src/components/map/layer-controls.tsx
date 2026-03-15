"use client";

import { LayerState } from "./map-container";

interface LayerControlsProps {
  layers: LayerState;
  onToggle: (layer: keyof LayerState) => void;
}

const layerLabels: Record<keyof LayerState, { label: string; description: string }> = {
  base: { label: "Base (Status)", description: "Polígonos por status" },
  iag: { label: "IAG (Gravidade)", description: "Heatmap de gravidade" },
  cozinhas: { label: "Cozinhas Solidárias", description: "Pontos de cozinhas" },
  ppsan: { label: "PPSAN", description: "Pontos de programas" },
};

export function LayerControls({ layers, onToggle }: LayerControlsProps) {
  return (
    <div className="absolute top-4 left-4 z-[1000] bg-white rounded-lg shadow-lg p-4">
      <h3 className="font-semibold text-gray-800 mb-3">Camadas</h3>
      <div className="space-y-2">
        {(Object.keys(layers) as (keyof LayerState)[]).map((key) => (
          <label
            key={key}
            className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded"
          >
            <input
              type="checkbox"
              checked={layers[key]}
              onChange={() => onToggle(key)}
              className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
            />
            <div>
              <span className="text-sm font-medium text-gray-700">
                {layerLabels[key].label}
              </span>
              <p className="text-xs text-gray-500">{layerLabels[key].description}</p>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}
