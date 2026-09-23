import { Link, NavLink } from "react-router-dom";
import { SECTIONS } from "./data/nav.js";
import { getPage } from "./data/pages.js";

export default function DocsSidebar({ open, onClose }) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
          role="presentation"
        />
      )}
      <aside
        className={[
          "fixed top-14 bottom-0 left-0 z-40 w-72 overflow-y-auto border-r border-gray-200 bg-[#FAFAFA] px-4 py-6 transition-transform lg:sticky lg:top-14 lg:z-0 lg:h-[calc(100vh-3.5rem)] lg:translate-x-0 lg:bg-transparent dark:border-white/10 dark:bg-[#0c0c0c]",
          open ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
        aria-label="Documentation navigation"
      >
        <div className="mb-6 lg:hidden">
          <button
            type="button"
            onClick={onClose}
            className="text-sm text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white"
          >
            Close
          </button>
        </div>

        {SECTIONS.map((section) => (
          <div key={section.title} className="mb-7">
            <div className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
              {section.title}
            </div>
            <ul className="space-y-0.5">
              {section.pages.map((slug) => {
                const page = getPage(slug);
                if (!page) return null;
                return (
                  <li key={slug}>
                    <NavLink
                      to={`/docs/${slug}`}
                      onClick={onClose}
                      className={({ isActive }) =>
                        [
                          "block rounded-md px-2 py-1.5 text-sm transition",
                          isActive
                            ? "bg-black/5 font-medium text-black dark:bg-white/10 dark:text-white"
                            : "text-gray-500 hover:bg-black/5 hover:text-black dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white",
                        ].join(" ")
                      }
                    >
                      {page.title}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}

        <div className="mt-8 border-t border-gray-200 pt-4 dark:border-white/10">
          <Link
            to="/"
            onClick={onClose}
            className="px-2 text-sm text-gray-500 transition hover:text-black dark:text-gray-400 dark:hover:text-white"
          >
            Back to home
          </Link>
        </div>
      </aside>
    </>
  );
}
