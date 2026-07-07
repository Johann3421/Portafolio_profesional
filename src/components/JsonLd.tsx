/**
 * JSON-LD Structured Data for SEO rich results.
 * Implements Person, WebSite, and Service schemas from schema.org.
 */
export default function JsonLd() {
  const BASE = "https://portafolio.abadgroup.tech";

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
      "https://github.com/Johann3421",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lima",
      addressRegion: "Lima",
      addressCountry: "PE",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+51-970-435-903",
      email: "contact@abadgroup.tech",
      contactType: "customer service",
      availableLanguage: ["Spanish", "English"],
    },
  };

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Johann Abad — Desarrollo de Software & IA",
    url: BASE,
    image: `${BASE}/og-image.png`,
    telephone: "+51-970-435-903",
    email: "contact@abadgroup.tech",
    description:
      "Desarrollo de software a medida, aplicaciones web y móviles, inteligencia artificial y consultoría tecnológica en Lima, Perú.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lima",
      addressRegion: "Lima",
      addressCountry: "PE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -12.0464,
      longitude: -77.0428,
    },
    areaServed: [
      { "@type": "City", name: "Lima" },
      { "@type": "Country", name: "Perú" },
      { "@type": "Country", name: "Colombia" },
    ],
    priceRange: "$$",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    sameAs: [
      "https://linkedin.com/in/johannabad",
      "https://github.com/Johann3421",
    ],
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
    areaServed: [
      { "@type": "City", name: "Lima" },
      { "@type": "Country", name: "Perú" },
    ],
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
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
