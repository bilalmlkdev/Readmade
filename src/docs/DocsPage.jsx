import { Link } from "react-router-dom";
import { parseMarkdown } from "../lib/parseMarkdown.js";
import { PAGES, DEFAULT_SLUG } from "./data/pages.js";
import { SECTIONS } from "./data/nav.js";
import DocsViewerRoute from "./viewer/DocsViewerRoute.jsx";

const brand = {
  name: "Readmade",
  badge: "Docs",
  logo: null,
  homeTo: "/",
  homeLabel: "Home",
  cta: { to: "/app", label: "Open App" },
  links: [
    { to: "/#templates", label: "Templates" },
    {
      href: "https://github.com/bilalmlkdev/readmade",
      label: "GitHub",
      external: true,
    },
  ],
};

const footer = {
  blurb:
    "Local-first README editor. Compose, preview, and export GitHub-ready Markdown.",
  copyright: "© 2026 Readmade. MIT License.",
  columns: [
    {
      title: "Docs",
      links: [
        { to: "intro", label: "Introduction" },
        { to: "quick-start", label: "Quick Start" },
        { to: "editor", label: "Editor Guide" },
        { to: "architecture", label: "Architecture" },
        { to: "contributing", label: "Contributing" },
      ],
    },
    {
      title: "Reference",
      links: [
        { to: "blocks", label: "Block Reference" },
        { to: "templates", label: "Templates" },
        { to: "shortcuts", label: "Shortcuts" },
        { to: "security", label: "Security" },
        { to: "license", label: "License" },
      ],
    },
    {
      title: "More",
      links: [
        { href: "https://github.com/bilalmlkdev/readmade", label: "GitHub" },
        {
          href: "https://github.com/bilalmlkdev/readmade/issues",
          label: "Issues",
        },
        {
          href: "https://github.com/bilalmlkdev/readmade/blob/main/CHANGELOG.md",
          label: "Release Notes",
        },
        { href: "https://ko-fi.com/bilalmlkdev", label: "Support" },
      ],
    },
  ],
  metaLinks: [
    { to: "security", label: "Security" },
    { to: "license", label: "License" },
    { to: "faq", label: "FAQ" },
  ],
};

export default function DocsPage() {
  return (
    <DocsViewerRoute
      pages={PAGES}
      sections={SECTIONS}
      basePath="/docs"
      defaultSlug={DEFAULT_SLUG}
      brand={brand}
      footer={footer}
      breadcrumbLabel="Docs"
      parseMarkdown={parseMarkdown}
      notFoundFallback={
<div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#FAFAFA] p-8 text-center dark:bg-[#0c0c0c]">
        <p className="text-lg font-semibold text-gray-900 dark:text-white">
          Page not found
        </p>
        <Link
          to="/docs/intro"
          className="rounded-lg bg-gray-950 px-4 py-2 text-sm text-white dark:bg-white dark:text-gray-950"
        >
          Back to docs
        </Link>
      </div>
      }
    />
  );
}
