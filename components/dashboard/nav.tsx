'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface DashboardNavProps {
  items: {
    title: string;
    href: string;
    icon?: any;
    items?: { title: string; href: string }[];
  }[];
  isCollapsed?: boolean;
  onCollapse?: () => void;
}

export function DashboardNav({
  items,
  isCollapsed = false,
  onCollapse,
}: DashboardNavProps) {
  const path = usePathname();

  return (
    <div
      className={cn(
        "fixed top-0 left-0 z-40 h-screen border-r bg-background transition-all duration-300",
        isCollapsed ? "w-[80px]" : "w-[240px]"
      )}
    >
      <div className="flex h-full flex-col">
        <div className="flex h-14 items-center justify-between border-b px-4">
          {!isCollapsed && <span className="text-lg font-semibold">Dashboard</span>}
          <Button
            variant="ghost"
            size="icon"
            onClick={onCollapse}
            className={cn("h-8 w-8", isCollapsed && "rotate-180")}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>
        </div>
        <ScrollArea className="flex-1 py-2">
          <nav className="grid gap-1 px-2">
            {items.map((item, index) => {
              const Icon = item.icon;
              const isActive = path === item.href;

              if (item.items) {
                return (
                  <div key={index} className="space-y-1">
                    <Button
                      variant="ghost"
                      asChild
                      className={cn(
                        "w-full justify-start",
                        isCollapsed && "h-9 w-9 p-0"
                      )}
                    >
                      <Link href={item.href}>
                        {Icon && <Icon className="h-4 w-4" />}
                        {!isCollapsed && <span className="ml-2">{item.title}</span>}
                      </Link>
                    </Button>
                    {!isCollapsed &&
                      item.items.map((subItem) => (
                        <Button
                          key={subItem.href}
                          variant="ghost"
                          asChild
                          className="ml-4 w-full justify-start"
                        >
                          <Link href={subItem.href}>{subItem.title}</Link>
                        </Button>
                      ))}
                  </div>
                );
              }

              return (
                <Button
                  key={index}
                  variant={isActive ? "secondary" : "ghost"}
                  asChild
                  className={cn(
                    "w-full justify-start",
                    isCollapsed && "h-9 w-9 p-0"
                  )}
                >
                  <Link href={item.href}>
                    {Icon && <Icon className="h-4 w-4" />}
                    {!isCollapsed && <span className="ml-2">{item.title}</span>}
                  </Link>
                </Button>
              );
            })}
          </nav>
        </ScrollArea>
      </div>
    </div>
  );
}
