"use client";

import { KpiBar } from "@/components/dashboard/kpi-bar";

export default function DashboardPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500">
          Visão geral da segurança alimentar no Rio Grande do Sul
        </p>
      </div>

      {/* KPI Bar */}
      <KpiBar />

      {/* Conteúdo principal - placeholder */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border p-6">
          <h2 className="text-lg font-semibold mb-4">Municípios por Status</h2>
          <div className="h-64 flex items-center justify-center text-gray-400">
            Gráfico será implementado na Story 2.1
          </div>
        </div>
        <div className="bg-white rounded-lg border p-6">
          <h2 className="text-lg font-semibold mb-4">
            Distribuição do Índice Antifome
          </h2>
          <div className="h-64 flex items-center justify-center text-gray-400">
            Gráfico será implementado na Story 2.1
          </div>
        </div>
      </div>
    </div>
  );
}
