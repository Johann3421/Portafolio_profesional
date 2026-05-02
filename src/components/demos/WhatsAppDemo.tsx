"use client";

import { useState, useRef, useEffect } from "react";
import DemoShell from "./DemoShell";
import {
  Search,
  Send,
  Paperclip,
  Smile,
  Phone,
  Video,
  MoreVertical,
  CheckCheck,
  Check,
  Circle,
  MessageCircle,
  BarChart2,
  Settings,
  Megaphone,
  ChevronLeft,
  Lock,
  Plus,
  Wifi,
  WifiOff,
  Users,
  Clock,
  TrendingUp,
  Eye,
  EyeOff,
  Copy,
  RefreshCw,
  AlertCircle,
  X,
  Zap,
} from "lucide-react";

/* ─── Types ─────────────────────────────────────── */
interface Msg {
  id: number;
  from: "me" | "them";
  text: string;
  time: string;
  status: "sent" | "delivered" | "read";
}

interface Contact {
  id: number;
  name: string;
  role: string;
  avatar: string;
  color: string;
  statusDot: "online" | "away" | "offline";
  unread: number;
  preview: string;
  messages: Msg[];
}

/* ─── Mock data ──────────────────────────────────── */
const CONTACTS: Contact[] = [
  {
    id: 1,
    name: "Carlos Mendoza",
    role: "Director Comercial",
    avatar: "CM",
    color: "bg-blue-500",
    statusDot: "online",
    unread: 2,
    preview: "¡Sí, me interesa! ¿Cuándo podemos hablar?",
    messages: [
      { id: 1, from: "them", text: "Buenos días, vi su servicio de WhatsApp API. ¿Cómo funciona exactamente?", time: "09:15", status: "read" },
      { id: 2, from: "me", text: "¡Buenos días Carlos! La API te permite automatizar mensajes, atender clientes 24/7 y enviar campañas masivas. ¿Para qué lo necesitas?", time: "09:17", status: "read" },
      { id: 3, from: "them", text: "Tengo 500 empleados y quiero comunicarme con clientes de forma automática.", time: "09:18", status: "read" },
      { id: 4, from: "me", text: "Perfecto para tu caso. Con nuestra solución puedes gestionar miles de conversaciones simultáneas. ¿Te preparo una demo personalizada?", time: "09:20", status: "delivered" },
      { id: 5, from: "them", text: "¡Sí, me interesa! ¿Cuándo podemos hablar?", time: "09:21", status: "read" },
    ],
  },
  {
    id: 2,
    name: "María García",
    role: "CEO · TechStartup",
    avatar: "MG",
    color: "bg-emerald-500",
    statusDot: "away",
    unread: 0,
    preview: "¿Cuánto tarda la implementación?",
    messages: [
      { id: 1, from: "them", text: "Hola, necesitamos un chatbot para atención al cliente. ¿Pueden hacerlo?", time: "Ayer", status: "read" },
      { id: 2, from: "me", text: "¡Hola María! Claro. Desarrollamos chatbots con IA que resuelven el 80% de consultas automáticamente.", time: "Ayer", status: "read" },
      { id: 3, from: "them", text: "¿Cuánto tarda la implementación?", time: "Ayer", status: "read" },
    ],
  },
  {
    id: 3,
    name: "Empresa XYZ Corp",
    role: "Compras corporativas",
    avatar: "XY",
    color: "bg-violet-500",
    statusDot: "offline",
    unread: 1,
    preview: "Necesitamos integrar con nuestro CRM",
    messages: [
      { id: 1, from: "them", text: "Necesitamos integrar WhatsApp en nuestro CRM. ¿Es posible?", time: "Lun", status: "read" },
      { id: 2, from: "me", text: "Sí, podemos crear una integración bidireccional. ¿Qué CRM usan?", time: "Lun", status: "delivered" },
    ],
  },
];

const CAMPAIGNS = [
  { id: 1, name: "Lanzamiento Producto Q2", status: "completed", sent: 2847, delivered: 2791, read: 2103, date: "28 Abr 2026" },
  { id: 2, name: "Promoción Día del Trabajador", status: "scheduled", sent: 0, delivered: 0, read: 0, date: "1 May 2026" },
  { id: 3, name: "Seguimiento Clientes Inactivos", status: "draft", sent: 0, delivered: 0, read: 0, date: "—" },
];

