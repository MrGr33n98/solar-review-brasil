'use client';

import { 
  UserIcon, 
  CheckCircleIcon, 
  DocumentTextIcon, 
  HandshakeIcon,
  ChevronRightIcon 
} from '@heroicons/react/24/outline';
import { CustomCard } from './custom-card';

interface Lead {
  name: string;
  project: string;
  date: string;
  status: 'Novo' | 'Qualificado' | 'Proposta' | 'Fechado';
}

const mockLeads: Lead[] = [
  { 
    name: 'João Silva',
    project: 'Residencial 5kWp',
    date: '2025-06-11',
    status: 'Novo'
  },
  { 
    name: 'Empresa ABC',
    project: 'Comercial 50kWp',
    date: '2025-06-10',
    status: 'Qualificado'
  },
  { 
    name: 'Maria Santos',
    project: 'Industrial 100kWp',
    date: '2025-06-09',
    status: 'Proposta'
  },
];

const funnelStages = [
  { name: 'Novos Interessados', count: 45, icon: UserIcon },
  { name: 'Qualificados', count: 28, icon: CheckCircleIcon },
  { name: 'Propostas em Andamento', count: 15, icon: DocumentTextIcon },
  { name: 'Fechados', count: 8, icon: HandshakeIcon },
];

const getStatusColor = (status: Lead['status']) => {
  switch (status) {
    case 'Novo': return 'bg-blue-100 text-blue-800';
    case 'Qualificado': return 'bg-green-100 text-green-800';
    case 'Proposta': return 'bg-yellow-100 text-yellow-800';
    case 'Fechado': return 'bg-purple-100 text-purple-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export function LeadIntentSection() {
  const handleLeadDetails = (leadName: string) => {
    console.log(`Visualizando detalhes do lead: ${leadName}`);
  };

  return (
    <CustomCard className="p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Funil de Vendas</h2>
      
      <div className="space-y-4">
        {funnelStages.map((stage, index) => (
          <div key={stage.name} className="relative">
            <div className="flex items-center bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200">
              <div className="p-2 bg-blue-100 rounded-full mr-4">
                <stage.icon className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{stage.name}</h3>
                <p className="text-sm text-gray-500">{stage.count} leads</p>
              </div>
              <div className="text-2xl font-bold text-blue-600">{stage.count}</div>
            </div>
            {index < funnelStages.length - 1 && (
              <div className="h-8 w-px bg-blue-200 absolute left-7 -bottom-4 transform translate-x-2"></div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Leads Recentes</h3>
        <div className="space-y-3">
          {mockLeads.map((lead) => (
            <div key={lead.name} 
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <div>
                <p className="font-medium text-gray-900">{lead.name}</p>
                <p className="text-sm text-gray-500">{lead.project}</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm text-gray-500">{new Date(lead.date).toLocaleDateString('pt-BR')}</p>
                  <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(lead.status)}`}>
                    {lead.status}
                  </span>
                </div>
                <button
                  onClick={() => handleLeadDetails(lead.name)}
                  className="p-1 hover:bg-gray-200 rounded-full transition-colors duration-200"
                >
                  <ChevronRightIcon className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <button className="mt-6 w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center font-medium">
          <UserIcon className="h-5 w-5 mr-2" />
          Atender Novas Intenções
        </button>
      </div>
    </CustomCard>
  );
}
