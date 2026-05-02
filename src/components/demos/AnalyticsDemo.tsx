"use client";

import { useState, useEffect } from "react";
import DemoShell from "./DemoShell";
import { Users, Eye, Clock, TrendingUp, TrendingDown, Globe, Smartphone, Monitor, Lock, RefreshCw } from "lucide-react";

const MONTHS = ["Nov", "Dic", "Ene", "Feb", "Mar", "Abr"];
const VISITS = [3200, 4100, 3800, 5200, 6100, 7843];
const SESSIONS = [2100, 2900, 2600, 3800, 4500, 5912];

const PAGES = [
  { path: "/inicio", views: 7843, avg: "2m 14s", bounce: "32%" },
  { path: "/servicios", views: 4120, avg: "3m 01s", bounce: "28%" },
  { path: "/contacto", views: 2891, avg: "1m 45s", bounce: "18%" },
  { path: "/nosotros", views: 1934, avg: "1m 52s", bounce: "41%" },
  { path: "/blog/whatsapp-api", views: 1203, avg: "4m 12s", bounce: "22%" },
];

const CHANNELS = [
  { name: "Orgánico (SEO)", pct: 44, color: "#0F2544", visits: 3451 },
  { name: "Redes Sociales", pct: 27, color: "#C9A844", visits: 2117 },
  { name: "Directo", pct: 17, color: "#10b981", visits: 1333 },
  { name: "Referido", pct: 8, color: "#6366f1", visits: 627 },
  { name: "Email", pct: 4, color: "#f59e0b", visits: 315 },
];

function DonutChart({ data }: { data: typeof CHANNELS }) {
  const r = 38;
  const circ = 2 * Math.PI * r;
  let offset = 0;
  return (
    <svg viewBox="0 0 100 100" className="w-32 h-32">
      {data.map((d) => {
        const dash = (d.pct / 100) * circ;
        const gap = circ - dash;
        const seg = (
          <circle
            key={d.name}
            cx={50} cy={50} r={r}
            fill="none"
            stroke={d.color}
            strokeWidth={16}
            strokeDasharray={`${dash} ${gap}`}
            strokeDashoffset={-offset}
            transform="rotate(-90 50 50)"
          />
        );
        offset += dash;
        return seg;
      })}
      <circle cx={50} cy={50} r={24} fill="white" />
    </svg>
  );
}

