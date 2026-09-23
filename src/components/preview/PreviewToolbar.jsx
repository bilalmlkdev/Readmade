import { useState, useRef, useEffect } from "react";
import { Eye, Code } from "lucide-react";

const TABS = [
  { id: "preview", label: "Preview", icon: Eye },
  { id: "code", label: "Code", icon: Code },
];

const EXPORT_OPTIONS = [
  { id: "md", label: "Markdown" },
  { id: "txt", label: "Plain Text" },
  { id: "html", label: "HTML" },
];

function downloadBlob(content, type, filename) {
  const a = Object.assign(document.createElement("a"), {
    href: URL.createObjectURL(new Blob([content], { type })),
    download: filename,
  });
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(a.href);
}

export default function PreviewToolbar({
  activeTab,
  onTabChange,
  onDownload,
  raw,
  fileName = "README",
  kbSize,
  wordCount,
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const baseName =
    (fileName || "README").replace(/\.(md|txt|html)$/i, "") || "README";

  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const handleExport = (format) => {
    setOpen(false);
    if (format === "md") {
      onDownload();
      return;
    }
    if (format === "txt") {
      downloadBlob(raw, "text/plain", `${baseName}.txt`);
      return;
    }
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${baseName}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; max-width: 800px; margin: 0 auto; padding: 2rem; line-height: 1.6; color: #1a1a1a; }
    code { background: #f0f0f0; padding: 0.125rem 0.375rem; border-radius: 4px; font-family: 'SF Mono', monospace; }
    pre { background: #f6f8fa; padding: 1rem; border-radius: 8px; overflow-x: auto; border: 1px solid #e0e0e0; }
    pre code { background: none; padding: 0; }
    h1, h2, h3 { color: #000; }
    blockquote { border-left: 4px solid #d4d4d4; padding-left: 1rem; color: #555; margin: 1rem 0; }
  </style>
</head>
<body>${raw}</body>
</html>`;
    downloadBlob(html, "text/html", `${baseName}.html`);
  };

  return (
    <div className="sticky top-0 z-10 flex-shrink-0 bg-[#FAFAFB] dark:bg-[#161616] px-2.5 py-2 flex items-center justify-between border-b border-transparent dark:border-white/5">
      <div className="flex items-center gap-4 min-w-0">
        <div className="flex items-center gap-0.5 rounded-[10px] border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-white/5">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onTabChange(tab.id);
              }}
              type="button"
              aria-pressed={activeTab === tab.id}
              className={`px-3 py-1.5 rounded-[10px] text-[12px] font-medium transition-all duration-200 flex items-center gap-1.5 ${
                activeTab === tab.id
                  ? "bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              }`}
            >
              <tab.icon size={13} />
              {tab.label}
            </button>
          ))}
        </div>
        <span className="text-[13px] text-gray-400 dark:text-gray-500 hidden sm:block truncate max-w-[140px]">
          {baseName} <span className="text-gray-300 dark:text-gray-600">·</span>{" "}
          {activeTab === "preview" ? "Preview" : "Code"}
        </span>
      </div>

      <div className="flex items-center gap-2 min-w-0">
        <div className="hidden app:flex items-center gap-3 text-[11px] text-gray-500 dark:text-gray-400 font-medium mr-1">
          <span className="flex items-center gap-1">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            Updated {new Date().toLocaleTimeString()}
          </span>
          <span className="flex items-center gap-1">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M4 7h16M4 12h16M4 17h10" />
            </svg>
            ~{kbSize} KB
          </span>
          <span className="flex items-center gap-1">
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M4 7h16M4 12h16M4 17h10" />
            </svg>
            {wordCount} words
          </span>
        </div>

        <div className="w-px h-4 bg-gray-200 dark:bg-white/10 hidden app:block" />

        <div className="relative" ref={rootRef}>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-haspopup="menu"
            className="px-3 py-1.5 text-[12px] font-medium rounded-lg transition-all flex items-center gap-1.5 border border-gray-200 dark:border-white/10 bg-white dark:bg-[#1a1a1a] dark:text-white hover:bg-gray-50 dark:hover:bg-white/10"
          >
            Download
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {open && (
            <div
              role="menu"
              className="absolute right-0 top-full mt-1 p-1 w-[120px] origin-top-right rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#1a1a1a] shadow-xl shadow-black/10 overflow-hidden animate-slide-down"
            >
              {EXPORT_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  role="menuitem"
                  onClick={() => handleExport(opt.id)}
className="group w-full flex items-start gap-3 px-2.5 py-1.5 rounded-lg text-left transition-colors hover:bg-gray-50 dark:hover:bg-white/10 focus:bg-gray-50 dark:focus:bg-white/10 focus:outline-none"
              >
                <span className="flex-1 min-w-0">
                  <span className="flex items-center gap-1.5">
                    <span className="text-[13px] font-medium text-gray-900 dark:text-white">
                        {opt.label}
                      </span>
                    </span>
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
