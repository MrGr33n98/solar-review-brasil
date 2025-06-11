'use client';

import { ReactNode, useState } from 'react';
import { cn } from '@/lib/utils';
import { DashboardNav } from '@/components/dashboard/nav';
import { DashboardHeader } from '@/components/dashboard/header';
import { TopMetrics } from '@/components/dashboard/metric-cards';
import { PerformanceSummary } from '@/components/dashboard/performance-summary';
import { CategoryDistribution } from '@/components/dashboard/category-distribution';
import { dashboardConfig } from '@/config/dashboard';

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [selectedPeriod, setSelectedPeriod] = useState('30');

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <div className="flex h-full relative">
        <DashboardNav items={dashboardConfig.sidebarNav} />
        <div className="flex-1 flex flex-col min-h-screen">
          <main className="flex-1 overflow-y-auto py-4">
            <div className="mx-4 bg-white rounded-xl shadow-lg border border-gray-200">
              <DashboardHeader
                selectedPeriod={selectedPeriod}
                onPeriodChange={setSelectedPeriod}
                userName="Solar Brasil"
                dynamicMessage="Acompanhe seu desempenho no Comparador Solar."
              />
              <div className="p-6 space-y-6">
                <TopMetrics />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <CategoryDistribution />
                  <PerformanceSummary />
                </div>
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
