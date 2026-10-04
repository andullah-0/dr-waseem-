import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck } from 'lucide-react';

interface LoadingScreenProps {
  onComplete?: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 text-white"
    >
      <div className="relative flex flex-col items-center">
        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="w-28 h-28 rounded-full border border-teal-500/30 border-t-teal-400 border-r-cyan-400 absolute -inset-2"
        />

        <motion.div
          animate={{ scale: [0.95, 1.05, 0.95] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-teal-500 to-cyan-400 p-1 shadow-2xl shadow-teal-500/40 flex items-center justify-center relative z-10"
        >
          <div className="w-full h-full rounded-[14px] bg-slate-950 flex items-center justify-center">
            <ShieldCheck className="w-12 h-12 text-teal-400" />
          </div>
        </motion.div>

        <div className="mt-8 text-center space-y-1">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl font-bold tracking-tight text-white"
          >
            Dr. Waseem <span className="text-teal-400">Allergy Clinic</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xs text-teal-300/80 font-medium tracking-wide uppercase"
          >
            Specialized Allergy & Immunology • Karachi
          </motion.p>
        </div>

        <div className="w-48 h-1 bg-slate-800 rounded-full mt-6 overflow-hidden">
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
            className="w-1/2 h-full bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full"
          />
        </div>
      </div>
    </motion.div>
  );
};
