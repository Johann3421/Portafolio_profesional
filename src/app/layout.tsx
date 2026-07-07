import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { I18nProvider } from "@/lib/i18n";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const BASE_URL = "https://portafolio.abadgroup.tech";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Johann Abad | Full Stack Developer & AI Engineer",
    template: "%s | Johann Abad",
  },
  description:
    "Johann Abad — Desarrollador Full Stack e Ingeniero de Software con IA en Lima, Perú. Construyo plataformas web, apps móviles y sistemas con inteligencia artificial para empresas e instituciones. Más de 50 proyectos entregados.",
  keywords: [
    "Desarrollador Full Stack Perú",
    "Desarrollador web Lima",
    "Ingeniero de Software con IA Perú",
    "Johann Abad",
    "programador Lima",
    "desarrollo web empresarial Lima",
    "chatbot IA empresas Perú",
    "software a medida Lima",
    "consultoría tecnológica Perú",
    "Next.js developer",
    "React developer",
    "Full Stack Developer remote",
    "AI Engineer freelance",
    "LangChain developer",
    "aplicaciones móviles Lima",
    "automatización con IA Perú",
  ],
  authors: [{ name: "Johann Abad", url: BASE_URL }],
  creator: "Johann Abad",
  publisher: "Johann Abad",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
    languages: {
      "es-CO": BASE_URL,
      "en-US": `${BASE_URL}/en`,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_CO",
    alternateLocale: "en_US",
    url: BASE_URL,
    siteName: "Johann Abad Portfolio",
    title: "Johann Abad | Full Stack Developer & AI Engineer",
    description:
      "Soluciones digitales de alto impacto para empresas e instituciones. Desarrollo web, apps móviles, IA/ML, Cloud y consultoría tecnológica.",
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Johann Abad - Full Stack Developer & AI Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@johannabad",
    creator: "@johannabad",
    title: "Johann Abad | Full Stack Developer & AI Engineer",
    description:
      "Construyo soluciones digitales con IA para empresas e instituciones. 50+ proyectos entregados.",
    images: [`${BASE_URL}/og-image.png`],
  },
  // ponytail: add google verification code when Search Console is set up
  // verification: { google: "YOUR_CODE" },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} scroll-smooth antialiased`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        {/* Google Tag Manager placeholder - replace GTM-XXXXXXX */}
        {/* <script async src="https://www.googletagmanager.com/gtag/js?id=GTM-XXXXXXX" /> */}
      </head>
      <body className="min-h-screen font-sans">
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
