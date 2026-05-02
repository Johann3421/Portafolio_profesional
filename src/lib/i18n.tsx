"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type Locale = "es" | "en";

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | null>(null);

// Inline translations (no file system needed in client)
const translations: Record<Locale, Record<string, string>> = {
  es: {
    // Nav
    "nav.about": "Sobre mí",
    "nav.services": "Servicios",
    "nav.stack": "Tecnologías",
    "nav.projects": "Proyectos",
    "nav.contact": "Contacto",
    "nav.cta": "Iniciar Proyecto",
    "nav.demos": "Demos gratis",

    // Hero
    "hero.greeting": "Hola, soy",
    "hero.name": "Johann Abad",
    "hero.title": "Desarrollador Full Stack &\nIngeniero de Software con IA",
    "hero.subtitle":
      "Diseño y construyo soluciones digitales de alto impacto: desde plataformas web y móviles hasta sistemas con inteligencia artificial. Ayudo a empresas e instituciones a escalar con tecnología de vanguardia.",
    "hero.cta_primary": "Ver mis proyectos",
    "hero.cta_secondary": "Hablar con Johann",
    "hero.available": "Disponible para proyectos",

    // Stats
    "stats.experience": "Años de experiencia",
    "stats.projects": "Proyectos entregados",
    "stats.clients": "Clientes satisfechos",
    "stats.satisfaction": "Tasa de satisfacción",

    // About
    "about.badge": "Sobre mí",
    "about.title": "Ingeniería con propósito,\nresultados que perduran",
    "about.p1":
      "Soy Johann Abad, ingeniero de software con especialización en desarrollo full stack e inteligencia artificial. Con años de experiencia trabajando con empresas, instituciones públicas y startups, entiendo que cada proyecto es único y requiere una solución personalizada.",
    "about.p2":
      "Mi enfoque combina rigor técnico con visión de negocio: no solo escribo código, construyo sistemas que resuelven problemas reales y generan valor tangible. Trabajo con metodologías ágiles y mejores prácticas de la industria para garantizar entregas de alta calidad.",
    "about.value1": "Calidad sin compromisos",
    "about.value2": "Comunicación transparente",
    "about.value3": "Innovación aplicada",
    "about.value4": "Entrega puntual",
    "about.cta": "Descargar CV",

    // Services
    "services.badge": "Servicios",
    "services.title": "Soluciones para cada\ndesafío tecnológico",
    "services.subtitle":
      "Ofrezco un espectro completo de servicios de ingeniería de software, adaptados a las necesidades específicas de tu organización.",

    "services.web.title": "Desarrollo Web Full Stack",
    "services.web.desc":
      "Plataformas web robustas, escalables y de alto rendimiento con las tecnologías más modernas del mercado.",

    "services.mobile.title": "Aplicaciones Móviles",
    "services.mobile.desc":
      "Apps nativas y multiplataforma para iOS y Android con experiencias de usuario excepcionales.",

    "services.ai.title": "Inteligencia Artificial & ML",
    "services.ai.desc":
      "Integración de IA, chatbots inteligentes, automatización con LLMs y modelos de machine learning a medida.",

    "services.cloud.title": "Cloud & DevOps",
    "services.cloud.desc":
      "Infraestructura en la nube, CI/CD, contenedores y despliegues automatizados para máxima disponibilidad.",

    "services.consulting.title": "Consultoría Tecnológica",
    "services.consulting.desc":
      "Auditorías técnicas, roadmaps tecnológicos y acompañamiento estratégico para la transformación digital.",

    "services.arch.title": "Arquitectura de Sistemas",
    "services.arch.desc":
      "Diseño de arquitecturas escalables, microservicios, APIs y sistemas distribuidos para el crecimiento sostenido.",

    // Stack
    "stack.badge": "Stack Tecnológico",
    "stack.title": "Herramientas con las que\ntrabajo a diario",
    "stack.frontend": "Frontend",
    "stack.backend": "Backend & APIs",
    "stack.mobile": "Mobile",
    "stack.ai": "IA & Machine Learning",
    "stack.cloud": "Cloud & DevOps",
    "stack.db": "Bases de datos",

    // Projects
    "projects.badge": "Proyectos destacados",
    "projects.title": "Soluciones reales,\nresultados medibles",
    "projects.subtitle":
      "Una muestra de los proyectos donde la ingeniería y la estrategia digital se unen para crear valor.",
    "projects.view": "Ver proyecto",
    "projects.code": "Ver código",
    "projects.more": "Ver todos los proyectos",

    "projects.p1.title": "Plataforma SaaS Empresarial",
    "projects.p1.desc":
      "Sistema de gestión multitenancy con panel administrativo, reportes en tiempo real, autenticación avanzada e integraciones de terceros para una empresa del sector financiero.",
    "projects.p1.tag1": "Next.js",
    "projects.p1.tag2": "Node.js",
    "projects.p1.tag3": "PostgreSQL",
    "projects.p1.tag4": "Docker",

    "projects.p2.title": "Asistente IA para Atención al Cliente",
    "projects.p2.desc":
      "Chatbot inteligente entrenado con documentación institucional, integrado con WhatsApp y web, capaz de resolver el 80% de las consultas sin intervención humana.",
    "projects.p2.tag1": "LangChain",
    "projects.p2.tag2": "OpenAI",
    "projects.p2.tag3": "FastAPI",
    "projects.p2.tag4": "Redis",

    "projects.p3.title": "App E-Commerce Móvil",
    "projects.p3.desc":
      "Aplicación móvil de comercio electrónico con catálogo dinámico, pagos integrados, notificaciones push y panel de vendedor para una empresa retail con +10,000 usuarios.",
    "projects.p3.tag1": "React Native",
    "projects.p3.tag2": "Expo",
    "projects.p3.tag3": "Stripe",
    "projects.p3.tag4": "MongoDB",

    // Contact
    "contact.badge": "Contacto",
    "contact.title": "¿Tienes un proyecto\nen mente?",
    "contact.subtitle":
      "Conversemos sobre cómo puedo ayudar a tu organización a alcanzar sus objetivos tecnológicos.",
    "contact.name": "Nombre completo",
    "contact.email": "Correo electrónico",
    "contact.company": "Empresa / Institución",
    "contact.message": "Cuéntame sobre tu proyecto",
    "contact.send": "Enviar mensaje",
    "contact.sending": "Enviando...",
    "contact.success": "¡Mensaje enviado! Te responderé pronto.",
    "contact.info_title": "Información de contacto",
    "contact.location": "Colombia / Remoto",
    "contact.response": "Respondo en menos de 24 horas",

    // Footer
    "footer.rights": "Todos los derechos reservados.",
    "footer.built": "Construido con Next.js & Tailwind CSS",
    "footer.nav": "Navegación",
    "footer.social": "Redes sociales",
  },

  en: {
    "nav.about": "About",
    "nav.services": "Services",
    "nav.stack": "Tech Stack",
    "nav.projects": "Projects",
    "nav.contact": "Contact",
    "nav.cta": "Start a Project",
    "nav.demos": "Free demos",

    "hero.greeting": "Hi, I'm",
    "hero.name": "Johann Abad",
    "hero.title": "Full Stack Developer &\nSoftware Engineer with AI",
    "hero.subtitle":
      "I design and build high-impact digital solutions: from web and mobile platforms to AI-powered systems. I help businesses and institutions scale with cutting-edge technology.",
    "hero.cta_primary": "View my projects",
    "hero.cta_secondary": "Talk to Johann",
    "hero.available": "Available for projects",

    "stats.experience": "Years of experience",
    "stats.projects": "Projects delivered",
    "stats.clients": "Satisfied clients",
    "stats.satisfaction": "Satisfaction rate",

    "about.badge": "About me",
    "about.title": "Engineering with purpose,\nlasting results",
    "about.p1":
      "I'm Johann Abad, a software engineer specializing in full stack development and artificial intelligence. With years of experience working with companies, public institutions, and startups, I understand that every project is unique and requires a tailored solution.",
    "about.p2":
      "My approach combines technical rigor with business vision: I don't just write code, I build systems that solve real problems and generate tangible value. I work with agile methodologies and industry best practices to ensure high-quality deliveries.",
    "about.value1": "Uncompromising quality",
    "about.value2": "Transparent communication",
    "about.value3": "Applied innovation",
    "about.value4": "On-time delivery",
    "about.cta": "Download CV",

    "services.badge": "Services",
    "services.title": "Solutions for every\ntechnological challenge",
    "services.subtitle":
      "I offer a full spectrum of software engineering services, tailored to the specific needs of your organization.",

    "services.web.title": "Full Stack Web Development",
    "services.web.desc":
      "Robust, scalable, high-performance web platforms built with the most modern technologies on the market.",

    "services.mobile.title": "Mobile Applications",
    "services.mobile.desc":
      "Native and cross-platform apps for iOS and Android with exceptional user experiences.",

    "services.ai.title": "Artificial Intelligence & ML",
    "services.ai.desc":
      "AI integration, intelligent chatbots, LLM automation and custom machine learning models.",

    "services.cloud.title": "Cloud & DevOps",
    "services.cloud.desc":
      "Cloud infrastructure, CI/CD, containers, and automated deployments for maximum availability.",

    "services.consulting.title": "Technology Consulting",
    "services.consulting.desc":
      "Technical audits, technology roadmaps, and strategic guidance for digital transformation.",

    "services.arch.title": "Systems Architecture",
    "services.arch.desc":
      "Design of scalable architectures, microservices, APIs, and distributed systems for sustained growth.",

    "stack.badge": "Tech Stack",
    "stack.title": "Tools I work\nwith every day",
    "stack.frontend": "Frontend",
    "stack.backend": "Backend & APIs",
    "stack.mobile": "Mobile",
    "stack.ai": "AI & Machine Learning",
    "stack.cloud": "Cloud & DevOps",
    "stack.db": "Databases",

    "projects.badge": "Featured Projects",
    "projects.title": "Real solutions,\nmeasurable results",
    "projects.subtitle":
      "A sample of projects where engineering and digital strategy come together to create value.",
    "projects.view": "View project",
    "projects.code": "View code",
    "projects.more": "View all projects",

    "projects.p1.title": "Enterprise SaaS Platform",
    "projects.p1.desc":
      "Multitenancy management system with admin panel, real-time reporting, advanced authentication, and third-party integrations for a financial sector company.",
    "projects.p1.tag1": "Next.js",
    "projects.p1.tag2": "Node.js",
    "projects.p1.tag3": "PostgreSQL",
    "projects.p1.tag4": "Docker",

    "projects.p2.title": "AI Customer Service Assistant",
    "projects.p2.desc":
      "Intelligent chatbot trained on institutional documentation, integrated with WhatsApp and web, capable of resolving 80% of queries without human intervention.",
    "projects.p2.tag1": "LangChain",
    "projects.p2.tag2": "OpenAI",
    "projects.p2.tag3": "FastAPI",
    "projects.p2.tag4": "Redis",

    "projects.p3.title": "Mobile E-Commerce App",
    "projects.p3.desc":
      "Mobile e-commerce application with dynamic catalog, integrated payments, push notifications and seller dashboard for a retail company with +10,000 users.",
    "projects.p3.tag1": "React Native",
    "projects.p3.tag2": "Expo",
    "projects.p3.tag3": "Stripe",
    "projects.p3.tag4": "MongoDB",

    "contact.badge": "Contact",
    "contact.title": "Have a project\nin mind?",
    "contact.subtitle":
      "Let's talk about how I can help your organization achieve its technology goals.",
    "contact.name": "Full name",
    "contact.email": "Email address",
    "contact.company": "Company / Institution",
    "contact.message": "Tell me about your project",
    "contact.send": "Send message",
    "contact.sending": "Sending...",
    "contact.success": "Message sent! I'll get back to you soon.",
    "contact.info_title": "Contact information",
    "contact.location": "Colombia / Remote",
    "contact.response": "I respond in less than 24 hours",

    "footer.rights": "All rights reserved.",
    "footer.built": "Built with Next.js & Tailwind CSS",
    "footer.nav": "Navigation",
    "footer.social": "Social media",
  },
};

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("es");

  const t = (key: string): string => {
    return translations[locale][key] ?? key;
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}
