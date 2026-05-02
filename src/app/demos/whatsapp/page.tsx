import { Metadata } from "next";
import WhatsAppDemo from "@/components/demos/WhatsAppDemo";

export const metadata: Metadata = {
  title: "Demo WhatsApp Business API (Evolution API) | Johann Abad",
  description: "Prueba gratis el panel de WhatsApp Business: gestión de instancias, chat en tiempo real, campañas masivas y estadísticas. Sin tarjeta de crédito.",
};

export default function WhatsAppDemoPage() {
  return <WhatsAppDemo />;
}
