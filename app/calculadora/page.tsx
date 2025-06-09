import { SolarCalculator } from '@/components/solar-calculator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sun, Zap, DollarSign, Leaf } from 'lucide-react';

export default function CalculatorPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-50 to-orange-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Sun className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">
              Calculadora Solar
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Descubra quanto você pode economizar com energia solar. 
            Nossa calculadora considera a irradiação solar do seu estado para fornecer estimativas precisas.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calculator */}
          <div className="lg:col-span-2">
            <SolarCalculator />
          </div>

          {/* Benefits Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-blue-600" />
                  <span>Benefícios da Energia Solar</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <DollarSign className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Economia Garantida</h4>
                    <p className="text-sm text-gray-600">Reduza até 95% da sua conta de luz</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Leaf className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Sustentabilidade</h4>
                    <p className="text-sm text-gray-600">Energia limpa e renovável</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Sun className="h-5 w-5 text-orange-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Valorização do Imóvel</h4>
                    <p className="text-sm text-gray-600">Aumente o valor do seu imóvel</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Como Funciona</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <p>
                  <strong>1. Irradiação Solar:</strong> Usamos dados oficiais de irradiação solar por estado brasileiro.
                </p>
                <p>
                  <strong>2. Consumo Energético:</strong> Calculamos com base no seu consumo mensal médio em kWh.
                </p>
                <p>
                  <strong>3. Dimensionamento:</strong> Determinamos o tamanho ideal do sistema solar.
                </p>
                <p>
                  <strong>4. Investimento:</strong> Estimativa baseada nos preços médios de mercado.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Incentivos Disponíveis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <h4 className="font-medium">Sistema de Compensação</h4>
                  <p className="text-gray-600">Injete energia na rede e obtenha créditos para usar depois</p>
                </div>
                <div>
                  <h4 className="font-medium">Financiamento</h4>
                  <p className="text-gray-600">Linhas de crédito especiais para energia solar</p>
                </div>
                <div>
                  <h4 className="font-medium">Isenção de ICMS</h4>
                  <p className="text-gray-600">Muitos estados isentam o ICMS sobre energia solar</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}