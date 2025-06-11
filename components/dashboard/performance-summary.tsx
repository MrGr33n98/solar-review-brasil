'use client';

import { ArrowDownIcon, ArrowUpIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import { CustomCard } from './custom-card';

interface PerformanceSummaryProps {
  nps: number;
  totalReviews: number;
  avgRating: number;
  conversionRate: string;
  starDistribution?: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

export function PerformanceSummary({ 
  nps, 
  totalReviews, 
  avgRating, 
  conversionRate,
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

  const handleImprovementClick = () => {
    console.log('Navegando para página de melhorias...');
  };

  const handleAnalysisClick = () => {
    console.log('Navegando para análise de orçamentos perdidos...');
  };

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {/* NPS Card */}
      <CustomCard className="p-6">
        <h2 className="text-xl font-semibold text-gray-800">Net Promoter Score</h2>
        <p className="text-gray-500 mt-1 text-sm">Sua satisfação com o comparador.</p>
        <div className="mt-4 text-center">
          <p className="text-5xl font-bold text-gray-900">{nps}</p>
          <div className="relative w-full bg-gray-200 rounded-full h-3 mt-4">
            <div 
              className={`absolute top-0 left-0 h-3 rounded-full transition-transform duration-300 origin-left ${npsColor}`}
              style={{ transform: `scaleX(${Math.min(nps, 100) / 100})` }}
            />
          </div>
          <p className={`mt-2 font-semibold text-sm ${npsTextColor}`}>{npsDescription}</p>
          <p className={`mt-3 text-sm ${npsTextColor}`}>
            Sua satisfação com o comparador é {npsDescription.toLowerCase()}!
          </p>
          <button 
            onClick={handleImprovementClick}
            className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium underline"
          >
            Saiba como melhorar
          </button>
        </div>
      </CustomCard>

      {/* Avaliações Card */}
      <CustomCard className="p-6">
        <h2 className="text-xl font-semibold text-gray-800">Avaliações</h2>
        <p className="text-gray-500 mt-1 text-sm">Feedback dos seus clientes.</p>
        <div className="mt-4 space-y-2">
          <div className="flex justify-between items-center">
            <p className="text-3xl font-bold text-gray-900">
              {avgRating} <span className="text-yellow-500">★</span>
            </p>
            <p className="text-gray-600 text-sm">{totalReviews} avaliações</p>
          </div>
          
          <div className="space-y-2 mt-4">
            {[5, 4, 3, 2, 1].map((stars) => (
              <div key={stars} className="flex items-center gap-2">
                <span className="text-sm text-gray-600 w-3">{stars}</span>
                <span className="text-yellow-500 w-4">★</span>
                <div className="relative flex-1 h-2">
                  {/* Base bar */}
                  <div className="h-full bg-gray-100 rounded-full w-full" />
                  {/* Progress overlay */}
                  <div
                    className="absolute top-0 left-0 h-full bg-yellow-400 rounded-full transition-transform duration-300 origin-left"
                    style={{ transform: `scaleX(${starDistribution[stars as keyof typeof starDistribution] / maxStarCount})` }}
                  />
                </div>
                <span className="text-sm text-gray-600 w-10">
                  {starDistribution[stars as keyof typeof starDistribution]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CustomCard>

      {/* Taxa de Conversão Card */}
      <CustomCard className="p-6">
        <h2 className="text-xl font-semibold text-gray-800">Taxa de Conversão</h2>
        <p className="text-gray-500 mt-1 text-sm">Eficiência de orçamentos para vendas.</p>
        <div className="mt-4 text-center">
          <p className="text-5xl font-bold text-gray-900">{conversionRate}</p>
          <div className="mt-4 flex items-center justify-center">
            <span className={`px-3 py-1 text-sm font-semibold rounded-full flex items-center ${
              conversionRate.includes('+') ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
            }`}>
              {conversionRate.includes('+') ? (
                <ArrowUpIcon className="h-4 w-4 mr-1" />
              ) : (
                <ArrowDownIcon className="h-4 w-4 mr-1" />
              )}
              {conversionRate.includes('+') ? 'Melhora' : 'Queda'}
            </span>
          </div>
          <p className="mt-4 text-sm text-gray-600">
            Analise orçamentos perdidos para otimizar!
          </p>
          <button 
            onClick={handleAnalysisClick}
            className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium underline flex items-center justify-center mx-auto"
          >
            <ChartBarIcon className="h-4 w-4 mr-1" />
            Analise orçamentos perdidos
          </button>
        </div>
      </CustomCard>
    </div>
  );
}