/* ─── Bot reply logic ────────────────────────────── */
function getBotReply(msg: string): string {
  const m = msg.toLowerCase();
  if (/precio|costo|cuánto|plan|tarifa|valor/i.test(m))
    return "💰 Los planes comienzan desde $49/mes (básico), $149/mes (profesional, 500 contactos) y $349/mes (empresarial, ilimitado). ¿Cuál se ajusta a tu volumen?";
  if (/integr|api|conectar|crm|sistema/i.test(m))
    return "🔗 Tenemos webhooks y API REST para conectar con cualquier sistema. Integramos con Salesforce, HubSpot, Pipedrive y sistemas propios. ¿Qué plataforma usas?";
  if (/campaña|masiv|blast|envío/i.test(m))
    return "📣 Las campañas masivas están disponibles desde el plan Profesional. Puedes segmentar por etiquetas, programar el envío y ver tasas de apertura en tiempo real.";
  if (/hola|buenos|buenas|hey/i.test(m))
    return "👋 ¡Hola! Soy el asistente de WhatsApp Business. ¿En qué te puedo ayudar? Puedo darte info sobre precios, integraciones y funcionalidades.";
  if (/soporte|ayuda|error|problema/i.test(m))
    return "🛠️ Nuestro soporte está disponible 24/7. Tiempo de respuesta < 2h para urgencias. ¿Qué problema estás experimentando?";
  if (/webhook|notif|evento/i.test(m))
    return "🔔 Los webhooks notifican en tiempo real cada evento: mensaje enviado, entregado, leído, respuesta recibida. Se configuran en la pestaña Configuración.";
  if (/demo|probar|prueba/i.test(m))
    return "✅ ¡Estás en el demo ahora mismo! Para una demo con tus datos reales, contáctame. Puedo montarte una instancia de prueba en 24h.";
  const defaults = [
    "Entendido. ¿Podrías darme más detalles para orientarte mejor? 😊",
    "¡Buena pregunta! Johann puede responderte en detalle. ¿Quieres que te contacte directamente?",
    "Claro, eso es posible con nuestra plataforma. ¿Cuántos usuarios manejarías?",
    "Perfecto. Para una propuesta personalizada necesitaría saber un poco más sobre tu empresa. 📋",
  ];
  return defaults[Math.floor(Math.random() * defaults.length)];
}

/* ─── Status icon ────────────────────────────────── */
function MsgStatus({ s, from }: { s: Msg["status"]; from: Msg["from"] }) {
  if (from === "them") return null;
  if (s === "read") return <CheckCheck size={13} className="text-blue-400" />;
  if (s === "delivered") return <CheckCheck size={13} className="text-gray-400" />;
  return <Check size={13} className="text-gray-400" />;
}

