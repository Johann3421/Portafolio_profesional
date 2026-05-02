"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MessageSquare, Search, Code2, Rocket } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const steps = [
  {
    number: "01",
    icon: MessageSquare,
    titleEs: "Consulta gratuita",
    titleEn: "Free consultation",
    descEs:
      "Conversamos sobre tu proyecto, objetivos y necesidades. Sin compromiso, sin costo. Te doy una evaluación honesta de lo que se puede lograr.",
    descEn:
      "We talk about your project, goals, and needs. No commitment, no cost. I give you an honest assessment of what can be achieved.",
  },
  {
    number: "02",
    icon: Search,
    titleEs: "Análisis & propuesta",
    titleEn: "Analysis & proposal",
    descEs:
      "Estudio el problema en profundidad, defino el stack tecnológico ideal y presento una propuesta detallada con alcance, tiempos y costos.",
    descEn:
      "I study the problem in depth, define the ideal tech stack, and present a detailed proposal with scope, timeline, and costs.",
  },
  {
    number: "03",
    icon: Code2,
    titleEs: "Desarrollo iterativo",
    titleEn: "Iterative development",
    descEs:
      "Trabajo en sprints cortos con entregas frecuentes. Tienes visibilidad total del progreso y puedes dar feedback en cada etapa.",
    descEn:
      "I work in short sprints with frequent deliveries. You have full visibility into progress and can give feedback at each stage.",
  },
  {
    number: "04",
    icon: Rocket,
    titleEs: "Entrega & soporte",
    titleEn: "Delivery & support",
    descEs:
      "Despliego en producción, transfiero el código documentado y ofrezco soporte post-lanzamiento para garantizar el éxito del proyecto.",
    descEn:
      "I deploy to production, transfer documented code, and provide post-launch support to ensure project success.",
  },
];

export default function Process() {
  const { locale } = useI18n();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-16 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block bg-[#C9A844]/10 text-[#C9A844] text-sm font-bold px-4 py-1.5 rounded-full mb-5 uppercase tracking-wider">
            {locale === "es" ? "Cómo trabajo" : "How I work"}
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-[#0F2544] leading-tight mb-4">
            {locale === "es"
              ? "Proceso claro,\nresultados predecibles"
              : "Clear process,\npredictable results"}
          </h2>
          <p className="text-gray-600 text-lg">
            {locale === "es"
              ? "Transparencia total desde el primer día. Sabes exactamente qué esperar en cada paso."
              : "Full transparency from day one. You know exactly what to expect at every step."}
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 relative">
          {/* Connecting line (desktop only) */}
          <div className="hidden lg:block absolute top-14 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-[#C9A844]/20 via-[#C9A844]/60 to-[#C9A844]/20 z-0" />

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                className="relative z-10 bg-white rounded-2xl border border-gray-100 p-7 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center"
              >
                {/* Step number */}
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#0F2544] text-[#C9A844] font-bold text-sm mb-5 mx-auto">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="flex justify-center mb-4">
                  <div className="w-14 h-14 bg-[#C9A844]/10 rounded-2xl flex items-center justify-center">
                    <Icon size={26} className="text-[#C9A844]" />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-[#0F2544] mb-3">
                  {locale === "es" ? step.titleEs : step.titleEn}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {locale === "es" ? step.descEs : step.descEn}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-14"
        >
          <p className="text-gray-500 mb-5 text-sm">
            {locale === "es"
              ? "¿Listo para empezar? La primera consulta es completamente gratuita."
              : "Ready to start? The first consultation is completely free."}
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#C9A844] hover:bg-[#B8962E] text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-sm uppercase tracking-wider"
          >
            {locale === "es" ? "Agendar consulta gratuita" : "Schedule free consultation"}
            <Rocket size={18} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
