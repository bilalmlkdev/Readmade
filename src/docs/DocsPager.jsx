import { Link } from "react-router-dom";
import { getNeighbors } from "./data/nav.js";
import { getPage } from "./data/pages.js";

export default function DocsPager({ slug }) {
  const { prev, next } = getNeighbors(slug);
  const prevPage = prev ? getPage(prev) : null;
  const nextPage = next ? getPage(next) : null;

  if (!prevPage && !nextPage) return null;

  return (
    <div className="mt-10 flex flex-col gap-3 border-t border-gray-200 pt-6 sm:flex-row sm:justify-between dark:border-white/10">
      {prevPage ? (
        <Link
          to={`/docs/${prevPage.slug}`}
          className="group flex max-w-full flex-col rounded-lg border border-gray-200 px-4 py-3 transition hover:border-gray-300 dark:border-white/10 dark:hover:border-white/25"
        >
          <span className="text-[11px] uppercase tracking-wide text-gray-400 dark:text-gray-500">
            Previous
          </span>
          <span className="text-sm font-medium text-gray-900 group-hover:text-black dark:text-gray-100 dark:group-hover:text-white">
            {prevPage.title}
          </span>
        </Link>
      ) : (
        <span />
      )}
      {nextPage && (
        <Link
          to={`/docs/${nextPage.slug}`}
          className="group flex max-w-full flex-col items-end rounded-lg border border-gray-200 px-4 py-3 text-right transition hover:border-gray-300 dark:border-white/10 dark:hover:border-white/25"
        >
          <span className="text-[11px] uppercase tracking-wide text-gray-400 dark:text-gray-500">
            Next
          </span>
          <span className="text-sm font-medium text-gray-900 group-hover:text-black dark:text-gray-100 dark:group-hover:text-white">
            {nextPage.title}
          </span>
        </Link>
      )}
    </div>
  );
}