/* ─── Main Component ─────────────────────────────── */
export default function WhatsAppDemo() {
  const [tab, setTab] = useState<"panel" | "chats" | "campaigns" | "config">("panel");
  const [contacts, setContacts] = useState(CONTACTS);
  const [selectedId, setSelectedId] = useState(1);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [trialUsed, setTrialUsed] = useState(0);
  const [showApiKey, setShowApiKey] = useState(false);
  const [showLimit, setShowLimit] = useState(false);
  const [mobileChat, setMobileChat] = useState(false);
  const msgEnd = useRef<HTMLDivElement>(null);

  const current = contacts.find((c) => c.id === selectedId)!;

  useEffect(() => {
    msgEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [current.messages, isTyping]);

  const sendMsg = () => {
    const text = input.trim();
    if (!text) return;
    if (trialUsed >= 10) { setShowLimit(true); return; }

    const now = new Date().toLocaleTimeString("es", { hour: "2-digit", minute: "2-digit" });
    const userMsg: Msg = { id: Date.now(), from: "me", text, time: now, status: "delivered" };

    setContacts((prev) =>
      prev.map((c) =>
        c.id === selectedId
          ? { ...c, messages: [...c.messages, userMsg], preview: text, unread: 0 }
          : c
      )
    );
    setInput("");
    setTrialUsed((t) => t + 1);
    setIsTyping(true);

    setTimeout(() => {
      const reply: Msg = {
        id: Date.now() + 1,
        from: "them",
        text: getBotReply(text),
        time: new Date().toLocaleTimeString("es", { hour: "2-digit", minute: "2-digit" }),
        status: "read",
      };
      setContacts((prev) =>
        prev.map((c) =>
          c.id === selectedId
            ? { ...c, messages: [...c.messages, userMsg, reply], preview: reply.text }
            : c
        )
      );
      setIsTyping(false);
    }, 2500);
  };

  const TABS = [
    { id: "panel" as const, label: "Panel", icon: BarChart2 },
    { id: "chats" as const, label: "Chats", icon: MessageCircle },
    { id: "campaigns" as const, label: "Campañas", icon: Megaphone },
    { id: "config" as const, label: "Configuración", icon: Settings },
  ];

  return (
    <DemoShell
      title="WhatsApp Business API"
      subtitle="Evolution API Dashboard"
      trialUsed={trialUsed}
      trialMax={10}
      priceLabel="Desde $49/mes · Instancia dedicada"
    >
      <div className="flex flex-col h-[calc(100vh-112px)]">
        {/* ─── Tab navigation ─────────────────────── */}
        <div className="bg-white border-b border-gray-100 px-4 shrink-0">
          <div className="flex gap-0 max-w-5xl mx-auto overflow-x-auto">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={`flex items-center gap-1.5 px-4 py-3.5 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                  tab === id
                    ? "border-[#25D366] text-[#25D366]"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                <Icon size={14} />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* ─── PANEL TAB ──────────────────────────── */}
        {tab === "panel" && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            <div className="max-w-5xl mx-auto space-y-6">
              {/* Stats row */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Mensajes hoy", value: "1,234", icon: MessageCircle, color: "text-blue-600", bg: "bg-blue-50", delta: "+12%" },
                  { label: "Tasa de entrega", value: "98.2%", icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-50", delta: "+0.3%" },
                  { label: "Tiempo respuesta", value: "2.3s", icon: Clock, color: "text-amber-600", bg: "bg-amber-50", delta: "-0.8s" },
                  { label: "Contactos activos", value: "156", icon: Users, color: "text-violet-600", bg: "bg-violet-50", delta: "+8" },
                ].map((s) => (
                  <div key={s.label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-9 h-9 ${s.bg} ${s.color} rounded-xl flex items-center justify-center`}>
                        <s.icon size={17} />
                      </div>
                      <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                        {s.delta}
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-[#0F2544]">{s.value}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Instance card */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-[#0F2544]">Instancia activa</h3>
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                    Conectado
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="w-14 h-14 bg-[#25D366] rounded-2xl flex items-center justify-center shrink-0">
                    <MessageCircle size={28} color="white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-800">+57 300 *** **** (Demo)</p>
                    <p className="text-sm text-gray-400 mt-0.5">
                      Instancia: <span className="font-mono text-xs bg-gray-100 px-1.5 py-0.5 rounded">inst_demo_001</span>
                    </p>
                    <p className="text-xs text-gray-400 mt-1">Conectado hace 3h 24min · 156 contactos sincronizados</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="text-xs border border-gray-200 text-gray-600 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-1.5">
                      <RefreshCw size={13} /> Reconectar
                    </button>
                    <div className="relative group">
                      <button className="text-xs bg-[#0F2544]/5 text-[#0F2544] px-3 py-2 rounded-lg hover:bg-[#0F2544]/10 transition-colors flex items-center gap-1.5">
                        <Lock size={13} /> Nueva instancia
                        <span className="bg-amber-400 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full ml-1">Pro</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent messages */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-[#0F2544]">Mensajes recientes</h3>
                  <button
                    onClick={() => setTab("chats")}
                    className="text-xs text-[#25D366] font-semibold hover:underline"
                  >
                    Ver todos →
                  </button>
                </div>
                <div className="space-y-3">
                  {contacts.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => { setSelectedId(c.id); setTab("chats"); }}
                      className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors text-left"
                    >
                      <div className={`w-10 h-10 ${c.color} rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0`}>
                        {c.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-sm text-gray-800">{c.name}</span>
                          <span className="text-xs text-gray-400">{c.messages.at(-1)?.time}</span>
                        </div>
                        <p className="text-xs text-gray-400 truncate mt-0.5">{c.preview}</p>
                      </div>
                      {c.unread > 0 && (
                        <span className="w-5 h-5 bg-[#25D366] text-white text-xs font-bold rounded-full flex items-center justify-center shrink-0">
                          {c.unread}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ─── CHATS TAB ──────────────────────────── */}
        {tab === "chats" && (
          <div className="flex-1 flex overflow-hidden">
            {/* Contact list — hidden on mobile when chat is open */}
            <div className={`${mobileChat ? "hidden" : "flex"} sm:flex w-full sm:w-72 lg:w-80 border-r border-gray-100 bg-white flex-col shrink-0`}>
              <div className="p-3 border-b border-gray-100">
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar contacto..."
                    className="w-full pl-8 pr-3 py-2 bg-gray-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#25D366]/30"
                  />
                </div>
              </div>
              <div className="flex-1 overflow-y-auto">
                {contacts.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => { setSelectedId(c.id); setMobileChat(true); }}
                    className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left border-b border-gray-50 ${selectedId === c.id ? "bg-[#25D366]/5" : ""}`}
                  >
                    <div className="relative shrink-0">
                      <div className={`w-11 h-11 ${c.color} rounded-full flex items-center justify-center text-white text-sm font-bold`}>
                        {c.avatar}
                      </div>
                      <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${c.statusDot === "online" ? "bg-emerald-500" : c.statusDot === "away" ? "bg-amber-400" : "bg-gray-300"}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-sm text-gray-800 truncate">{c.name}</span>
                        <span className="text-xs text-gray-400 shrink-0 ml-1">{c.messages.at(-1)?.time}</span>
                      </div>
                      <p className="text-xs text-gray-400 truncate mt-0.5">{c.preview}</p>
                    </div>
                    {c.unread > 0 && (
                      <span className="w-5 h-5 bg-[#25D366] text-white text-xs font-bold rounded-full flex items-center justify-center shrink-0">
                        {c.unread}
                      </span>
                    )}
                  </button>
                ))}
                {/* Locked contacts */}
                {[
                  { name: "Pedro López", role: "Gerente de Ventas" },
                  { name: "TechStartup S.A.", role: "Corporativo" },
                ].map((lc) => (
                  <div key={lc.name} className="flex items-center gap-3 px-4 py-3 opacity-50">
                    <div className="w-11 h-11 bg-gray-200 rounded-full flex items-center justify-center shrink-0">
                      <Lock size={14} className="text-gray-400" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm text-gray-500">{lc.name}</p>
                      <p className="text-xs text-gray-400">{lc.role}</p>
                    </div>
                    <span className="text-xs text-amber-500 font-bold bg-amber-50 px-2 py-0.5 rounded-full">Pro</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat window */}
            <div className={`${mobileChat ? "flex" : "hidden"} sm:flex flex-1 flex-col bg-[#ECE5DD] min-w-0`}>
              {/* Chat header */}
              <div className="bg-[#075E54] px-4 py-3 flex items-center gap-3 shrink-0">
                <button
                  onClick={() => setMobileChat(false)}
                  className="sm:hidden text-white/70 hover:text-white mr-1"
                >
                  <ChevronLeft size={20} />
                </button>
                <div className={`w-9 h-9 ${current.color} rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                  {current.avatar}
                </div>
                <div className="flex-1">
                  <p className="text-white font-semibold text-sm">{current.name}</p>
                  <p className="text-white/60 text-xs">{current.statusDot === "online" ? "en línea" : current.role}</p>
                </div>
                <div className="flex items-center gap-3 text-white/70">
                  <button className="hover:text-white"><Video size={18} /></button>
                  <button className="hover:text-white"><Phone size={18} /></button>
                  <button className="hover:text-white"><MoreVertical size={18} /></button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {current.messages.map((m) => (
                  <div key={m.id} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[75%] sm:max-w-[60%] rounded-2xl px-4 py-2.5 shadow-sm ${
                        m.from === "me"
                          ? "bg-[#DCF8C6] rounded-tr-sm"
                          : "bg-white rounded-tl-sm"
                      }`}
                    >
                      <p className="text-sm text-gray-800 leading-relaxed">{m.text}</p>
                      <div className="flex items-center justify-end gap-1 mt-1">
                        <span className="text-xs text-gray-400">{m.time}</span>
                        <MsgStatus s={m.status} from={m.from} />
                      </div>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
                      <div className="flex items-center gap-1">
                        {[0, 1, 2].map((i) => (
                          <span
                            key={i}
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: `${i * 0.15}s` }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                <div ref={msgEnd} />
              </div>

              {/* Input */}
              <div className="bg-[#F0F0F0] px-3 py-2 flex items-center gap-2 shrink-0">
                <button className="text-gray-500 hover:text-gray-700 p-2">
                  <Smile size={20} />
                </button>
                <button className="text-gray-500 hover:text-gray-700 p-2">
                  <Paperclip size={20} />
                </button>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMsg()}
                  placeholder={trialUsed >= 10 ? "Límite de prueba alcanzado" : "Escribe un mensaje..."}
                  disabled={trialUsed >= 10}
                  className="flex-1 bg-white rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-[#25D366]/30 disabled:opacity-50"
                />
                <button
                  onClick={sendMsg}
                  disabled={!input.trim() || trialUsed >= 10}
                  className="w-10 h-10 bg-[#25D366] disabled:bg-gray-300 rounded-full flex items-center justify-center transition-colors"
                >
                  <Send size={16} color="white" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ─── CAMPAIGNS TAB ──────────────────────── */}
        {tab === "campaigns" && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            <div className="max-w-5xl mx-auto space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-[#0F2544]">Campañas masivas</h3>
                  <p className="text-sm text-gray-400 mt-0.5">Envía mensajes personalizados a miles de contactos</p>
                </div>
                <div className="relative group">
                  <button className="flex items-center gap-1.5 bg-[#0F2544] text-white text-sm font-semibold px-4 py-2.5 rounded-xl">
                    <Plus size={15} /> Nueva campaña
                    <span className="bg-amber-400 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full ml-1">Pro</span>
                  </button>
                </div>
              </div>

              {CAMPAIGNS.map((c) => (
                <div key={c.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between mb-4">
                    <div>
                      <h4 className="font-bold text-gray-800">{c.name}</h4>
                      <p className="text-xs text-gray-400 mt-0.5">Programada: {c.date}</p>
                    </div>
                    <span
                      className={`self-start sm:self-auto text-xs font-bold px-3 py-1 rounded-full ${
                        c.status === "completed"
                          ? "bg-emerald-100 text-emerald-700"
                          : c.status === "scheduled"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {c.status === "completed" ? "✓ Completada" : c.status === "scheduled" ? "⏰ Programada" : "✏ Borrador"}
                    </span>
                  </div>
                  {c.status === "completed" && (
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { label: "Enviados", value: c.sent.toLocaleString(), color: "text-blue-600" },
                        { label: "Entregados", value: `${c.delivered.toLocaleString()} (${Math.round((c.delivered / c.sent) * 100)}%)`, color: "text-emerald-600" },
                        { label: "Leídos", value: `${c.read.toLocaleString()} (${Math.round((c.read / c.sent) * 100)}%)`, color: "text-violet-600" },
                      ].map((s) => (
                        <div key={s.label} className="text-center p-3 bg-gray-50 rounded-xl">
                          <p className={`text-lg font-bold ${s.color}`}>{s.value}</p>
                          <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  {c.status !== "completed" && (
                    <div className="p-3 bg-amber-50 rounded-xl flex items-center gap-2 text-sm text-amber-700">
                      <AlertCircle size={14} />
                      {c.status === "scheduled"
                        ? "Esta campaña se enviará automáticamente en la fecha programada."
                        : "Completa la configuración para programar el envío."}
                    </div>
                  )}
                </div>
              ))}

              {/* Locked feature banner */}
              <div className="bg-gradient-to-r from-[#0F2544] to-[#1a3a6b] rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Lock size={14} className="text-[#C9A844]" />
                    <span className="text-[#C9A844] text-xs font-bold uppercase tracking-wider">Función Pro</span>
                  </div>
                  <h4 className="text-white font-bold">Creador de campañas avanzado</h4>
                  <p className="text-white/60 text-sm mt-1">Segmentación por etiquetas, A/B testing, variables personalizadas y envío masivo a contactos ilimitados.</p>
                </div>
                <a
                  href="/#contact"
                  className="shrink-0 flex items-center gap-1.5 bg-[#C9A844] hover:bg-[#b8962f] text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-colors whitespace-nowrap"
                >
                  <Zap size={13} /> Obtener acceso
                </a>
              </div>
            </div>
          </div>
        )}

        {/* ─── CONFIG TAB ─────────────────────────── */}
        {tab === "config" && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            <div className="max-w-2xl mx-auto space-y-5">
              <h3 className="text-xl font-bold text-[#0F2544]">Configuración de instancia</h3>

              {/* API Key */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h4 className="font-bold text-gray-700 mb-4">API Key</h4>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-100 rounded-xl px-4 py-2.5 font-mono text-sm text-gray-600 overflow-hidden">
                    {showApiKey ? "evk_live_demo_a8f2b3c1d4e5f6a7b8c9d0e1f2a3b4c5" : "evk_live_demo_••••••••••••••••••••••"}
                  </div>
                  <button
                    onClick={() => setShowApiKey((v) => !v)}
                    className="p-2.5 text-gray-400 hover:text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50"
                  >
                    {showApiKey ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                  <button className="p-2.5 text-gray-400 hover:text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50">
                    <Copy size={16} />
                  </button>
                </div>
              </div>

              {/* Webhook */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h4 className="font-bold text-gray-700 mb-1">Webhook URL</h4>
                <p className="text-xs text-gray-400 mb-4">Recibe notificaciones en tiempo real de todos los eventos</p>
                <input
                  type="text"
                  defaultValue="https://mi-empresa.com/api/whatsapp/webhook"
                  className="w-full bg-gray-100 rounded-xl px-4 py-2.5 text-sm text-gray-600 outline-none focus:ring-2 focus:ring-[#25D366]/30 font-mono"
                />
                <div className="mt-3 flex flex-wrap gap-2">
                  {["message.received", "message.sent", "message.read", "connection.update"].map((ev) => (
                    <span key={ev} className="text-xs bg-emerald-50 text-emerald-600 font-mono px-2.5 py-1 rounded-lg border border-emerald-200">
                      {ev}
                    </span>
                  ))}
                </div>
              </div>

              {/* Toggles */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h4 className="font-bold text-gray-700 mb-4">Opciones</h4>
                <div className="space-y-4">
                  {[
                    { label: "Auto-reconexión", desc: "Reconectar automáticamente si se pierde la conexión", active: true },
                    { label: "Confirmación de lectura", desc: "Marcar mensajes como leídos automáticamente", active: true },
                    { label: "Modo multi-dispositivo", desc: "Permite conectar múltiples dispositivos simultáneamente", active: false, pro: true },
                    { label: "Backup automático", desc: "Guardar conversaciones en la nube cada 24h", active: false, pro: true },
                  ].map((opt) => (
                    <div key={opt.label} className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm text-gray-700">{opt.label}</span>
                          {opt.pro && <span className="text-[10px] font-bold bg-amber-400 text-white px-1.5 py-0.5 rounded-full">Pro</span>}
                        </div>
                        <p className="text-xs text-gray-400 mt-0.5">{opt.desc}</p>
                      </div>
                      <button
                        className={`w-11 h-6 rounded-full transition-colors relative ${opt.active && !opt.pro ? "bg-[#25D366]" : "bg-gray-200"} ${opt.pro ? "opacity-50 cursor-not-allowed" : ""}`}
                      >
                        <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-all ${opt.active && !opt.pro ? "left-5.5 translate-x-0.5" : "left-0.5"}`} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Trial limit modal */}
      {showLimit && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock size={28} className="text-amber-500" />
            </div>
            <h3 className="text-xl font-bold text-[#0F2544] mb-2">Límite de prueba alcanzado</h3>
            <p className="text-gray-500 text-sm mb-6">
              Has usado los 10 mensajes gratuitos. Obtén acceso completo con mensajes ilimitados, campañas masivas y soporte dedicado.
            </p>
            <a
              href="/#contact"
              className="block w-full bg-[#C9A844] hover:bg-[#b8962f] text-white font-bold py-3 rounded-xl transition-colors text-sm mb-3"
            >
              Obtener acceso completo →
            </a>
            <button
              onClick={() => setShowLimit(false)}
              className="text-sm text-gray-400 hover:text-gray-600"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </DemoShell>
  );
}
