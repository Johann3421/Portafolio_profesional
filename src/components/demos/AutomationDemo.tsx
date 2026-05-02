"use client";

import { useState, useEffect } from "react";
import DemoShell from "./DemoShell";
import {
  GitBranch,
  Play,
  Pause,
  CheckCircle,
  Circle,
  AlertCircle,
  MessageCircle,
  Mail,
  Database,
  Clock,
  Zap,
  Lock,
  ChevronRight,
  RefreshCw,
} from "lucide-react";

type NodeStatus = "idle" | "running" | "done" | "error";

interface WorkflowNode {
  id: string;
  type: "trigger" | "condition" | "action";
  label: string;
  desc: string;
  icon: React.ElementType;
  color: string;
  bg: string;
  status: NodeStatus;
}

interface Workflow {
  id: number;
  name: string;
  desc: string;
  trigger: string;
  category: string;
  nodes: WorkflowNode[];
  executions: number;
  lastRun: string;
}

const buildNodes = (overrides: Partial<WorkflowNode>[] = []): WorkflowNode[] => {
  const base: WorkflowNode[] = [
    { id: "t1", type: "trigger", label: "Disparador", desc: "Nuevo lead en formulario web", icon: Zap, color: "text-amber-600", bg: "bg-amber-100", status: "idle" },
    { id: "c1", type: "condition", label: "Condición", desc: "¿Tiene email válido?", icon: GitBranch, color: "text-blue-600", bg: "bg-blue-100", status: "idle" },
    { id: "a1", type: "action", label: "WhatsApp", desc: "Enviar mensaje de bienvenida", icon: MessageCircle, color: "text-green-600", bg: "bg-green-100", status: "idle" },
    { id: "a2", type: "action", label: "Email", desc: "Enviar brochure por email", icon: Mail, color: "text-violet-600", bg: "bg-violet-100", status: "idle" },
    { id: "a3", type: "action", label: "CRM", desc: "Crear contacto en pipeline", icon: Database, color: "text-rose-600", bg: "bg-rose-100", status: "idle" },
    { id: "a4", type: "action", label: "Esperar 24h", desc: "Programar seguimiento", icon: Clock, color: "text-gray-600", bg: "bg-gray-100", status: "idle" },
  ];
  return base.map((n, i) => ({ ...n, ...(overrides[i] || {}) }));
};

const WORKFLOWS: Workflow[] = [
  {
    id: 1,
    name: "Captura de Leads WhatsApp",
    desc: "Cuando alguien llena el formulario → WhatsApp + Email + CRM automáticamente",
    trigger: "Formulario web",
    category: "Ventas",
    executions: 1247,
    lastRun: "hace 3 min",
    nodes: buildNodes(),
  },
  {
    id: 2,
    name: "Notificaciones de Pedidos",
    desc: "Confirmación automática al cliente en cada cambio de estado de su pedido",
    trigger: "Nuevo pedido",
    category: "E-Commerce",
    executions: 3891,
    lastRun: "hace 12 min",
    nodes: buildNodes(),
  },
  {
    id: 3,
    name: "Reporte Mensual Automático",
    desc: "Genera y envía reporte de métricas el primer día de cada mes",
    trigger: "Programado (mensual)",
    category: "Analytics",
    executions: 24,
    lastRun: "hace 1 día",
    nodes: buildNodes(),
  },
];

const LOG_MESSAGES = [
  { time: "14:23:01", type: "info", msg: "Disparador activado — nuevo lead: Carlos M." },
  { time: "14:23:01", type: "success", msg: "Condición verificada — email válido ✓" },
  { time: "14:23:02", type: "success", msg: "WhatsApp enviado a +57 300 *** **** ✓" },
  { time: "14:23:03", type: "success", msg: "Email con brochure enviado ✓" },
  { time: "14:23:04", type: "success", msg: "Contacto creado en CRM — Pipeline: Nuevo Lead ✓" },
  { time: "14:23:04", type: "info", msg: "Seguimiento programado en 24h ⏰" },
  { time: "14:23:04", type: "done", msg: "Flujo completado en 3.2s — 6/6 nodos exitosos" },
];

