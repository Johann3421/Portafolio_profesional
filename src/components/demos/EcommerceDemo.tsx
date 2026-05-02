"use client";

import { useState } from "react";
import DemoShell from "./DemoShell";
import {
  ShoppingBag,
  Package,
  Users,
  TrendingUp,
  Plus,
  Search,
  Eye,
  Edit,
  Trash2,
  Lock,
  Check,
  AlertCircle,
  ChevronDown,
  X,
} from "lucide-react";

const PRODUCTS = [
  { id: 1, name: "Camiseta Básica Premium", sku: "TSH-001", price: 45000, stock: 124, category: "Ropa", status: "active", img: "👕" },
  { id: 2, name: "Zapatillas Runner Pro", sku: "SHO-042", price: 189000, stock: 38, category: "Calzado", status: "active", img: "👟" },
  { id: 3, name: "Mochila Urban 30L", sku: "BAG-017", price: 125000, stock: 7, category: "Accesorios", status: "low_stock", img: "🎒" },
  { id: 4, name: "Audífonos BT Pro", sku: "ELC-009", price: 220000, stock: 0, category: "Electrónica", status: "out_stock", img: "🎧" },
  { id: 5, name: "Reloj Smart Series 3", sku: "ELC-021", price: 349000, stock: 15, category: "Electrónica", status: "active", img: "⌚" },
];

const ORDERS = [
  { id: "#ORD-2847", customer: "Carlos M.", total: 234000, items: 2, status: "delivered", date: "29 Abr", avatar: "CM", color: "bg-blue-500" },
  { id: "#ORD-2846", customer: "María García", total: 189000, items: 1, status: "shipping", date: "29 Abr", avatar: "MG", color: "bg-emerald-500" },
  { id: "#ORD-2845", customer: "Pedro López", total: 570000, items: 3, status: "processing", date: "28 Abr", avatar: "PL", color: "bg-violet-500" },
  { id: "#ORD-2844", customer: "Empresa XYZ", total: 1890000, items: 8, status: "delivered", date: "27 Abr", avatar: "XY", color: "bg-amber-500" },
  { id: "#ORD-2843", customer: "Ana Martínez", total: 45000, items: 1, status: "cancelled", date: "27 Abr", avatar: "AM", color: "bg-rose-500" },
];

const STATUS_MAP: Record<string, { label: string; color: string }> = {
  delivered: { label: "Entregado", color: "bg-emerald-100 text-emerald-700" },
  shipping: { label: "En camino", color: "bg-blue-100 text-blue-700" },
  processing: { label: "Procesando", color: "bg-amber-100 text-amber-700" },
  cancelled: { label: "Cancelado", color: "bg-red-100 text-red-700" },
  active: { label: "Activo", color: "bg-emerald-100 text-emerald-700" },
  low_stock: { label: "Stock bajo", color: "bg-amber-100 text-amber-700" },
  out_stock: { label: "Agotado", color: "bg-red-100 text-red-700" },
};

