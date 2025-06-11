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
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <DashboardNav
        items={dashboardConfig.sidebarNav}
        isCollapsed={isCollapsed}
        onCollapse={() => setIsCollapsed(!isCollapsed)}
      />
      
      {/* Main Content */}
      <div className={cn(
        "flex-1 flex flex-col overflow-hidden",
        isCollapsed ? "ml-[80px]" : "ml-[240px]"
      )}>
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto bg-gray-50 px-6 py-8">
          {children}
        </main>
      </div>
    </div>
  );
}
