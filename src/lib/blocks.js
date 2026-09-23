import {
  Heading,
  Quote,
  ShieldCheck,
  AlignLeft,
  Star,
  Download,
  Play,
  Image,
  Braces,
  GitPullRequest,
  Scale,
  Code,
  ListChecks,
  History,
  Map,
  HelpCircle,
  Users,
  Table,
} from "lucide-react";

export const BLOCK_TYPES = {
  TITLE: "title",
  TAGLINE: "tagline",
  BADGES: "badges",
  DESCRIPTION: "description",
  FEATURES: "features",
  INSTALLATION: "installation",
  USAGE: "usage",
  SCREENSHOTS: "screenshots",
  API: "api",
  CONTRIBUTING: "contributing",
  LICENSE: "license",
  CUSTOM: "custom",
  REQUIREMENTS: "requirements",
  CHANGELOG: "changelog",
  ROADMAP: "roadmap",
  FAQ: "faq",
  CREDITS: "credits",
  TABLE: "table",
};

export const BLOCK_META = {
  [BLOCK_TYPES.TITLE]: { label: "Title", color: "#111111", desc: "project heading", group: "Header" },
  [BLOCK_TYPES.TAGLINE]: { label: "Tagline", color: "#111111", desc: "one-liner subtitle", group: "Header" },
  [BLOCK_TYPES.BADGES]: { label: "Badges", color: "#111111", desc: "status shields", group: "Header" },
  [BLOCK_TYPES.DESCRIPTION]: { label: "Description", color: "#111111", desc: "overview text", group: "Text" },
  [BLOCK_TYPES.FEATURES]: { label: "Features", color: "#111111", desc: "highlight list", group: "Content" },
  [BLOCK_TYPES.INSTALLATION]: { label: "Installation", color: "#111111", desc: "install steps", group: "Content" },
  [BLOCK_TYPES.USAGE]: { label: "Usage", color: "#111111", desc: "code examples", group: "Content" },
  [BLOCK_TYPES.REQUIREMENTS]: { label: "Requirements", color: "#111111", desc: "prerequisites list", group: "Content" },
  [BLOCK_TYPES.ROADMAP]: { label: "Roadmap", color: "#111111", desc: "planned milestones", group: "Content" },
  [BLOCK_TYPES.TABLE]: { label: "Table", color: "#111111", desc: "data table rows", group: "Content" },
  [BLOCK_TYPES.SCREENSHOTS]: { label: "Screenshots", color: "#111111", desc: "images", group: "Media" },
  [BLOCK_TYPES.API]: { label: "API Docs", color: "#111111", desc: "method ref", group: "Docs" },
  [BLOCK_TYPES.CHANGELOG]: { label: "Changelog", color: "#111111", desc: "release history", group: "Docs" },
  [BLOCK_TYPES.FAQ]: { label: "FAQ", color: "#111111", desc: "common questions", group: "Docs" },
  [BLOCK_TYPES.CREDITS]: { label: "Credits", color: "#111111", desc: "acknowledgments", group: "Docs" },
  [BLOCK_TYPES.CONTRIBUTING]: { label: "Contributing", color: "#111111", desc: "guidelines", group: "Docs" },
  [BLOCK_TYPES.LICENSE]: { label: "License", color: "#111111", desc: "MIT etc", group: "Docs" },
  [BLOCK_TYPES.CUSTOM]: { label: "Custom", color: "#111111", desc: "freeform md", group: "Extras" },
};

export const BLOCK_ICONS = {
  [BLOCK_TYPES.TITLE]: Heading,
  [BLOCK_TYPES.TAGLINE]: Quote,
  [BLOCK_TYPES.BADGES]: ShieldCheck,
  [BLOCK_TYPES.DESCRIPTION]: AlignLeft,
  [BLOCK_TYPES.FEATURES]: Star,
  [BLOCK_TYPES.INSTALLATION]: Download,
  [BLOCK_TYPES.USAGE]: Play,
  [BLOCK_TYPES.REQUIREMENTS]: ListChecks,
  [BLOCK_TYPES.ROADMAP]: Map,
  [BLOCK_TYPES.TABLE]: Table,
  [BLOCK_TYPES.SCREENSHOTS]: Image,
  [BLOCK_TYPES.API]: Braces,
  [BLOCK_TYPES.CHANGELOG]: History,
  [BLOCK_TYPES.FAQ]: HelpCircle,
  [BLOCK_TYPES.CREDITS]: Users,
  [BLOCK_TYPES.CONTRIBUTING]: GitPullRequest,
  [BLOCK_TYPES.LICENSE]: Scale,
  [BLOCK_TYPES.CUSTOM]: Code,
};

const DEFAULTS = {
  title: { name: "Untitled Project" },
  tagline: { text: "One line that explains what this project does" },
  badges: {
    badges: [
      { label: "build", url: "https://img.shields.io/badge/build-passing-brightgreen", link: "" },
      { label: "version", url: "https://img.shields.io/badge/version-1.0.0-blue", link: "" },
      { label: "license", url: "https://img.shields.io/badge/license-MIT-green", link: "" },
    ],
  },
  description: { text: "Describe your project in a sentence or two. What problem does it solve, and who is it for?" },
  features: { items: ["First feature - what it does", "Second feature - what it does", "Third feature - what it does"] },
  installation: { manager: "npm", package: "your-package-name", extra: "" },
  usage: { language: "js", code: "import { init } from 'your-package-name'\n\ninit({\n option: 'value',\n})" },
  requirements: { items: ["Node.js 18+", "npm, yarn, or pnpm"] },
  roadmap: { items: ["v1.1 - Public beta", "v1.2 - Team workspaces", "v2.0 - Plugin API"] },
  table: {
    headers: ["Feature", "Status", "Notes"],
    rows: [
      ["Drag and drop", "Done", "Blocks reorder freely"],
      ["Live preview", "Done", "GitHub-faithful markdown"],
      ["Export HTML", "Planned", "Standalone share page"],
    ],
  },
  screenshots: { items: [{ url: "", alt: "", caption: "" }] },
  api: {
    entries: [{ name: "init(options)", description: "Initialize the library with the given options.", options: "options - configuration object" }],
  },
  changelog: {
    items: [
      { version: "1.0.0", date: "2026-01-01", notes: "Initial release" },
      { version: "0.9.0", date: "2025-11-15", notes: "Public beta" },
    ],
  },
  faq: {
    entries: [
      { question: "Is it free?", answer: "Yes. Everything runs locally in your browser." },
      { question: "Does it work offline?", answer: "Yes after the first load." },
    ],
  },
  credits: { items: ["[lucide](https://lucide.dev) - icons", "[react-router](https://reactrouter.com) - routing"] },
  contributing: {
    text: "Contributions are welcome. Open an issue first to discuss what you would like to change.",
    steps: ["Fork the repository", "Create your branch (`git checkout -b feature/amazing-feature`)", "Commit your changes (`git commit -m 'Add amazing feature'`)", "Push to the branch (`git push origin feature/amazing-feature`)", "Open a Pull Request"],
  },
  license: { type: "MIT", year: String(new Date().getFullYear()), author: "Your Name" },
  custom: { markdown: "## Custom Section\n\nWrite any **markdown** here." },
};

let _id = 1;
export function createBlock(type, contentOverride) {
  const defaults = JSON.parse(JSON.stringify(DEFAULTS[type] || {}));
  return {
    id: `block_${_id++}_${Date.now()}`,
    type,
    content: contentOverride ? { ...defaults, ...contentOverride } : defaults,
  };
}
