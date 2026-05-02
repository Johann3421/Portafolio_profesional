"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star, Quote } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const testimonials = [
  {
    nameEs: "Carlos Mendoza",
    nameEn: "Carlos Mendoza",
    roleEs: "Director de Tecnología · Fintech Colombia",
    roleEn: "CTO · Fintech Colombia",
    initials: "CM",
    color: "bg-blue-600",
    stars: 5,
    textEs:
      "Johann entregó nuestra plataforma SaaS en tiempo récord y con una calidad técnica excepcional. Lo más valioso fue su comunicación proactiva: siempre sabíamos exactamente en qué punto estábamos. Definitivamente volveremos a trabajar con él.",
    textEn:
      "Johann delivered our SaaS platform in record time with exceptional technical quality. The most valuable aspect was his proactive communication: we always knew exactly where we stood. We will definitely work with him again.",
  },
  {
    nameEs: "Ana García",
    nameEn: "Ana García",
    roleEs: "Gerente General · Empresa Retail",
    roleEn: "General Manager · Retail Company",
    initials: "AG",
    color: "bg-emerald-600",
    stars: 5,
    textEs:
      "Necesitábamos una app móvil para nuestros +10,000 clientes y Johann no solo cumplió, sino que superó las expectativas. El chatbot de IA que integró redujo las consultas de soporte en un 75%. Una inversión que se pagó sola en 3 meses.",
    textEn:
      "We needed a mobile app for our 10,000+ customers and Johann not only met expectations, but exceeded them. The AI chatbot he integrated reduced support queries by 75%. An investment that paid for itself in 3 months.",
  },
  {
    nameEs: "Miguel Torres",
    nameEn: "Miguel Torres",
    roleEs: "CEO · Startup EdTech",
    roleEn: "CEO · EdTech Startup",
    initials: "MT",
    color: "bg-violet-600",
    stars: 5,
    textEs:
      "Como startup, necesitábamos movernos rápido sin comprometer la calidad. Johann entiende perfectamente ese balance. Entregó un MVP sólido en 6 semanas que nos permitió levantar nuestra primera ronda de inversión. Altamente recomendado.",
    textEn:
      "As a startup, we needed to move fast without compromising quality. Johann perfectly understands that balance. He delivered a solid MVP in 6 weeks that allowed us to raise our first investment round. Highly recommended.",
  },
];

export default function Testimonials() {
  const { locale } = useI18n();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-16 sm:py-28 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block bg-[#0F2544]/8 text-[#0F2544] text-sm font-semibold px-4 py-1.5 rounded-full mb-5">
            {locale === "es" ? "Testimonios" : "Testimonials"}
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-[#0F2544] leading-tight mb-4">
            {locale === "es"
              ? "Lo que dicen\nmis clientes"
              : "What my clients\nsay"}
          </h2>
          <div className="flex items-center justify-center gap-1.5 mt-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={18}
                className="text-[#C9A844] fill-[#C9A844]"
              />
            ))}
            <span className="text-gray-500 text-sm ml-2">
              5.0 · {locale === "es" ? "30+ clientes" : "30+ clients"}
            </span>
          </div>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.nameEs}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col"
            >
              {/* Quote icon */}
              <Quote size={32} className="text-[#C9A844]/30 mb-4 shrink-0" />

              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(t.stars)].map((_, si) => (
                  <Star
                    key={si}
                    size={14}
                    className="text-[#C9A844] fill-[#C9A844]"
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-8 italic">
                &ldquo;{locale === "es" ? t.textEs : t.textEn}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-5 border-t border-gray-100">
                <div
                  className={`w-11 h-11 rounded-full ${t.color} flex items-center justify-center text-white font-bold text-sm shrink-0`}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="font-semibold text-[#0F2544] text-sm">
                    {locale === "es" ? t.nameEs : t.nameEn}
                  </p>
                  <p className="text-gray-400 text-xs mt-0.5">
                    {locale === "es" ? t.roleEs : t.roleEn}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom trust note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-400 text-sm">
            {locale === "es"
              ? "Todos los testimonios son de clientes reales. Puedo dar referencias adicionales bajo solicitud."
              : "All testimonials are from real clients. I can provide additional references upon request."}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
