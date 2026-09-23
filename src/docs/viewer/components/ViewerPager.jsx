import { Link } from "react-router-dom";
import { findPage, getNeighbors } from "../data/docsUtils.js";

export default function ViewerPager({ slug, sections, pages, basePath }) {
  const { prev, next } = getNeighbors(sections, slug);
  const prevPage = findPage(pages, prev);
  const nextPage = findPage(pages, next);

  if (!prevPage && !nextPage) return null;

  return (
    <div className="mt-10 flex flex-col gap-3 border-t border-gray-200 pt-6 sm:flex-row sm:justify-between dark:border-white/10">
      {prevPage ? (
        <Link
          to={`${basePath}/${prevPage.slug}`}
          className="group max-w-full rounded-xl border border-gray-200 bg-white px-4 py-3 hover:border-gray-300 dark:border-white/10 dark:bg-[#111] dark:hover:border-white/20"
        >
          <span className="block text-[11px] font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">
            Previous
          </span>
          <span className="mt-0.5 block text-sm font-medium text-gray-900 group-hover:text-gray-950 dark:text-white dark:group-hover:text-gray-200">
            {prevPage.title}
          </span>
        </Link>
      ) : (
        <span />
      )}
      {nextPage ? (
        <Link
          to={`${basePath}/${nextPage.slug}`}
          className="group max-w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-right hover:border-gray-300 sm:min-w-[180px] dark:border-white/10 dark:bg-[#111] dark:hover:border-white/20"
        >
          <span className="block text-[11px] font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">
            Next
          </span>
          <span className="mt-0.5 block text-sm font-medium text-gray-900 group-hover:text-gray-950 dark:text-white dark:group-hover:text-gray-200">
            {nextPage.title}
          </span>
        </Link>
      ) : null}
    </div>
  );
}