function NodeCard({ node, isLast }: { node: WorkflowNode; isLast: boolean }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className={`flex items-center gap-3 w-full border rounded-xl px-4 py-3 transition-all duration-300 ${
          node.status === "done"
            ? "bg-emerald-50 border-emerald-200"
            : node.status === "running"
            ? "bg-amber-50 border-amber-300 shadow-md"
            : node.status === "error"
            ? "bg-red-50 border-red-200"
            : "bg-white border-gray-200"
        }`}
      >
        <div className={`w-9 h-9 ${node.bg} ${node.color} rounded-xl flex items-center justify-center shrink-0`}>
          <node.icon size={16} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">{node.type === "trigger" ? "Disparador" : node.type === "condition" ? "Condición" : "Acción"}</p>
          <p className="text-sm font-semibold text-gray-800 truncate">{node.label}</p>
          <p className="text-xs text-gray-400 truncate">{node.desc}</p>
        </div>
        <div className="shrink-0">
          {node.status === "done" && <CheckCircle size={16} className="text-emerald-500" />}
          {node.status === "running" && <div className="w-4 h-4 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />}
          {node.status === "error" && <AlertCircle size={16} className="text-red-500" />}
          {node.status === "idle" && <Circle size={16} className="text-gray-300" />}
        </div>
      </div>
      {!isLast && (
        <div className="flex flex-col items-center my-1">
          <div className="w-0.5 h-3 bg-gray-200" />
          <ChevronRight size={12} className="text-gray-300 rotate-90" />
        </div>
      )}
    </div>
  );
}

