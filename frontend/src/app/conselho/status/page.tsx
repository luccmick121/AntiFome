'use client';

import { StatusDashboard } from '@/components/conselho/status-dashboard';

export default function StatusPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#1A2F23]">Status e Progresso do Município</h2>
        <p className="text-gray-500">
          Acompanhe o cumprimento das obrigações e o progresso para selos
        </p>
      </div>

      <StatusDashboard />
    </div>
  );
}
