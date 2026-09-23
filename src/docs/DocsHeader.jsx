import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "/logo.svg";
import ThemeToggle from "../components/ui/ThemeToggle.jsx";
import { searchPages } from "./data/pages.js";

function SearchOverlay({ onClose }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const results = searchPages(query);

  useEffect(() => {
    const id = requestAnimationFrame(() => inputRef.current?.focus());
    return () => cancelAnimationFrame(id);
  }, []);

  function go(slug) {
    onClose();
    navigate(`/docs/${slug}`);
  }

  return (
    <div
      className="fixed inset-0 z-[80] flex items-start justify-center bg-black/50 px-4 pt-[12vh]" onClick={onClose}
      role="presentation"
    >
      <div
        className="w-full max-w-lg overflow-hidden rounded-lg border border-gray-200 bg-white shadow-xl dark:border-white/10 dark:bg-[#161616]" onClick={(e) => e.stopPropagation()}
        role="dialog" aria-label="Search documentation"
      >
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Escape") onClose();
            if (e.key === "Enter" && results[0]) go(results[0].slug);
          }}
          placeholder="Search docs..." className="w-full border-b border-gray-200 bg-transparent px-4 py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 dark:border-white/10 dark:text-gray-100 dark:placeholder:text-gray-500"
        />
        <ul className="max-h-72 overflow-y-auto py-2">
          {results.length === 0 && (
            <li className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
              No results
            </li>
          )}
          {results.map((p) => (
            <li key={p.slug}>
              <button
                type="button" onClick={() => go(p.slug)}
                className="block w-full px-4 py-2.5 text-left transition hover:bg-black/5 dark:hover:bg-white/5"
              >
                <span className="block text-sm font-medium text-gray-900 dark:text-gray-100">
                  {p.title}
                </span>
                <span className="block truncate text-xs text-gray-500 dark:text-gray-400">
                  {p.description}
                </span>
              </button>
            </li>
          ))}
        </ul>
        <div className="border-t border-gray-200 px-4 py-2 text-[11px] text-gray-400 dark:border-white/10 dark:text-gray-500">
          Enter to open - Esc to close
        </div>
      </div>
    </div>
  );
}

export default function DocsHeader({ onMenu }) {
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    function onKey(e) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const navLink = "px-2.5 py-1.5 text-[13px] text-gray-500 transition hover:text-black dark:text-gray-400 dark:hover:text-white";

  return (
    <>
      <header className="z-50 shrink-0 border-b border-gray-200/80 bg-[#FAFAFA]/90 backdrop-blur-xl dark:border-white/10 dark:bg-[#0c0c0c]/90">
        <div className="flex h-14 items-center gap-3 px-4 md:px-6">
          <button
            type="button" onClick={onMenu}
            aria-label="Open sidebar" className="rounded p-2 text-gray-500 transition hover:text-black dark:text-gray-400 dark:hover:text-white lg:hidden"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>

          <Link to="/" className="flex shrink-0 items-center gap-2" aria-label="Readmade home">
            <img src={logo} alt="" className="h-7 w-7" />
            <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">Readmade</span>
            <span className="hidden rounded border border-gray-200 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-gray-500 sm:inline dark:border-white/15 dark:text-gray-400">
              Docs
            </span>
          </Link>

          <nav className="ml-2 hidden items-center gap-0.5 md:flex">
            <Link to="/" className={navLink}>Home</Link>
            <Link to="/#templates" className={navLink}>Templates</Link>
            <a
              href="https://github.com/bilalmlkdev/readmade" target="_blank" rel="noopener noreferrer" className={navLink}
            >
              GitHub
            </a>
          </nav>

          <div className="flex-1" />

          <button
            type="button" onClick={() => setSearchOpen(true)}
            className="hidden items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-1.5 text-[13px] text-gray-400 transition hover:border-gray-300 hover:text-gray-600 sm:flex dark:border-white/10 dark:bg-[#161616] dark:text-gray-500 dark:hover:border-white/20 dark:hover:text-gray-300"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35M17 10.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0Z" />
            </svg>
            Search
            <kbd className="rounded border border-gray-200 px-1 text-[10px] text-gray-400 dark:border-white/10 dark:text-gray-500">⌘K</kbd>
          </button>

          <button
            type="button" onClick={() => setSearchOpen(true)}
            aria-label="Search docs" className="rounded p-2 text-gray-500 transition hover:text-black sm:hidden dark:text-gray-400 dark:hover:text-white"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35M17 10.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0Z" />
            </svg>
          </button>

          <ThemeToggle className="px-1.5" />

          <Link
            to="/app" className="inline-flex items-center bg-black px-3 py-1.5 text-[13px] text-white transition hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
          >
            Open App
          </Link>
        </div>
      </header>
      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
    </>
  );
}
