import { useState, useMemo } from "react";
import { useParams, Navigate } from "react-router-dom";
import DocsHeader from "./DocsHeader.jsx";
import DocsSidebar from "./DocsSidebar.jsx";
import DocsContent from "./DocsContent.jsx";
import DocsToc from "./DocsToc.jsx";
import DocsPager from "./DocsPager.jsx";
import DocsFooter from "./DocsFooter.jsx";
import { getPage, DEFAULT_SLUG } from "./data/pages.js";
import { getSectionFor } from "./data/nav.js";
import { extractHeadings } from "./data/headings.js";

export default function DocsPage() {
  const { slug } = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const invalid = Boolean(slug && !getPage(slug));
  const page = getPage(slug || DEFAULT_SLUG) || getPage(DEFAULT_SLUG);
  const section = getSectionFor(page.slug);
  const headings = useMemo(() => extractHeadings(page.body), [page.body]);

  if (invalid) return <Navigate to={`/docs/${DEFAULT_SLUG}`} replace />;

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#FAFAFA] text-gray-900 dark:bg-[#0c0c0c] dark:text-gray-100">
      <DocsHeader onMenu={() => setSidebarOpen(true)} />

      <div className="flex min-h-0 flex-1">
        <DocsSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <div className="flex min-w-0 flex-1">
          <div
            id="docs-scroll"
            className="min-w-0 flex-1 overflow-x-hidden overflow-y-auto"
          >
            <div className="mx-auto max-w-[1100px] px-4 py-8 md:px-8">
              <nav
                className="mb-4 flex flex-wrap items-center gap-1.5 text-[13px] text-gray-400 dark:text-gray-500"
                aria-label="Breadcrumb"
              >
                <span>Docs</span>
                <span aria-hidden="true">/</span>
                {section && (
                  <>
                    <span>{section.title}</span>
                    <span aria-hidden="true">/</span>
                  </>
                )}
                <span className="text-gray-700 dark:text-gray-200">{page.title}</span>
              </nav>

              <DocsContent key={page.slug} page={page} />
              <DocsPager slug={page.slug} />
            </div>
            <DocsFooter />
          </div>

          <DocsToc key={page.slug} headings={headings} />
        </div>
      </div>
    </div>
  );
}
