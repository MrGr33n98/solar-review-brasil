'use client';

import { format, subMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ArrowDownTrayIcon, SunIcon } from '@heroicons/react/24/outline';

interface DashboardHeaderProps {
  selectedPeriod: string;
  onPeriodChange: (value: string) => void;
  userName: string;
  insightMessage?: string;
}

const getWelcomeMessage = () => {
  const currentHour = new Date().getHours();
  if (currentHour < 12) return 'Bom dia';
  if (currentHour < 18) return 'Boa tarde';
  return 'Boa noite';
};

export function DashboardHeader({ 
  selectedPeriod, 
  onPeriodChange, 
  userName,
  insightMessage 
}: DashboardHeaderProps) {
  const periodStart = format(subMonths(new Date(), parseInt(selectedPeriod)), 'PPP', { locale: ptBR });

  return (
    <div className="px-6 py-4 border-b border-gray-200">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-blue-100 rounded-full animate-pulse">
            <SunIcon className="h-5 w-5 text-blue-600 transform transition-transform hover:rotate-180 duration-700" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              {getWelcomeMessage()}, <span className="text-blue-600">{userName}</span>!
            </h1>
            <p className="text-gray-500 text-sm mt-0.5 animate-fade-in">
              {insightMessage || 'Seu desempenho está excelente no Comparador Solar!'}
            </p>
            <p className="text-gray-400 text-sm">Dados desde {periodStart}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <select
            value={selectedPeriod}
            onChange={(e) => onPeriodChange(e.target.value)}          
            className="w-full sm:w-[180px] px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700 shadow-sm transition-all duration-200 hover:border-blue-400"
          >
            <option value="1">Último mês</option>
            <option value="3">Últimos 3 meses</option>
            <option value="6">Últimos 6 meses</option>
            <option value="12">Últimos 12 meses</option>
          </select>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white text-sm rounded-lg shadow-sm hover:bg-blue-700 transition-all duration-200 whitespace-nowrap group">
            <ArrowDownTrayIcon className="h-5 w-5 group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
