import { useEffect, useRef, Suspense, lazy } from "react";
import EmptyPreview from "../ui/EmptyPreview.jsx";

const CodeView = lazy(() => import("./CodeView.jsx"));

export default function PreviewContent({
  activeTab,
  raw,
  html,
  htmlKey,
  fileName,
}) {
  const hasContent = raw?.trim();
  const scrollRef = useRef(null);

  useEffect(() => {
    const root = scrollRef.current;
    if (!root) return;

    const onClick = (e) => {
      const img = e.target.closest(".md-img");
      if (img && root.contains(img)) {
        img.classList.toggle("zoomed");
      }
    };
    const onError = (e) => {
      const img = e.target;
      if (img instanceof HTMLImageElement && img.classList.contains("md-img")) {
        img.style.display = "none";
        img.closest(".md-figure")?.classList.add("img-failed");
      }
    };

    root.addEventListener("click", onClick);
    root.addEventListener("error", onError, true);
    return () => {
      root.removeEventListener("click", onClick);
      root.removeEventListener("error", onError, true);
    };
  }, [activeTab, html]);

  if (activeTab === "code") {
    return (
      <Suspense
        fallback={
          <div className="flex-1 h-full m-1 flex items-center justify-center bg-white rounded-tl-2xl rounded-tr-2xl rounded-bl-lg rounded-br-lg border border-gray-200">
            <div className="flex flex-col items-center gap-3 text-gray-400">
              <div className="h-5 w-5 rounded-full border-2 border-gray-200 border-t-gray-600 animate-spin" />
              <span className="text-[12px] font-medium">Loading code view…</span>
            </div>
          </div>
        }
      >
        <CodeView code={raw} fileName={fileName} />
      </Suspense>
    );
  }

  return (
    <div className="flex-1 h-full m-1 flex flex-col overflow-hidden bg-white rounded-tl-2xl rounded-tr-2xl rounded-bl-lg rounded-br-lg border border-gray-200 relative">
      <div
        ref={scrollRef}
        className="flex-1 h-full overflow-y-auto overflow-x-hidden"
        style={{ scrollbarWidth: "thin" }}
      >
        {!hasContent ? (
          <EmptyPreview />
        ) : (
          <article className="markdown-body">
            <div
              key={htmlKey}
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </article>
        )}
      </div>
    </div>
  );
}
