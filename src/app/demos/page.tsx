import { Metadata } from "next";
import Link from "next/link";
import {
  MessageCircle,
  Bot,
  ShoppingBag,
  BarChart2,
  GitBranch,
  Users,
  ArrowRight,
  Check,
  Zap,
  ArrowLeft,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Demos Gratuitos | Johann Abad — Full Stack Developer & AI Engineer",
  description:
    "Prueba gratis nuestras soluciones: WhatsApp Business API, chatbots con IA, dashboards de analytics, CRM, automatización y más. Sin tarjeta de crédito.",
};

const demos = [
  {
    slug: "whatsapp",
    icon: MessageCircle,
    iconColor: "text-green-600",
    iconBg: "bg-green-50",
    color: "border-green-200",
    tag: "Más solicitado",
    title: "WhatsApp Business API",
    subtitle: "Evolution API Dashboard",
    description:
      "Panel profesional para gestionar tu WhatsApp empresarial: instancias, conversaciones, campañas masivas, webhooks y estadísticas en tiempo real.",
    trial: [
      "3 conversaciones activas",
      "10 mensajes de prueba",
      "Panel de estadísticas completo",
    ],
    paid: [
      "Instancias dedicadas ilimitadas",
      "Mensajes y campañas sin límite",
      "Webhooks personalizados",
      "Soporte 24/7",
    ],
    price: "Desde $49/mes",
    stack: ["Node.js", "Evolution API", "WebSocket", "Redis"],
  },
  {
    slug: "ai-chat",
    icon: Bot,
    iconColor: "text-violet-600",
    iconBg: "bg-violet-50",
    color: "border-violet-200",
    tag: null,
    title: "Asistente con IA",
    subtitle: "Chatbot LLM personalizado",
    description:
      "Chatbot inteligente entrenado con la información de tu negocio. Responde consultas, califica leads y agenda citas 24/7 en múltiples canales.",
    trial: [
      "15 mensajes de prueba",
      "3 modos de personalidad",
      "Respuestas contextuales",
    ],
    paid: [
      "Entrenamiento con tus datos",
      "Integración multicanal",
      "Dashboard de análisis de conversaciones",
      "Fine-tuning continuo",
    ],
    price: "Desde $99/mes",
    stack: ["OpenAI / Groq", "LangChain", "FastAPI", "Next.js"],
  },
  {
    slug: "ecommerce",
    icon: ShoppingBag,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50",
    color: "border-blue-200",
    tag: null,
    title: "Gestión E-Commerce",
    subtitle: "Admin panel + tienda",
    description:
      "Panel administrativo completo: catálogo de productos, gestión de pedidos, inventario, clientes y reportes de ventas en tiempo real.",
    trial: [
      "Catálogo demo con 10 productos",
      "Panel de pedidos en vivo",
      "Dashboard de ventas",
    ],
    paid: [
      "Tienda personalizada con tu marca",
      "Pasarelas de pago (Stripe, PayPal)",
      "App móvil incluida",
      "Analytics avanzado",
    ],
    price: "Desde $799 one-time",
    stack: ["Next.js", "PostgreSQL", "Stripe", "React Native"],
  },
  {
    slug: "analytics",
    icon: BarChart2,
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-50",
    color: "border-emerald-200",
    tag: null,
    title: "Analytics Dashboard",
    subtitle: "Métricas & Business Intelligence",
    description:
      "Visualiza el rendimiento de tu negocio: tráfico web, conversiones, comportamiento de usuarios, fuentes de tráfico y KPIs críticos.",
    trial: [
      "30 días de datos demo",
      "4 tipos de gráficas",
      "Exportar como imagen",
    ],
    paid: [
      "Integración con GA4, Meta, TikTok",
      "Reportes automáticos por email",
      "Alertas personalizadas",
      "API de exportación de datos",
    ],
    price: "Desde $149/mes",
    stack: ["Python", "Metabase / Grafana", "PostgreSQL", "Next.js"],
  },
  {
    slug: "automation",
    icon: GitBranch,
    iconColor: "text-amber-600",
    iconBg: "bg-amber-50",
    color: "border-amber-200",
    tag: null,
    title: "Automatización & Workflows",
    subtitle: "No-code / Low-code workflows",
    description:
      "Conecta aplicaciones, automatiza tareas repetitivas y crea flujos de trabajo inteligentes sin escribir código. Integra +200 apps.",
    trial: [
      "3 flujos de trabajo preconstruidos",
      "Simulación de ejecución en vivo",
      "Log de actividad en tiempo real",
    ],
    paid: [
      "Flujos ilimitados y personalizados",
      "200+ integraciones listas",
      "Ejecuciones programadas (cron)",
      "Manejo de errores y reintentos",
    ],
    price: "Desde $199/mes",
    stack: ["n8n / Make", "Node.js", "Docker", "Redis"],
  },
  {
    slug: "crm",
    icon: Users,
    iconColor: "text-rose-600",
    iconBg: "bg-rose-50",
    color: "border-rose-200",
    tag: null,
    title: "CRM & Pipeline de Ventas",
    subtitle: "Gestión de clientes y deals",
    description:
      "Gestiona contactos, visualiza tu pipeline de ventas en kanban, registra actividades y cierra más deals con menos esfuerzo.",
    trial: [
      "Pipeline con 4 etapas",
      "8 contactos de ejemplo",
      "Actividad y notas en vivo",
    ],
    paid: [
      "Contactos y deals ilimitados",
      "Automatizaciones de follow-up",
      "App móvil para ventas en campo",
      "Integración con email y WhatsApp",
    ],
    price: "Desde $299/mes",
    stack: ["Next.js", "PostgreSQL", "Prisma", "React Native"],
  },
];

