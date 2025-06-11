'use client';

import { DocumentCheckIcon, CurrencyDollarIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import { CustomCard } from './custom-card';

export const mockMetrics = [
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

type DeltaType = 'increase' | 'moderateIncrease' | 'decrease' | 'moderateDecrease' | 'unchanged';

interface MetricCardsProps {
  metrics: Array<{
    title: string;
    metric: string;
    icon: React.ComponentType<any>;
    delta: string;
    deltaType: DeltaType;
    description: string;
  }>;
}

export function MetricCards({ metrics }: MetricCardsProps) {
  const getBadgeDeltaColors = (deltaType: DeltaType) => {
    switch (deltaType) {
      case 'increase': return 'bg-emerald-100 text-emerald-800';
      case 'moderateIncrease': return 'bg-green-100 text-green-800';
      case 'decrease': return 'bg-rose-100 text-rose-800';
      case 'moderateDecrease': return 'bg-red-100 text-red-800';
      case 'unchanged': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {metrics.map((item) => (
        <CustomCard key={item.title} className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-600 font-medium text-sm">{item.title}</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{item.metric}</p>
            </div>
            <div className="p-2 bg-blue-100 rounded-full">
              <item.icon className="h-7 w-7 text-blue-600" />
            </div>
          </div>
          <div className="flex justify-start mt-4">
            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getBadgeDeltaColors(item.deltaType)}`}>
              {item.delta}
            </span>
            <p className="ml-2 text-gray-500 text-sm">{item.description}</p>
          </div>
        </CustomCard>
      ))}
    </div>
  );
}
