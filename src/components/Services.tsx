"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Globe,
  Smartphone,
  BrainCircuit,
  Cloud,
  MessageSquare,
  Layers,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";

const services = [
  {
    icon: Globe,
    titleKey: "services.web.title",
    descKey: "services.web.desc",
    color: "from-blue-50 to-indigo-50",
    iconColor: "text-[#0F2544]",
    iconBg: "bg-blue-100",
  },
  {
    icon: Smartphone,
    titleKey: "services.mobile.title",
    descKey: "services.mobile.desc",
    color: "from-purple-50 to-violet-50",
    iconColor: "text-purple-700",
    iconBg: "bg-purple-100",
  },
  {
    icon: BrainCircuit,
    titleKey: "services.ai.title",
    descKey: "services.ai.desc",
    color: "from-amber-50 to-yellow-50",
    iconColor: "text-amber-700",
    iconBg: "bg-amber-100",
    featured: true,
  },
  {
    icon: Cloud,
    titleKey: "services.cloud.title",
    descKey: "services.cloud.desc",
    color: "from-cyan-50 to-sky-50",
    iconColor: "text-cyan-700",
    iconBg: "bg-cyan-100",
  },
  {
    icon: MessageSquare,
    titleKey: "services.consulting.title",
    descKey: "services.consulting.desc",
    color: "from-emerald-50 to-green-50",
    iconColor: "text-emerald-700",
    iconBg: "bg-emerald-100",
  },
  {
    icon: Layers,
    titleKey: "services.arch.title",
    descKey: "services.arch.desc",
    color: "from-rose-50 to-pink-50",
    iconColor: "text-rose-700",
    iconBg: "bg-rose-100",
  },
];

export default function Services() {
  const { t } = useI18n();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="services"
      className="py-16 sm:py-28 bg-gradient-to-b from-gray-50 to-white"
    >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block bg-[#0F2544]/8 text-[#0F2544] text-sm font-semibold px-4 py-1.5 rounded-full mb-5">
            {t("services.badge")}
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-[#0F2544] leading-tight mb-5">
            {t("services.title")
              .split("\n")
              .map((line, i) => (
                <span key={i}>
                  {line}
                  {i === 0 && <br />}
                </span>
              ))}
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            {t("services.subtitle")}
          </p>
        </motion.div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc, i) => {
            const Icon = svc.icon;
            return (
              <motion.div
                key={svc.titleKey}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                className={`relative group rounded-2xl p-8 border border-gray-100 bg-gradient-to-br ${svc.color} hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-default ${svc.featured ? "ring-2 ring-[#C9A844]/40" : ""}`}
              >
                {svc.featured && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-[#C9A844] text-white text-xs font-bold px-3 py-1 rounded-full">
                      IA
                    </span>
                  </div>
                )}

                <div
                  className={`w-14 h-14 ${svc.iconBg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                >
                  <Icon size={28} className={svc.iconColor} />
                </div>

                <h3 className="text-xl font-bold text-[#0F2544] mb-3">
                  {t(svc.titleKey)}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {t(svc.descKey)}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
