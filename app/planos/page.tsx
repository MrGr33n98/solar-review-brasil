import Link from 'next/link';
import { Check, Star, Zap, Award, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const PlanCard = ({ plan }: { plan: typeof plans[0] }) => {
  const IconComponent = plan.icon;
  return (
    <Card className={`relative ${plan.popular ? 'ring-2 ring-blue-500 shadow-lg' : 'shadow-md'}`}>
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <Badge className="bg-blue-500 text-white px-4 py-1">Mais Popular</Badge>
        </div>
      )}
      <CardHeader className="text-center pb-4">
        <div className={`w-16 h-16 ${plan.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
          <IconComponent className={`h-8 w-8 ${plan.color}`} />
        </div>
        <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
        <CardDescription className="text-gray-600">{plan.description}</CardDescription>
        <div className="mt-4">
          <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
          {plan.period && <span className="text-gray-600">{plan.period}</span>}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Recursos inclusos:</h4>
          <ul className="space-y-2">
            {plan.features.map((feature, index) => (
              <li key={index} className="flex items-start space-x-2">
                <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        {plan.limitations && (
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Limitações:</h4>
            <ul className="space-y-2">
              {plan.limitations.map((limitation, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0">×</span>
                  <span className="text-sm text-gray-500">{limitation}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        <Button className={`w-full ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-900 hover:bg-gray-800'}`}>
          {plan.cta}
        </Button>
      </CardContent>
    </Card>
  );
};

const FAQItem = ({ question, answer }: { question: string; answer: string }) => (
  <div>
    <h3 className="font-semibold text-gray-900 mb-2">{question}</h3>
    <p className="text-gray-600 text-sm">{answer}</p>
  </div>
);

export default function PlanosPage() {
  const plans = [
    {
      name: 'Gratuito',
      price: 'R$ 0',
      period: '/mês',
      description: 'Ideal para empresas iniciantes',
      icon: Star,
      color: 'text-gray-600',
      bgColor: 'bg-gray-100',
      features: [
        'Perfil básico da empresa',
        'Até 5 avaliações por mês',
        'Listagem nas buscas',
        'Suporte por email',
        'Estatísticas básicas'
      ],
      limitations: [
        'Sem destaque nas buscas',
        'Sem banners promocionais',
        'Sem analytics avançado'
      ],
      cta: 'Começar Grátis',
      popular: false
    },
    {
      name: 'Premium',
      price: 'R$ 299',
      period: '/mês',
      description: 'Para empresas em crescimento',
      icon: Zap,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      features: [
        'Tudo do plano Gratuito',
        'Avaliações ilimitadas',
        'Destaque nas buscas',
        'Badge Premium no perfil',
        'Analytics detalhado',
        'Suporte prioritário',
        'Até 3 banners promocionais',
        'Resposta a avaliações'
      ],
      cta: 'Assinar Premium',
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Sob consulta',
      period: '',
      description: 'Soluções personalizadas',
      icon: Award,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      features: [
        'Tudo do plano Premium',
        'Banners ilimitados',
        'Posicionamento prioritário',
        'API dedicada',
        'Gerente de conta dedicado',
        'Relatórios personalizados',
        'Integração personalizada',
        'SLA garantido'
      ],
      cta: 'Falar com Vendas',
      popular: false
    }
  ];

  const faqs = [
    { question: 'Posso cancelar minha assinatura a qualquer momento?', answer: 'Sim, você pode cancelar sua assinatura a qualquer momento. Não há multas ou taxas de cancelamento.' },
    { question: 'Como funciona o período de teste?', answer: 'Oferecemos 7 dias grátis do plano Premium para você testar todos os recursos antes de decidir.' },
    { question: 'Posso fazer upgrade do meu plano?', answer: 'Sim, você pode fazer upgrade a qualquer momento. A cobrança será proporcional ao período restante.' },
    { question: 'Há desconto para pagamento anual?', answer: 'Sim, oferecemos 20% de desconto para assinaturas anuais em todos os planos pagos.' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">
              Planos e Preços
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Escolha o plano ideal para fazer sua empresa de energia solar se destacar no mercado
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan) => (
            <PlanCard key={plan.name} plan={plan} />
          ))}
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Perguntas Frequentes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
              <FAQItem key={index} {...faq} />
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ainda tem dúvidas?
          </h2>
          <p className="text-gray-600 mb-6">
            Nossa equipe está pronta para ajudar você a escolher o melhor plano
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/contato">
              <Button variant="outline" size="lg">
                Falar com Especialista
              </Button>
            </Link>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Começar Teste Grátis
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}