import { Suspense, lazy } from "react";
import EmptyPreview from "../ui/EmptyPreview.jsx";
import { usePreviewImages } from "../../hooks/usePreviewImages.js";

const CodeView = lazy(() => import("./CodeView.jsx"));

export default function PreviewContent({
  activeTab,
  raw,
  html,
  htmlKey,
  fileName,
}) {
  const hasContent = raw?.trim();
  const scrollRef = usePreviewImages(activeTab, html);

  if (activeTab === "code") {
    return (
      <Suspense
        fallback={
          <div className="flex-1 h-full m-1 flex items-center justify-center bg-white dark:bg-[#161616] rounded-tl-2xl rounded-tr-2xl rounded-bl-lg rounded-br-lg border border-gray-200 dark:border-white/10">
            <div className="flex flex-col items-center gap-3 text-gray-400 dark:text-gray-500">
              <div className="h-5 w-5 rounded-full border-2 border-gray-200 dark:border-white/10 border-t-gray-600 dark:border-t-white/60 animate-spin" />
              <span className="text-[12px] font-medium">Loading code view...</span>
            </div>
          </div>
        }
      >
        <CodeView code={raw} fileName={fileName} />
      </Suspense>
    );
  }

  return (
    <div className="flex-1 h-full m-1.5 flex flex-col overflow-hidden bg-white dark:bg-[#161616] rounded-tl-2xl rounded-tr-2xl rounded-bl-lg rounded-br-lg border border-gray-200 dark:border-white/10 relative">
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
