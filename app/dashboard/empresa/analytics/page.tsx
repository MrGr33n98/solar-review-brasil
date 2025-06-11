'use client';

import { Card, AreaChart, Title, Text } from '@tremor/react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format, subDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// Dados de exemplo - substituir por dados reais da API
const performanceData = Array.from({ length: 30 }, (_, i) => ({
  date: format(subDays(new Date(), 29 - i), 'dd/MM', { locale: ptBR }),
  'Visitas': Math.floor(Math.random() * 100) + 50,
  'Leads': Math.floor(Math.random() * 30) + 10,
  'Conversões': Math.floor(Math.random() * 10) + 1,
}));

export default function AnalyticsPage() {
  return (
    <div className="container space-y-8 p-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Análises</h2>
          <p className="text-muted-foreground">
            Acompanhe o desempenho da sua empresa na plataforma
          </p>
        </div>
        <Select defaultValue="30">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Selecione o período" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7">Últimos 7 dias</SelectItem>
            <SelectItem value="30">Últimos 30 dias</SelectItem>
            <SelectItem value="90">Últimos 90 dias</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="visits">Visitas</TabsTrigger>
          <TabsTrigger value="leads">Leads</TabsTrigger>
          <TabsTrigger value="conversion">Conversão</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <Title>Desempenho Geral</Title>
            <Text>Visitas, leads e conversões nos últimos 30 dias</Text>
            <AreaChart
              className="mt-4 h-72"
              data={performanceData}
              index="date"
              categories={['Visitas', 'Leads', 'Conversões']}
              colors={['blue', 'green', 'yellow']}
            />
          </Card>
        </TabsContent>

        <TabsContent value="visits">
          {/* Conteúdo específico de visitas */}
        </TabsContent>

        <TabsContent value="leads">
          {/* Conteúdo específico de leads */}
        </TabsContent>

        <TabsContent value="conversion">
          {/* Conteúdo específico de conversão */}
        </TabsContent>
      </Tabs>
    </div>
  );
}
