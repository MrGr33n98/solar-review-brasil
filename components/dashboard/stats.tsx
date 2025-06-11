'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, MessageSquare, Star, Users } from 'lucide-react';

export function Stats() {
  const stats = [
    {
      title: "Visualizações",
      value: "2,350",
      icon: Eye,
      change: "+12.3%",
      changeType: "increase" as const,
    },
    {
      title: "Avaliações",
      value: "48",
      icon: Star,
      change: "+8.2%",
      changeType: "increase" as const,
    },
    {
      title: "Leads",
      value: "12",
      icon: Users,
      change: "+2.1%",
      changeType: "increase" as const,
    },
    {
      title: "Mensagens",
      value: "24",
      icon: MessageSquare,
      change: "-4.3%",
      changeType: "decrease" as const,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={cn(
                "text-xs",
                stat.changeType === "increase" ? "text-green-600" : "text-red-600"
              )}>
                {stat.change} em relação ao mês anterior
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
