"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useI18n } from "@/lib/i18n";

const stack = [
  {
    categoryKey: "stack.frontend",
    items: [
      { name: "React", color: "bg-blue-50 text-blue-700 border-blue-200" },
      { name: "Next.js", color: "bg-gray-900 text-white border-gray-700" },
      { name: "TypeScript", color: "bg-blue-600 text-white border-blue-500" },
      { name: "Tailwind CSS", color: "bg-cyan-50 text-cyan-700 border-cyan-200" },
      { name: "Vue.js", color: "bg-green-50 text-green-700 border-green-200" },
      { name: "Redux", color: "bg-purple-50 text-purple-700 border-purple-200" },
    ],
  },
  {
    categoryKey: "stack.backend",
    items: [
      { name: "Node.js", color: "bg-green-600 text-white border-green-500" },
      { name: "Python", color: "bg-yellow-50 text-yellow-700 border-yellow-200" },
      { name: "FastAPI", color: "bg-teal-50 text-teal-700 border-teal-200" },
      { name: "Express.js", color: "bg-gray-50 text-gray-700 border-gray-200" },
      { name: "GraphQL", color: "bg-pink-50 text-pink-700 border-pink-200" },
      { name: "REST APIs", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
    ],
  },
  {
    categoryKey: "stack.mobile",
    items: [
      { name: "React Native", color: "bg-blue-50 text-blue-700 border-blue-200" },
      { name: "Expo", color: "bg-gray-900 text-white border-gray-700" },
      { name: "iOS", color: "bg-gray-50 text-gray-700 border-gray-200" },
      { name: "Android", color: "bg-green-50 text-green-700 border-green-200" },
    ],
  },
  {
    categoryKey: "stack.ai",
    items: [
      { name: "OpenAI", color: "bg-gray-900 text-white border-gray-700" },
      { name: "LangChain", color: "bg-amber-50 text-amber-700 border-amber-200" },
      { name: "TensorFlow", color: "bg-orange-50 text-orange-700 border-orange-200" },
      { name: "PyTorch", color: "bg-red-50 text-red-700 border-red-200" },
      { name: "Hugging Face", color: "bg-yellow-50 text-yellow-700 border-yellow-200" },
      { name: "LlamaIndex", color: "bg-purple-50 text-purple-700 border-purple-200" },
    ],
  },
  {
    categoryKey: "stack.cloud",
    items: [
      { name: "Docker", color: "bg-blue-50 text-blue-700 border-blue-200" },
      { name: "Kubernetes", color: "bg-blue-600 text-white border-blue-500" },
      { name: "AWS", color: "bg-amber-50 text-amber-700 border-amber-200" },
      { name: "Nginx", color: "bg-green-50 text-green-700 border-green-200" },
      { name: "CI/CD", color: "bg-violet-50 text-violet-700 border-violet-200" },
      { name: "GitHub Actions", color: "bg-gray-900 text-white border-gray-700" },
    ],
  },
  {
    categoryKey: "stack.db",
    items: [
      { name: "PostgreSQL", color: "bg-blue-50 text-blue-700 border-blue-200" },
      { name: "MongoDB", color: "bg-green-50 text-green-700 border-green-200" },
      { name: "Redis", color: "bg-red-50 text-red-700 border-red-200" },
      { name: "MySQL", color: "bg-orange-50 text-orange-700 border-orange-200" },
      { name: "Supabase", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    ],
  },
];

export default function TechStack() {
  const { t } = useI18n();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="stack" className="py-16 sm:py-28 bg-white">
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
            {t("stack.badge")}
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-[#0F2544] leading-tight">
            {t("stack.title")
              .split("\n")
              .map((line, i) => (
                <span key={i}>
                  {line}
                  {i === 0 && <br />}
                </span>
              ))}
          </h2>
        </motion.div>

        {/* Stack grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stack.map((category, ci) => (
            <motion.div
              key={category.categoryKey}
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + ci * 0.07 }}
              className="bg-gray-50 rounded-2xl p-6 border border-gray-100"
            >
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-5">
                {t(category.categoryKey)}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.items.map((tech) => (
                  <span
                    key={tech.name}
                    className={`inline-flex items-center px-3.5 py-1.5 rounded-lg text-sm font-semibold border ${tech.color} transition-transform hover:scale-105`}
                  >
                    {tech.name}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