export default function EcommerceDemo() {
  const [tab, setTab] = useState<"dashboard" | "products" | "orders">("dashboard");
  const [search, setSearch] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [addedMsg, setAddedMsg] = useState<string | null>(null);

  const filteredProducts = PRODUCTS.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.sku.toLowerCase().includes(search.toLowerCase())
  );

  const simulateAdd = (name: string) => {
    setCartCount((c) => c + 1);
    setAddedMsg(name);
    setTimeout(() => setAddedMsg(null), 2000);
  };

  const TABS = [
    { id: "dashboard" as const, label: "Dashboard", icon: TrendingUp },
    { id: "products" as const, label: "Productos", icon: Package },
    { id: "orders" as const, label: "Pedidos", icon: ShoppingBag },
  ];

  return (
    <DemoShell
      title="Gestión E-Commerce"
      subtitle="Admin Panel + Tienda"
      trialUsed={cartCount}
      trialMax={10}
      priceLabel="Desde $799 one-time · Código fuente incluido"
    >
      <div className="flex flex-col h-[calc(100vh-112px)]">
        {/* Tabs */}
        <div className="bg-white border-b border-gray-100 px-4 shrink-0">
          <div className="flex gap-0 max-w-5xl mx-auto overflow-x-auto">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={`flex items-center gap-1.5 px-4 py-3.5 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                  tab === id ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                <Icon size={14} /> {label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-50">
          <div className="max-w-5xl mx-auto">

            {/* DASHBOARD */}
            {tab === "dashboard" && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { label: "Ventas hoy", value: "$2,878,000", delta: "+18%", icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-50" },
                    { label: "Pedidos activos", value: "23", delta: "+5", icon: ShoppingBag, color: "text-blue-600", bg: "bg-blue-50" },
                    { label: "Clientes nuevos", value: "14", delta: "+3", icon: Users, color: "text-violet-600", bg: "bg-violet-50" },
                    { label: "Productos activos", value: "142", delta: "−2", icon: Package, color: "text-amber-600", bg: "bg-amber-50" },
                  ].map((s) => (
                    <div key={s.label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                      <div className="flex items-start justify-between mb-3">
                        <div className={`w-9 h-9 ${s.bg} ${s.color} rounded-xl flex items-center justify-center`}>
                          <s.icon size={16} />
                        </div>
                        <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{s.delta}</span>
                      </div>
                      <p className="text-xl font-bold text-[#0F2544]">{s.value}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
                    </div>
                  ))}
                </div>

                {/* Revenue bars */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="font-bold text-[#0F2544]">Ventas — últimos 7 días</h3>
                    <span className="text-xs text-gray-400">Total: $14,230,000</span>
                  </div>
                  <div className="flex items-end gap-2 h-28">
                    {[62, 48, 75, 82, 65, 90, 78].map((v, i) => {
                      const days = ["Jue", "Vie", "Sáb", "Dom", "Lun", "Mar", "Hoy"];
                      return (
                        <div key={i} className="flex-1 flex flex-col items-center gap-1">
                          <div
                            className={`w-full rounded-t-lg transition-all ${i === 6 ? "bg-blue-500" : "bg-blue-100"}`}
                            style={{ height: `${v}%` }}
                          />
                          <span className="text-xs text-gray-400">{days[i]}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Recent orders */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-[#0F2544]">Pedidos recientes</h3>
                    <button onClick={() => setTab("orders")} className="text-xs text-blue-500 font-semibold hover:underline">Ver todos →</button>
                  </div>
                  <div className="space-y-2">
                    {ORDERS.slice(0, 3).map((o) => (
                      <div key={o.id} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition-colors">
                        <div className={`w-8 h-8 ${o.color} rounded-full text-white text-xs font-bold flex items-center justify-center shrink-0`}>{o.avatar}</div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-800">{o.customer}</p>
                          <p className="text-xs text-gray-400">{o.id} · {o.items} artículo{o.items > 1 ? "s" : ""}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-sm font-bold text-gray-800">${o.total.toLocaleString()}</p>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_MAP[o.status].color}`}>{STATUS_MAP[o.status].label}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* PRODUCTS */}
            {tab === "products" && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3 justify-between">
                  <div className="relative flex-1 max-w-sm">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Buscar producto o SKU..."
                      className="w-full pl-9 pr-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-300"
                    />
                  </div>
                  <div className="relative group self-start">
                    <button className="flex items-center gap-1.5 bg-blue-500 text-white text-sm font-semibold px-4 py-2.5 rounded-xl">
                      <Plus size={14} /> Nuevo producto
                      <span className="bg-white/30 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full ml-1">Pro</span>
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-100">
                          <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 py-3">Producto</th>
                          <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 py-3 hidden sm:table-cell">SKU</th>
                          <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 py-3">Precio</th>
                          <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 py-3 hidden md:table-cell">Stock</th>
                          <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 py-3">Estado</th>
                          <th className="px-4 py-3" />
                        </tr>
                      </thead>
                      <tbody>
                        {filteredProducts.map((p) => (
                          <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <span className="text-xl">{p.img}</span>
                                <div>
                                  <p className="font-semibold text-sm text-gray-800">{p.name}</p>
                                  <p className="text-xs text-gray-400">{p.category}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3 hidden sm:table-cell">
                              <span className="font-mono text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{p.sku}</span>
                            </td>
                            <td className="px-4 py-3 font-bold text-sm text-gray-800">${p.price.toLocaleString()}</td>
                            <td className="px-4 py-3 hidden md:table-cell">
                              <span className={`text-sm font-medium ${p.stock === 0 ? "text-red-500" : p.stock < 10 ? "text-amber-500" : "text-gray-700"}`}>
                                {p.stock}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${STATUS_MAP[p.status].color}`}>
                                {STATUS_MAP[p.status].label}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-1">
                                <button onClick={() => simulateAdd(p.name)} className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors" title="Agregar a carrito">
                                  <Eye size={14} />
                                </button>
                                <button className="p-1.5 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors opacity-50 cursor-not-allowed" title="Editar (Pro)">
                                  <Edit size={14} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {filteredProducts.length === 0 && (
                    <div className="text-center py-12 text-gray-400">
                      <Package size={32} className="mx-auto mb-2 opacity-30" />
                      <p className="text-sm">No se encontraron productos</p>
                    </div>
                  )}
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-2xl p-5 flex items-center gap-4">
                  <Lock size={18} className="text-blue-500 shrink-0" />
                  <div>
                    <p className="font-bold text-blue-800 text-sm">+132 productos más en la versión completa</p>
                    <p className="text-xs text-blue-600 mt-0.5">Agregar, editar y eliminar productos · Variantes (talla, color) · Galería de imágenes · SEO por producto</p>
                  </div>
                </div>
              </div>
            )}

            {/* ORDERS */}
            {tab === "orders" && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-[#0F2544]">Gestión de pedidos</h3>
                <div className="space-y-3">
                  {ORDERS.map((o) => (
                    <div key={o.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                      <div className={`w-10 h-10 ${o.color} rounded-full text-white text-sm font-bold flex items-center justify-center shrink-0`}>{o.avatar}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="font-bold text-gray-800">{o.customer}</span>
                          <span className="font-mono text-xs text-gray-400">{o.id}</span>
                        </div>
                        <p className="text-xs text-gray-400">{o.items} artículo{o.items > 1 ? "s" : ""} · {o.date}</p>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="font-bold text-gray-800">${o.total.toLocaleString()}</span>
                        <span className={`text-xs px-3 py-1 rounded-full font-semibold ${STATUS_MAP[o.status].color}`}>{STATUS_MAP[o.status].label}</span>
                        <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors">
                          <Eye size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-gradient-to-r from-[#0F2544] to-[#1a3a6b] rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Lock size={13} className="text-[#C9A844]" />
                      <span className="text-[#C9A844] text-xs font-bold">Versión completa incluye</span>
                    </div>
                    <p className="text-white text-sm">Filtros avanzados, exportar a Excel, etiquetas de envío, integración con MercadoLibre, Rappi y WhatsApp notifications.</p>
                  </div>
                  <a href="/#contact" className="shrink-0 bg-[#C9A844] hover:bg-[#b8962f] text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-colors whitespace-nowrap">
                    Ver propuesta →
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add to cart toast */}
      {addedMsg && (
        <div className="fixed bottom-16 left-1/2 -translate-x-1/2 bg-[#0F2544] text-white text-sm font-medium px-5 py-2.5 rounded-full shadow-xl flex items-center gap-2 z-50">
          <Check size={14} className="text-emerald-400" />
          {addedMsg} — añadido al demo
        </div>
      )}
    </DemoShell>
  );
}
