'use client';

import { useMemo } from 'react';
import { CogIcon } from '@heroicons/react/24/outline';
import { CustomCard } from './custom-card';

export const mockCategories = [
  { name: 'Residencial', count: 145 },
  { name: 'Comercial', count: 85 },
  { name: 'Industrial', count: 23 },
  { name: 'Usinas Solares', count: 12 },
  { name: 'Manutenção', count: 56 },
  { name: 'Sistemas Off-Grid', count: 18 },
];

interface CategoryDistributionProps {
  categories: Array<{
    name: string;
    count: number;
  }>;
}

export function CategoryDistribution({ categories }: CategoryDistributionProps) {
  const totalCategoryCount = useMemo(() =>
    categories.reduce((sum, cat) => sum + cat.count, 0),
    [categories]
  );

  const handleOptimizeCategory = (category: string) => {
    console.log(`Otimizando categoria: ${category}`);
  };

  return (
    <CustomCard className="p-6">
      <h2 className="text-xl font-semibold text-gray-800">Tipos de Instalação/Serviços Solares</h2>
      <p className="text-gray-500 mb-4 text-sm">Número de orçamentos por categoria principal.</p>
      <div className="mt-6 space-y-4">
        {categories.map((category) => {
          const percentage = ((category.count / totalCategoryCount) * 100).toFixed(1);
          return (
            <div key={category.name} className="flex items-center group">
              <div className="w-1/3 flex items-center">
                <p className="text-gray-700 font-medium text-sm">{category.name}</p>
                <button 
                  onClick={() => handleOptimizeCategory(category.name)}
                  className="ml-2 p-1 rounded-full opacity-0 group-hover:opacity-100 hover:bg-gray-100 transition-all duration-200"
                  title="Otimizar categoria"
                >
                  <CogIcon className="h-4 w-4 text-gray-600" />
                </button>
              </div>
              <div className="w-2/3 ml-4">
                <div className="relative flex items-center">
                  <div className="flex-1">
                    {/* Base bar */}
                    <div className="h-3 bg-gray-100 rounded-full w-full" />
                    {/* Progress overlay */}
                    <div
                      className="absolute top-0 left-0 h-3 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full transition-transform duration-300 origin-left"
                      style={{ transform: `scaleX(${Number(percentage) / 100})` }}
                    />
                  </div>
                  <p className="ml-3 text-gray-800 font-semibold text-sm whitespace-nowrap">
                    {category.count} orçamentos ({percentage}%)
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </CustomCard>
  );
}
