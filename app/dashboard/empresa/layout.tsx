'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { DashboardNav } from '@/components/dashboard/nav';
import { DashboardHeader } from '@/components/dashboard/header';
import { dashboardConfig } from '@/config/dashboard';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <div className="flex h-full relative">
        {/* Sidebar - Removido fixed positioning */}
        <DashboardNav
          items={dashboardConfig.sidebarNav}
          isCollapsed={isCollapsed}
          onCollapse={() => setIsCollapsed(!isCollapsed)}
          className={cn(
            "h-screen sticky top-0 left-0 z-40",
            "transition-all duration-300 ease-in-out",
            isCollapsed ? "w-16" : "w-64",
            "lg:block" // Sempre visível em desktop
          )}
        />
        
        {/* Main Content */}
        <div className={cn(
          "flex-1 flex flex-col min-h-screen",
          "transition-all duration-300 ease-in-out",
          isCollapsed ? "lg:ml-[64px]" : "lg:ml-[200px]",
          "ml-0" // No margin on mobile
        )}>
          <DashboardHeader className="sticky top-0 z-30 w-full" />
          <main className="flex-1 overflow-y-auto p-4 lg:p-6">
            <div className="mx-auto max-w-[2000px] w-full"> {/* Máximo width com margem automática */}
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
