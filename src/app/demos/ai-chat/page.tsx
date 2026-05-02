import { Metadata } from "next";
import AIChatDemo from "@/components/demos/AIChatDemo";

export const metadata: Metadata = {
  title: "Demo Asistente con IA (Chatbot LLM) | Johann Abad",
  description: "Prueba gratis un chatbot inteligente: elige entre modo ventas, soporte técnico y FAQ. Respuestas contextuales en tiempo real.",
};

export default function AIChatDemoPage() {
  return <AIChatDemo />;
}
