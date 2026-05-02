"use client";

import { useState } from "react";
import DemoShell from "./DemoShell";
import {
  Users,
  DollarSign,
  TrendingUp,
  Plus,
  Phone,
  Mail,
  MessageCircle,
  Calendar,
  ChevronRight,
  Lock,
  CheckCircle,
  Clock,
  Star,
  MoreVertical,
} from "lucide-react";

type Stage = "lead" | "qualified" | "proposal" | "won";

interface Deal {
  id: number;
  name: string;
  company: string;
  value: number;
  stage: Stage;
  avatar: string;
  color: string;
  probability: number;
  lastActivity: string;
  tags: string[];
}

const INITIAL_DEALS: Deal[] = [
  { id: 1, name: "Carlos Mendoza", company: "TechCorp S.A.", value: 4500000, stage: "lead", avatar: "CM", color: "bg-blue-500", probability: 20, lastActivity: "hace 2h", tags: ["WhatsApp API", "Empresa grande"] },
  { id: 2, name: "María García", company: "StartupXYZ", value: 1800000, stage: "lead", avatar: "MG", color: "bg-emerald-500", probability: 15, lastActivity: "hace 5h", tags: ["Chatbot IA"] },
  { id: 3, name: "Pedro López", company: "Retail Plus", value: 2200000, stage: "qualified", avatar: "PL", color: "bg-violet-500", probability: 40, lastActivity: "ayer", tags: ["E-Commerce", "Mobile"] },
  { id: 4, name: "Empresa XYZ", company: "Corporativo", value: 8900000, stage: "qualified", avatar: "XY", color: "bg-rose-500", probability: 45, lastActivity: "ayer", tags: ["Sistema ERP"] },
  { id: 5, name: "Ana Martínez", company: "EdTech Co.", value: 3200000, stage: "proposal", avatar: "AM", color: "bg-amber-500", probability: 65, lastActivity: "hace 2 días", tags: ["LMS", "IA"] },
  { id: 6, name: "Luis Herrera", company: "Fintech SA", value: 6100000, stage: "won", avatar: "LH", color: "bg-teal-500", probability: 100, lastActivity: "hace 3 días", tags: ["SaaS", "API"] },
];

const STAGES: { id: Stage; label: string; color: string; bg: string }[] = [
  { id: "lead", label: "Lead", color: "text-gray-600", bg: "bg-gray-100" },
  { id: "qualified", label: "Calificado", color: "text-blue-600", bg: "bg-blue-100" },
  { id: "proposal", label: "Propuesta", color: "text-amber-600", bg: "bg-amber-100" },
  { id: "won", label: "Ganado ✓", color: "text-emerald-600", bg: "bg-emerald-100" },
];

const ACTIVITIES = [
  { type: "call", icon: Phone, color: "text-blue-500 bg-blue-50", text: "Llamada con Carlos M. — 15 min", time: "hace 2h" },
  { type: "email", icon: Mail, color: "text-violet-500 bg-violet-50", text: "Propuesta enviada a Empresa XYZ", time: "ayer" },
  { type: "msg", icon: MessageCircle, color: "text-green-500 bg-green-50", text: "WhatsApp: seguimiento a María G.", time: "ayer" },
  { type: "meet", icon: Calendar, color: "text-amber-500 bg-amber-50", text: "Demo programada con Ana M. — Jue 10am", time: "hace 2 días" },
  { type: "won", icon: CheckCircle, color: "text-emerald-500 bg-emerald-50", text: "Deal cerrado: Luis Herrera — $6.1M", time: "hace 3 días" },
];

