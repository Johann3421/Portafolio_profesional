"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import {
  MessageCircle,
  Bot,
  ShoppingBag,
  BarChart2,
  GitBranch,
  Users,
  ArrowRight,
  Play,
  Zap,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";

const demos = [
  {
    slug: "whatsapp",
    icon: MessageCircle,
    color: "bg-green-100 text-green-600",
    title: "WhatsApp Business API",
    preview: "Panel Evolution API",
    tag: "Más popular",
  },
  {
    slug: "ai-chat",
    icon: Bot,
    color: "bg-violet-100 text-violet-600",
    title: "Asistente con IA",
    preview: "Chatbot personalizable",
  },
  {
    slug: "ecommerce",
    icon: ShoppingBag,
    color: "bg-blue-100 text-blue-600",
    title: "Gestión E-Commerce",
    preview: "Admin panel + tienda",
  },
  {
    slug: "analytics",
    icon: BarChart2,
    color: "bg-emerald-100 text-emerald-600",
    title: "Analytics Dashboard",
    preview: "Métricas en tiempo real",
  },
  {
    slug: "automation",
    icon: GitBranch,
    color: "bg-amber-100 text-amber-600",
    title: "Automatización",
    preview: "Visual workflow builder",
  },
  {
    slug: "crm",
    icon: Users,
    color: "bg-rose-100 text-rose-600",
    title: "CRM & Pipeline",
    preview: "Gestión de ventas",
  },
];

export default function DemosSection() {
  const { locale } = useI18n();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="demos" className="py-16 sm:py-28 bg-[#0F2544] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <span className="inline-flex items-center gap-2 bg-[#C9A844]/20 border border-[#C9A844]/30 text-[#C9A844] text-sm font-semibold px-4 py-2 rounded-full mb-5">
            <Zap size={13} />
            {locale === "es" ? "Demos gratuitos" : "Free demos"}
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
            {locale === "es" ? "Prueba antes\nde contratar" : "Try before\nyou hire"}
          </h2>
          <p className="text-white/60 text-lg leading-relaxed">
            {locale === "es"
              ? "6 demos interactivos y funcionales. Explora cada solución sin registro ni tarjeta de crédito."
              : "6 interactive and functional demos. Explore every solution with no sign-up or credit card."}
          </p>
        </motion.div>

        {/* Demo grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-10">
          {demos.map((d, i) => (
            <motion.div
              key={d.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.07 }}
            >
              <Link
                href={`/demos/${d.slug}`}
                className="group flex flex-col bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-2xl p-4 sm:p-5 transition-all duration-200 h-full"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-10 h-10 ${d.color} rounded-xl flex items-center justify-center`}>
                    <d.icon size={20} />
                  </div>
                  {d.tag && (
                    <span className="text-xs font-bold bg-[#C9A844] text-white px-2 py-0.5 rounded-full">
                      {d.tag}
                    </span>
                  )}
                </div>
                <p className="font-bold text-white text-sm mb-0.5">{d.title}</p>
                <p className="text-white/40 text-xs mb-3 flex-1">{d.preview}</p>
                <div className="flex items-center gap-1.5 text-[#C9A844] text-xs font-bold group-hover:gap-2.5 transition-all">
                  <Play size={11} className="fill-[#C9A844]" />
                  {locale === "es" ? "Probar gratis" : "Try free"}
                  <ArrowRight size={11} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center"
        >
          <Link
            href="/demos"
            className="inline-flex items-center gap-2 bg-[#C9A844] hover:bg-[#b8962f] text-white font-bold px-8 py-4 rounded-xl transition-colors text-sm"
          >
            {locale === "es" ? "Ver todos los demos" : "See all demos"}
            <ArrowRight size={15} />
          </Link>
          <p className="text-white/30 text-xs mt-3">
            {locale === "es"
              ? "Sin registro · Sin tarjeta de crédito · Acceso inmediato"
              : "No sign-up · No credit card · Instant access"}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
