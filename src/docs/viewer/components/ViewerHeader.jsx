import { useState } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "../../../components/ui/ThemeToggle.jsx";
import Logo from "../../../components/ui/Logo.tsx";
import SearchDialog from "./SearchDialog.jsx";
import { useModK } from "../hooks/useDocsViewer.js";
import {
  DEFAULT_SEARCH_FOOTER,
  DEFAULT_SEARCH_HINT,
} from "../data/defaultConfig.js";

function SearchIcon({ className = "h-4 w-4" }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m21 21-4.35-4.35M17 10.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0Z"
      />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
      />
    </svg>
  );
}

export default function ViewerHeader({ brand, onMenu, pages, basePath }) {
  const [searchOpen, setSearchOpen] = useState(false);
  useModK(() => setSearchOpen(true));

  const navLink =
    "px-2.5 py-1.5 text-[13px] text-gray-600 dark:text-gray-400 hover:text-gray-950 dark:hover:text-white";

  return (
    <>
      <header className="z-50 shrink-0 border-b border-gray-200 bg-white/95 backdrop-blur dark:border-white/10 dark:bg-[#111]/95">
        <div className="flex h-14 items-center gap-3 px-4 md:px-6">
          <button
            type="button"
            onClick={onMenu}
            aria-label="Open sidebar"
            className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-white/10 dark:hover:text-white lg:hidden"
          >
            <MenuIcon />
          </button>

          <Link
            to={brand.homeTo}
            className="flex shrink-0 items-center gap-2"
            aria-label={`${brand.name} home`}
          >
            {brand.logo ? (
              typeof brand.logo === "string" ? (
                <img src={brand.logo} alt="" className="h-7 w-7" />
              ) : (
                <Logo className="h-7 w-7 text-black dark:text-white" />
              )
            ) : null}
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              {brand.name}
            </span>
            {brand.badge ? (
              <span className="hidden rounded border border-gray-200 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-gray-500 dark:border-white/10 dark:text-gray-400 sm:inline">
                {brand.badge}
              </span>
            ) : null}
          </Link>

          <nav className="ml-1 hidden items-center gap-0.5 md:flex">
            <Link to={brand.homeTo} className={navLink}>
              {brand.homeLabel}
            </Link>
            {(brand.links || []).map((link) =>
              link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={navLink}
                >
                  {link.label}
                </a>
              ) : (
                <Link key={link.label} to={link.to} className={navLink}>
                  {link.label}
                </Link>
              ),
            )}
          </nav>

          <div className="flex-1" />

          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="hidden items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-[13px] text-gray-500 hover:border-gray-300 hover:text-gray-800 sm:flex dark:border-white/10 dark:bg-white/5 dark:text-gray-400 dark:hover:border-white/20 dark:hover:text-white"
          >
            <SearchIcon className="h-3.5 w-3.5" />
            Search
            <kbd className="rounded border border-gray-200 bg-gray-50 px-1 text-[10px] text-gray-400 dark:border-white/10 dark:bg-white/5 dark:text-gray-500">
              ⌘K
            </kbd>
          </button>

          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label="Search docs"
            className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 sm:hidden dark:text-gray-400 dark:hover:bg-white/10 dark:hover:text-white"
          >
            <SearchIcon />
          </button>

          <ThemeToggle className="shrink-0" />

          {brand.cta ? (
            <Link
              to={brand.cta.to}
              className="inline-flex items-center rounded-lg bg-gray-950 px-3 py-1.5 text-[13px] font-medium text-white hover:bg-gray-900 dark:bg-white dark:text-gray-950 dark:hover:bg-gray-200"
            >
              {brand.cta.label}
            </Link>
          ) : null}
        </div>
      </header>

      {searchOpen && (
        <SearchDialog
          pages={pages}
          basePath={basePath}
          onClose={() => setSearchOpen(false)}
          labels={{
            placeholder: DEFAULT_SEARCH_HINT,
            footer: DEFAULT_SEARCH_FOOTER,
          }}
        />
      )}
    </>
  );
}
