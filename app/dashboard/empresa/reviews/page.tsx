'use client';

import { Card } from '@tremor/react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Star, ThumbsUp, MessageCircle } from 'lucide-react';

// Dados de exemplo - substituir por dados reais da API
const reviews = [
  {
    id: 1,
    author: 'João Silva',
    rating: 5,
    date: '10/06/2025',
    comment: 'Excelente serviço! A instalação foi rápida e profissional.',
    status: 'published',
  },
  {
    id: 2,
    author: 'Maria Santos',
    rating: 4,
    date: '09/06/2025',
    comment: 'Bom atendimento, mas demorou um pouco mais que o previsto.',
    status: 'pending',
  },
  // ... mais avaliações
];

function ReviewCard({ review }: { review: typeof reviews[0] }) {
  return (
    <Card className="p-4 space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-semibold">{review.author}</span>
            <div className="flex">
              {Array.from({ length: review.rating }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
          </div>
          <span className="text-sm text-muted-foreground">{review.date}</span>
        </div>
        <Button variant="outline" size="sm">
          {review.status === 'published' ? 'Publicado' : 'Pendente'}
        </Button>
      </div>
      <p className="text-sm">{review.comment}</p>
      <div className="flex gap-2">
        <Button size="sm" variant="outline">
          <ThumbsUp className="w-4 h-4 mr-2" />
          Responder
        </Button>
        <Button size="sm" variant="outline">
          <MessageCircle className="w-4 h-4 mr-2" />
          Comentar
        </Button>
      </div>
    </Card>
  );
}

export default function ReviewsPage() {
  return (
    <div className="container space-y-8 p-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Avaliações</h2>
          <p className="text-muted-foreground">
            Gerencie as avaliações da sua empresa
          </p>
        </div>
        <div className="flex gap-4">
          <Input
            type="search"
            placeholder="Buscar avaliações..."
            className="w-[300px]"
          />
          <Button>Exportar</Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">Todas</TabsTrigger>
          <TabsTrigger value="pending">Pendentes</TabsTrigger>
          <TabsTrigger value="published">Publicadas</TabsTrigger>
          <TabsTrigger value="archived">Arquivadas</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </TabsContent>

        <TabsContent value="pending">
          {/* Filtrar e mostrar apenas avaliações pendentes */}
        </TabsContent>

        <TabsContent value="published">
          {/* Filtrar e mostrar apenas avaliações publicadas */}
        </TabsContent>

        <TabsContent value="archived">
          {/* Filtrar e mostrar apenas avaliações arquivadas */}
        </TabsContent>
      </Tabs>
    </div>
  );
}
