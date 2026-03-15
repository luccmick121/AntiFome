'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  TrendingUp,
  Users,
  Share2,
  Copy,
  Check,
  Zap,
} from 'lucide-react';

const TOTAL_FAMILIAS = 1294950;
const EFICIENCIA_ATUAL = 70;

function formatarNumero(num: number): string {
  return Math.round(num).toLocaleString('pt-BR');
}

export default function SimuladorPage() {
  const [eficiencia, setEficiencia] = useState(EFICIENCIA_ATUAL);
  const [copiado, setCopiado] = useState(false);
  const [animando, setAnimando] = useState(false);

  const atendidasAtual = TOTAL_FAMILIAS * (EFICIENCIA_ATUAL / 100);
  const atendidasNova = TOTAL_FAMILIAS * (eficiencia / 100);
  const familiasAdicionais = atendidasNova - atendidasAtual;
  const ganhoPercentual = eficiencia - EFICIENCIA_ATUAL;

  useEffect(() => {
    setAnimando(true);
    const timer = setTimeout(() => setAnimando(false), 300);
    return () => clearTimeout(timer);
  }, [eficiencia]);

  const handleCompartilhar = async () => {
    const texto = `Se a eficiência do programa Antifome aumentar de ${EFICIENCIA_ATUAL}% para ${eficiencia}%, são ${formatarNumero(familiasAdicionais)} famílias a mais atendidas no RS sem gastar um real extra. #AntifomeRS #SegurançaAlimentar`;

    try {
      await navigator.clipboard.writeText(texto);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch (err) {
      console.error('Erro ao copiar:', err);
    }
  };

  const getCorFamilias = () => {
    if (familiasAdicionais > 150000) return 'text-green-600';
    if (familiasAdicionais > 50000) return 'text-blue-600';
    if (familiasAdicionais > 0) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <Badge className="mb-4 bg-[#B71C1C] text-white">Hackathon Antifome RS</Badge>
        <h1 className="text-4xl md:text-5xl font-bold text-[#1A2F23] mb-3">
          Simulador de Impacto
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          Descubra quantas famílias podem ser a mais atendidas com ganhos de eficiência
        </p>
      </div>

      {/* Main Simulator Card */}
      <Card className="w-full max-w-4xl shadow-xl">
        <CardContent className="p-8">
          {/* Slider Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-500">Eficiência Atual</p>
                <p className="text-2xl font-bold text-gray-400">{EFICIENCIA_ATUAL}%</p>
              </div>
              <Zap className="w-8 h-8 text-[#B71C1C]" />
              <div className="text-right">
                <p className="text-sm text-gray-500">Nova Eficiência</p>
                <p className="text-2xl font-bold text-[#1A2F23]">{eficiencia}%</p>
              </div>
            </div>

            {/* Slider */}
            <div className="relative">
              <input
                type="range"
                min={EFICIENCIA_ATUAL}
                max={100}
                value={eficiencia}
                onChange={(e) => setEficiencia(parseInt(e.target.value))}
                className="w-full h-3 bg-gray-200 rounded-full appearance-none cursor-pointer
                  [&::-webkit-slider-thumb]:appearance-none
                  [&::-webkit-slider-thumb]:w-8
                  [&::-webkit-slider-thumb]:h-8
                  [&::-webkit-slider-thumb]:rounded-full
                  [&::-webkit-slider-thumb]:bg-[#1A2F23]
                  [&::-webkit-slider-thumb]:shadow-lg
                  [&::-webkit-slider-thumb]:cursor-pointer
                  [&::-webkit-slider-thumb]:border-4
                  [&::-webkit-slider-thumb]:border-white"
                style={{
                  background: `linear-gradient(to right, #1A2F23 0%, #1A2F23 ${((eficiencia - EFICIENCIA_ATUAL) / (100 - EFICIENCIA_ATUAL)) * 100}%, #e5e7eb ${((eficiencia - EFICIENCIA_ATUAL) / (100 - EFICIENCIA_ATUAL)) * 100}%, #e5e7eb 100%)`,
                }}
              />
              <div className="flex justify-between mt-2 text-sm text-gray-400">
                <span>{EFICIENCIA_ATUAL}%</span>
                <span>85%</span>
                <span>100%</span>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className={`transition-all duration-300 ${animando ? 'scale-105' : 'scale-100'}`}>
              <CardContent className="p-6 text-center">
                <Users className="w-8 h-8 text-[#1A2F23] mx-auto mb-2" />
                <p className="text-sm text-gray-500 mb-1">Famílias Atendidas (atual)</p>
                <p className="text-3xl font-bold text-gray-400">
                  {formatarNumero(atendidasAtual)}
                </p>
              </CardContent>
            </Card>

            <Card className={`transition-all duration-300 border-[#1A2F23] ${animando ? 'scale-105' : 'scale-100'}`}>
              <CardContent className="p-6 text-center">
                <TrendingUp className="w-8 h-8 text-[#1A2F23] mx-auto mb-2" />
                <p className="text-sm text-gray-500 mb-1">Famílias Atendidas (nova)</p>
                <p className="text-3xl font-bold text-[#1A2F23]">
                  {formatarNumero(atendidasNova)}
                </p>
              </CardContent>
            </Card>

            <Card className={`transition-all duration-300 bg-green-50 border-green-200 ${animando ? 'scale-105' : 'scale-100'}`}>
              <CardContent className="p-6 text-center">
                <div className="text-3xl mb-2">📈</div>
                <p className="text-sm text-green-600 mb-1">Famílias Adicionais</p>
                <p className={`text-3xl font-bold ${getCorFamilias()}`}>
                  +{formatarNumero(familiasAdicionais)}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Visual Comparison */}
          <div className="mb-8">
            <p className="text-sm text-gray-500 mb-3 text-center">Comparativo Visual</p>
            <div className="flex items-end justify-center gap-8 h-40">
              <div className="flex flex-col items-center">
                <div
                  className="w-24 bg-gray-300 rounded-t-lg transition-all duration-500"
                  style={{ height: `${(EFICIENCIA_ATUAL / 100) * 120}px` }}
                />
                <p className="mt-2 text-sm font-medium">Atual</p>
                <p className="text-xs text-gray-500">{EFICIENCIA_ATUAL}%</p>
              </div>
              <div className="flex flex-col items-center">
                <div
                  className="w-24 bg-[#1A2F23] rounded-t-lg transition-all duration-500"
                  style={{ height: `${(eficiencia / 100) * 120}px` }}
                />
                <p className="mt-2 text-sm font-medium">Novo</p>
                <p className="text-xs text-gray-500">{eficiencia}%</p>
              </div>
            </div>
          </div>

          {/* Impact Statement */}
          <div className="text-center p-6 bg-gradient-to-r from-[#1A2F23] to-[#2E7D32] rounded-xl text-white mb-6">
            <p className="text-xl md:text-2xl font-bold leading-relaxed">
              {familiasAdicionais > 0 ? (
                <>
                  Se a eficiência aumentar de {EFICIENCIA_ATUAL}% para {eficiencia}%,
                  são{' '}
                  <span className="text-yellow-300 text-3xl">
                    {formatarNumero(familiasAdicionais)} famílias a mais
                  </span>{' '}
                  atendidas sem gastar um real extra.
                </>
              ) : (
                <>Ajuste o slider para simular ganhos de eficiência.</>
              )}
            </p>
          </div>

          {/* Share Button */}
          <div className="flex justify-center">
            <Button
              onClick={handleCompartilhar}
              className="bg-[#1A2F23] hover:bg-[#2E7D32] px-8 py-6 text-lg"
              disabled={familiasAdicionais <= 0}
            >
              {copiado ? (
                <>
                  <Check className="w-5 h-5 mr-2" />
                  Copiado!
                </>
              ) : (
                <>
                  <Share2 className="w-5 h-5 mr-2" />
                  Compartilhar Resultado
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <p className="mt-8 text-sm text-gray-500 text-center max-w-md">
        Baseado em {formatarNumero(TOTAL_FAMILIAS)} famílias cadastradas no RS
        (CadÚnico 2024)
      </p>
    </div>
  );
}
