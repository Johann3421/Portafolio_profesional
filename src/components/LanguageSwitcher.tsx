"use client";

import { useI18n, Locale } from "@/lib/i18n";

export default function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();

  const toggle = (lang: Locale) => {
    setLocale(lang);
  };

  return (
    <div className="flex items-center bg-gray-100 rounded-lg p-0.5 gap-0.5">
      {(["es", "en"] as Locale[]).map((lang) => (
        <button
          key={lang}
          onClick={() => toggle(lang)}
          className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
            locale === lang
              ? "bg-[#0F2544] text-white shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
