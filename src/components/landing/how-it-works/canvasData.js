export const wait = (ms) => new Promise((r) => setTimeout(r, ms));

export const BLOCK_NODES = [
  { id: "title", label: "Title", x: 18, y: 30, bg: "bg-foreground/10", color: "text-foreground" },
  { id: "badges", label: "Badges", x: 52, y: 18, bg: "bg-sky-500/10", color: "text-sky-500" },
  { id: "features", label: "Features", x: 52, y: 72, bg: "bg-emerald-500/10", color: "text-emerald-500" },
  { id: "usage", label: "Usage", x: 82, y: 30, bg: "bg-violet-500/10", color: "text-violet-500" },
  { id: "license", label: "License", x: 82, y: 72, bg: "bg-amber-500/10", color: "text-amber-500" },
];
