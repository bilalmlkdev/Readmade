import { Check, Info, AlertTriangle } from "lucide-react";

export const NODES = [
  { id: "title", label: "Title", x: 14, y: 48, color: "text-foreground", bg: "bg-foreground/10" },
  { id: "badges", label: "Badges", x: 42, y: 22, color: "text-sky-500", bg: "bg-sky-500/10" },
  { id: "features", label: "Features", x: 42, y: 78, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { id: "export", label: "Export", x: 76, y: 50, color: "text-violet-500", bg: "bg-violet-500/10" },
];

export const EDGES = [
  { from: "title", to: "badges" },
  { from: "title", to: "features" },
  { from: "badges", to: "export" },
  { from: "features", to: "export" },
];

export const INSIGHTS = [
  { type: "success", text: "GitHub-ready structure", Icon: Check },
  { type: "info", text: "Add screenshots block", Icon: Info },
  { type: "warning", text: "License missing", Icon: AlertTriangle },
];

export const wait = (ms) => new Promise((r) => setTimeout(r, ms));