export default function DemosPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <div className="bg-[#0F2544] pt-6 pb-16 sm:pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-white/40 hover:text-white text-sm mb-8 transition-colors"
          >
            <ArrowLeft size={14} />
            Volver al portafolio
          </Link>
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-[#C9A844]/20 border border-[#C9A844]/30 text-[#C9A844] text-sm font-semibold px-4 py-2 rounded-full mb-6">
              <Zap size={14} />
              6 demos interactivos — 100% gratuito
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              Prueba antes de contratar
            </h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">
              Cada demo es una versión real y funcional del producto que
              construiría para tu empresa. Explora, interactúa y decide con
              información.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm text-white/50">
              {[
                "Sin tarjeta de crédito",
                "Sin instalación",
                "Acceso inmediato",
                "Soporte en español",
              ].map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <Check size={13} className="text-emerald-400" />
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Demo cards */}
      <div className="max-w-6xl mx-auto px-4 -mt-6 pb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {demos.map((demo) => (
            <div
              key={demo.slug}
              className={`bg-white rounded-2xl border ${demo.color} shadow-sm hover:shadow-xl transition-all duration-300 p-6 flex flex-col group`}
            >
              {/* Tag */}
              {demo.tag && (
                <span className="self-start bg-[#C9A844] text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
                  {demo.tag}
                </span>
              )}

              {/* Icon */}
              <div
                className={`w-12 h-12 ${demo.iconBg} ${demo.iconColor} rounded-xl flex items-center justify-center mb-4`}
              >
                <demo.icon size={24} />
              </div>

              {/* Text */}
              <h2 className="text-xl font-bold text-[#0F2544] mb-1">
                {demo.title}
              </h2>
              <p className="text-xs font-medium text-gray-400 mb-3 uppercase tracking-wider">
                {demo.subtitle}
              </p>
              <p className="text-gray-500 text-sm leading-relaxed mb-5 flex-1">
                {demo.description}
              </p>

              {/* Trial includes */}
              <div className="mb-4">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Prueba incluye:
                </p>
                <ul className="space-y-1.5">
                  {demo.trial.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-sm text-gray-600"
                    >
                      <Check
                        size={13}
                        className="text-emerald-500 shrink-0"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech stack */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {demo.stack.map((s) => (
                  <span
                    key={s}
                    className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-md"
                  >
                    {s}
                  </span>
                ))}
              </div>

              {/* Price + CTA */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <span className="text-sm font-bold text-[#0F2544]">
                  {demo.price}
                </span>
                <Link
                  href={`/demos/${demo.slug}`}
                  className="flex items-center gap-1.5 bg-[#0F2544] group-hover:bg-[#1a3a6b] text-white font-semibold text-sm px-4 py-2 rounded-xl transition-colors"
                >
                  Probar gratis
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA banner */}
        <div className="mt-16 bg-gradient-to-br from-[#0F2544] to-[#1a3a6b] rounded-3xl p-8 sm:p-12 text-center overflow-hidden relative">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#C9A844] rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl" />
          </div>
          <div className="relative">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              ¿Listo para la versión completa?
            </h2>
            <p className="text-white/60 mb-8 max-w-xl mx-auto">
              Cada demo muestra exactamente lo que construiría para tu empresa,
              personalizado con tu marca, datos reales e integraciones a medida.
            </p>
            <a
              href="/#contact"
              className="inline-flex items-center gap-2 bg-[#C9A844] hover:bg-[#b8962f] text-white font-bold px-8 py-4 rounded-xl transition-colors text-sm"
            >
              Iniciar conversación gratuita →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
