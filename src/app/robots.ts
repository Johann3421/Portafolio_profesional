import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: "https://portafolio.abadgroup.tech/sitemap.xml",
    host: "https://portafolio.abadgroup.tech",
  };
}
