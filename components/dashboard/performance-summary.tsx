'use client';

import { StarIcon, ArrowDownIcon, ArrowUpIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import { CustomCard } from './custom-card';

interface PerformanceSummaryProps {
  nps?: number;
  totalReviews?: number;
  avgRating?: number;
  conversionRate?: string;
  starDistribution?: Record<number, number>;
}

export function PerformanceSummary({ 
  nps = 75, 
  totalReviews = 250, 
  avgRating = 4.5, 
  conversionRate = "45.2%",
  starDistribution = {
    5: 100,
    4: 80,
    3: 40,
    2: 20,
    1: 10,
  }
}: PerformanceSummaryProps) {
  const npsColor = nps >= 70 ? 'bg-emerald-500' : nps >= 50 ? 'bg-yellow-500' : 'bg-rose-500';
  const npsTextColor = nps >= 70 ? 'text-emerald-600' : nps >= 50 ? 'text-yellow-600' : 'text-rose-600';
  const npsDescription = nps >= 70 ? 'Excelente' : nps >= 50 ? 'Bom' : 'A melhorar';

  const maxStarCount = Math.max(...Object.values(starDistribution));
  const totalStars = Object.values(starDistribution).reduce((a, b) => a + b, 0);

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      {/* NPS Card */}
      <CustomCard className="p-4 sm:p-6">
        <h2 className="text-xl font-semibold text-gray-800">Net Promoter Score</h2>
        <div className="mt-4">
          <div className="flex items-baseline space-x-2">
            <span className="text-4xl font-bold text-gray-900">{nps}</span>
            <span className={`text-sm font-medium ${npsTextColor}`}>{npsDescription}</span>
          </div>
          <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={`h-full ${npsColor} rounded-full transition-transform`}
              style={{ transform: `scaleX(${nps / 100})` }}
            />
          </div>
          <p className={`mt-3 text-sm ${npsTextColor}`}>
            Sua satisfação com o comparador é excelente!
          </p>
          <button 
            onClick={() => console.log('Navegando para página de melhorias...')}
            className="mt-3 text-blue-600 hover:text-blue-700 text-sm font-medium inline-flex items-center group"
          >
            Saiba como melhorar
            <ArrowUpIcon className="ml-1 h-4 w-4 group-hover:transform group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </CustomCard>

      {/* Avaliações Card */}
      <CustomCard className="p-4 sm:p-6">
        <h2 className="text-xl font-semibold text-gray-800">Avaliações</h2>
        <div className="mt-4">
          <div className="flex items-baseline space-x-2">
            <span className="text-4xl font-bold text-gray-900">{avgRating}</span>
            <span className="text-sm text-gray-600">de 5 estrelas</span>
          </div>
          <p className="text-sm text-gray-500 mt-1">{totalReviews} avaliações no total</p>
          
          <div className="mt-4 space-y-2">
            {[5, 4, 3, 2, 1].map((stars) => (
              <div key={stars} className="flex items-center space-x-2">
                <div className="flex items-center w-20">
                  <span className="text-sm text-gray-600 mr-1">{stars}</span>
                  <StarIcon className="h-4 w-4 text-yellow-400" />
                </div>
                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-yellow-400 rounded-full transition-transform origin-left"
                    style={{ transform: `scaleX(${starDistribution[stars] / maxStarCount})` }}
                  />
                </div>
                <span className="text-sm text-gray-600 w-16 text-right">
                  {((starDistribution[stars] / totalStars) * 100).toFixed(0)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </CustomCard>

      {/* Taxa de Conversão Card */}
      <CustomCard className="p-4 sm:p-6">
        <h2 className="text-xl font-semibold text-gray-800">Taxa de Conversão</h2>
        <div className="mt-4">
          <div className="flex items-baseline space-x-2">
            <span className="text-4xl font-bold text-gray-900">{conversionRate}</span>
            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-800">
              +2.1%
            </span>
          </div>
          <p className="mt-3 text-sm text-gray-600">
            Taxa acima da média do setor de 40%
          </p>
          <div className="mt-4">
            <button 
              onClick={() => console.log('Navegando para análise de orçamentos...')}
              className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg text-sm font-medium inline-flex items-center group transition-colors duration-200"
            >
              <ChartBarIcon className="h-4 w-4 mr-2" />
              Analise orçamentos perdidos
            </button>
          </div>
        </div>
      </CustomCard>
    </div>
  );
}