export default function CRMDemo() {
  const [deals, setDeals] = useState(INITIAL_DEALS);
  const [selected, setSelected] = useState<Deal | null>(null);
  const [movingId, setMovingId] = useState<number | null>(null);

  const advance = (deal: Deal) => {
    const order: Stage[] = ["lead", "qualified", "proposal", "won"];
    const next = order[order.indexOf(deal.stage) + 1];
    if (!next) return;
    setMovingId(deal.id);
    setTimeout(() => {
      setDeals((prev) =>
        prev.map((d) =>
          d.id === deal.id
            ? { ...d, stage: next, probability: next === "won" ? 100 : next === "proposal" ? 65 : 40 }
            : d
        )
      );
      if (selected?.id === deal.id) {
        setSelected((s) => s ? { ...s, stage: next } : s);
      }
      setMovingId(null);
    }, 400);
  };

  const totalPipeline = deals.reduce((s, d) => s + d.value, 0);
  const wonDeals = deals.filter((d) => d.stage === "won");
  const wonTotal = wonDeals.reduce((s, d) => s + d.value, 0);

  return (
    <DemoShell
      title="CRM & Pipeline de Ventas"
      subtitle="Gestión de contactos y deals"
      trialUsed={deals.filter((d) => d.stage === "won").length - 1}
      trialMax={5}
      priceLabel="Desde $299/mes · Contactos ilimitados"
    >
      <div className="flex flex-col h-[calc(100vh-112px)]">
        {/* KPI bar */}
        <div className="bg-white border-b border-gray-100 px-4 sm:px-6 py-3 flex items-center gap-6 overflow-x-auto shrink-0">
          <div className="flex items-center gap-2 shrink-0">
            <DollarSign size={14} className="text-[#0F2544]" />
            <div>
              <p className="text-xs text-gray-400">Pipeline total</p>
              <p className="text-sm font-bold text-[#0F2544]">${(totalPipeline / 1000000).toFixed(1)}M</p>
            </div>
          </div>
          <div className="w-px h-8 bg-gray-100 shrink-0" />
          <div className="flex items-center gap-2 shrink-0">
            <CheckCircle size={14} className="text-emerald-500" />
            <div>
              <p className="text-xs text-gray-400">Ganado</p>
              <p className="text-sm font-bold text-emerald-600">${(wonTotal / 1000000).toFixed(1)}M</p>
            </div>
          </div>
          <div className="w-px h-8 bg-gray-100 shrink-0" />
          <div className="flex items-center gap-2 shrink-0">
            <Users size={14} className="text-blue-500" />
            <div>
              <p className="text-xs text-gray-400">Deals activos</p>
              <p className="text-sm font-bold text-blue-600">{deals.filter((d) => d.stage !== "won").length}</p>
            </div>
          </div>
          <div className="w-px h-8 bg-gray-100 shrink-0" />
          <div className="flex items-center gap-2 shrink-0">
            <TrendingUp size={14} className="text-amber-500" />
            <div>
              <p className="text-xs text-gray-400">Tasa de cierre</p>
              <p className="text-sm font-bold text-amber-600">{Math.round((wonDeals.length / deals.length) * 100)}%</p>
            </div>
          </div>
          <div className="ml-auto shrink-0">
            <div className="relative">
              <button className="flex items-center gap-1.5 bg-[#0F2544] text-white text-xs font-bold px-3 py-2 rounded-xl">
                <Plus size={12} /> Nuevo deal
                <span className="bg-white/20 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full ml-1">Pro</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Kanban board */}
          <div className="flex-1 overflow-x-auto overflow-y-hidden">
            <div className="flex gap-3 p-4 sm:p-5 h-full min-w-max">
              {STAGES.map((stage) => {
                const stageDeals = deals.filter((d) => d.stage === stage.id);
                const stageTotal = stageDeals.reduce((s, d) => s + d.value, 0);
                return (
                  <div key={stage.id} className="w-60 sm:w-64 flex flex-col shrink-0">
                    {/* Column header */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${stage.bg.replace("bg-", "bg-").replace("100", "400")}`} />
                        <span className="font-bold text-sm text-gray-700">{stage.label}</span>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${stage.bg} ${stage.color}`}>{stageDeals.length}</span>
                      </div>
                      <span className="text-xs text-gray-400 font-semibold">${(stageTotal / 1000000).toFixed(1)}M</span>
                    </div>

                    {/* Cards */}
                    <div className="flex-1 space-y-2 overflow-y-auto">
                      {stageDeals.map((deal) => (
                        <div
                          key={deal.id}
                          onClick={() => setSelected(deal)}
                          className={`bg-white rounded-xl border border-gray-200 p-3.5 cursor-pointer hover:shadow-md transition-all duration-200 ${
                            movingId === deal.id ? "opacity-50 scale-95" : ""
                          } ${selected?.id === deal.id ? "ring-2 ring-[#0F2544]" : ""}`}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <div className={`w-8 h-8 ${deal.color} rounded-full text-white text-xs font-bold flex items-center justify-center shrink-0`}>
                                {deal.avatar}
                              </div>
                              <div>
                                <p className="text-xs font-bold text-gray-800">{deal.name}</p>
                                <p className="text-xs text-gray-400">{deal.company}</p>
                              </div>
                            </div>
                          </div>

                          <p className="text-sm font-bold text-[#0F2544] mb-2">
                            ${(deal.value / 1000000).toFixed(1)}M COP
                          </p>

                          <div className="flex items-center gap-1 mb-2">
                            <div className="flex-1 h-1 bg-gray-100 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${deal.stage === "won" ? "bg-emerald-500" : "bg-[#C9A844]"}`}
                                style={{ width: `${deal.probability}%` }}
                              />
                            </div>
                            <span className="text-xs text-gray-400">{deal.probability}%</span>
                          </div>

                          <div className="flex flex-wrap gap-1 mb-2">
                            {deal.tags.slice(0, 2).map((tag) => (
                              <span key={tag} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-md">
                                {tag}
                              </span>
                            ))}
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-400 flex items-center gap-1">
                              <Clock size={10} /> {deal.lastActivity}
                            </span>
                            {deal.stage !== "won" && (
                              <button
                                onClick={(e) => { e.stopPropagation(); advance(deal); }}
                                className="text-xs font-bold text-[#0F2544] hover:text-[#C9A844] flex items-center gap-0.5 transition-colors"
                              >
                                Avanzar <ChevronRight size={11} />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Activity panel */}
          <div className="hidden lg:flex w-64 border-l border-gray-100 bg-white flex-col shrink-0">
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Actividad reciente</p>
            </div>
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {ACTIVITIES.map((a, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div className={`w-7 h-7 ${a.color} rounded-xl flex items-center justify-center shrink-0 mt-0.5`}>
                    <a.icon size={12} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-700 leading-tight">{a.text}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 border-t border-gray-100">
              <div className="bg-gradient-to-r from-[#0F2544] to-[#1a3a6b] rounded-xl p-3">
                <div className="flex items-center gap-1.5 mb-1">
                  <Lock size={11} className="text-[#C9A844]" />
                  <span className="text-[#C9A844] text-xs font-bold">Pro</span>
                </div>
                <p className="text-white text-xs mb-2">Automatizaciones de seguimiento, reportes de ventas y app móvil para tu equipo.</p>
                <a href="/#contact" className="block text-center text-xs bg-[#C9A844] text-white font-bold py-1.5 rounded-lg hover:bg-[#b8962f] transition-colors">
                  Ver propuesta →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DemoShell>
  );
}
