'use client';

import { format, subMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';

interface DashboardHeaderProps {
  selectedPeriod: string;
  onPeriodChange: (value: string) => void;
  userName: string;
}

export function DashboardHeader({ selectedPeriod, onPeriodChange, userName }: DashboardHeaderProps) {
  const periodStart = format(subMonths(new Date(), parseInt(selectedPeriod)), 'PPP', { locale: ptBR });

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 bg-white rounded-t-xl border-b border-gray-200">
      <div className="mb-4 sm:mb-0">
        <h1 className="text-3xl font-bold text-gray-900">
          Olá, <span className="text-blue-600">{userName}</span>!
        </h1>
        <p className="text-gray-500 mt-1 text-md">
          Acompanhe seu desempenho no <span className="font-semibold">Comparador Solar</span>.
        </p>
        <p className="text-gray-400 text-sm mt-0.5">Dados a partir de {periodStart}</p>
      </div>
      <div className="flex items-center space-x-4">
        <select
          value={selectedPeriod}
          onChange={(e) => onPeriodChange(e.target.value)}
          className="w-[180px] sm:w-[200px] p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700 shadow-sm"
        >
          <option value="1">Último mês</option>
          <option value="3">Últimos 3 meses</option>
          <option value="6">Últimos 6 meses</option>
          <option value="12">Últimos 12 meses</option>
        </select>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200 whitespace-nowrap">
          <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
          Exportar PDF
        </button>
      </div>
    </div>
  );
}
