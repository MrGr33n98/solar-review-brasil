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
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <nav
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-auto lg:shadow-none lg:w-64`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 lg:justify-center">
          {/* Brand Logo/Name */}
          <Link href="/dashboard" className="flex-shrink-0 text-xl font-bold text-indigo-600">
            YourBrand
          </Link>
          <button
            type="button"
            className="lg:hidden text-gray-500 hover:text-gray-700"
            onClick={() => setSidebarOpen(false)}
          >
            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <div className="p-4 space-y-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ease-in-out
                ${
                  pathname === item.href
                    ? 'bg-indigo-50 text-indigo-700 font-semibold shadow-sm'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                }
              `}
              onClick={() => setSidebarOpen(false)} // Close sidebar on navigation for mobile
            >
              <item.icon className="h-5 w-5 mr-3 flex-shrink-0" />
              {item.name}
            </Link>
          ))}
        </div>

        <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
          <button className="flex items-center px-4 py-2 text-sm font-medium rounded-lg w-full text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors duration-200 ease-in-out">
            <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-3 flex-shrink-0" />
            Sign Out
          </button>
        </div>
      </nav>

      {/* Main content area */}
      <div className="flex-1 flex flex-col lg:ml-64">
        {/* Top bar for mobile */}
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-4 lg:hidden">
          <button
            type="button"
            className="text-gray-500 hover:text-gray-700"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          <Link href="/dashboard" className="text-xl font-bold text-indigo-600">
            YourBrand
          </Link>
          <div className="w-6"></div> {/* Placeholder for alignment */}
        </header>

        <main className="flex-1 p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}