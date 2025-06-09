import { Shield, Award, CheckCircle, Star, Users, Calendar, Zap, Globe } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export interface VerificationBadge {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  bgColor: string;
  criteria: string[];
}

export const verificationBadges: VerificationBadge[] = [
  {
    id: 'verified_company',
    name: 'Empresa Verificada',
    description: 'Empresa com documentação e dados verificados pela nossa equipe',
    icon: Shield,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    criteria: [
      'CNPJ válido e ativo',
      'Documentação empresarial verificada',
      'Endereço confirmado',
      'Contatos validados'
    ]
  },
  {
    id: 'top_rated',
    name: 'Melhor Avaliada',
    description: 'Entre as empresas com melhor avaliação da plataforma',
    icon: Star,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
    criteria: [
      'Avaliação média acima de 4.5',
      'Mínimo de 50 avaliações',
      'Menos de 5% de avaliações negativas',
      'Resposta ativa às avaliações'
    ]
  },
  {
    id: 'experienced',
    name: 'Experiente',
    description: 'Empresa com longa trajetória no mercado de energia solar',
    icon: Calendar,
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    criteria: [
      'Mais de 5 anos no mercado',
      'Histórico comprovado de instalações',
      'Equipe técnica certificada',
      'Projetos documentados'
    ]
  },
  {
    id: 'high_volume',
    name: 'Alto Volume',
    description: 'Empresa com grande número de instalações realizadas',
    icon: Users,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
    criteria: [
      'Mais de 500 instalações',
      'Equipe com mais de 10 profissionais',
      'Atendimento em múltiplas cidades',
      'Capacidade de projetos grandes'
    ]
  },
  {
    id: 'certified',
    name: 'Certificada',
    description: 'Possui certificações técnicas e de qualidade reconhecidas',
    icon: Award,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
    criteria: [
      'Certificação INMETRO',
      'Profissionais com NR-35',
      'Certificação de qualidade ISO',
      'Treinamentos atualizados'
    ]
  },
  {
    id: 'fast_response',
    name: 'Resposta Rápida',
    description: 'Empresa com excelente tempo de resposta aos clientes',
    icon: Zap,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-100',
    criteria: [
      'Resposta em até 2 horas',
      'Atendimento 6 dias por semana',
      'Chat online disponível',
      'Suporte pós-venda ativo'
    ]
  },
  {
    id: 'nationwide',
    name: 'Atuação Nacional',
    description: 'Empresa com cobertura em múltiplos estados',
    icon: Globe,
    color: 'text-teal-600',
    bgColor: 'bg-teal-100',
    criteria: [
      'Atendimento em 5+ estados',
      'Rede de parceiros locais',
      'Logística nacional',
      'Suporte regionalizado'
    ]
  },
  {
    id: 'quality_guarantee',
    name: 'Garantia Estendida',
    description: 'Oferece garantias superiores aos padrões do mercado',
    icon: CheckCircle,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-100',
    criteria: [
      'Garantia mínima de 10 anos',
      'Seguro de performance',
      'Manutenção preventiva inclusa',
      'Monitoramento remoto'
    ]
  }
];

interface VerificationBadgesProps {
  badges: string[];
  size?: 'sm' | 'md' | 'lg';
  showTooltip?: boolean;
  maxVisible?: number;
}

export function VerificationBadges({ 
  badges, 
  size = 'md', 
  showTooltip = true, 
  maxVisible = 4 
}: VerificationBadgesProps) {
  const sizeClasses = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5'
  };

  const badgeSize = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs px-2 py-1',
    lg: 'text-sm px-3 py-1'
  };

  const validBadges = verificationBadges.filter(badge => badges.includes(badge.id));
  const visibleBadges = validBadges.slice(0, maxVisible);
  const hiddenCount = validBadges.length - maxVisible;

  if (validBadges.length === 0) return null;

  return (
    <TooltipProvider>
      <div className="flex flex-wrap gap-1">
        {visibleBadges.map((badge) => {
          const IconComponent = badge.icon;
          
          const BadgeContent = (
            <Badge 
              variant="secondary" 
              className={`${badgeSize[size]} ${badge.bgColor} ${badge.color} border-0 font-medium`}
            >
              <IconComponent className={`${sizeClasses[size]} mr-1`} />
              {badge.name}
            </Badge>
          );

          if (showTooltip) {
            return (
              <Tooltip key={badge.id}>
                <TooltipTrigger asChild>
                  {BadgeContent}
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <div className="space-y-2">
                    <p className="font-medium">{badge.name}</p>
                    <p className="text-sm text-gray-600">{badge.description}</p>
                    <div className="text-xs">
                      <p className="font-medium mb-1">Critérios:</p>
                      <ul className="space-y-0.5">
                        {badge.criteria.map((criterion, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-green-500 mr-1">•</span>
                            {criterion}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>
            );
          }

          return BadgeContent;
        })}
        
        {hiddenCount > 0 && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge variant="outline" className={`${badgeSize[size]} text-gray-600`}>
                +{hiddenCount}
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <div className="space-y-1">
                {validBadges.slice(maxVisible).map((badge) => (
                  <div key={badge.id} className="text-sm">{badge.name}</div>
                ))}
              </div>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </TooltipProvider>
  );
}

// Hook para determinar badges baseado nos dados da empresa
export function useCompanyBadges(company: any) {
  const badges: string[] = [];

  // Empresa Verificada (todas as empresas premium/enterprise)
  if (company.planType === 'premium' || company.planType === 'enterprise') {
    badges.push('verified_company');
  }

  // Melhor Avaliada
  if (company.rating >= 4.5 && company.reviewCount >= 50) {
    badges.push('top_rated');
  }

  // Experiente
  const currentYear = new Date().getFullYear();
  const yearsInBusiness = currentYear - company.established;
  if (yearsInBusiness >= 5) {
    badges.push('experienced');
  }

  // Alto Volume (baseado no número de avaliações como proxy)
  if (company.reviewCount >= 200) {
    badges.push('high_volume');
  }

  // Certificada (empresas enterprise)
  if (company.planType === 'enterprise') {
    badges.push('certified');
  }

  // Resposta Rápida (empresas premium/enterprise)
  if (company.planType === 'premium' || company.planType === 'enterprise') {
    badges.push('fast_response');
  }

  // Atuação Nacional (empresas enterprise com especialidades múltiplas)
  if (company.planType === 'enterprise' && company.specialties.length >= 3) {
    badges.push('nationwide');
  }

  // Garantia Estendida (empresas com alta avaliação)
  if (company.rating >= 4.7) {
    badges.push('quality_guarantee');
  }

  return badges;
}