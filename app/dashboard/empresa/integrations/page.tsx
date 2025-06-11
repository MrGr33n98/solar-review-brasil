'use client';

import { Card } from '@tremor/react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import {
  AlertCircle,
  CheckCircle2,
  Link2,
  MessageSquare,
  Calendar,
  Mail,
  Phone,
} from 'lucide-react';

// Dados de exemplo - substituir por dados reais da API
const integrations = [
  {
    id: 'crm',
    name: 'CRM',
    description: 'Integração com seu sistema de CRM para gestão de leads',
    icon: Users,
    status: 'connected',
    lastSync: '10/06/2025 15:30',
  },
  {
    id: 'calendar',
    name: 'Calendário',
    description: 'Sincronize agendamentos com seu calendário',
    icon: Calendar,
    status: 'not_connected',
  },
  {
    id: 'email',
    name: 'E-mail Marketing',
    description: 'Integração com plataforma de e-mail marketing',
    icon: Mail,
    status: 'connected',
    lastSync: '10/06/2025 14:45',
  },
  {
    id: 'phone',
    name: 'Telefonia',
    description: 'Integração com sistema de telefonia',
    icon: Phone,
    status: 'error',
    error: 'Falha na última sincronização',
  },
  {
    id: 'chat',
    name: 'Chat',
    description: 'Integração com plataforma de chat',
    icon: MessageSquare,
    status: 'not_connected',
  },
];

function IntegrationCard({ integration }: { integration: typeof integrations[0] }) {
  const Icon = integration.icon;

  return (
    <Card className="p-6">
      <div className="flex justify-between items-start">
        <div className="flex items-start gap-4">
          <div className="p-2 rounded-lg bg-primary/10">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">{integration.name}</h3>
            <p className="text-sm text-muted-foreground">
              {integration.description}
            </p>
            {integration.status === 'connected' && (
              <p className="text-xs text-muted-foreground mt-2">
                Última sincronização: {integration.lastSync}
              </p>
            )}
            {integration.status === 'error' && (
              <div className="flex items-center gap-1 mt-2 text-destructive">
                <AlertCircle className="w-4 h-4" />
                <span className="text-xs">{integration.error}</span>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {integration.status === 'connected' ? (
            <>
              <Badge className="bg-green-500">
                <CheckCircle2 className="w-4 h-4 mr-1" />
                Conectado
              </Badge>
              <Switch defaultChecked />
            </>
          ) : integration.status === 'error' ? (
            <Button variant="destructive" size="sm">
              Reconectar
            </Button>
          ) : (
            <Button size="sm">
              <Link2 className="w-4 h-4 mr-2" />
              Conectar
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}

export default function IntegrationsPage() {
  return (
    <div className="container space-y-8 p-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Integrações</h2>
        <p className="text-muted-foreground">
          Gerencie suas integrações com outras plataformas
        </p>
      </div>

      <div className="grid gap-4">
        {integrations.map((integration) => (
          <IntegrationCard key={integration.id} integration={integration} />
        ))}
      </div>
    </div>
  );
}
