'use client';

import { useState } from 'react';
import { Calculator, Zap, DollarSign, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { brazilianStates } from '@/lib/data';
import { SolarCalculation } from '@/types';

export function SolarCalculator() {
  const [monthlyConsumption, setMonthlyConsumption] = useState<string>('');
  const [selectedState, setSelectedState] = useState<string>('');
  const [result, setResult] = useState<SolarCalculation | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const calculateSolar = () => {
    if (!monthlyConsumption || !selectedState) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const consumption = parseFloat(monthlyConsumption);
      const state = brazilianStates.find(s => s.code === selectedState);
      
      if (!state) return;

      // Basic solar calculation formulas (simplified)
      const dailyConsumption = consumption / 30;
      const systemSize = dailyConsumption / state.irradiation;
      const costPerKW = 4500; // Average cost per kW in Brazil
      const estimatedCost = systemSize * costPerKW;
      const monthlyEnergyBill = consumption * 0.75; // Average R$ per kWh
      const estimatedSavings = monthlyEnergyBill * 0.9; // 90% savings
      const paybackPeriod = estimatedCost / (estimatedSavings * 12);

      setResult({
        monthlyConsumption: consumption,
        state: selectedState,
        estimatedSystemSize: Math.round(systemSize * 100) / 100,
        estimatedCost: Math.round(estimatedCost),
        estimatedSavings: Math.round(estimatedSavings),
        paybackPeriod: Math.round(paybackPeriod * 100) / 100
      });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-blue-100 p-3 rounded-lg">
          <Calculator className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Calculadora Solar</h2>
          <p className="text-gray-600">Descubra quanto você pode economizar com energia solar</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Consumo mensal (kWh)
            </label>
            <Input
              type="number"
              placeholder="Ex: 300"
              value={monthlyConsumption}
              onChange={(e) => setMonthlyConsumption(e.target.value)}
              className="text-lg"
            />
            <p className="text-xs text-gray-500 mt-1">
              Consulte sua conta de luz para encontrar este valor
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Estado
            </label>
            <Select value={selectedState} onValueChange={setSelectedState}>
              <SelectTrigger className="text-lg">
                <SelectValue placeholder="Selecione seu estado" />
              </SelectTrigger>
              <SelectContent>
                {brazilianStates.map((state) => (
                  <SelectItem key={state.code} value={state.code}>
                    {state.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button 
            onClick={calculateSolar}
            disabled={!monthlyConsumption || !selectedState || isLoading}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white text-lg py-3"
          >
            {isLoading ? 'Calculando...' : 'Calcular Economia'}
          </Button>
        </div>

        {result && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
              Resultado da Simulação
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Zap className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-xs text-gray-500">Sistema</p>
                      <p className="font-semibold">{result.estimatedSystemSize} kWp</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="text-xs text-gray-500">Investimento</p>
                      <p className="font-semibold">R$ {result.estimatedCost.toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-5 w-5 text-orange-600" />
                    <div>
                      <p className="text-xs text-gray-500">Economia/mês</p>
                      <p className="font-semibold">R$ {result.estimatedSavings}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="text-xs text-gray-500">Payback</p>
                      <p className="font-semibold">{result.paybackPeriod} anos</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm text-green-800">
                <strong>Economia total em 25 anos:</strong> R$ {(result.estimatedSavings * 12 * 25).toLocaleString()}
              </p>
            </div>

            <Button className="w-full" variant="outline">
              Receber Orçamentos de Empresas
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}