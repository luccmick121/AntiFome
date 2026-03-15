'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface RecommendationsProps {
  recomendacoes: string[];
}

export function Recommendations({ recomendacoes }: RecommendationsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <span>💡</span> Recomendações
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {recomendacoes.map((rec, index) => (
            <li
              key={index}
              className={`text-sm p-2 rounded-md ${
                rec.includes('Parabéns')
                  ? 'bg-green-50 text-green-800 border border-green-200'
                  : 'bg-blue-50 text-blue-800 border border-blue-200'
              }`}
            >
              {rec.includes('Parabéns') ? '✅' : '📌'} {rec}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
