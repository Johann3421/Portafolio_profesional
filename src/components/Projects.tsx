"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Code2, ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const projects = [
  {
    titleKey: "projects.p1.title",
    descKey: "projects.p1.desc",
    tags: ["projects.p1.tag1", "projects.p1.tag2", "projects.p1.tag3", "projects.p1.tag4"],
    accent: "from-[#0F2544] to-[#1E3A5F]",
    category: "SaaS",
  },
  {
    titleKey: "projects.p2.title",
    descKey: "projects.p2.desc",
    tags: ["projects.p2.tag1", "projects.p2.tag2", "projects.p2.tag3", "projects.p2.tag4"],
    accent: "from-[#C9A844] to-[#E8C56A]",
    category: "AI",
  },
  {
    titleKey: "projects.p3.title",
    descKey: "projects.p3.desc",
    tags: ["projects.p3.tag1", "projects.p3.tag2", "projects.p3.tag3", "projects.p3.tag4"],
    accent: "from-[#1E3A5F] to-[#2D5F8A]",
    category: "Mobile",
  },
];

export default function Projects() {
  const { t } = useI18n();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="projects"
      className="py-16 sm:py-28 bg-gradient-to-b from-gray-50 to-white"
    >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-16"
        >
          <span className="inline-block bg-[#0F2544]/8 text-[#0F2544] text-sm font-semibold px-4 py-1.5 rounded-full mb-5">
            {t("projects.badge")}
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-[#0F2544] leading-tight mb-5">
            {t("projects.title")
              .split("\n")
              .map((line, i) => (
                <span key={i}>
                  {line}
                  {i === 0 && <br />}
                </span>
              ))}
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            {t("projects.subtitle")}
          </p>
        </motion.div>

        {/* Projects grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.article
              key={project.titleKey}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              className="group bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              {/* Card header */}
              <div
                className={`h-52 bg-gradient-to-br ${project.accent} relative flex items-center justify-center`}
              >
                {/* Pattern */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
                    backgroundSize: "20px 20px",
                  }}
                />
                {/* Category badge */}
                <div className="absolute top-5 left-5">
                  <span className="bg-white/20 text-white backdrop-blur-sm text-xs font-bold px-3 py-1.5 rounded-full border border-white/30">
                    {project.category}
                  </span>
                </div>
                {/* Action buttons */}
                <div className="absolute top-5 right-5 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <a
                    href="#"
                    aria-label="View project"
                    className="w-9 h-9 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
                  >
                    <ExternalLink size={15} className="text-white" />
                  </a>
                  <a
                    href="#"
                    aria-label="View code"
                    className="w-9 h-9 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
                  >
                    <Code2 size={15} className="text-white" />
                  </a>
                </div>
                {/* Title inside header */}
                <h3 className="text-xl font-bold text-white text-center px-8 leading-snug drop-shadow">
                  {t(project.titleKey)}
                </h3>
              </div>

              {/* Card body */}
              <div className="p-7">
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  {t(project.descKey)}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tagKey) => (
                    <span
                      key={tagKey}
                      className="bg-gray-100 text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-lg"
                    >
                      {t(tagKey)}
                    </span>
                  ))}
                </div>

                <a
                  href="#contact"
                  className="inline-flex items-center gap-1.5 text-[#0F2544] text-sm font-semibold hover:text-[#C9A844] transition-colors"
                >
                  {t("projects.view")}
                  <ArrowRight size={14} />
                </a>
              </div>
            </motion.article>
          ))}
        </div>

        {/* More projects CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-14"
        >
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-8 py-4 border-2 border-[#0F2544] text-[#0F2544] font-semibold rounded-xl hover:bg-[#0F2544] hover:text-white transition-all"
          >
            <Code2 size={20} />
            {t("projects.more")}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
