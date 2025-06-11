'use client';

import { useMemo } from 'react';
import { CogIcon } from '@heroicons/react/24/outline';
import { CustomCard } from './custom-card';

interface CategoryDistributionProps {
  categories: Array<{
    name: string;
    count: number;
  }>;
}

export function CategoryDistribution({ categories }: CategoryDistributionProps) {
  const totalCount = useMemo(() => 
    categories.reduce((sum, cat) => sum + cat.count, 0), 
    [categories]
  );

  const handleOptimizeCategory = (category: string) => {
    console.log(`Otimizando categoria: ${category}`);
  };

  return (
    <CustomCard className="p-4 sm:p-6">
      <h2 className="text-xl font-semibold text-gray-800">Tipos de Instalação/Serviços Solares</h2>
      <p className="text-gray-500 mb-4 text-sm">Número de orçamentos por categoria principal.</p>
      
      <div className="space-y-3">
        {categories.map((category) => {
          const percentage = ((category.count / totalCount) * 100).toFixed(1);
          
          return (
            <div key={category.name} className="group">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-700 font-medium text-sm">{category.name}</span>
                  <button
                    onClick={() => handleOptimizeCategory(category.name)}
                    className="p-1 rounded-full opacity-0 group-hover:opacity-100 hover:bg-gray-100 transition-all duration-200"
                    title="Otimizar categoria"
                  >
                    <CogIcon className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-800 font-semibold text-sm">
                    {category.count}
                  </span>
                  <span className="text-gray-500 text-sm">
                    ({percentage}%)
                  </span>
                </div>
              </div>
              
              <div className="relative h-2">
                <div className="absolute inset-0 bg-gray-200 rounded-full"></div>
                <div 
                  className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full transition-transform origin-left"
                  style={{ transform: `scaleX(${Number(percentage) / 100})` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </CustomCard>
  );
}
