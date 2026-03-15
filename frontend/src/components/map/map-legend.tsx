"use client";

export function MapLegend() {
  const legendItems = [
    { color: "#22c55e", label: "Ativo", description: "Conselho ativo, reuniões regulares" },
    { color: "#f59e0b", label: "Atrasado", description: "Conselho irregular" },
    { color: "#ef4444", label: "Inativo", description: "Sem conselho ou inativo" },
    { color: "#9ca3af", label: "Desconhecido", description: "Dados não disponíveis" },
  ];

  return (
    <div className="absolute bottom-4 left-4 z-[1000] bg-white rounded-lg shadow-lg p-4 max-w-xs">
      <h3 className="font-semibold text-gray-800 mb-3">Legenda</h3>
      <div className="space-y-2">
        {legendItems.map((item) => (
          <div key={item.label} className="flex items-center gap-3">
            <div
              className="w-4 h-4 rounded"
              style={{ backgroundColor: item.color }}
            />
            <div>
              <span className="text-sm font-medium text-gray-700">{item.label}</span>
              <p className="text-xs text-gray-500">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
