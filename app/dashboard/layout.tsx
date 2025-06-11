'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link' // Use Link for client-side navigation
import {
  HomeIcon,
  ChartBarIcon,
  StarIcon,
  UserIcon,
  CogIcon,
  ArrowLeftOnRectangleIcon,
  Bars3Icon, // For mobile menu toggle
  XMarkIcon, // For mobile menu close
} from '@heroicons/react/24/outline'
import { Sidebar } from '@/components/dashboard/sidebar';

const navigation = [
  { name: 'Overview', href: '/dashboard', icon: HomeIcon },
  { name: 'Analytics', href: '/dashboard/analytics', icon: ChartBarIcon },
  { name: 'Reviews', href: '/dashboard/reviews', icon: StarIcon },
  { name: 'Profile', href: '/dashboard/profile', icon: UserIcon },
  { name: 'Settings', href: '/dashboard/settings', icon: CogIcon },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}