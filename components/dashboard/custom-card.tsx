'use client';

interface CustomCardProps {
  children: React.ReactNode;
  className?: string;
}

export function CustomCard({ children, className = '' }: CustomCardProps) {
  return (
    <div className={`bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-200 ${className}`}>
      {children}
    </div>
  );
}
