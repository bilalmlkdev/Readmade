import { useState, useCallback, useMemo } from "react";
import { tokenizeCode } from "../../lib/codeTokenizer.js";
import { copyToClipboard } from "../../lib/copy.js";
import HighlightedLine from "./HighlightedLine.jsx";

function CodeLine({ line, idx }) {
  const firstType = line.tokens[0]?.type;
  const isFence =
    firstType === "fence-open" ||
    firstType === "fence-close" ||
    firstType === "fence-body";

  return (
    <div
      className={`flex items-start ${isFence ? "bg-[#f6f8fa] dark:bg-[#1a1a1a]" : ""}`}
    >
      <span
        className={`sticky left-0 z-10 shrink-0 w-[3.5rem] select-none text-right pr-3 pl-3 text-[12px] text-gray-400 dark:text-gray-500 border-r border-gray-100 dark:border-white/10 ${
          isFence
            ? "bg-[#f6f8fa] dark:bg-[#1a1a1a]"
            : "bg-white dark:bg-[#161616]"
        }`}
      >
        {idx + 1}
      </span>
      <code
        className={`flex-1 min-w-0 px-4 whitespace-pre-wrap ${
          line.badgeLine ? "break-all" : "break-words"
        }`}
      >
        <HighlightedLine tokens={line.tokens} />
      </code>
    </div>
  );
}

function CodeEmpty() {
  return (
    <div className="flex-1 h-full m-1 flex flex-col overflow-hidden bg-white dark:bg-[#161616] rounded-tl-2xl rounded-tr-2xl rounded-bl-lg rounded-br-lg border border-gray-200 dark:border-white/10">
      <div className="flex-1 flex items-center justify-center select-none px-4">
        <div className="flex flex-col items-center text-center space-y-4 max-w-[280px]">
          <div className="space-y-1.5">
            <p className="text-base font-medium text-black dark:text-white">
              Nothing to show yet
            </p>
            <p className="text-sm text-black/70 dark:text-white/60 leading-relaxed">
              Add blocks on the left to generate your README source.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CodeView({ code, fileName = "README" }) {
  const [copied, setCopied] = useState(false);
  const lines = useMemo(() => tokenizeCode(code), [code]);
  const lineCount = lines.length;

  const handleCopy = useCallback(async () => {
    if (!code) return;
    await copyToClipboard(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

  if (!code?.trim()) return <CodeEmpty />;

  return (
    <div className="flex-1 h-full m-1 flex flex-col overflow-hidden bg-white dark:bg-[#161616] rounded-tl-2xl rounded-tr-2xl rounded-bl-lg rounded-br-lg border border-gray-200 dark:border-white/10 relative">
      <div className="flex items-center justify-between gap-3 px-4 py-2.5 border-b border-gray-100 dark:border-white/10 bg-white dark:bg-[#161616] shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <div className="min-w-0 leading-tight">
            <p className="text-[12px] font-medium text-gray-900 dark:text-white truncate">
              {fileName}
              <span className="text-gray-400 dark:text-gray-500 font-normal">
                .md
              </span>
            </p>
            <p className="text-[10px] text-gray-400 dark:text-gray-500">
              markdown · {lineCount} {lineCount === 1 ? "line" : "lines"} ·
              wrap on
            </p>
          </div>
        </div>

        <button
          type="button" onClick={handleCopy}
          className={`shrink-0 inline-flex items-center gap-1.5 px-2 py-1 text-[12px] font-medium rounded-lg border transition-all shadow-xs ${
            copied
              ? "bg-gray-900 text-white border-gray-900 dark:bg-white dark:text-black dark:border-white"
              : "bg-white dark:bg-[#1a1a1a] text-gray-600 dark:text-gray-300 border-gray-200 dark:border-white/10 hover:text-gray-900 hover:bg-gray-50 dark:hover:text-white dark:hover:bg-white/10 hover:border-gray-300 dark:hover:border-white/20"
          }`}
          aria-label="Copy code"
        >
          {copied ? "Copied!" : "Copy code"}
        </button>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden">
        <div className="min-w-full py-3 font-mono text-[13px] leading-[1.7] [overflow-wrap:anywhere]">
          {lines.map((line, idx) => (
            <CodeLine key={idx} line={line} idx={idx} />
          ))}
        </div>
      </div>
    </div>
  );
}
