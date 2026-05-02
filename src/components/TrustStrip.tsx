"use client";

import { motion } from "framer-motion";
import { Shield, Star, Clock3, Award } from "lucide-react";

const items = [
  { icon: Shield, label: "Código seguro & escalable" },
  { icon: Star, label: "+50 proyectos entregados" },
  { icon: Clock3, label: "Respuesta en < 24h" },
  { icon: Award, label: "98% clientes satisfechos" },
];

// Logos/names of tech/client types (text-based, no images needed)
const techBadges = [
  "Next.js", "React", "Node.js", "Python", "FastAPI",
  "OpenAI", "Docker", "AWS", "PostgreSQL", "React Native",
];

export default function TrustStrip() {
  return (
    <div className="bg-[#0F2544] border-y border-[#1E3A5F]">
      {/* Trust indicators */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 md:divide-x divide-white/10">
          {items.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center justify-center gap-2.5 px-4"
            >
              <Icon size={16} className="text-[#C9A844] shrink-0" />
              <span className="text-white/80 text-sm font-medium text-center leading-tight">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Scrolling tech ticker */}
      <div className="border-t border-white/5 overflow-hidden py-3">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex gap-8 whitespace-nowrap"
        >
          {[...techBadges, ...techBadges].map((name, i) => (
            <span
              key={i}
              className="text-white/30 text-xs font-semibold uppercase tracking-widest"
            >
              {name}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
