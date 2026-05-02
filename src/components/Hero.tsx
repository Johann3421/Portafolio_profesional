"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowRight, MessageCircle, CheckCircle2, Download } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const stats = [
  { value: "5+", key: "stats.experience" },
  { value: "50+", key: "stats.projects" },
  { value: "30+", key: "stats.clients" },
  { value: "98%", key: "stats.satisfaction" },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" as const },
  }),
};

export default function Hero() {
  const { t } = useI18n();

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-gradient-to-br from-[#F8FAFC] via-white to-[#EEF2FF]"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(#0F2544 1px, transparent 1px), linear-gradient(90deg, #0F2544 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        {/* Accent circles */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#C9A844]/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-32 w-80 h-80 bg-[#0F2544]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-[#C9A844]/8 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 sm:py-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: Text content */}
          <div>
            {/* Available badge */}
            <motion.div
              custom={0}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-full px-4 py-2 mb-8"
            >
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-emerald-700 text-sm font-medium">
                {t("hero.available")} &mdash; {" "}
                <span className="font-bold">
                  {new Date().toLocaleString("es", { month: "long" })}{" "}
                  {new Date().getFullYear()}
                </span>
              </span>
            </motion.div>

            {/* Greeting + Name */}
            <motion.p
              custom={1}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="text-lg font-medium text-gray-500 mb-2"
            >
              {t("hero.greeting")}
            </motion.p>
            <motion.h1
              custom={2}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#0F2544] leading-none tracking-tight mb-4"
            >
              {t("hero.name")}
            </motion.h1>

            {/* Title */}
            <motion.h2
              custom={3}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="text-lg sm:text-xl lg:text-2xl font-semibold text-[#C9A844] mb-6 leading-tight"
            >
              {t("hero.title")
                .split("\n")
                .map((line, i) => (
                  <span key={i}>
                    {line}
                    {i === 0 && <br />}
                  </span>
                ))}
            </motion.h2>

            {/* Description */}
            <motion.p
              custom={4}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="text-gray-600 text-base sm:text-lg leading-relaxed mb-8 sm:mb-10 max-w-xl"
            >
              {t("hero.subtitle")}
            </motion.p>

            {/* CTAs */}
            <motion.div
              custom={5}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="flex flex-wrap gap-4"
            >
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#0F2544] text-white font-semibold rounded-xl hover:bg-[#1E3A5F] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                {t("hero.cta_primary")}
                <ArrowRight size={18} />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-[#0F2544] text-[#0F2544] font-semibold rounded-xl hover:bg-[#0F2544] hover:text-white transition-all"
              >
                <MessageCircle size={18} />
                {t("hero.cta_secondary")}
              </a>
            </motion.div>
          </div>

          {/* Right: Profile card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            className="relative flex justify-center hidden lg:flex"
          >
            {/* Main card */}
            <div className="relative w-full max-w-md">
              {/* Profile image area */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-100 bg-gradient-to-br from-[#0F2544] to-[#1E3A5F] aspect-[4/5]">
                {/* Decorative pattern */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `radial-gradient(circle at 25% 25%, white 1px, transparent 1px)`,
                    backgroundSize: "30px 30px",
                  }}
                />
                {/* Initials placeholder (replace with real photo) */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="w-40 h-40 rounded-full border-4 border-[#C9A844]/40 bg-white/10 flex items-center justify-center backdrop-blur-sm mb-6">
                    <span className="text-6xl font-bold text-white/80">
                      JA
                    </span>
                  </div>
                  <p className="text-white/60 text-sm">
                    Full Stack & AI Engineer
                  </p>
                </div>
                {/* Gold accent strip */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C9A844] to-[#F0D080]" />
              </div>

              {/* Floating experience card */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="absolute -left-8 top-12 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 min-w-[140px]"
              >
                <p className="text-3xl font-bold text-[#0F2544]">5+</p>
                <p className="text-xs text-gray-500 mt-1 leading-tight">
                  {t("stats.experience")}
                </p>
              </motion.div>

              {/* Floating projects card */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                className="absolute -right-8 bottom-20 bg-[#C9A844] rounded-2xl shadow-xl p-4 min-w-[140px]"
              >
                <p className="text-3xl font-bold text-white">50+</p>
                <p className="text-xs text-white/80 mt-1 leading-tight">
                  {t("stats.projects")}
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-12 sm:mt-20 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 border-t border-gray-100 pt-8 sm:pt-10"
        >
          {stats.map((stat, i) => (
            <div
              key={stat.key}
              className={`text-center ${i < 3 ? "lg:border-r border-gray-100" : ""}`}
            >
              <p className="text-4xl font-bold text-[#0F2544]">{stat.value}</p>
              <p className="text-sm text-gray-500 mt-1">{t(stat.key)}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
