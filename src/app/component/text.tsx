'use client';
import { motion } from 'framer-motion';

interface TextIconHeroProps {
  name: string; 
  color?: string;
}

export function TextIconHero({ name , color}: TextIconHeroProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.9 }}
      className="relative inline-block"
    >
      {/* Balão */}
      <div className={`bg-orange-500 ${color} text-white px-5 py-2 rounded-full font-sans text-lg`}>
        {name}
      </div>

      {/* Seta estilo CSS */}
      <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-r-[10px] border-r-orange-500"></div>
    </motion.div>
  );
}
