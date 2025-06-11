'use client';

import Link from 'next/link';
import { Search, Sun, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';

// Navigation data for better maintainability
const navigationItems = [
	{ href: '/empresas', label: 'Empresas' },
	{ href: '/sobre', label: 'Sobre' },
	{ href: '/blog', label: 'Blog' },
	{ href: '/contato', label: 'Contato' },
];

const specialLinks = [
	{
		href: '/calculadora',
		label: 'Calculadora Solar',
		className: 'bg-blue-100 text-blue-700 hover:bg-blue-200',
	},	{
		href: '/auth/empresa/cadastro',
		label: 'Para Empresas',
		className: 'bg-blue-600 hover:bg-blue-700 text-white',
	},
];

type NavLinkProps = {
	href: string;
	label: string;
	className?: string;
	isMobile?: boolean;
};

const NavLink = ({ href, label, className, isMobile = false }: NavLinkProps) => {
	const pathname = usePathname();
	const isActive = pathname === href;

	return (
		<Link
			href={href}
			className={cn(
				'font-medium transition duration-300',
				isMobile ? 'py-2 px-4 rounded-md hover:bg-blue-50' : 'px-4 py-2 rounded-md hover:bg-blue-50',
				isActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600',
				className
			)}
			aria-current={isActive ? 'page' : undefined}
		>
			{label}
		</Link>
	);
};

export function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const pathname = usePathname();

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 20);
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	useEffect(() => {
		setIsMenuOpen(false);
	}, [pathname]);

	return (
		<header
			className={cn(
				'sticky top-0 w-full py-4 px-4 md:px-8 z-50 transition-all duration-300',
				scrolled ? 'bg-white shadow-md' : 'bg-white/95 shadow-sm'
			)}
		>
			<div className="container mx-auto flex justify-between items-center max-w-6xl">
				{/* Logo with better accessibility */}
				<Link
					href="/"
					className="flex items-center text-2xl font-bold text-blue-600 hover:text-blue-800 transition duration-300"
				>
					<Sun className="h-6 w-6 mr-2" aria-hidden="true" />
					<span>Solar Review Brasil</span>
				</Link>

				{/* Desktop Navigation */}
				<nav className="hidden md:flex items-center space-x-1" aria-label="Navegação principal">
					{navigationItems.map((item) => (
						<NavLink key={item.href} {...item} />
					))}

					{specialLinks.map((item) => (
						<NavLink key={item.href} {...item} className={cn('ml-2', item.className)} />
					))}
				</nav>

				{/* Mobile Menu Button with improved accessibility */}
				<Button
					variant="ghost"
					size="icon"
					className="md:hidden text-gray-700 hover:text-blue-600 hover:bg-blue-50"
					onClick={() => setIsMenuOpen(!isMenuOpen)}
					aria-expanded={isMenuOpen}
					aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
				>
					{isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
				</Button>
			</div>

			{/* Mobile Menu with animation */}
			<AnimatePresence>
				{isMenuOpen && (
					<motion.nav
						className="md:hidden bg-white py-4 px-4 shadow-inner border-t border-gray-100"
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: 'auto' }}
						exit={{ opacity: 0, height: 0 }}
						transition={{ duration: 0.3 }}
						aria-label="Menu mobile"
					>
						<div className="flex flex-col space-y-2">
							{navigationItems.map((item) => (
								<NavLink key={item.href} {...item} isMobile />
							))}

							{specialLinks.map((item) => (
								<NavLink key={item.href} {...item} isMobile className={item.className} />
							))}
						</div>
					</motion.nav>
				)}
			</AnimatePresence>
		</header>
	);
}