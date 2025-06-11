'use client';

import * as React from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface Category {
  name: string;
  count: number;
  color?: string;
}

interface CategoryDistributionProps {
  categories: Category[];
  className?: string;
}

export function CategoryDistribution({ categories = [], className }: CategoryDistributionProps): React.JSX.Element {
  const totalCount = React.useMemo(() => 
    categories.reduce((sum, cat) => sum + cat.count, 0),
    [categories]
  );

  return React.createElement(Card, {
    className: cn('p-6', className)
  }, [
    React.createElement('div', {
      key: 'header',
      className: 'flex items-center justify-between mb-6'
    }, [
      React.createElement('div', { key: 'title' }, [
        React.createElement('h2', {
          className: 'text-lg font-semibold text-gray-800'
        }, 'Tipos de Instalação'),
        React.createElement('p', {
          className: 'text-gray-500 text-xs'
        }, 'Distribuição de orçamentos por categoria')
      ])
    ]),
    React.createElement('div', {
      key: 'categories',
      className: 'space-y-4'
    }, categories
      .sort((a, b) => b.count - a.count)
      .map((category) => {
        const percentage = ((category.count / totalCount) * 100).toFixed(1);
        return React.createElement('div', {
          key: category.name,
          className: 'space-y-2'
        }, [
          React.createElement('div', {
            key: 'info',
            className: 'flex justify-between items-center mb-1'
          }, [
            React.createElement('span', {
              className: 'text-sm font-medium'
            }, category.name),
            React.createElement('span', {
              className: 'text-sm text-muted-foreground'
            }, `${category.count} (${percentage}%)`)
          ]),
          React.createElement('div', {
            key: 'progress',
            className: 'grid grid-cols-100 h-2'
          }, [
            React.createElement('div', {
              className: cn(
                'col-span-full h-2 rounded-full bg-gray-100 overflow-hidden'
              ),
              children: React.createElement('div', {
                className: cn(
                  'h-full transition-all duration-500 rounded-full',
                  category.color || 'bg-blue-500'
                ),
                style: { gridColumnEnd: Math.round(parseFloat(percentage)) }
              })
            })
          ])
        ]);
      })
    ),
    React.createElement('p', {
      key: 'insight',
      className: 'text-xs text-blue-600 mt-4'
    }, [
      'Insight: Projetos residenciais representam sua maior demanda. ',
      React.createElement('a', {
        key: 'insight-link',
        href: '#otimizar-campanhas',
        className: 'underline'
      }, 'Ver dicas de marketing')
    ])
  ]);
}

export const mockCategories: Category[] = [
  {
    name: 'Residencial',
    count: 145,
    color: 'bg-blue-500'
  },
  {
    name: 'Comercial',
    count: 85,
    color: 'bg-green-500'
  },
  {
    name: 'Industrial',
    count: 32,
    color: 'bg-yellow-500'
  },
  {
    name: 'Rural',
    count: 28,
    color: 'bg-purple-500'
  },
];
