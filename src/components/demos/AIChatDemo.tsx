"use client";

import { useState, useRef, useEffect } from "react";
import DemoShell from "./DemoShell";
import {
  Bot,
  User,
  Send,
  RotateCcw,
  Lock,
  Zap,
  ChevronDown,
} from "lucide-react";

interface Msg {
  id: number;
  role: "user" | "bot";
  text: string;
  time: string;
}

type Persona = "ventas" | "soporte" | "faq";

const PERSONAS: Record<Persona, { label: string; color: string; bg: string; greeting: string; avatar: string }> = {
  ventas: {
    label: "Asistente de Ventas",
    color: "text-emerald-600",
    bg: "bg-emerald-500",
    avatar: "💼",
    greeting: "¡Hola! Soy tu asistente de ventas. Puedo ayudarte a conocer nuestros productos, precios y disponibilidad. ¿Qué te gustaría saber?",
  },
  soporte: {
    label: "Soporte Técnico",
    color: "text-blue-600",
    bg: "bg-blue-500",
    avatar: "🛠️",
    greeting: "Hola, soy el asistente de soporte técnico. Estoy aquí para ayudarte con problemas técnicos, tutoriales y guías de uso. ¿En qué puedo ayudarte?",
  },
  faq: {
    label: "FAQ Inteligente",
    color: "text-violet-600",
    bg: "bg-violet-500",
    avatar: "📚",
    greeting: "¡Bienvenido! Soy el asistente de preguntas frecuentes. Tengo respuestas sobre políticas, horarios, servicios y más. ¿Qué deseas saber?",
  },
};

