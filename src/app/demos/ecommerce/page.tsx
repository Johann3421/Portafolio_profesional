import { Metadata } from "next";
import EcommerceDemo from "@/components/demos/EcommerceDemo";

export const metadata: Metadata = {
  title: "Demo Gestión E-Commerce | Johann Abad",
  description: "Prueba gratis el panel de gestión de tienda online: productos, pedidos, inventario y dashboard de ventas en tiempo real.",
};

export default function EcommerceDemoPage() {
  return <EcommerceDemo />;
}