function AreaChart({ data }: { data: number[] }) {
  const max = Math.max(...data);
  const w = 400;
  const h = 80;
  const pts = data.map((v, i) => ({ x: (i / (data.length - 1)) * w, y: h - (v / max) * h * 0.85 }));
  const path = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const area = path + ` L ${w} ${h} L 0 ${h} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-20" preserveAspectRatio="none">
      <defs>
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0F2544" stopOpacity={0.15} />
          <stop offset="100%" stopColor="#0F2544" stopOpacity={0} />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#areaGrad)" />
      <path d={path} fill="none" stroke="#0F2544" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
      {pts.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={3} fill="#0F2544" />
      ))}
    </svg>
  );
}

export default function AnalyticsDemo() {
  const [liveVisitors, setLiveVisitors] = useState(23);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setLiveVisitors((v) => Math.max(15, Math.min(40, v + (Math.random() > 0.5 ? 1 : -1))));
    }, 3000);
    return () => clearInterval(t);
  }, []);

  const refresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1200);
  };

  return (
    <DemoShell
      title="Analytics Dashboard"
      subtitle="Métricas & Business Intelligence"
      trialUsed={0}
      trialMax={1}
      priceLabel="Desde $149/mes · Datos en tiempo real"
    >
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-50 h-[calc(100vh-112px)]">
        <div className="max-w-5xl mx-auto space-y-5">

          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold text-[#0F2544]">Resumen general</h2>
              <p className="text-sm text-gray-400 mt-0.5">Últimos 30 días · abadgroup.tech</p>
            </div>
            <div className="flex items-center gap-3">
              {/* Live indicator */}
              <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="font-bold text-gray-800">{liveVisitors}</span>
                <span className="text-gray-400 text-xs">en vivo</span>
              </div>
              <button onClick={refresh} className={`p-2 bg-white border border-gray-200 rounded-xl text-gray-500 hover:bg-gray-50 transition-colors ${refreshing ? "animate-spin" : ""}`}>
                <RefreshCw size={14} />
              </button>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Visitas únicas", value: "7,843", delta: "+24%", up: true, icon: Users },
              { label: "Sesiones", value: "5,912", delta: "+18%", up: true, icon: Eye },
              { label: "Tiempo promedio", value: "2m 34s", delta: "+12s", up: true, icon: Clock },
              { label: "Tasa de rebote", value: "31.4%", delta: "−5.2%", up: true, icon: TrendingDown },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-9 h-9 bg-[#0F2544]/8 text-[#0F2544] rounded-xl flex items-center justify-center">
                    <s.icon size={16} />
                  </div>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${s.up ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"}`}>
                    {s.delta}
                  </span>
                </div>
                <p className="text-2xl font-bold text-[#0F2544]">{s.value}</p>
                <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Area chart */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-[#0F2544]">Visitantes únicos</h3>
              <div className="flex gap-3 text-xs">
                <span className="flex items-center gap-1.5 text-gray-500"><span className="w-3 h-0.5 bg-[#0F2544] rounded inline-block" /> Visitas</span>
                <span className="flex items-center gap-1.5 text-gray-400"><span className="w-3 h-0.5 bg-[#C9A844] rounded inline-block" /> Sesiones</span>
              </div>
            </div>
            <AreaChart data={VISITS} />
            <div className="flex justify-between mt-2">
              {MONTHS.map((m) => (
                <span key={m} className="text-xs text-gray-400">{m}</span>
              ))}
            </div>
          </div>

          {/* Channels + pages */}
          <div className="grid lg:grid-cols-2 gap-5">
            {/* Channels donut */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-bold text-[#0F2544] mb-5">Fuentes de tráfico</h3>
              <div className="flex items-center gap-6">
                <DonutChart data={CHANNELS} />
                <div className="flex-1 space-y-2">
                  {CHANNELS.map((c) => (
                    <div key={c.name} className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: c.color }} />
                      <span className="text-xs text-gray-600 flex-1 truncate">{c.name}</span>
                      <span className="text-xs font-bold text-gray-800">{c.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Top pages */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-bold text-[#0F2544] mb-5">Páginas más visitadas</h3>
              <div className="space-y-3">
                {PAGES.map((p, i) => (
                  <div key={p.path} className="flex items-center gap-3">
                    <span className="text-xs font-bold text-gray-300 w-4 shrink-0">{i + 1}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-mono text-gray-700 truncate">{p.path}</span>
                        <span className="text-xs font-bold text-gray-800 shrink-0 ml-2">{p.views.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-1.5">
                        <div
                          className="h-1.5 rounded-full bg-[#0F2544]"
                          style={{ width: `${(p.views / PAGES[0].views) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Devices */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-bold text-[#0F2544] mb-5">Dispositivos</h3>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Móvil", pct: 58, icon: Smartphone, color: "bg-blue-100 text-blue-600" },
                { label: "Desktop", pct: 34, icon: Monitor, color: "bg-violet-100 text-violet-600" },
                { label: "Tablet", pct: 8, icon: Globe, color: "bg-amber-100 text-amber-600" },
              ].map((d) => (
                <div key={d.label} className="text-center">
                  <div className={`w-12 h-12 ${d.color} rounded-2xl flex items-center justify-center mx-auto mb-2`}>
                    <d.icon size={20} />
                  </div>
                  <p className="text-2xl font-bold text-[#0F2544]">{d.pct}%</p>
                  <p className="text-xs text-gray-400">{d.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Upgrade banner */}
          <div className="bg-gradient-to-r from-[#0F2544] to-[#1a3a6b] rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Lock size={13} className="text-[#C9A844]" />
                <span className="text-[#C9A844] text-xs font-bold">Versión completa</span>
              </div>
              <p className="text-white font-bold">Conecta GA4, Meta Ads, TikTok y más fuentes</p>
              <p className="text-white/60 text-sm mt-0.5">Alertas automáticas por email · Reportes PDF · API de exportación</p>
            </div>
            <a href="/#contact" className="shrink-0 bg-[#C9A844] hover:bg-[#b8962f] text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-colors whitespace-nowrap">
              Conectar mis datos →
            </a>
          </div>
        </div>
      </div>
    </DemoShell>
  );
}
