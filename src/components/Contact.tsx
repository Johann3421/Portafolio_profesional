"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Mail,
  MapPin,
  Clock,
  Send,
  Briefcase,
  Code2,
  AtSign,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";

export default function Contact() {
  const { t } = useI18n();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    // Simulate sending — replace with actual API call
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("done");
    setForm({ name: "", email: "", company: "", message: "" });
  };

  const inputClass =
    "w-full px-4 py-3.5 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-[#0F2544]/30 focus:border-[#0F2544] transition-all";

  return (
    <section
      id="contact"
      className="py-16 sm:py-28 bg-gradient-to-br from-[#0F2544] to-[#1E3A5F]"
    >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block bg-white/10 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
              {t("contact.badge")}
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
              {t("contact.title")
                .split("\n")
                .map((line, i) => (
                  <span key={i}>
                    {line}
                    {i === 0 && <br />}
                  </span>
                ))}
            </h2>
            <p className="text-white/70 text-lg leading-relaxed mb-12">
              {t("contact.subtitle")}
            </p>

            {/* Contact info */}
            <div className="space-y-5 mb-12">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                  <Mail size={20} className="text-[#C9A844]" />
                </div>
                <div>
                  <p className="text-white/50 text-xs uppercase tracking-wider">
                    Email
                  </p>
                  <a
                    href="mailto:contact@abadgroup.tech"
                    className="text-white font-medium hover:text-[#C9A844] transition-colors"
                  >
                    contact@abadgroup.tech
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                  <MapPin size={20} className="text-[#C9A844]" />
                </div>
                <div>
                  <p className="text-white/50 text-xs uppercase tracking-wider">
                    {t("contact.location").split("/")[0].trim()}
                  </p>
                  <p className="text-white font-medium">
                    {t("contact.location")}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                  <Clock size={20} className="text-[#C9A844]" />
                </div>
                <div>
                  <p className="text-white/50 text-xs uppercase tracking-wider">
                    Respuesta
                  </p>
                  <p className="text-white font-medium">
                    {t("contact.response")}
                  </p>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="flex gap-3">
              {[
                { href: "https://linkedin.com", icon: Briefcase, label: "LinkedIn" },
                { href: "https://github.com", icon: Code2, label: "GitHub" },
                { href: "https://twitter.com", icon: AtSign, label: "Twitter" },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center text-white/70 hover:text-white transition-all"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-2xl">
              {status === "done" ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                    <Send size={28} className="text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0F2544] mb-2">
                    {t("contact.success")}
                  </h3>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">
                        {t("contact.name")}
                      </label>
                      <input
                        name="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Johann Abad"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">
                        {t("contact.email")}
                      </label>
                      <input
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="correo@empresa.com"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">
                      {t("contact.company")}
                    </label>
                    <input
                      name="company"
                      type="text"
                      value={form.company}
                      onChange={handleChange}
                      placeholder="Mi Empresa S.A."
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">
                      {t("contact.message")}
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder={t("contact.message") + "..."}
                      className={inputClass + " resize-none"}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full flex items-center justify-center gap-2.5 px-6 py-4 bg-[#0F2544] hover:bg-[#1E3A5F] text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl disabled:opacity-70"
                  >
                    {status === "sending" ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                        {t("contact.sending")}
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        {t("contact.send")}
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
