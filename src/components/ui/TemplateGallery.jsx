import { useState } from "react";
import { useReadme } from "../../store/useReadme.js";
import { X, FileText, Star, Package, AppWindow, BookOpen, Users, Component, Terminal, Layers } from "lucide-react";

const TEMPLATES = [
  {
    id: "minimal",
    name: "Minimal",
    desc: "Clean, simple README with just the essentials",
    icon: FileText,
    blocks: [
      { type: "title", content: { name: "My Project", tagline: "A simple, lightweight tool" } },
      { type: "description", content: { text: "A minimal project that does one thing well. Built for developers who value simplicity." } },
      { type: "installation", content: { manager: "npm", package: "my-project", extra: "" } },
      { type: "usage", content: { language: "js", code: "import { init } from 'my-project'\n\ninit()" } },
      { type: "license", content: { type: "MIT", year: "2024", author: "Your Name" } },
    ],
  },
  {
    id: "full",
    name: "Full Featured",
    desc: "Complete README with all sections for production apps",
    icon: Star,
    starred: true,
    blocks: [
      { type: "title", content: { name: "Readmade", tagline: "The fastest way to craft beautiful READMEs" } },
      { type: "badges", content: { badges: [
        { label: "npm", url: "https://img.shields.io/badge/npm-1.0.0-blue", link: "#" },
        { label: "License", url: "https://img.shields.io/badge/license-MIT-green", link: "#" },
        { label: "Build", url: "https://img.shields.io/badge/build-passing-brightgreen", link: "#" },
      ] } },
      { type: "description", content: { text: "**Readmade** is a visual drag-and-drop README builder. Create stunning documentation in minutes without writing a single line of markdown." } },
      { type: "features", content: { items: ["Visual block editor", "Live preview", "One-click export", "Works offline", "Dark mode support"] } },
      { type: "installation", content: { manager: "npm", package: "readmade", extra: "git clone https://github.com/user/readmade.git\ncd readmade\nnpm install" } },
      { type: "usage", content: { language: "js", code: "import { Readmade } from 'readmade'\n\nconst app = new Readmade()\napp.create({ title: 'My Project' })" } },
      { type: "api", content: { entries: [
        { name: "new Readmade()", description: "Create a new instance", params: "options — Configuration object" },
        { name: ".create(config)", description: "Generate a README from config", params: "config — Project configuration" },
      ] } },
      { type: "contributing", content: { text: "Contributions are welcome!", steps: ["Fork the repo", "Create a branch", "Make changes", "Submit PR"] } },
      { type: "license", content: { type: "MIT", year: "2024", author: "Readmade Team" } },
    ],
  },
  {
    id: "library",
    name: "Library / SDK",
    desc: "Optimized for npm packages and developer libraries",
    icon: Package,
    blocks: [
      { type: "title", content: { name: "data-transform", tagline: "Type-safe data transformation utilities" } },
      { type: "badges", content: { badges: [
        { label: "npm", url: "https://img.shields.io/badge/npm-2.1.0-blue", link: "#" },
        { label: "TypeScript", url: "https://img.shields.io/badge/TypeScript-5.0-blue", link: "#" },
        { label: "Bundle", url: "https://img.shields.io/badge/bundle-3kb-success", link: "#" },
      ] } },
      { type: "description", content: { text: "**data-transform** provides a collection of type-safe, tree-shakeable utilities for transforming, filtering, and mapping data structures. Zero dependencies, works in Node.js and browsers." } },
      { type: "features", content: { items: ["Full TypeScript support with generics", "Tree-shakeable — only import what you use", "Zero dependencies", "Works in Node.js 18+ and all modern browsers", "100% test coverage"] } },
      { type: "installation", content: { manager: "npm", package: "data-transform", extra: "yarn add data-transform\npnpm add data-transform" } },
      { type: "usage", content: { language: "ts", code: "import { transform, filter, pipe } from 'data-transform'\n\nconst result = pipe(\n  data,\n  filter(item => item.active),\n  transform(item => ({ ...item, name: item.name.toUpperCase() }))\n)" } },
      { type: "api", content: { entries: [
        { name: "pipe(...fns)", description: "Compose functions left-to-right", params: "fns — Array of transformation functions" },
        { name: "filter(predicate)", description: "Create a filter function", params: "predicate — (item: T) => boolean" },
        { name: "transform(fn)", description: "Create a map function", params: "fn — (item: T) => U" },
      ] } },
      { type: "contributing", content: { text: "PRs welcome! Please read CONTRIBUTING.md first.", steps: ["Clone the repo", "Run `npm install`", "Create a branch", "Add tests", "Submit PR"] } },
      { type: "license", content: { type: "MIT", year: "2024", author: "data-transform contributors" } },
    ],
  },
  {
    id: "application",
    name: "Application",
    desc: "For desktop apps, web apps, and services",
    icon: AppWindow,
    blocks: [
      { type: "title", content: { name: "NoteVault", tagline: "End-to-end encrypted note taking" } },
      { type: "badges", content: { badges: [
        { label: "Version", url: "https://img.shields.io/badge/version-3.2.0-blue", link: "#" },
        { label: "Platform", url: "https://img.shields.io/badge/platform-Win%20%7C%20Mac%20%7C%20Linux-lightgrey", link: "#" },
      ] } },
      { type: "description", content: { text: "**NoteVault** is a secure, end-to-end encrypted note-taking application. Your notes stay private — we can't read them, even if we wanted to." } },
      { type: "features", content: { items: ["End-to-end encryption with AES-256", "Offline-first with sync", "Markdown support", "Tags and folders", "Export to PDF"] } },
      { type: "installation", content: { manager: "npm", package: "notevault", extra: "# Or download from https://notevault.app/download" } },
      { type: "usage", content: { language: "bash", code: "# Launch the app\nnotevault\n\n# Import notes from file\nnotevault import ./backup.json\n\n# Sync with server\nnotevault sync" } },
      { type: "screenshots", content: { items: [
        { url: "https://placehold.co/800x450/111111/ffffff?text=NoteVault+Editor", alt: "Editor View", caption: "Clean, distraction-free editor" },
      ] } },
      { type: "contributing", content: { text: "See our [contributing guide](CONTRIBUTING.md).", steps: ["Report bugs via GitHub Issues", "Submit PRs for features", "Join our Discord"] } },
      { type: "license", content: { type: "AGPL-3.0", year: "2024", author: "NoteVault Team" } },
    ],
  },
  {
    id: "api-docs",
    name: "API Documentation",
    desc: "Structured documentation for REST and GraphQL APIs",
    icon: BookOpen,
    blocks: [
      { type: "title", content: { name: "Acme API", tagline: "RESTful API for the Acme platform" } },
      { type: "badges", content: { badges: [
        { label: "API Version", url: "https://img.shields.io/badge/API-v2-blue", link: "#" },
        { label: "Status", url: "https://img.shields.io/badge/status-operational-brightgreen", link: "#" },
      ] } },
      { type: "description", content: { text: "The **Acme API** provides programmatic access to the Acme platform. Create, read, update, and manage resources using standard HTTP methods." } },
      { type: "installation", content: { manager: "npm", package: "@acme/sdk", extra: "" } },
      { type: "usage", content: { language: "js", code: "import { AcmeClient } from '@acme/sdk'\n\nconst client = new AcmeClient({ apiKey: 'your-key' })\nconst users = await client.users.list()" } },
      { type: "api", content: { entries: [
        { name: "GET /users", description: "List all users with pagination", params: "page (int), limit (int)" },
        { name: "POST /users", description: "Create a new user", params: "name (string), email (string)" },
        { name: "GET /users/:id", description: "Get a user by ID", params: "id (string) — User ID" },
        { name: "PUT /users/:id", description: "Update a user", params: "id (string), name? (string), email? (string)" },
        { name: "DELETE /users/:id", description: "Delete a user", params: "id (string) — User ID" },
      ] } },
      { type: "contributing", content: { text: "Found a bug? Open an issue with reproduction steps.", steps: ["Check existing issues", "Open a new issue", "Include API version and request/response"] } },
      { type: "license", content: { type: "MIT", year: "2024", author: "Acme Inc" } },
    ],
  },
  {
    id: "open-source",
    name: "Open Source",
    desc: "Community-focused with detailed contributing guidelines",
    icon: Users,
    starred: true,
    blocks: [
      { type: "title", content: { name: "FastQuery", tagline: "Blazing fast query builder for any database" } },
      { type: "badges", content: { badges: [
        { label: "Stars", url: "https://img.shields.io/github/stars/user/fastquery?style=social", link: "#" },
        { label: "Downloads", url: "https://img.shields.io/npm/dm/fastquery", link: "#" },
        { label: "License", url: "https://img.shields.io/badge/license-Apache--2.0-blue", link: "#" },
        { label: "PRs Welcome", url: "https://img.shields.io/badge/PRs-welcome-brightgreen", link: "#" },
      ] } },
      { type: "description", content: { text: "**FastQuery** is an open-source, universal query builder that works with PostgreSQL, MySQL, SQLite, and more. Write one query, run it anywhere." } },
      { type: "features", content: { items: ["Universal query builder for SQL databases", "TypeScript-first with full generics", "Chainable API", "Automatic query optimization", "Built-in migration support", "Comprehensive documentation"] } },
      { type: "installation", content: { manager: "npm", package: "fastquery", extra: "" } },
      { type: "usage", content: { language: "ts", code: "import { Query } from 'fastquery'\n\nconst users = await Query.from('users')\n  .where('age', '>', 18)\n  .orderBy('name')\n  .limit(10)\n  .execute()" } },
      { type: "api", content: { entries: [
        { name: "Query.from(table)", description: "Start a new query on a table", params: "table — Table name" },
        { name: ".where(col, op, val)", description: "Add a WHERE condition", params: "col — Column, op — Operator, val — Value" },
        { name: ".execute()", description: "Run the query and return results", params: "" },
      ] } },
      { type: "contributing", content: { text: "We love contributions! Whether it's a bug report, feature request, or code contribution, we appreciate your help making FastQuery better.", steps: ["Read our Code of Conduct", "Fork the repository", "Create a feature branch", "Write tests for your changes", "Ensure all tests pass", "Submit a pull request with a clear description"] } },
      { type: "license", content: { type: "Apache-2.0", year: "2024", author: "FastQuery Contributors" } },
    ],
  },
  {
    id: "react-component",
    name: "React Component",
    desc: "For UI component libraries and React packages",
    icon: Component,
    blocks: [
      { type: "title", content: { name: "ui-kit", tagline: "Beautiful, accessible React components" } },
      { type: "badges", content: { badges: [
        { label: "npm", url: "https://img.shields.io/badge/npm-4.0.0-blue", link: "#" },
        { label: "React", url: "https://img.shields.io/badge/React-18-61dafb", link: "#" },
        { label: "Bundle", url: "https://img.shields.io/badge/bundle-12kb-success", link: "#" },
      ] } },
      { type: "description", content: { text: "**ui-kit** provides a set of accessible, customizable React components. Built with TypeScript, styled with CSS variables, and tree-shakeable." } },
      { type: "features", content: { items: ["30+ accessible components", "TypeScript definitions included", "CSS variables for easy theming", "Tree-shakeable", "Zero runtime CSS"] } },
      { type: "installation", content: { manager: "npm", package: "@ui-kit/react", extra: "" } },
      { type: "usage", content: { language: "tsx", code: "import { Button, Card, Input } from '@ui-kit/react'\nimport '@ui-kit/react/styles.css'\n\nexport function Form() {\n  return (\n    <Card>\n      <Input placeholder='Enter your name' />\n      <Button variant='primary'>Submit</Button>\n    </Card>\n  )\n}" } },
      { type: "api", content: { entries: [
        { name: "<Button />", description: "Clickable button with variants", params: "variant: 'primary' | 'secondary' | 'ghost'" },
        { name: "<Input />", description: "Text input with label and error support", params: "placeholder, label, error" },
        { name: "<Card />", description: "Container component with padding", params: "children, className" },
      ] } },
      { type: "contributing", content: { text: "Contributions welcome! Check our Storybook for component docs.", steps: ["Clone the repo", "Run `npm run storybook`", "Add or update components", "Write stories and tests", "Submit PR"] } },
      { type: "license", content: { type: "MIT", year: "2024", author: "ui-kit team" } },
    ],
  },
  {
    id: "cli-tool",
    name: "CLI Tool",
    desc: "For command-line tools and developer utilities",
    icon: Terminal,
    blocks: [
      { type: "title", content: { name: "create-app", tagline: "Scaffold new projects in seconds" } },
      { type: "badges", content: { badges: [
        { label: "npm", url: "https://img.shields.io/badge/npm-1.5.0-blue", link: "#" },
        { label: "Node", url: "https://img.shields.io/badge/Node-18+-339933", link: "#" },
      ] } },
      { type: "description", content: { text: "**create-app** is a CLI tool that scaffolds new projects with your preferred framework and configuration. Supports React, Vue, Svelte, and more." } },
      { type: "features", content: { items: ["Interactive prompts", "Multiple framework support", "Pre-configured ESLint + Prettier", "Git initialization", "First commit ready"] } },
      { type: "installation", content: { manager: "npm", package: "create-app", extra: "" } },
      { type: "usage", content: { language: "bash", code: "# Create a new project\nnpx create-app my-project\n\n# With options\nnpx create-app my-project --template react-ts\n\n# List available templates\nnpx create-app --list" } },
      { type: "api", content: { entries: [
        { name: "npx create-app <name>", description: "Create a new project interactively", params: "name — Project directory name" },
        { name: "--template <template>", description: "Skip prompts, use a specific template", params: "template — react, vue, svelte, vanilla" },
        { name: "--no-git", description: "Skip git initialization", params: "" },
      ] } },
      { type: "contributing", content: { text: "Want to add a new template? We'd love your help!", steps: ["Fork the repo", "Add template to `/templates`", "Update the template registry", "Test with `node bin/cli.js`", "Submit PR"] } },
      { type: "license", content: { type: "MIT", year: "2024", author: "create-app contributors" } },
    ],
  },
  {
    id: "monorepo",
    name: "Monorepo",
    desc: "For multi-package projects with shared tooling",
    icon: Layers,
    blocks: [
      { type: "title", content: { name: "acme-monorepo", tagline: "Shared packages for the Acme platform" } },
      { type: "badges", content: { badges: [
        { label: "Turborepo", url: "https://img.shields.io/badge/Built_with-Turborepo-ff6b6b", link: "#" },
        { label: "License", url: "https://img.shields.io/badge/license-MIT-green", link: "#" },
      ] } },
      { type: "description", content: { text: "This monorepo contains all Acme platform packages. Managed with Turborepo for fast builds and incremental development." } },
      { type: "features", content: { items: ["Shared TypeScript config", "Unified linting and formatting", "Incremental builds with Turborepo", "Shared testing utilities", "Automated publishing"] } },
      { type: "installation", content: { manager: "npm", package: "", extra: "git clone https://github.com/acme/monorepo.git\ncd monorepo\nnpm install" } },
      { type: "usage", content: { language: "bash", code: "# Build all packages\nturbo build\n\n# Run tests\nturbo test\n\n# Start dev mode\nturbo dev\n\n# Add a new package\nnpm create package @acme/new-package" } },
      { type: "api", content: { entries: [
        { name: "@acme/core", description: "Core utilities and shared types", params: "" },
        { name: "@acme/ui", description: "React component library", params: "" },
        { name: "@acme/sdk", description: "API client for Acme services", params: "" },
      ] } },
      { type: "contributing", content: { text: "See [CONTRIBUTING.md](./CONTRIBUTING.md) for monorepo-specific guidelines.", steps: ["Create a branch", "Make changes in relevant packages", "Run `turbo test` and `turbo build`", "Submit PR with changeset"] } },
      { type: "license", content: { type: "MIT", year: "2024", author: "Acme Inc" } },
    ],
  },
  {
    id: "blank",
    name: "Blank Canvas",
    desc: "Start from scratch with no pre-built blocks",
    icon: FileText,
    blocks: [],
  },
];

