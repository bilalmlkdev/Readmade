import { GripVertical, Link2, BarChart3, FileDown } from "lucide-react";

export const steps = [
  {
    step: "01",
    title: "Drop your blocks",
    description:
      "Start by dragging ready-made blocks onto your README - title, badges, features, installation, usage, screenshots, API, and more. Each block ships with sensible defaults.",
    icon: GripVertical,
    visual: "Compose",
    highlights: ["11 block types", "Smart defaults", "Drag & drop"],
  },
  {
    step: "02",
    title: "Arrange & edit",
    description:
      "Reorder sections, fill in fields, and customize content through an intuitive panel. No Markdown syntax to memorize - just clear, structured editing.",
    icon: Link2,
    visual: "Arrange",
    highlights: ["Visual editor", "Reorder freely", "Field-driven"],
  },
  {
    step: "03",
    title: "Preview live",
    description:
      "The preview updates as you type, rendering badges, tables, code, and images the way GitHub will show them. Catch issues before you ship.",
    icon: BarChart3,
    visual: "Preview",
    highlights: ["GitHub-faithful", "Real-time", "Actionable"],
  },
  {
    step: "04",
    title: "Export & ship",
    description:
      "Copy clean Markdown to your clipboard or download README.md and drop it straight into your repository. Everything stays local-first.",
    icon: FileDown,
    visual: "Export",
    highlights: ["One click", "Clean output", "Local-first"],
  },
];
