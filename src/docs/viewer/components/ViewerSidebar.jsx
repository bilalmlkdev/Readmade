import { NavLink } from "react-router-dom";
import { findPage } from "../data/docsUtils.js";

export default function ViewerSidebar({
  open,
  onClose,
  sections,
  pages,
  basePath,
  homeTo,
  homeLabel = "Back to home",
}) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={onClose}
          role="presentation"
        />
      )}
      <aside
        className={[
          "fixed top-14 bottom-0 left-0 z-40 w-72 overflow-x-hidden overflow-y-auto border-r border-gray-200 bg-white px-4 py-6",
          "dark:border-white/10 dark:bg-[#111]",
          "lg:static lg:z-auto lg:h-full lg:shrink-0 lg:translate-x-0 lg:bg-white lg:dark:bg-[#111] lg:transition-none",
          open ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
        aria-label="Documentation navigation"
      >
        <div className="mb-5 flex items-center justify-between lg:hidden">
          <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">
            Menu
          </span>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md px-2 py-1 text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-white/10 dark:hover:text-white"
          >
            Close
          </button>
        </div>

        {sections.map((section) => (
          <div key={section.title} className="mb-6">
            <div className="mb-1.5 px-2 text-[11px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
              {section.title}
            </div>
            <ul className="space-y-0.5">
              {(section.pages || []).map((slug) => {
                const page = findPage(pages, slug);
                if (!page) return null;
                return (
                  <li key={slug}>
                    <NavLink
                      to={`${basePath}/${slug}`}
                      onClick={onClose}
                      className={({ isActive }) =>
                        [
                          "block rounded-md px-2 py-1.5 text-sm",
                          isActive
                            ? "bg-gray-100 font-semibold text-gray-950 dark:bg-white/10 dark:text-white"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-950 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white",
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

        {homeTo ? (
          <div className="mt-8 border-t border-gray-200 pt-4 dark:border-white/10">
            <NavLink
              to={homeTo}
              onClick={onClose}
              className="block px-2 text-sm text-gray-500 hover:text-gray-950 dark:text-gray-400 dark:hover:text-white"
            >
              {homeLabel}
            </NavLink>
          </div>
        ) : null}
      </aside>
    </>
  );
}
