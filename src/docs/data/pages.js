import { intro } from "./content/intro.js";
import { quickStart } from "./content/quickStart.js";
import { editor } from "./content/editor.js";
import { blocks } from "./content/blocks.js";
import { templates } from "./content/templates.js";
import { previewExport } from "./content/previewExport.js";
import { shortcuts } from "./content/shortcuts.js";
import { storage } from "./content/storage.js";
import { architecture } from "./content/architecture.js";
import { contributing } from "./content/contributing.js";
import { security } from "./content/security.js";
import { changelog } from "./content/changelog.js";
import { license } from "./content/license.js";
import { faq } from "./content/faq.js";

export const PAGES = [
  { slug: "intro", title: "Introduction", description: "What Readmade is and why it exists", body: intro },
  { slug: "quick-start", title: "Quick Start", description: "Install, run, and create your first README", body: quickStart },
  { slug: "editor", title: "Editor Guide", description: "Workspace layout, palette, and arranging blocks", body: editor },
  { slug: "blocks", title: "Block Reference", description: "Every block type explained", body: blocks },
  { slug: "templates", title: "Templates", description: "Starter READMEs for common projects", body: templates },
  { slug: "preview-export", title: "Preview & Export", description: "Live preview, code view, copy, and download", body: previewExport },
  { slug: "shortcuts", title: "Keyboard Shortcuts", description: "Speed up editing with shortcuts", body: shortcuts },
  { slug: "storage", title: "Storage & Privacy", description: "Local-first data and privacy", body: storage },
  { slug: "architecture", title: "Architecture", description: "Stack, folders, and code style", body: architecture },
  { slug: "contributing", title: "Contributing", description: "How to send changes upstream", body: contributing },
  { slug: "security", title: "Security Policy", description: "Reporting vulnerabilities", body: security },
  { slug: "changelog", title: "Changelog", description: "Notable changes", body: changelog },
  { slug: "license", title: "License", description: "MIT license terms", body: license },
  { slug: "faq", title: "FAQ", description: "Common questions answered", body: faq },
];

export const DEFAULT_SLUG = "intro";

export function getPage(slug) {
  return PAGES.find((p) => p.slug === slug) || null;
}

export function searchPages(query) {
  const q = query.trim().toLowerCase();
  if (!q) return PAGES;
  return PAGES.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.slug.includes(q),
  );
}
