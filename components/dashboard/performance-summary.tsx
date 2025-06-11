'use client';

import { CustomCard } from './custom-card';

interface PerformanceSummaryProps {
  nps: number;
  totalReviews: number;
  avgRating: number;
  conversionRate: string;
}

export function PerformanceSummary({ nps, totalReviews, avgRating, conversionRate }: PerformanceSummaryProps) {
  const npsColor = nps >= 70 ? 'bg-emerald-500' : nps >= 50 ? 'bg-yellow-500' : 'bg-rose-500';
  const npsTextColor = nps >= 70 ? 'text-emerald-600' : nps >= 50 ? 'text-yellow-600' : 'text-rose-600';
  const npsDescription = nps >= 70 ? 'Excelente' : nps >= 50 ? 'Bom' : 'A melhorar';

  const getBadgeDeltaColors = (deltaType: 'increase' | 'decrease') => {
    return deltaType === 'increase' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800';
  };

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {/* NPS Card */}
      <CustomCard className="p-6">
        <h2 className="text-xl font-semibold text-gray-800">Net Promoter Score</h2>
        <p className="text-gray-500 mt-1 text-sm">Sua satisfação com o comparador.</p>
        <div className="mt-4 text-center">
          <p className="text-5xl font-bold text-gray-900">{nps}</p>
          <div className="w-full bg-gray-200 rounded-full h-3 mt-4">
            <div className={`h-full rounded-full ${npsColor}`} style={{ width: `${nps}%` }}></div>
          </div>
          <p className={`mt-2 font-semibold text-sm ${npsTextColor}`}>{npsDescription}</p>
        </div>
      </CustomCard>

      {/* Avaliações Card */}
      <CustomCard className="p-6">
        <h2 className="text-xl font-semibold text-gray-800">Avaliações</h2>
        <p className="text-gray-500 mt-1 text-sm">Feedback dos seus clientes.</p>
        <div className="mt-4 space-y-4">
          <div>
            <p className="text-gray-600 text-sm">Total de Avaliações</p>
            <p className="text-3xl font-bold text-gray-900">{totalReviews}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Nota Média</p>
            <p className="text-3xl font-bold text-gray-900">
              {avgRating} <span className="text-yellow-500">★</span>
            </p>
          </div>
        </div>
      </CustomCard>

      {/* Taxa de Conversão Card */}
      <CustomCard className="p-6">
        <h2 className="text-xl font-semibold text-gray-800">Taxa de Conversão</h2>
        <p className="text-gray-500 mt-1 text-sm">Eficiência de orçamentos para vendas.</p>
        <div className="mt-4 text-center">
          <p className="text-5xl font-bold text-gray-900">{conversionRate}</p>
          <span className={`mt-4 px-3 py-1 text-sm font-semibold rounded-full ${getBadgeDeltaColors(conversionRate.includes('+') ? 'increase' : 'decrease')}`}>
            {conversionRate.includes('+') ? 'Melhora' : 'Variação'}
          </span>
          <p className="mt-2 text-gray-500 text-sm">De orçamentos para vendas fechadas</p>
        </div>
      </CustomCard>
    </div>
  );
}