const RESPONSES: Record<Persona, Array<{ pattern: RegExp; reply: string }>> = {
  ventas: [
    { pattern: /precio|costo|cuánto|tarifa|valor|plan/i, reply: "📊 Tenemos 3 planes:\n\n• **Básico** — $49/mes: 500 contactos, 1 canal\n• **Pro** — $149/mes: 5,000 contactos, 3 canales + campañas\n• **Enterprise** — $349/mes: Ilimitado + soporte dedicado\n\n¿Te interesa alguno en particular?" },
    { pattern: /descuento|promo|oferta/i, reply: "🎉 Sí! Tenemos un 20% de descuento si pagas anualmente. También hacemos precios especiales para ONGs e instituciones educativas. ¿Aplicas a alguno de estos?" },
    { pattern: /demo|prueba|probar/i, reply: "✅ ¡Estás en la demo ahora mismo! Puedo mostrarte más funcionalidades. Para una demo personalizada con tus datos reales, puedo agendar una llamada de 30 minutos con Johann. ¿Te interesa?" },
    { pattern: /integr|conectar|api/i, reply: "🔗 Integramos con más de 200 plataformas: WhatsApp, Instagram, Telegram, Slack, tu web, CRM y más. La integración tarda entre 1-5 días dependiendo de la complejidad. ¿Con qué necesitas conectar?" },
    { pattern: /garanti|devolu|reembol/i, reply: "✅ Ofrecemos 30 días de garantía de devolución. Si en los primeros 30 días no estás satisfecho, te devolvemos el 100% sin preguntas. Así de seguros estamos del producto." },
    { pattern: /hola|buenos|saludos|hey/i, reply: "👋 ¡Hola! Bienvenido. Estoy aquí para ayudarte a encontrar la solución perfecta para tu negocio. ¿Qué tipo de empresa tienes y qué problema quieres resolver?" },
    { pattern: /contrat|empezar|iniciar/i, reply: "🚀 ¡Genial! Para empezar solo necesitas:\n1. Elegir tu plan\n2. Completar el registro (5 min)\n3. Conectar tu WhatsApp\n\n¿Quieres que te guíe paso a paso?" },
  ],
  soporte: [
    { pattern: /error|falla|no funciona|problema|bug/i, reply: "🔍 Entiendo que tienes un problema. Para ayudarte mejor necesito:\n1. ¿Qué acción estabas realizando?\n2. ¿Qué mensaje de error ves?\n3. ¿En qué dispositivo ocurre?\n\nCon esa info puedo darte la solución correcta." },
    { pattern: /instalar|configurar|setup|inicio/i, reply: "📋 Para configurar tu instancia:\n1. Ve a Configuración → Nueva instancia\n2. Escanea el código QR con tu WhatsApp\n3. Espera la confirmación (30-60 seg)\n\n¿Estás en alguno de estos pasos?" },
    { pattern: /qr|escanear|conectar/i, reply: "📱 El código QR se genera en la pestaña Panel → Instancia activa. Tienes 60 segundos para escanearlo con WhatsApp. Si expira, solo pulsa 'Regenerar'. ¿El QR no aparece?" },
    { pattern: /webhook|notificac/i, reply: "🔔 Para configurar webhooks:\n1. Ve a Configuración\n2. Ingresa tu URL de webhook\n3. Selecciona los eventos a recibir\n4. Guarda y prueba con el botón 'Test'\n\n¿Qué evento necesitas recibir?" },
    { pattern: /lento|tarda|demora/i, reply: "⚡ Los tiempos de entrega normales son < 3 segundos. Si ves demoras:\n• Verifica tu conexión a internet\n• Revisa el estado del servidor en status.evapi.io\n• Si persiste más de 5 min, contáctame directo." },
    { pattern: /hola|buenos|hey/i, reply: "🛠️ ¡Hola! Soy el asistente de soporte técnico. Estoy aquí para resolver cualquier inconveniente técnico. Describe tu problema y te ayudo." },
    { pattern: /gracias/i, reply: "😊 ¡Con gusto! Si tienes más preguntas, aquí estaré. Recuerda que también puedes contactar al soporte humano 24/7 en el chat principal." },
  ],
  faq: [
    { pattern: /horario|hora|atiende|disponible/i, reply: "🕐 **Horarios de atención:**\n• Soporte automático: 24/7\n• Soporte humano: Lun-Vie 8am-8pm (COT)\n• Urgencias: 24/7 vía WhatsApp\n\nEl tiempo de respuesta promedio es de 2 horas." },
    { pattern: /pago|factura|método|cobro/i, reply: "💳 **Métodos de pago aceptados:**\n• Tarjetas Visa/Mastercard/Amex\n• PayPal\n• Transferencia bancaria\n• Nequi / Daviplata (Colombia)\n\nLa factura se envía automáticamente al email registrado." },
    { pattern: /cancelar|baja|suscripción/i, reply: "📋 Para cancelar tu suscripción:\n1. Ve a Configuración → Suscripción\n2. Haz clic en 'Cancelar plan'\n3. Indica el motivo (opcional)\n\nTu acceso continúa hasta el final del período pagado. No hay penalización." },
    { pattern: /seguridad|datos|privacidad|gdpr/i, reply: "🔒 **Seguridad de datos:**\n• Cifrado end-to-end en tránsito (TLS 1.3)\n• Datos almacenados en servidores certificados ISO 27001\n• Cumplimos con GDPR y Ley 1581 (Colombia)\n• Backup automático cada 24h\n\n¿Necesitas más detalles de nuestras políticas?" },
    { pattern: /límite|máximo|cantidad/i, reply: "📊 Los límites por plan son:\n• Básico: 500 contactos, 1,000 msgs/mes\n• Pro: 5,000 contactos, msgs ilimitados\n• Enterprise: Sin límites\n\n¿Quieres ver los detalles de algún plan?" },
    { pattern: /hola|buenos|hey/i, reply: "📚 ¡Hola! Tengo respuestas sobre precios, horarios, pagos, seguridad y más. Pregúntame lo que necesites saber." },
    { pattern: /.*/i, reply: "Esa es una pregunta interesante. Déjame conectarte con la base de conocimiento... Tengo información sobre horarios, pagos, límites, seguridad y cancelaciones. ¿Sobre cuál de estos temas quieres saber?" },
  ],
};

function getReply(persona: Persona, text: string): string {
  const responses = RESPONSES[persona];
  const match = responses.find((r) => r.pattern.test(text));
  if (match) return match.reply;
  return "Entendido. Para una respuesta más específica, déjame conectarte con un agente humano. ¿Quieres que lo haga ahora?";
}

