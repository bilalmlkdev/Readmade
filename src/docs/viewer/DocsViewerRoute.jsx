import { useParams, Navigate } from "react-router-dom";
import DocsViewer from "./DocsViewer.jsx";

/**
 * Router wrapper for /docs and /docs/:slug.
 */
export default function DocsViewerRoute({
  pages = [],
  defaultSlug = null,
  ...rest
}) {
  const { slug } = useParams();
  const fallback = defaultSlug || pages[0]?.slug;

  if (slug && !pages.some((p) => p.slug === slug)) {
    return <Navigate to={`${rest.basePath || "/docs"}/${fallback}`} replace />;
  }

  return (
    <DocsViewer
      pages={pages}
      slug={slug || null}
      defaultSlug={fallback}
      {...rest}
    />
  );
}
