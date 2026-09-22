import { FileWarning } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import EmptyPreview from "../ui/EmptyPreview.jsx";

// react-syntax-highlighter's `Prism` export already bundles every
// refractor/prism language (via `refractor/all`) and ships as a plain
// component, not an object with a `registerLanguage` static method.
// Calling `.registerLanguage` on it throws at module-eval time - which
// crashed the lazy-loaded preview chunk and tripped the ErrorBoundary.
// No manual registration is needed; `language="js"`, `"bash"`, etc. all
// work out of the box.

const vsCodeTheme = {
  'pre[class*="language-"]': {
    background: "#ffffff",
    margin: 0,
    padding: "16px 20px",
    fontSize: "13px",
    lineHeight: "1.65",
    fontFamily:
      "'SF Mono', 'Fira Code', 'Cascadia Code', Menlo, Consolas, 'DejaVu Sans Mono', monospace",
    color: "#1e1e1e",
    tabSize: 2,
    overflow: "auto",
  },
  'code[class*="language-"]': {
    background: "none",
    fontSize: "13px",
    fontFamily:
      "'SF Mono', 'Fira Code', 'Cascadia Code', Menlo, Consolas, 'DejaVu Sans Mono', monospace",
    color: "#1e1e1e",
  },
  comment: { color: "#008000", fontStyle: "italic" },
  prolog: { color: "#008000", fontStyle: "italic" },
  doctype: { color: "#008000", fontStyle: "italic" },
  cdata: { color: "#008000", fontStyle: "italic" },
  punctuation: { color: "#383a42" },
  namespace: { opacity: 0.7 },
  property: { color: "#005cc5" },
  tag: { color: "#808080" },
  boolean: { color: "#005cc5" },
  number: { color: "#005cc5" },
  constant: { color: "#005cc5" },
  symbol: { color: "#005cc5" },
  deleted: { color: "#a31515" },
  selector: { color: "#800000" },
  "attr-name": { color: "#e45649" },
  string: { color: "#0451a5" },
  char: { color: "#0451a5" },
  builtin: { color: "#005cc5" },
  inserted: { color: "#008000" },
  operator: { color: "#383a42" },
  entity: { color: "#383a42", cursor: "help" },
  url: { color: "#0451a5" },
  atrule: { color: "#800000" },
  "attr-value": { color: "#0451a5" },
  keyword: { color: "#af00db" },
  function: { color: "#795e26" },
  "class-name": { color: "#267f99" },
  regex: { color: "#800000" },
  important: { color: "#af00db", fontWeight: "bold" },
  variable: { color: "#e45649" },
  bold: { fontWeight: "bold" },
  italic: { fontStyle: "italic" },
  "template-string": { color: "#0451a5" },
  "template-punctuation": { color: "#af00db" },
  parameter: { color: "#e45649" },
  "type-annotation": { color: "#267f99" },
  decorator: { color: "#795e26" },
};

const lineNumberStyle = {
  display: "inline-block",
  minWidth: "2.5em",
  paddingRight: "1.5em",
  textAlign: "right",
  color: "#bfc4ca",
  userSelect: "none",
  fontSize: "12px",
  fontFamily: "'SF Mono', Menlo, Consolas, monospace",
};

export default function PreviewContent({
  blocks,
  activeTab,
  raw,
  html,
  validScreenshots,
  screenshotsKey,
}) {
  const hasContent = raw?.trim();

  return (
    <div className="flex-1 min-h-full py-0! flex flex-col overflow-hidden bg-[#FAFAFB] relative">
      {blocks.length === 0 ? (
        <EmptyPreview activeTab={activeTab} />
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
                    <p className="text-[11px] text-gray-500">
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
              <p className="text-[10px] text-gray-500">
                {validScreenshots.length} screenshot
                {validScreenshots.length > 1 ? "s" : ""} loaded
              </p>
            </div>
          )}

          {activeTab === "preview" &&
            (!hasContent ? (
              <EmptyPreview activeTab="preview" />
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
            <div
              className="h-full overflow-auto"
              style={{ scrollbarWidth: "thin" }}
            >
              {!hasContent ? (
                <EmptyPreview activeTab="code" />
              ) : (
                <SyntaxHighlighter
                  language="markdown"
                  style={vsCodeTheme}
                  showLineNumbers={true}
                  wrapLines={true}
                  lineNumberStyle={lineNumberStyle}
                  customStyle={{
                    background: "#ffffff",
                    margin: 0,
                    borderRadius: 0,
                    padding: "16px 0",
                    minHeight: "100%",
                    fontSize: "13px",
                    lineHeight: "1.65",
                    fontFamily: "'SF Mono', Menlo, Consolas, monospace",
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                  }}
                  codeTagProps={{
                    style: {
                      fontFamily: "'SF Mono', Menlo, Consolas, monospace",
                      fontSize: "13px",
                      color: "#1e1e1e",
                      display: "block",
                      whiteSpace: "pre-wrap",
                      wordBreak: "break-word",
                    },
                  }}
                >
                  {raw}
                </SyntaxHighlighter>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