function formatText(text: string) {
  return text.split("\n").map((line, i) => (
    <span key={i} className="block">
      {line.split(/\*\*(.*?)\*\*/g).map((part, j) =>
        j % 2 === 1 ? <strong key={j}>{part}</strong> : part
      )}
    </span>
  ));
}

export default function AIChatDemo() {
  const [persona, setPersona] = useState<Persona>("ventas");
  const [messages, setMessages] = useState<Msg[]>([
    { id: 0, role: "bot", text: PERSONAS.ventas.greeting, time: "Ahora" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [trialUsed, setTrialUsed] = useState(0);
  const [showLimit, setShowLimit] = useState(false);
  const [showPersona, setShowPersona] = useState(false);
  const msgEnd = useRef<HTMLDivElement>(null);
  const TRIAL_MAX = 15;

  useEffect(() => {
    msgEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const switchPersona = (p: Persona) => {
    setPersona(p);
    setShowPersona(false);
    setMessages([
      { id: Date.now(), role: "bot", text: PERSONAS[p].greeting, time: "Ahora" },
    ]);
    setTrialUsed(0);
  };

  const send = () => {
    const text = input.trim();
    if (!text) return;
    if (trialUsed >= TRIAL_MAX) { setShowLimit(true); return; }

    const now = new Date().toLocaleTimeString("es", { hour: "2-digit", minute: "2-digit" });
    setMessages((m) => [...m, { id: Date.now(), role: "user", text, time: now }]);
    setInput("");
    setTrialUsed((t) => t + 1);
    setIsTyping(true);

    const delay = 800 + text.length * 15;
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          id: Date.now() + 1,
          role: "bot",
          text: getReply(persona, text),
          time: new Date().toLocaleTimeString("es", { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
      setIsTyping(false);
    }, delay);
  };

  const p = PERSONAS[persona];

  const suggestions: Record<Persona, string[]> = {
    ventas: ["¿Cuánto cuesta?", "Quiero hacer una demo", "¿Tienen descuentos?"],
    soporte: ["Tengo un error al conectar", "¿Cómo configuro el webhook?", "El QR no aparece"],
    faq: ["¿Cuáles son los horarios?", "¿Cómo cancelo?", "¿Mis datos están seguros?"],
  };

  return (
    <DemoShell
      title="Asistente con IA"
      subtitle="Chatbot LLM personalizado"
      trialUsed={trialUsed}
      trialMax={TRIAL_MAX}
      priceLabel="Desde $99/mes · Entrenado con tus datos"
    >
      <div className="flex flex-col h-[calc(100vh-112px)] max-w-3xl mx-auto w-full">
        {/* Persona selector */}
        <div className="bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3 shrink-0">
          <div className="flex-1">
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-0.5">Modo de chatbot</p>
            <div className="relative">
              <button
                onClick={() => setShowPersona((v) => !v)}
                className={`flex items-center gap-2 ${p.color} font-bold text-sm`}
              >
                <span>{p.avatar}</span>
                {p.label}
                <ChevronDown size={14} />
              </button>
              {showPersona && (
                <div className="absolute top-7 left-0 bg-white border border-gray-200 rounded-xl shadow-xl z-10 overflow-hidden w-56">
                  {(Object.keys(PERSONAS) as Persona[]).map((key) => (
                    <button
                      key={key}
                      onClick={() => switchPersona(key)}
                      className={`w-full flex items-center gap-2 px-4 py-3 hover:bg-gray-50 text-sm text-left transition-colors ${persona === key ? "bg-gray-50 font-semibold" : ""}`}
                    >
                      <span>{PERSONAS[key].avatar}</span>
                      {PERSONAS[key].label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <button
            onClick={() => switchPersona(persona)}
            className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 px-3 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <RotateCcw size={12} /> Reiniciar
          </button>
        </div>

        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((m) => (
            <div key={m.id} className={`flex gap-3 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              {m.role === "bot" && (
                <div className={`w-8 h-8 ${p.bg} rounded-full flex items-center justify-center text-base shrink-0 mt-1`}>
                  {p.avatar}
                </div>
              )}
              <div className={`max-w-[80%] sm:max-w-[65%] ${m.role === "user" ? "items-end" : "items-start"} flex flex-col gap-1`}>
                <div
                  className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-[#0F2544] text-white rounded-tr-sm"
                      : "bg-white text-gray-800 shadow-sm border border-gray-100 rounded-tl-sm"
                  }`}
                >
                  {formatText(m.text)}
                </div>
                <span className="text-xs text-gray-400 px-1">{m.time}</span>
              </div>
              {m.role === "user" && (
                <div className="w-8 h-8 bg-[#0F2544] rounded-full flex items-center justify-center shrink-0 mt-1">
                  <User size={14} color="white" />
                </div>
              )}
            </div>
          ))}
          {isTyping && (
            <div className="flex gap-3 justify-start">
              <div className={`w-8 h-8 ${p.bg} rounded-full flex items-center justify-center text-base shrink-0`}>
                {p.avatar}
              </div>
              <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-gray-100">
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

        {/* Suggestions */}
        {messages.length <= 1 && (
          <div className="bg-white border-t border-gray-100 px-4 py-2 flex gap-2 overflow-x-auto shrink-0">
            {suggestions[persona].map((s) => (
              <button
                key={s}
                onClick={() => { setInput(s); }}
                className="text-xs whitespace-nowrap bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1.5 rounded-full transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="bg-white border-t border-gray-100 p-3 flex items-center gap-2 shrink-0">
          <div className="flex-1 flex items-center gap-2 bg-gray-100 rounded-2xl px-4 py-2.5">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder={trialUsed >= TRIAL_MAX ? "Límite alcanzado" : `Mensaje para ${p.label.toLowerCase()}...`}
              disabled={trialUsed >= TRIAL_MAX}
              className="flex-1 bg-transparent text-sm outline-none text-gray-700 placeholder:text-gray-400 disabled:opacity-50"
            />
          </div>
          <button
            onClick={send}
            disabled={!input.trim() || trialUsed >= TRIAL_MAX}
            className="w-10 h-10 bg-[#0F2544] disabled:bg-gray-300 rounded-full flex items-center justify-center transition-colors shrink-0"
          >
            <Send size={15} color="white" />
          </button>
        </div>
      </div>

      {/* Pro teaser bar */}
      <div className="fixed bottom-12 left-0 right-0 flex justify-center pointer-events-none">
        <div className="bg-[#0F2544]/95 text-white rounded-full px-5 py-2.5 text-xs flex items-center gap-3 shadow-2xl pointer-events-auto mx-4">
          <Lock size={12} className="text-[#C9A844]" />
          <span>Versión Pro: entrenado con <strong>tus documentos</strong>, memoria de conversación, escalado a humano</span>
          <a href="/#contact" className="bg-[#C9A844] text-white font-bold px-3 py-1 rounded-full hover:bg-[#b8962f] transition-colors whitespace-nowrap text-xs">
            Ver planes
          </a>
        </div>
      </div>

      {showLimit && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl">
            <div className="text-4xl mb-4">{p.avatar}</div>
            <h3 className="text-xl font-bold text-[#0F2544] mb-2">Límite de prueba alcanzado</h3>
            <p className="text-gray-500 text-sm mb-6">
              Has probado {TRIAL_MAX} mensajes con el asistente. La versión completa incluye mensajes ilimitados, entrenamiento personalizado e integración con WhatsApp, Instagram y tu web.
            </p>
            <a href="/#contact" className="block w-full bg-[#C9A844] hover:bg-[#b8962f] text-white font-bold py-3 rounded-xl transition-colors text-sm mb-3">
              Obtener chatbot personalizado →
            </a>
            <button onClick={() => setShowLimit(false)} className="text-sm text-gray-400 hover:text-gray-600">
              Cerrar
            </button>
          </div>
        </div>
      )}
    </DemoShell>
  );
}
