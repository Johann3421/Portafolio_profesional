import { Metadata } from "next";
import AnalyticsDemo from "@/components/demos/AnalyticsDemo";

export const metadata: Metadata = {
  title: "Demo Analytics Dashboard | Johann Abad",
  description: "Prueba gratis el dashboard de analytics: visitantes en tiempo real, fuentes de tráfico, páginas más vistas y KPIs de negocio.",
};

export default function AnalyticsDemoPage() {
  return <AnalyticsDemo />;
}
