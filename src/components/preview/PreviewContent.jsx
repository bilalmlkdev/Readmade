import { FileWarning } from "lucide-react";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import markdownLang from "react-syntax-highlighter/dist/esm/languages/prism/markdown";
import EmptyCanvas from "../ui/EmptyCanvas.jsx";

SyntaxHighlighter.registerLanguage("markdown", markdownLang);

export default function PreviewContent({
  blocks,
  activeTab,
  raw,
  html,
  validScreenshots,
  screenshotsKey,
  codeTheme,
}) {
  return (
    <div className="flex-1 min-h-full py-0! flex flex-col overflow-hidden bg-white relative">
      {blocks.length === 0 ? (
        <EmptyCanvas />
      ) : (
        <div
          className="flex-1 h-full overflow-y-auto"
          style={{ scrollbarWidth: "none" }}
        >
          {activeTab === "preview" &&
            validScreenshots.length === 0 &&
            (() => {
              const hasScreenshotBlock = blocks.some(
                (b) => b.type === "screenshots",
              );
              if (!hasScreenshotBlock) return null;
              return (
                <div className="mx-5 mt-2 px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-200 flex items-start gap-2">
                  <span className="text-gray-400 text-[12px] relative top-1.5">
                    <FileWarning size={12} />
                  </span>
                  <div>
                    <p className="text-[11px]  text-gray-500">
                      Screenshots block has no valid URLs yet
                    </p>
                    <p className="text-[10px] text-gray-400 mt-0.5">
                      Click the block and add a direct image URL.
                    </p>
                  </div>
                </div>
              );
            })()}
          {activeTab === "preview" && validScreenshots.length > 0 && (
            <div className="mx-5 mt-4 px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 flex items-center gap-2">
              <span className="text-black text-[11px]">✓</span>
              <p className="text-[10px]  text-gray-500">
                {validScreenshots.length} screenshot
                {validScreenshots.length > 1 ? "s" : ""} loaded
              </p>
            </div>
          )}

          {activeTab === "preview" &&
            (!raw?.trim() ? (
              <div className="text-center text-[12px]  text py-10">
                No content to preview
              </div>
            ) : (
              <div className="px-3 py-6 max-w-full mx-auto">
                <div
                  key={screenshotsKey || blocks.length}
                  className="markdown-preview"
                  dangerouslySetInnerHTML={{ __html: html }}
                />
              </div>
            ))}

          {activeTab === "code" && (
            <div className="flex flex-col h-full">
              <div className="flex-1 overflow-auto relative code-view-wrapper" style={{ scrollbarWidth: "none" }}>
                <SyntaxHighlighter
                  language="markdown"
                  style={codeTheme}
                  showLineNumbers={true}
                  wrapLines={true}
                  wrapLongLines={true}
                  lineNumberStyle={{
                    minWidth: "2.5em",
                    paddingRight: "1.25em",
                    paddingLeft: "1em",
                    color: "#c9c4c9",
                    userSelect: "none",
                    fontSize: "12px",
                    fontFamily: "ui-monospace, 'SF Mono', Menlo, Consolas, monospace",
                  }}
                  customStyle={{
                    background: "#ffffff",
                    margin: 0,
                    borderRadius: 0,
                    minHeight: "100%",
                    fontSize: "12.5px",
                    lineHeight: "1.75",
                    fontFamily: "ui-monospace, 'SF Mono', Menlo, Consolas, monospace",
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                    overflowWrap: "break-word",
                  }}
                  codeTagProps={{
                    style: {
                      fontFamily: "ui-monospace, 'SF Mono', Menlo, Consolas, monospace",
                      fontSize: "12.5px",
                      color: "#111111",
                      whiteSpace: "pre-wrap",
                      wordBreak: "break-word",
                      overflowWrap: "break-word",
                      display: "block",
                      padding: "14px 16px 18px",
                    },
                  }}
                >
                  {raw || "# Start adding blocks to generate your README"}
                </SyntaxHighlighter>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}