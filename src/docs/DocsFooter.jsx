import { Link } from "react-router-dom";
import logo from "/logo.svg";
import { LuGithub } from "react-icons/lu";

const docLinks = [
  { to: "/docs/intro", label: "Introduction" },
  { to: "/docs/quick-start", label: "Quick Start" },
  { to: "/docs/editor", label: "Editor Guide" },
  { to: "/docs/architecture", label: "Architecture" },
  { to: "/docs/contributing", label: "Contributing" },
];

const refLinks = [
  { to: "/docs/blocks", label: "Block Reference" },
  { to: "/docs/templates", label: "Templates" },
  { to: "/docs/shortcuts", label: "Shortcuts" },
  { to: "/docs/security", label: "Security" },
  { to: "/docs/license", label: "License" },
];

const extLinks = [
  { href: "https://github.com/bilalmlkdev/readmade", label: "GitHub" },
  { href: "https://github.com/bilalmlkdev/readmade/issues", label: "Issues" },
  { href: "https://github.com/bilalmlkdev/readmade/blob/main/CHANGELOG.md", label: "Release Notes" },
  { href: "https://ko-fi.com/bilalmlkdev", label: "Support" },
];

function LinkColumn({ title, links, internal }) {
  return (
    <div>
      <h4 className="mb-3 text-sm font-medium text-black dark:text-white">{title}</h4>
      <ul className="space-y-2">
        {links.map((item) =>
          internal ? (
            <li key={item.to}>
              <Link
                to={item.to}
                className="text-sm text-gray-500 transition-colors hover:text-black dark:text-gray-400 dark:hover:text-white"
              >
                {item.label}
              </Link>
            </li>
          ) : (
            <li key={item.href}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-500 transition-colors hover:text-black dark:text-gray-400 dark:hover:text-white"
              >
                {item.label}
              </a>
            </li>
          ),
        )}
      </ul>
    </div>
  );
}

export default function DocsFooter() {
  return (
    <footer className="border-t border-gray-200 bg-[#FAFAFA] px-6 py-12 dark:border-white/10 dark:bg-[#0c0c0c]">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 md:grid-cols-4">
        <div className="col-span-2 md:col-span-1">
          <Link to="/" className="mb-4 flex items-center gap-2">
            <img src={logo} alt="Readmade" className="h-8 w-8" />
            <span className="text-sm font-semibold text-black dark:text-white">Readmade</span>
          </Link>
          <p className="max-w-xs text-sm leading-relaxed text-gray-500 dark:text-gray-400">
            Local-first README editor. Compose, preview, and export GitHub-ready Markdown.
          </p>
          <a
            href="https://github.com/bilalmlkdev/readmade"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex text-gray-400 transition hover:text-black dark:text-gray-500 dark:hover:text-white"
            aria-label="GitHub"
          >
            <LuGithub size={20} />
          </a>
        </div>
        <LinkColumn title="Docs" links={docLinks} internal />
        <LinkColumn title="Reference" links={refLinks} internal />
        <LinkColumn title="More" links={extLinks} />
      </div>
      <div className="mx-auto mt-10 flex max-w-6xl flex-col items-center justify-between gap-3 border-t border-gray-200 pt-6 text-sm text-gray-400 sm:flex-row dark:border-white/10 dark:text-gray-500">
        <span>&copy; 2026 Readmade. MIT License.</span>
        <div className="flex gap-5">
          <Link to="/docs/security" className="transition hover:text-black dark:hover:text-white">
            Security
          </Link>
          <Link to="/docs/license" className="transition hover:text-black dark:hover:text-white">
            License
          </Link>
          <Link to="/docs/faq" className="transition hover:text-black dark:hover:text-white">
            FAQ
          </Link>
        </div>
      </div>
    </footer>
  );
}