export default function TemplateGallery({ onClose }) {
  const { clearAllData, addBlock } = useReadme();
  const [activeId, setActiveId] = useState(null);
  const [pendingTemplate, setPendingTemplate] = useState(null);

  const applyTemplate = (template) => {
    setActiveId(template.id);
    clearAllData();
    template.blocks.forEach((block) => {
      if (typeof block === "string") {
        addBlock(block);
      } else {
        addBlock(block.type, block.content);
      }
    });
    onClose?.();
  };

  const handleSelect = (template) => {
    setPendingTemplate(template);
  };

  const handleConfirm = () => {
    if (!pendingTemplate) return;
    applyTemplate(pendingTemplate);
    setPendingTemplate(null);
  };

  const handleCancel = (e) => {
    e?.stopPropagation?.();
    setPendingTemplate(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div className="relative bg-white rounded-2xl shadow-2xl shadow-black/10 border border-gray-200 max-w-[560px] w-full mx-4 max-h-[80vh] flex flex-col animate-slide-up" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 shrink-0">
          <div>
            <h2 className="text-[15px] font-semibold text-black">Templates</h2>
            <p className="text-[12px] text-gray-400 mt-0.5">Start with a pre-built structure</p>
          </div>
          <button onClick={onClose} className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
            <X size={16} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
          {TEMPLATES.map((template) => {
            const Icon = template.icon || FileText;
            return (
              <button
                key={template.id}
                onClick={() => handleSelect(template)}
                className={`w-full px-4 py-3 rounded-xl border transition-all text-left flex items-center gap-3.5 ${
                  activeId === template.id
                    ? "border-black bg-gray-50"
                    : "border-gray-100 hover:border-gray-200 hover:bg-gray-50"
                }`}
              >
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  activeId === template.id ? "bg-black" : "bg-gray-100"
                }`}>
                  <Icon size={16} className={activeId === template.id ? "text-white" : "text-gray-500"} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-[13px] font-medium text-gray-900">{template.name}</h3>
                    {template.starred && (
                      <Star size={10} className="text-amber-400 fill-amber-400" />
                    )}
                  </div>
                  <p className="text-[12px] text-gray-400 mt-0.5">{template.desc}</p>
                </div>
                <span className="text-[11px] text-gray-400 shrink-0 tabular-nums">
                  {template.blocks.length > 0 ? `${template.blocks.length} blocks` : "Empty"}
                </span>
              </button>
            );
          })}
        </div>

        <div className="px-5 py-3 border-t border-gray-100 shrink-0">
          <button
            onClick={() =>
              setPendingTemplate({ id: "blank", name: "Blank Canvas", blocks: [] })
            }
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-[13px] font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-colors"
          >
            Start with blank
          </button>
        </div>

        {pendingTemplate && (
          <div
            className="absolute inset-0 z-10 flex items-center justify-center bg-black/50 rounded-2xl p-4"
            onClick={handleCancel}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="template-confirm-title"
              aria-describedby="template-confirm-desc"
              className="bg-white rounded-xl shadow-2xl shadow-black/10 border border-gray-200 max-w-[360px] w-full p-5"
              onClick={(e) => e.stopPropagation()}
            >
              <h3
                id="template-confirm-title"
                className="text-[15px] font-semibold text-gray-900 mb-1.5"
              >
                Replace current readme?
              </h3>
              <p
                id="template-confirm-desc"
                className="text-gray-500 text-[13px] leading-relaxed mb-5"
              >
                Loading “{pendingTemplate.name}” will replace all your current
                fields. This cannot be undone.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={handleCancel}
                  className="flex-1 px-4 py-2 text-[13px] font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirm}
                  className="flex-1 px-4 py-2 text-[13px] font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  Replace
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
