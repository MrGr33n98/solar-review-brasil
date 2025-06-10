'use client';

import { motion } from 'framer-motion';

export function Hero() {
  return (
    <div className="container mx-auto px-4 relative z-10">
      <motion.div 
        className="text-center max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
          Encontre a Melhor Empresa Solar Para Você
        </h1>
        <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Compare avaliações, preços e qualidade das principais empresas de energia solar do Brasil
        </p>
      </motion.div>
    </div>
  );
}