'use client';

import { Card } from '@tremor/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Phone, Mail, Calendar } from 'lucide-react';

// Dados de exemplo - substituir por dados reais da API
const leads = [
  {
    id: 1,
    name: 'Roberto Oliveira',
    email: 'roberto@email.com',
    phone: '(11) 99999-9999',
    date: '10/06/2025',
    status: 'novo',
    source: 'site',
  },
  {
    id: 2,
    name: 'Ana Paula Silva',
    email: 'ana@email.com',
    phone: '(11) 88888-8888',
    date: '09/06/2025',
    status: 'em_contato',
    source: 'indicação',
  },
  // ... mais leads
];

const statusColors: Record<string, string> = {
  novo: 'bg-blue-500',
  em_contato: 'bg-yellow-500',
  convertido: 'bg-green-500',
  perdido: 'bg-red-500',
};

const statusLabels: Record<string, string> = {
  novo: 'Novo',
  em_contato: 'Em Contato',
  convertido: 'Convertido',
  perdido: 'Perdido',
};

export default function LeadsPage() {
  return (
    <div className="container space-y-8 p-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Leads</h2>
          <p className="text-muted-foreground">
            Gerencie seus leads e oportunidades
          </p>
        </div>
        <div className="flex gap-4">
          <Input
            type="search"
            placeholder="Buscar leads..."
            className="w-[300px]"
          />
          <Button>Exportar</Button>
          <Button variant="default">Novo Lead</Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="new">Novos</TabsTrigger>
          <TabsTrigger value="in_contact">Em Contato</TabsTrigger>
          <TabsTrigger value="converted">Convertidos</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Contato</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Origem</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leads.map((lead) => (
                  <TableRow key={lead.id}>
                    <TableCell>{lead.name}</TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          <span className="text-sm">{lead.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          <span className="text-sm">{lead.phone}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{lead.date}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{lead.source}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={statusColors[lead.status]}>
                        {statusLabels[lead.status]}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          Detalhes
                        </Button>
                        <Button size="sm">
                          Contatar
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        {/* Outras abas com filtros específicos */}
      </Tabs>
    </div>
  );
}
