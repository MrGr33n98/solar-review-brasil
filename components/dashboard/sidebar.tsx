'use client';

import {
  HomeIcon,
  ChartBarIcon,
  StarIcon,
  RocketLaunchIcon,
  IdentificationIcon,
  PuzzlePieceIcon,
  CubeTransparentIcon,
} from '@heroicons/react/24/outline';

type NavItem = {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  subItems?: string[];
};

interface SidebarProps {
  activeTab: string;
  onTabChange: (id: string) => void;
}

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const navItems: NavItem[] = [
    { id: 'home', name: 'Home', icon: HomeIcon },
    { 
      id: 'analytics', 
      name: 'Analytics', 
      icon: ChartBarIcon, 
      subItems: ['Desempenho de Orçamentos', 'Tráfego do Perfil', 'Métricas de Engajamento'] 
    },
    { 
      id: 'reviews', 
      name: 'Avaliações', 
      icon: StarIcon, 
      subItems: ['Avaliações Recebidas', 'Solicitar Avaliação'] 
    },
    { id: 'leads', name: 'Dados de Intenção', icon: RocketLaunchIcon },
    { id: 'profile', name: 'Edição de Perfil/Produto', icon: IdentificationIcon },
    { id: 'integrations', name: 'Integrações', icon: PuzzlePieceIcon },
    { id: 'badges', name: 'Selos Comparador Solar', icon: CubeTransparentIcon },
  ];

  return (
    <nav className="w-64 bg-gray-50 border-r border-gray-200 p-4 space-y-2 hidden lg:block rounded-l-xl">
      <div className="flex items-center justify-center h-16 mb-6">
        <span className="text-2xl font-bold text-gray-800">SolarPro</span>
      </div>
      {navItems.map((item) => (
        <div key={item.id}>
          <button
            onClick={() => onTabChange(item.id)}
            className={`flex items-center w-full px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
              activeTab === item.id
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-700 hover:bg-gray-200 hover:text-gray-900'
            }`}
          >
            <item.icon className={`h-5 w-5 mr-3 ${activeTab === item.id ? 'text-white' : 'text-gray-500'}`} />
            {item.name}
          </button>
          {item.subItems && activeTab === item.id && (
            <ul className="ml-8 mt-1 space-y-1">
              {item.subItems.map((subItem) => (
                <li key={subItem}>
                  <a href="#" className="block px-3 py-1 text-xs text-gray-600 hover:text-blue-600 hover:underline">
                    {subItem}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </nav>
  );
}
