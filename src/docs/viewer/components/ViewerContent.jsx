import { useEffect, useState } from "react";

export default function ViewerContent({
  page,
  parseMarkdown,
  onLinkClick,
}) {
  const [html, setHtml] = useState("");
  const body = page?.body || "";

  useEffect(() => {
    if (!body || !parseMarkdown) return undefined;
    let cancelled = false;
    Promise.resolve(parseMarkdown(body))
      .then((res) => {
        if (!cancelled) setHtml(res);
      })
      .catch((err) => {
        if (!cancelled) {
          setHtml(
            `<div class="md-error">Could not render this page: ${err.message}</div>`,
          );
        }
      });
    return () => {
      cancelled = true;
    };
  }, [body, parseMarkdown]);

  if (!page) {
    return (
      <div className="dv-content min-w-0 flex-1 rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center dark:border-white/15 dark:bg-[#141414]">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          Page not found
        </h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Pick a page from the sidebar to continue.
        </p>
      </div>
    );
  }

  return (
    <div className="dv-content min-w-0 flex-1">
      <article
        className="dv-markdown animate-[dv-fade_0.18s_ease-out]"
        onClick={(e) => {
          const anchor = e.target.closest?.("a");
          if (!anchor) return;
          onLinkClick?.(e, anchor);
        }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
