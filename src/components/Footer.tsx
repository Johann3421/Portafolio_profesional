"use client";

import { useI18n } from "@/lib/i18n";
import { Briefcase, Code2, AtSign, Mail } from "lucide-react";

const navLinks = [
  { key: "nav.about", href: "#about" },
  { key: "nav.services", href: "#services" },
  { key: "nav.stack", href: "#stack" },
  { key: "nav.projects", href: "#projects" },
  { key: "nav.contact", href: "#contact" },
];

const socials = [
  { href: "https://linkedin.com", icon: Briefcase, label: "LinkedIn" },
  { href: "https://github.com", icon: Code2, label: "GitHub" },
  { href: "https://twitter.com", icon: AtSign, label: "Twitter" },
  { href: "mailto:contact@abadgroup.tech", icon: Mail, label: "Email" },
];

export default function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#080F1A] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-[#0F2544] rounded-lg flex items-center justify-center border border-white/10">
                <span className="text-white font-bold text-base">JA</span>
              </div>
              <div>
                <p className="font-bold text-white">Johann Abad</p>
                <p className="text-white/50 text-xs">Full Stack & AI Engineer</p>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-xs">
              {t("hero.subtitle").slice(0, 120)}...
            </p>
            <div className="flex gap-3">
              {socials.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className="w-9 h-9 bg-white/5 hover:bg-white/10 rounded-lg flex items-center justify-center text-white/50 hover:text-white transition-all"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-bold text-white/80 uppercase tracking-wider mb-5">
              {t("footer.nav")}
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    className="text-white/50 hover:text-white text-sm transition-colors"
                  >
                    {t(link.key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold text-white/80 uppercase tracking-wider mb-5">
              {t("contact.info_title")}
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:contact@abadgroup.tech"
                  className="text-white/50 hover:text-white text-sm transition-colors"
                >
                  contact@abadgroup.tech
                </a>
              </li>
              <li>
                <span className="text-white/50 text-sm">
                  {t("contact.location")}
                </span>
              </li>
              <li>
                <a
                  href="https://abadgroup.tech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#C9A844] text-sm hover:text-[#E8C56A] transition-colors font-medium"
                >
                  abadgroup.tech
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-sm">
            © {year} Johann Abad. {t("footer.rights")}
          </p>
          <p className="text-white/20 text-xs">{t("footer.built")}</p>
        </div>
      </div>
    </footer>
  );
}
