import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const BASE = "https://portafolio.abadgroup.tech";
  const now = new Date();

  const demos = [
    "whatsapp",
    "ai-chat",
    "analytics",
    "automation",
    "crm",
    "ecommerce",
  ];

  return [
    {
      url: BASE,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: {
          es: BASE,
          en: `${BASE}?lang=en`,
        },
      },
    },
    {
      url: `${BASE}/demos`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...demos.map((slug) => ({
      url: `${BASE}/demos/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
