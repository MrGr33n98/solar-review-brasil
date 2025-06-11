'use client';

import * as React from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface PerformanceDataPoint {
  name: string;
  avaliacoes: number;
  taxaResposta: number;
  satisfacao: number;
}

export interface PerformanceSummaryProps {
  nps: number;
  totalReviews: number;
  avgRating: number;
  conversionRate: string;
  className?: string;
}

export function PerformanceSummary({ 
  nps,
  totalReviews,
  avgRating,
  conversionRate,
  className 
}: PerformanceSummaryProps): React.JSX.Element {
  return React.createElement(Card, {
    className: cn('p-6', className)
  }, [
    React.createElement('div', {
      key: 'content',
      className: 'space-y-4'
    }, [
      React.createElement('div', { key: 'header' }, [
        React.createElement('h3', {
          className: 'font-semibold text-lg'
        }, 'Resumo de Performance'),
        React.createElement('p', {
          className: 'text-sm text-muted-foreground'
        }, 'Últimos 30 dias')
      ]),
      React.createElement('div', {
        key: 'metrics',
        className: 'grid grid-cols-2 gap-4'
      }, [
        React.createElement('div', {
          key: 'nps',
          className: 'space-y-1'
        }, [
          React.createElement('p', {
            className: 'text-sm text-gray-600'
          }, 'NPS Score'),
          React.createElement('p', {
            className: 'text-2xl font-bold'
          }, nps),
          React.createElement('div', {
            className: 'w-full bg-gray-200 rounded-full h-2.5'
          }, [
            React.createElement('div', {
              className: cn(
                'h-2.5 rounded-full',
                nps >= 70 ? 'bg-green-500' :
                nps >= 50 ? 'bg-yellow-500' :
                'bg-red-500'
              ),
              style: { width: `${(nps / 100) * 100}%` }
            })
          ])
        ]),
        React.createElement('div', {
          key: 'reviews',
          className: 'space-y-1'
        }, [
          React.createElement('p', {
            className: 'text-sm text-gray-600'
          }, 'Total de Avaliações'),
          React.createElement('p', {
            className: 'text-2xl font-bold'
          }, totalReviews)
        ]),
        React.createElement('div', {
          key: 'rating',
          className: 'space-y-1'
        }, [
          React.createElement('p', {
            className: 'text-sm text-gray-600'
          }, 'Avaliação Média'),
          React.createElement('p', {
            className: 'text-2xl font-bold'
          }, avgRating + ' ★')
        ]),
        React.createElement('div', {
          key: 'conversion',
          className: 'space-y-1'
        }, [
          React.createElement('p', {
            className: 'text-sm text-gray-600'
          }, 'Taxa de Conversão'),
          React.createElement('p', {
            className: 'text-2xl font-bold'
          }, conversionRate)
        ])
      ]),
      React.createElement('p', {
        key: 'insight',
        className: 'text-xs text-blue-600 mt-4'
      }, [
        'Seu NPS está excelente! Mantenha o bom trabalho. ',
        React.createElement('a', {
          key: 'link',
          href: '#melhorar-performance',
          className: 'underline'
        }, 'Ver análise detalhada')
      ])
    ])
  ]);
}

// Mock data for demonstration
const mockData: PerformanceDataPoint[] = [
  {
    name: "Jan",
    avaliacoes: 20,
    taxaResposta: 70,
    satisfacao: 80,
  },
  {
    name: "Fev",
    avaliacoes: 25,
    taxaResposta: 75,
    satisfacao: 82,
  },
  {
    name: "Mar",
    avaliacoes: 30,
    taxaResposta: 80,
    satisfacao: 85,
  },
  {
    name: "Abr",
    avaliacoes: 28,
    taxaResposta: 78,
    satisfacao: 83,
  },
  {
    name: "Mai",
    avaliacoes: 35,
    taxaResposta: 85,
    satisfacao: 88,
  },
  {
    name: "Jun",
    avaliacoes: 40,
    taxaResposta: 90,
    satisfacao: 90,
  },
];

export function DemoPerformanceSummary() {
  return <PerformanceSummary data={mockData} />;
}