export default function AutomationDemo() {
  const [selectedWorkflow, setSelectedWorkflow] = useState(0);
  const [nodes, setNodes] = useState(WORKFLOWS[0].nodes);
  const [running, setRunning] = useState(false);
  const [logLines, setLogLines] = useState<typeof LOG_MESSAGES>([]);
  const [done, setDone] = useState(false);

  const workflow = WORKFLOWS[selectedWorkflow];

  const selectWorkflow = (i: number) => {
    setSelectedWorkflow(i);
    setNodes(WORKFLOWS[i].nodes);
    setRunning(false);
    setLogLines([]);
    setDone(false);
  };

  const runWorkflow = () => {
    if (running) return;
    setRunning(true);
    setDone(false);
    setLogLines([]);
    setNodes((ns) => ns.map((n) => ({ ...n, status: "idle" })));

    nodes.forEach((_, i) => {
      setTimeout(() => {
        setNodes((ns) =>
          ns.map((n, idx) => ({
            ...n,
            status: idx < i ? "done" : idx === i ? "running" : "idle",
          }))
        );
        setTimeout(() => {
          setLogLines((l) => [...l, LOG_MESSAGES[i]]);
          if (i === nodes.length - 1) {
            setNodes((ns) => ns.map((n) => ({ ...n, status: "done" })));
            setLogLines((l) => [...l, LOG_MESSAGES[LOG_MESSAGES.length - 1]]);
            setRunning(false);
            setDone(true);
          }
        }, 600);
      }, i * 900);
    });
  };

  return (
    <DemoShell
      title="Automatización & Workflows"
      subtitle="No-code / Low-code workflows"
      trialUsed={done ? 1 : 0}
      trialMax={3}
      priceLabel="Desde $199/mes · Flujos ilimitados"
    >
      <div className="flex flex-col lg:flex-row h-[calc(100vh-112px)] overflow-hidden">
        {/* Sidebar: workflow list */}
        <div className="w-full lg:w-72 border-b lg:border-b-0 lg:border-r border-gray-100 bg-white flex flex-col shrink-0">
          <div className="p-4 border-b border-gray-100">
            <h3 className="font-bold text-[#0F2544] text-sm">Flujos de trabajo</h3>
            <p className="text-xs text-gray-400 mt-0.5">Selecciona uno para ejecutar</p>
          </div>
          <div className="flex-1 overflow-y-auto">
            {WORKFLOWS.map((w, i) => (
              <button
                key={w.id}
                onClick={() => selectWorkflow(i)}
                className={`w-full text-left px-4 py-3.5 border-b border-gray-50 transition-colors ${selectedWorkflow === i ? "bg-[#0F2544]/5" : "hover:bg-gray-50"}`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-sm text-gray-800">{w.name}</span>
                  <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{w.category}</span>
                </div>
                <p className="text-xs text-gray-400 line-clamp-2 mb-1">{w.desc}</p>
                <div className="flex items-center gap-3 text-xs text-gray-400">
                  <span>{w.executions.toLocaleString()} ejecuciones</span>
                  <span>{w.lastRun}</span>
                </div>
              </button>
            ))}
            {/* Locked workflows */}
            {[
              { name: "Follow-up de Pagos", category: "Finanzas" },
              { name: "Onboarding de Usuarios", category: "SaaS" },
            ].map((lw) => (
              <div key={lw.name} className="px-4 py-3.5 border-b border-gray-50 opacity-40">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-sm text-gray-500 flex items-center gap-1.5">
                    <Lock size={12} /> {lw.name}
                  </span>
                  <span className="text-xs bg-amber-100 text-amber-600 font-bold px-2 py-0.5 rounded-full">Pro</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main area: flow canvas + log */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-white border-b border-gray-100 px-4 sm:px-6 py-3 flex items-center gap-3 shrink-0">
            <div className="flex-1">
              <h3 className="font-bold text-gray-800">{workflow.name}</h3>
              <p className="text-xs text-gray-400">Disparador: {workflow.trigger}</p>
            </div>
            <button
              onClick={runWorkflow}
              disabled={running}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-colors ${
                running
                  ? "bg-amber-100 text-amber-600 cursor-wait"
                  : done
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-[#0F2544] hover:bg-[#1a3a6b] text-white"
              }`}
            >
              {running ? (
                <><div className="w-3.5 h-3.5 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" /> Ejecutando...</>
              ) : done ? (
                <><CheckCircle size={14} /> Completado</>
              ) : (
                <><Play size={14} /> Ejecutar flujo</>
              )}
            </button>
          </div>

          <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
            {/* Node canvas */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-50">
              <div className="max-w-sm mx-auto">
                {nodes.map((node, i) => (
                  <NodeCard key={node.id} node={node} isLast={i === nodes.length - 1} />
                ))}
              </div>
            </div>

            {/* Execution log */}
            <div className="w-full lg:w-72 border-t lg:border-t-0 lg:border-l border-gray-100 bg-white flex flex-col shrink-0 max-h-60 lg:max-h-none">
              <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Log de ejecución</span>
                {logLines.length > 0 && (
                  <button onClick={() => { setLogLines([]); setDone(false); setNodes(workflow.nodes); }} className="text-gray-400 hover:text-gray-600">
                    <RefreshCw size={12} />
                  </button>
                )}
              </div>
              <div className="flex-1 overflow-y-auto p-3 space-y-2 font-mono text-xs">
                {logLines.length === 0 ? (
                  <p className="text-gray-300 text-center mt-6">Ejecuta el flujo para ver el log</p>
                ) : (
                  logLines.map((l, i) => (
                    <div key={i} className={`flex gap-2 ${l.type === "done" ? "font-bold" : ""}`}>
                      <span className="text-gray-300 shrink-0">{l.time}</span>
                      <span className={l.type === "success" || l.type === "done" ? "text-emerald-600" : l.type === "error" ? "text-red-500" : "text-gray-500"}>
                        {l.msg}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DemoShell>
  );
}
