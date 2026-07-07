"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { CheckCircle2, Download } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const values = [
  "about.value1",
  "about.value2",
  "about.value3",
  "about.value4",
];

export default function About() {
  const { t } = useI18n();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-16 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: Image / visual */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#0F2544] to-[#1E3A5F] aspect-square max-w-lg mx-auto shadow-2xl">
              {/* Dot matrix */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
                  backgroundSize: "24px 24px",
                }}
              />
              {/* Real photo from stock */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop"
                alt="About Johann Abad"
                className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-90"
              />
              {/* Bottom bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C9A844] to-[#F0D080]" />
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="absolute -bottom-6 -right-4 bg-[#C9A844] rounded-2xl shadow-xl p-5 text-center"
            >
              <p className="text-3xl font-bold text-white">30+</p>
              <p className="text-white/80 text-xs mt-1">{t("stats.clients")}</p>
            </motion.div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            {/* Badge */}
            <span className="inline-block bg-[#0F2544]/8 text-[#0F2544] text-sm font-semibold px-4 py-1.5 rounded-full mb-5">
              {t("about.badge")}
            </span>

            {/* Title */}
            <h2 className="text-4xl lg:text-5xl font-bold text-[#0F2544] leading-tight mb-6">
              {t("about.title")
                .split("\n")
                .map((line, i) => (
                  <span key={i}>
                    {line}
                    {i === 0 && <br />}
                  </span>
                ))}
            </h2>

            {/* Paragraphs */}
            <p className="text-gray-600 leading-relaxed mb-5">
              {t("about.p1")}
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              {t("about.p2")}
            </p>

            {/* Values */}
            <div className="grid grid-cols-2 gap-3 mb-10">
              {values.map((key) => (
                <div
                  key={key}
                  className="flex items-center gap-2.5 bg-gray-50 rounded-xl px-4 py-3"
                >
                  <CheckCircle2 size={18} className="text-[#C9A844] shrink-0" />
                  <span className="text-sm font-medium text-gray-700">
                    {t(key)}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a
              href="/cv-johann-abad.pdf"
              download
              className="inline-flex items-center gap-2.5 px-7 py-3.5 border-2 border-[#0F2544] text-[#0F2544] font-semibold rounded-xl hover:bg-[#0F2544] hover:text-white transition-all"
            >
              <Download size={18} />
              {t("about.cta")}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
