'use client';

import { useState } from 'react';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { MetricCards, mockMetrics } from '@/components/dashboard/metric-cards';
import { CategoryDistribution, mockCategories } from '@/components/dashboard/category-distribution';
import { PerformanceSummary } from '@/components/dashboard/performance-summary';



export default function OverviewPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('12');

  const handlePeriodChange = (value: string) => {
    setSelectedPeriod(value);
    // Aqui você faria a chamada API para buscar dados para o novo período
    console.log('Período selecionado:', value);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200">
      <DashboardHeader
        selectedPeriod={selectedPeriod}
        onPeriodChange={handlePeriodChange}
        userName="Empresa Solar Exemplo"
      />
      <div className="mt-4 mx-6 border-b border-gray-200 pb-2">
        <button className="px-4 py-2 text-sm font-medium text-blue-600 border-b-2 border-blue-600">
          Visão Geral
        </button>
      </div>
      <div className="p-6 space-y-6">
        <MetricCards metrics={mockMetrics} />
        <CategoryDistribution categories={mockCategories} />
        <PerformanceSummary
          nps={72}
          totalReviews={256}
          avgRating={4.8}
          conversionRate="45.2% (+5.2%)"
        />
      </div>
    </div>
  );
}
