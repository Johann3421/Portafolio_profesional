/**
 * JSON-LD Structured Data for SEO rich results.
 * Implements Person, WebSite, and Service schemas from schema.org.
 */
export default function JsonLd() {
  const BASE = "https://abadgroup.tech";

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Johann Abad",
    url: BASE,
    image: `${BASE}/og-image.png`,
    jobTitle: "Full Stack Developer & AI Engineer",
    description:
      "Desarrollador Full Stack e Ingeniero de Software especializado en inteligencia artificial. Más de 5 años construyendo soluciones digitales para empresas e instituciones.",
    knowsAbout: [
      "Full Stack Development",
      "Artificial Intelligence",
      "Machine Learning",
      "React",
      "Next.js",
      "Node.js",
      "Python",
      "FastAPI",
      "LangChain",
      "Cloud Architecture",
      "DevOps",
    ],
    sameAs: [
      "https://linkedin.com/in/johannabad",
      "https://github.com/johannabad",
      "https://twitter.com/johannabad",
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "CO",
      addressRegion: "Colombia",
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: "contact@abadgroup.tech",
      contactType: "customer service",
      availableLanguage: ["Spanish", "English"],
    },
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Johann Abad — Full Stack Developer & AI Engineer",
    url: BASE,
    description:
      "Portfolio profesional de Johann Abad. Soluciones de software, IA y consultoría tecnológica para empresas e instituciones.",
    inLanguage: ["es-CO", "en-US"],
    potentialAction: {
      "@type": "SearchAction",
      target: `${BASE}/#contact`,
      query: "Solicitar consultoría",
    },
  };

  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Desarrollo de Software y Consultoría Tecnológica",
    provider: {
      "@type": "Person",
      name: "Johann Abad",
      url: BASE,
    },
    serviceType: "Software Development",
    description:
      "Servicios de desarrollo full stack, aplicaciones móviles, inteligencia artificial, cloud/DevOps, arquitectura de sistemas y consultoría tecnológica.",
    areaServed: {
      "@type": "Country",
      name: "Colombia",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Servicios de Software",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Desarrollo Web Full Stack",
            description:
              "Plataformas web robustas y escalables con Next.js, React y Node.js.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Inteligencia Artificial & Machine Learning",
            description:
              "Integración de IA, chatbots con LLMs, automatización y modelos de ML a medida.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Aplicaciones Móviles",
            description:
              "Apps nativas y multiplataforma para iOS y Android con React Native.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Cloud & DevOps",
            description:
              "Infraestructura cloud, CI/CD, Docker, Kubernetes y despliegues automatizados.",
          },
        },
      ],
    },
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "¿Cuánto cuesta desarrollar una aplicación web empresarial?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "El costo varía según la complejidad y alcance del proyecto. Contáctame para una evaluación gratuita y presupuesto personalizado sin compromiso.",
        },
      },
      {
        "@type": "Question",
        name: "¿Trabajas con empresas fuera de Colombia?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sí, trabajo de forma 100% remota con empresas e instituciones de Latinoamérica, España y Estados Unidos.",
        },
      },
      {
        "@type": "Question",
        name: "¿Qué incluye una consultoría tecnológica?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Incluye auditoría técnica del sistema actual, identificación de oportunidades de mejora, roadmap tecnológico y recomendaciones estratégicas para la transformación digital.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
      />
    </>
  );
}
