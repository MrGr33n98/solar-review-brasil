'use client';

import { useMemo } from 'react';
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

  return (
    <CustomCard className="p-6">
      <h2 className="text-xl font-semibold text-gray-800">Tipos de Instalação/Serviços Solares</h2>
      <p className="text-gray-500 mb-4 text-sm">Número de orçamentos por categoria principal.</p>
      <div className="mt-6 space-y-4">
        {categories.map((category) => (
          <div key={category.name} className="flex items-center">
            <p className="w-1/3 text-gray-700 font-medium text-sm">{category.name}</p>
            <div className="w-2/3 ml-4 flex items-center">
              <div className="h-3 bg-blue-500 rounded-full" style={{ width: `${(category.count / totalCategoryCount) * 100}%` }}></div>
              <p className="ml-2 text-gray-800 font-semibold text-sm">{category.count} orçamentos</p>
            </div>
          </div>
        ))}
      </div>
    </CustomCard>
  );
}
