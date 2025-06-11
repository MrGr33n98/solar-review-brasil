'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  DocumentCheckIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';
import { DashboardHeader } from './dashboard-header';
import { MetricCards } from './metric-cards';
import { CategoryDistribution } from './category-distribution';
import { PerformanceSummary } from './performance-summary';
import { LeadIntentSection } from './lead-intent-section';
import { Sidebar } from './sidebar';

const mockCategories = [
  { name: 'Residencial', count: 145 },
  { name: 'Comercial', count: 85 },
  { name: 'Industrial', count: 23 },
  { name: 'Usinas Solares', count: 12 },
  { name: 'Manutenção', count: 56 },
  { name: 'Sistemas Off-Grid', count: 18 },
];

const mockMetrics = [
  {
    title: 'Orçamentos Solicitados',
    metric: '321',
    icon: DocumentCheckIcon,
    delta: '12.3%',
    deltaType: 'moderateIncrease',
    description: 'vs. período anterior',
  },
  {
    title: 'Propostas Aceitas',
    metric: '145',
    icon: UserGroupIcon,
    delta: '23.9%',
    deltaType: 'increase',
    description: 'de orçamentos para vendas fechadas',
  },
  {
    title: 'Valor Total Gerado',
    metric: 'R$ 2.4M',
    icon: CurrencyDollarIcon,
    delta: '10.1%',
    deltaType: 'moderateIncrease',
    description: 'em projetos solares',
  },
];

const getContextualMessage = (metrics: typeof mockMetrics) => {
  const messages = [
    'Seu perfil está gerando muitas oportunidades! Continue otimizando.',
    'Você tem 3 novas avaliações aguardando resposta! Interaja para melhorar seu score.',
    'Identificamos oportunidades para melhorar sua taxa de conversão. Analise os orçamentos perdidos!',
    'Sua categoria Residencial está em alta! Considere expandir para Comercial.',
  ];

  // Simulando lógica contextual (em produção, isso seria baseado nos dados reais)
  const randomIndex = Math.floor(Math.random() * messages.length);
  return messages[randomIndex];
};

export default function DashboardOverview() {
  const [selectedPeriod, setSelectedPeriod] = useState('1');
  const contextualMessage = getContextualMessage(mockMetrics);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 pb-4">
        <div className="mx-1 sm:mx-2">
          <DashboardHeader
            selectedPeriod={selectedPeriod}
            onPeriodChange={setSelectedPeriod}
            userName="Empresa Solar"
            insightMessage={contextualMessage}
          />

          <div className="grid gap-3 mt-3">
            <MetricCards metrics={mockMetrics} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              <CategoryDistribution categories={mockCategories} />
              <PerformanceSummary />
            </div>

            <LeadIntentSection />
          </div>
        </div>
      </main>
    </div>
  );
}
