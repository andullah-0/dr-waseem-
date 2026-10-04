import React, { useState } from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const FloatingActions: React.FC = () => {
  const [hovered, setHovered] = useState<'whatsapp' | 'call' | null>(null);

  const phoneRaw = '+923233772039';
  const whatsappUrl = `https://wa.me/923233772039?text=${encodeURIComponent(
    'Assalam-o-Alaikum Dr. Waseem Clinic, I would like to inquire about an allergy consultation.'
  )}`;

  return (
    <div className="fixed bottom-4 right-3.5 sm:bottom-6 sm:right-5 z-40 flex flex-col items-end gap-2.5 sm:gap-3 pointer-events-auto">
      {/* Call Button */}
      <div className="relative flex items-center">
        <AnimatePresence>
          {hovered === 'call' && (
            <motion.div
              initial={{ opacity: 0, x: 10, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.9 }}
              className="mr-3 px-3 py-1.5 rounded-lg bg-slate-900/90 text-white text-xs font-semibold shadow-lg border border-teal-500/30 whitespace-nowrap hidden md:block"
            >
              Call Clinic (+92 323 3772039)
            </motion.div>
          )}
        </AnimatePresence>
        <a
          href={`tel:${phoneRaw}`}
          onMouseEnter={() => setHovered('call')}
          onMouseLeave={() => setHovered(null)}
          aria-label="Call Dr. Waseem Allergy Clinic"
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 flex items-center justify-center shadow-lg shadow-teal-500/30 hover:scale-110 active:scale-95 transition-all"
        >
          <Phone className="w-4 h-4 sm:w-5 sm:h-5 fill-slate-950" />
        </a>
      </div>

      {/* WhatsApp Button */}
      <div className="relative flex items-center">
        <AnimatePresence>
          {hovered === 'whatsapp' && (
            <motion.div
              initial={{ opacity: 0, x: 10, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.9 }}
              className="mr-3 px-3 py-1.5 rounded-lg bg-slate-900/90 text-white text-xs font-semibold shadow-lg border border-emerald-500/30 whitespace-nowrap hidden md:block"
            >
              WhatsApp Us (+92 323 3772039)
            </motion.div>
          )}
        </AnimatePresence>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setHovered('whatsapp')}
          onMouseLeave={() => setHovered(null)}
          aria-label="Chat on WhatsApp with Dr. Waseem Allergy Clinic"
          className="w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xl shadow-emerald-500/35 hover:scale-110 active:scale-95 transition-all relative group"
        >
          <span className="absolute inset-0 rounded-full bg-emerald-400 opacity-30 group-hover:animate-ping pointer-events-none" />
          <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 fill-white" />
        </a>
      </div>
    </div>
  );
};
