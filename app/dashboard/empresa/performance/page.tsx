'use client';

import { Card, AreaChart, DonutChart, Title, Text } from '@tremor/react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format, subDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// Dados de exemplo - substituir por dados reais da API
const performanceData = Array.from({ length: 30 }, (_, i) => ({
  date: format(subDays(new Date(), 29 - i), 'dd/MM', { locale: ptBR }),
  'Taxa de Conversão': Math.random() * 5 + 2,
  'Tempo de Resposta': Math.random() * 24 + 1,
  'Satisfação': Math.random() * 2 + 3,
}));

const satisfactionData = [
  {
    name: '5 estrelas',
    value: 45,
  },
  {
    name: '4 estrelas',
    value: 30,
  },
  {
    name: '3 estrelas',
    value: 15,
  },
  {
    name: '2 estrelas',
    value: 7,
  },
  {
    name: '1 estrela',
    value: 3,
  },
];

export default function PerformancePage() {
  return (
    <div className="container space-y-8 p-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Desempenho</h2>
          <p className="text-muted-foreground">
            Acompanhe os indicadores de desempenho da sua empresa
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

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-4">
          <Title>Taxa de Conversão</Title>
          <Text className="text-2xl font-bold">3.8%</Text>
          <Text className="text-xs text-muted-foreground">+0.5% vs. último mês</Text>
        </Card>
        <Card className="p-4">
          <Title>Tempo Médio de Resposta</Title>
          <Text className="text-2xl font-bold">4h 30min</Text>
          <Text className="text-xs text-muted-foreground">-30min vs. último mês</Text>
        </Card>
        <Card className="p-4">
          <Title>Satisfação do Cliente</Title>
          <Text className="text-2xl font-bold">4.5/5</Text>
          <Text className="text-xs text-muted-foreground">+0.2 vs. último mês</Text>
        </Card>
        <Card className="p-4">
          <Title>Total de Avaliações</Title>
          <Text className="text-2xl font-bold">256</Text>
          <Text className="text-xs text-muted-foreground">+45 vs. último mês</Text>
        </Card>
      </div>

      <Tabs defaultValue="metrics" className="space-y-4">
        <TabsList>
          <TabsTrigger value="metrics">Métricas</TabsTrigger>
          <TabsTrigger value="satisfaction">Satisfação</TabsTrigger>
          <TabsTrigger value="response">Tempo de Resposta</TabsTrigger>
        </TabsList>

        <TabsContent value="metrics">
          <Card>
            <Title>Métricas ao Longo do Tempo</Title>
            <Text>Evolução dos principais indicadores</Text>
            <AreaChart
              className="mt-4 h-72"
              data={performanceData}
              index="date"
              categories={['Taxa de Conversão', 'Tempo de Resposta', 'Satisfação']}
              colors={['emerald', 'blue', 'amber']}
            />
          </Card>
        </TabsContent>

        <TabsContent value="satisfaction">
          <Card>
            <Title>Distribuição de Avaliações</Title>
            <Text>Distribuição das avaliações por número de estrelas</Text>
            <DonutChart
              className="mt-4 h-72"
              data={satisfactionData}
              category="value"
              index="name"
              colors={['emerald', 'green', 'amber', 'orange', 'red']}
            />
          </Card>
        </TabsContent>

        <TabsContent value="response">
          <Card>
            {/* Conteúdo específico de tempo de resposta */}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
