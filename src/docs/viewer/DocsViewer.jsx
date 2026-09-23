import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ViewerHeader from "./components/ViewerHeader.jsx";
import ViewerSidebar from "./components/ViewerSidebar.jsx";
import ViewerToc from "./components/ViewerToc.jsx";
import ViewerContent from "./components/ViewerContent.jsx";
import ViewerPager from "./components/ViewerPager.jsx";
import ViewerFooter from "./components/ViewerFooter.jsx";
import ViewerBreadcrumb from "./components/ViewerBreadcrumb.jsx";
import { useDocsScroll } from "./hooks/useDocsViewer.js";
import {
  DEFAULT_BRAND,
  SCROLLER_CLASS,
} from "./data/defaultConfig.js";
import {
  extractHeadings,
  findPage,
  getSection,
} from "./data/docsUtils.js";
import "./styles/docs-viewer.css";

/**
 * Documentation viewer for /docs.
 */
export default function DocsViewer({
  pages = [],
  sections = [],
  basePath = "/docs",
  slug = null,
  defaultSlug = null,
  brand = {},
  footer = null,
  breadcrumbLabel = "Docs",
  parseMarkdown,
  onNavigate,
  notFoundFallback = null,
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { el: scrollEl, setRef, scrollToTop, scrollToId } = useDocsScroll();
  const navigate = useNavigate();

  const resolvedSlug =
    slug ||
    defaultSlug ||
    pages[0]?.slug ||
    "";
  const page = findPage(pages, resolvedSlug);
  const section = page ? getSection(sections, page.slug) : null;
  const headings = useMemo(
    () => extractHeadings(page?.body),
    [page?.body],
  );

  const mergedBrand = useMemo(
    () => ({ ...DEFAULT_BRAND, ...brand, links: brand.links || DEFAULT_BRAND.links }),
    [brand],
  );

  useEffect(() => {
    scrollToTop();
  }, [page?.slug, scrollToTop]);

  const handleLinkClick = useCallback(
    (event, anchor) => {
      const href = anchor.getAttribute("href") || "";
      if (anchor.target === "_blank") return;

      if (href.startsWith("#")) {
        event.preventDefault();
        scrollToId(href.slice(1));
        return;
      }

      if (!href.startsWith("/")) return;
      event.preventDefault();
      const [path, hash] = href.split("#");
      const navigateTo = () => {
        if (onNavigate) onNavigate(path);
        else navigate(path);
      };

      if (path.startsWith(basePath)) {
        navigateTo();
        if (hash) requestAnimationFrame(() => scrollToId(hash));
      } else {
        navigateTo();
      }
    },
    [basePath, navigate, onNavigate, scrollToId],
  );

  if (!page) {
    if (notFoundFallback) return notFoundFallback;
  }

  return (
    <div
      className="dv-root flex h-screen flex-col overflow-hidden"
      data-dv-root
    >
      <ViewerHeader
        brand={mergedBrand}
        onMenu={() => setSidebarOpen(true)}
        pages={pages}
        basePath={basePath}
      />

      <div className="flex min-h-0 flex-1">
        <ViewerSidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          sections={sections}
          pages={pages}
          basePath={basePath}
          homeTo={mergedBrand.homeTo}
          homeLabel={mergedBrand.homeLabel}
        />

        <div className="flex min-w-0 flex-1">
          <div
            ref={setRef}
            className={`${SCROLLER_CLASS} dv-scroll min-w-0 flex-1 overflow-x-hidden overflow-y-auto`}
          >
            <div className="mx-auto max-w-[1100px] px-4 py-8 md:px-8">
              {page ? (
                <>
                  <ViewerBreadcrumb
                    section={section}
                    page={page}
                    rootLabel={breadcrumbLabel}
                  />
                  <ViewerContent
                    key={page.slug}
                    page={page}
                    parseMarkdown={parseMarkdown}
                    onLinkClick={handleLinkClick}
                  />
                  <ViewerPager
                    slug={page.slug}
                    sections={sections}
                    pages={pages}
                    basePath={basePath}
                  />
                </>
              ) : (
                <ViewerContent page={null} />
              )}
            </div>

            <ViewerFooter footer={footer} brand={mergedBrand} basePath={basePath} />
          </div>

          <ViewerToc
            key={page?.slug || "empty"}
            headings={headings}
            scrollEl={scrollEl}
            onJump={scrollToId}
          />
        </div>
      </div>
    </div>
  );
}
