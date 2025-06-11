'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Eye, MessageSquare, Star } from 'lucide-react';

const activities = [
  {
    type: 'view',
    user: 'João Silva',
    time: '2 min atrás',
    icon: Eye,
    description: 'visualizou seu perfil',
    color: 'text-blue-500',
  },
  {
    type: 'review',
    user: 'Maria Santos',
    time: '1 hora atrás',
    icon: Star,
    description: 'avaliou sua empresa',
    rating: 5,
    color: 'text-yellow-500',
  },
  {
    type: 'message',
    user: 'Pedro Costa',
    time: '3 horas atrás',
    icon: MessageSquare,
    description: 'enviou uma mensagem',
    color: 'text-green-500',
  },
];

export function RecentActivity() {
  return (
    <div className="space-y-8">
      {activities.map((activity, index) => {
        const Icon = activity.icon;
        return (
          <div key={index} className="flex items-center">
            <Avatar className="h-9 w-9">
              <AvatarFallback>
                {activity.user.split(' ').map(name => name[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">
                {activity.user}
              </p>
              <div className="flex items-center text-sm text-muted-foreground">
                <Icon className={cn("mr-1 h-3 w-3", activity.color)} />
                <span>{activity.description}</span>
                {activity.rating && (
                  <div className="ml-2 flex items-center">
                    {[...Array(activity.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-3 w-3 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="ml-auto font-medium text-sm text-muted-foreground">
              {activity.time}
            </div>
          </div>
        );
      })}
    </div>
  );
}
