import { Metadata } from "next";
import CRMDemo from "@/components/demos/CRMDemo";

export const metadata: Metadata = {
  title: "Demo CRM & Pipeline de Ventas | Johann Abad",
  description: "Prueba gratis el CRM: pipeline kanban de ventas, gestión de contactos, actividad del equipo y métricas de cierre.",
};

export default function CRMDemoPage() {
  return <CRMDemo />;
}
