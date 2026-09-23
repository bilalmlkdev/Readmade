import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { searchPages } from "../data/docsUtils.js";

function SearchDialog({ pages, basePath, onClose, labels }) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const results = searchPages(pages, query).slice(0, 8);
  const safeActive = Math.min(active, Math.max(results.length - 1, 0));

  useEffect(() => {
    const id = requestAnimationFrame(() => inputRef.current?.focus());
    return () => cancelAnimationFrame(id);
  }, []);

  function onQueryChange(value) {
    setQuery(value);
    setActive(0);
  }

  function go(slug) {
    onClose();
    navigate(`${basePath}/${slug}`);
  }

  function onKeyDown(e) {
    if (e.key === "Escape") {
      onClose();
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, results.length - 1));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    }
    if (e.key === "Enter" && results[safeActive]) {
      go(results[safeActive].slug);
    }
  }

  return (
    <div
      className="fixed inset-0 z-[80] flex items-start justify-center bg-black/40 px-4 pt-[14vh]"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="w-full max-w-lg overflow-hidden rounded-xl border border-gray-200 bg-white shadow-2xl dark:border-white/10 dark:bg-[#141414]"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Search documentation"
      >
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder={labels.placeholder}
          className="w-full border-b border-gray-200 bg-white px-4 py-3.5 text-sm text-gray-900 outline-none placeholder:text-gray-400 dark:border-white/10 dark:bg-[#141414] dark:text-white dark:placeholder:text-gray-500"
        />
        <ul className="max-h-80 overflow-y-auto py-1.5">
          {results.length === 0 && (
            <li className="px-4 py-6 text-center text-sm text-gray-500 dark:text-gray-400">
              No results for your search
            </li>
          )}
          {results.map((page, index) => (
            <li key={page.slug}>
              <button
                type="button"
                onClick={() => go(page.slug)}
                onMouseEnter={() => setActive(index)}
                className={[
                  "block w-full px-4 py-2.5 text-left",
                  index === safeActive
                    ? "bg-gray-100 dark:bg-white/10"
                    : "bg-white dark:bg-[#141414]",
                ].join(" ")}
              >
                <span className="block text-sm font-medium text-gray-900 dark:text-white">
                  {page.title}
                </span>
                <span className="mt-0.5 block truncate text-xs text-gray-500 dark:text-gray-400">
                  {page.description}
                </span>
              </button>
            </li>
          ))}
        </ul>
        <div className="border-t border-gray-200 bg-gray-50 px-4 py-2 text-[11px] text-gray-500 dark:border-white/10 dark:bg-white/5 dark:text-gray-400">
          {labels.footer}
        </div>
      </div>
    </div>
  );
}

export default SearchDialog;
