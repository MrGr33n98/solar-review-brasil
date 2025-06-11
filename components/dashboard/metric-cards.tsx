/** @jsxImportSource react */
'use client';

import * as React from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import {
  StarIcon,
  ChatBubbleBottomCenterTextIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';

export interface MetricCardProps {
  title: string;
  value: string | number;
  description?: string;
  Icon?: React.ElementType;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  actionMessage?: string;
  actionLink?: string;
}

export interface Metric extends MetricCardProps {}

export function MetricCard({
  title,
  value,
  description,
  Icon,
  trend,
  className,
  actionMessage,
  actionLink,
}: MetricCardProps): React.JSX.Element {
  const getBadgeDeltaColors = (isPositive: boolean) =>
    isPositive
      ? 'bg-emerald-100 text-emerald-800'
      : 'bg-rose-100 text-rose-800';

  return React.createElement(Card, {
    className: cn('p-6 transition-all hover:shadow-md', className),
  },
    [
      React.createElement(
        'div',
        {
          key: 'header',
          className: 'flex items-center justify-between mb-2',
        },
        [
          React.createElement(
            'h3',
            {
              key: 'title',
              className: 'text-sm font-medium text-gray-600',
            },
            title
          ),
          Icon &&
            React.createElement(Icon, {
              key: 'icon',
              className: 'h-6 w-6 text-blue-500',
            }),
        ]
      ),
      React.createElement(
        'p',
        {
          key: 'value',
          className: 'text-3xl font-bold text-gray-900',
        },
        value
      ),
      trend &&
        React.createElement(
          'span',
          {
            key: 'trend',
            className: cn(
              'px-2 py-1 text-xs font-semibold rounded-full inline-block mt-2',
              getBadgeDeltaColors(trend.isPositive)
            ),
          },
          [trend.isPositive ? '+' : '-', Math.abs(trend.value) + '%']
        ),
      description &&
        React.createElement(
          'p',
          {
            key: 'description',
            className: 'text-xs text-gray-500 mt-1',
          },
          description
        ),
      actionMessage &&
        React.createElement(
          'p',
          {
            key: 'action',
            className: 'text-xs text-blue-600 mt-2',
          },
          [
            actionMessage,
            ' ',
            actionLink &&
              React.createElement(
                'a',
                {
                  key: 'link',
                  href: actionLink,
                  className: 'underline',
                },
                'Saiba mais'
              ),
          ].filter(Boolean)
        ),
    ]
  );
}

interface MetricCardsProps {
  metrics: Metric[];
}

export function MetricCards({ metrics }: MetricCardsProps): React.JSX.Element {
  return React.createElement(
    'div',
    {
      className: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6',
    },
    metrics.map((metric) =>
      React.createElement(MetricCard, {
        key: metric.title,
        ...metric,
      })
    )
  );
}

export const mockMetrics: Metric[] = [
  {
    title: 'Total de Avaliações',
    value: '2.543',
    Icon: StarIcon,
    trend: { value: 12, isPositive: true },
    description: 'Últimos 30 dias',
  },
  {
    title: 'Nota Média',
    value: '4.8 ★',
    Icon: StarIcon,
    trend: { value: 8, isPositive: true },
    description: 'Aumento de 0.3 pontos',
  },
  {
    title: 'Taxa de Resposta',
    value: '98%',
    Icon: ChatBubbleBottomCenterTextIcon,
    trend: { value: 4, isPositive: true },
    description: 'Ótimo desempenho!',
  },
  {
    title: 'Taxa de Fechamento',
    value: '45%',
    Icon: CheckCircleIcon,
    trend: { value: 12, isPositive: false },
    description: 'Precisa de atenção',
    actionMessage: 'Dicas para melhorar',
    actionLink: '#',
  },
];
