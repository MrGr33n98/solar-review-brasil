'use client';

import { useState } from 'react';
import {
  Card,
  Metric,
  Text,
  BadgeDelta,
  Flex,
  ProgressBar,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  Title,
} from '@tremor/react';
import {
  DocumentCheckIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';
import { format, subMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const categories = [
  { name: 'Residencial', count: 145, color: 'bg-blue-500' },
  { name: 'Comercial', count: 85, color: 'bg-green-500' },
  { name: 'Industrial', count: 23, color: 'bg-purple-500' },
  { name: 'Usinas Solares', count: 12, color: 'bg-yellow-500' },
  { name: 'Manutenção', count: 56, color: 'bg-pink-500' },
  { name: 'Sistemas Off-Grid', count: 18, color: 'bg-indigo-500' },
];

const metrics = [
  {
    title: 'Orçamentos Solicitados',
    metric: '321',
    icon: DocumentCheckIcon,
    delta: '12.3%',
    deltaType: 'moderateIncrease',
  },
  {
    title: 'Propostas Aceitas',
    metric: '145',
    icon: UserGroupIcon,
    delta: '23.9%',
    deltaType: 'increase',
  },
  {
    title: 'Valor Total Gerado',
    metric: 'R$ 2.4M',
    icon: CurrencyDollarIcon,
    delta: '10.1%',
    deltaType: 'moderateIncrease',
  },
];

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="total"
          stroke="#2563eb"
          strokeWidth={2}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default function DashboardOverview() {
  const [selectedPeriod, setSelectedPeriod] = useState('12');
  const periodStart = format(
    subMonths(new Date(), parseInt(selectedPeriod)),
    'PP',
    { locale: ptBR }
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Olá, Empresa Solar
          </h1>
          <p className="text-gray-500">
            Acompanhe seu desempenho no Comparador Solar
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Selecione o período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Último mês</SelectItem>
              <SelectItem value="3">Últimos 3 meses</SelectItem>
              <SelectItem value="6">Últimos 6 meses</SelectItem>
              <SelectItem value="12">Últimos 12 meses</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {metrics.map((item) => (
          <Card key={item.title}>
            <Flex justifyContent="between" alignItems="center">
              <div>
                <Text>{item.title}</Text>
                <Metric>{item.metric}</Metric>
              </div>
              <div>
                <item.icon className="h-6 w-6 text-gray-600" />
              </div>
            </Flex>
            <Flex justifyContent="start" className="mt-4">
              <BadgeDelta deltaType={item.deltaType}>{item.delta}</BadgeDelta>
              <Text className="ml-2">vs. período anterior</Text>
            </Flex>
          </Card>
        ))}
      </div>

      {/* Categories */}
      <Card>
        <Title>Tipos de Instalação/Serviços Solares</Title>
        <div className="mt-4 space-y-2">
          {categories.map((category) => (
            <div key={category.name} className="space-y-1">
              <Flex justifyContent="between">
                <Text>{category.name}</Text>
                <Text>{category.count} orçamentos</Text>
              </Flex>
              <ProgressBar
                value={(category.count / 200) * 100}
                className={category.color}
              />
            </div>
          ))}
        </div>
      </Card>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card>
          <Title>Net Promoter Score</Title>
          <div className="mt-4">
            <Metric>72</Metric>
            <ProgressBar value={72} color="emerald" className="mt-2" />
            <Text className="mt-2">Excelente</Text>
          </div>
        </Card>

        <Card>
          <Title>Avaliações</Title>
          <div className="mt-4 space-y-2">
            <div>
              <Text>Total de Avaliações</Text>
              <Metric>256</Metric>
            </div>
            <div>
              <Text>Nota Média</Text>
              <Metric>4.8</Metric>
            </div>
          </div>
        </Card>

        <Card>
          <Title>Taxa de Conversão</Title>
          <div className="mt-4">
            <Metric>45.2%</Metric>
            <BadgeDelta deltaType="increase" className="mt-2">
              +5.2%
            </BadgeDelta>
            <Text className="mt-2">
              De orçamentos para vendas fechadas
            </Text>
          </div>
        </Card>
      </div>
    </div>
  );
}
