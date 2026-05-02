import { Metadata } from "next";
import AutomationDemo from "@/components/demos/AutomationDemo";

export const metadata: Metadata = {
  title: "Demo Automatización & Workflows | Johann Abad",
  description: "Prueba gratis el constructor visual de workflows: conecta WhatsApp, email y CRM. Ejecuta flujos y ve el log en tiempo real.",
};

export default function AutomationDemoPage() {
  return <AutomationDemo />;
}
