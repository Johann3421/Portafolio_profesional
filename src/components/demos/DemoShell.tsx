"use client";

import Link from "next/link";
import { ArrowLeft, Zap, Lock } from "lucide-react";

interface Props {
  title: string;
  subtitle: string;
  trialUsed: number;
  trialMax: number;
  priceLabel: string;
  children: React.ReactNode;
}

export default function DemoShell({
  title,
  subtitle,
  trialUsed,
  trialMax,
  priceLabel,
  children,
}: Props) {
  const remaining = trialMax - trialUsed;
  const pct = Math.min((trialUsed / trialMax) * 100, 100);
  const isExhausted = remaining <= 0;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top bar */}
      <header className="bg-[#0F2544] border-b border-white/10 px-4 sm:px-6 py-3 flex items-center gap-3 shrink-0 z-20">
        <Link
          href="/demos"
          className="flex items-center gap-1 text-white/50 hover:text-white text-sm transition-colors shrink-0"
        >
          <ArrowLeft size={14} />
          <span className="hidden sm:inline">Demos</span>
        </Link>
        <div className="flex-1 min-w-0">
          <span className="text-white font-semibold text-sm">{title}</span>
          <span className="hidden md:inline text-white/40 text-xs ml-2">
            {subtitle}
          </span>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          {/* Trial progress */}
          <div className="hidden sm:flex items-center gap-2">
            <div className="w-20 h-1.5 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${pct}%`,
                  background: isExhausted
                    ? "#ef4444"
                    : pct > 70
                    ? "#f59e0b"
                    : "#C9A844",
                }}
              />
            </div>
            <span
              className={`text-xs font-medium ${
                isExhausted
                  ? "text-red-400"
                  : remaining <= 3
                  ? "text-amber-400"
                  : "text-white/50"
              }`}
            >
              {remaining}/{trialMax}
            </span>
          </div>
          {isExhausted ? (
            <a
              href="/#contact"
              className="flex items-center gap-1.5 bg-red-500 hover:bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap"
            >
              <Lock size={11} />
              Límite alcanzado
            </a>
          ) : (
            <a
              href="/#contact"
              className="flex items-center gap-1.5 bg-[#C9A844] hover:bg-[#b8962f] text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap"
            >
              <Zap size={11} />
              Obtener acceso completo
            </a>
          )}
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 overflow-hidden">{children}</div>

      {/* Bottom CTA */}
      <footer className="bg-white border-t border-gray-200 px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-start sm:items-center gap-2 justify-between shrink-0">
        <div>
          <p className="font-semibold text-[#0F2544] text-sm">
            🚀 ¿Quieres esta solución para tu empresa?
          </p>
          <p className="text-gray-400 text-xs mt-0.5">
            {priceLabel} · Sin contrato de permanencia · Soporte incluido
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/demos"
            className="text-xs text-gray-500 hover:text-gray-700 px-3 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            Ver otros demos
          </Link>
          <a
            href="/#contact"
            className="text-xs bg-[#0F2544] text-white font-semibold px-4 py-2 rounded-lg hover:bg-[#1a3a6b] transition-colors whitespace-nowrap"
          >
            Iniciar proyecto →
          </a>
        </div>
      </footer>
    </div>
  );
}
