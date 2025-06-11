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
    // API call would go here to fetch data for the new period
    console.log('Período selecionado:', value);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <DashboardHeader
        selectedPeriod={selectedPeriod}
        onPeriodChange={handlePeriodChange}
        userName="Empresa Solar Exemplo"
      />
      
      <div className="flex-1 p-4 lg:p-6 space-y-6">
        {/* Metrics Section */}
        <section>
          <MetricCards metrics={mockMetrics} />
        </section>

        {/* Analytics Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CategoryDistribution categories={mockCategories} />
          <PerformanceSummary
            nps={72}
            totalReviews={256}
            avgRating={4.8}
            conversionRate="45.2% (+5.2%)"
          />
        </section>
      </div>
    </div>
  );
}
