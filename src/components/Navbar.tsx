"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import LanguageSwitcher from "./LanguageSwitcher";

const navLinks = [
  { key: "nav.about", href: "#about" },
  { key: "nav.services", href: "#services" },
  { key: "nav.stack", href: "#stack" },
  { key: "nav.projects", href: "#projects" },
  { key: "nav.demos", href: "/demos", isPage: true },
  { key: "nav.contact", href: "#contact" },
];

export default function Navbar() {
  const { t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-navy-900 rounded-lg flex items-center justify-center bg-[#0F2544] shadow-md group-hover:shadow-lg transition-shadow">
            <span className="text-white font-bold text-base tracking-tight">
              JA
            </span>
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-[#0F2544] leading-none">
              Johann Abad
            </p>
            <p className="text-xs text-gray-500 leading-none mt-0.5">
              Full Stack & AI Engineer
            </p>
          </div>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.key}>
              <a
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-[#0F2544] hover:bg-gray-50 rounded-lg transition-all"
              >
                {t(link.key)}
              </a>
            </li>
          ))}
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <a
            href="#contact"
            className="hidden lg:inline-flex items-center px-5 py-2.5 bg-[#0F2544] text-white text-sm font-semibold rounded-lg hover:bg-[#1E3A5F] transition-colors shadow-sm"
          >
            {t("nav.cta")}
          </a>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-white border-t border-gray-100 px-6 pb-6"
          >
            <ul className="mt-4 space-y-1">
              {navLinks.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block px-4 py-3 text-sm font-medium text-gray-700 hover:text-[#0F2544] hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    {t(link.key)}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-4 w-full flex items-center justify-center px-5 py-3 bg-[#0F2544] text-white text-sm font-semibold rounded-lg"
            >
              {t("nav.cta")}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
