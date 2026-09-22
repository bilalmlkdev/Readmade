import { useState, useRef, useEffect } from "react";
import { Copy, Download, FileText, Code, Check } from "lucide-react";

const TABS = [
  { id: "preview", label: "Preview" },
  { id: "code", label: "Code" },
];

const EXPORT_OPTIONS = [
  { id: "md", label: "Markdown (.md)", icon: FileText, desc: "Standard README.md file" },
  { id: "txt", label: "Plain Text (.txt)", icon: FileText, desc: "Plain text without formatting" },
  { id: "html", label: "HTML (.html)", icon: Code, desc: "Rendered HTML with styling" },
];

function ActionBtn({ onClick, done, doneLabel, idleLabel, children }) {
  return (
    <button
      onClick={(e) => {
        onClick(e);
      }}
      className="px-3 py-1.5 text-[12px] font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors flex items-center gap-1.5"
    >
      {children}
      {done ? doneLabel : idleLabel}
    </button>
  );
}

function Dropdown({ trigger, children, align = "right" }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target) &&
          triggerRef.current && !triggerRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (open) {
      const handleEscape = (e) => { if (e.key === "Escape") setOpen(false); };
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [open]);

  return (
    <div className="relative" ref={dropdownRef}>
      <div ref={triggerRef} onClick={(e) => { e.stopPropagation(); setOpen(!open); }}>
        {trigger}
      </div>
      {open && (
        <div
          className={`absolute top-full mt-1.5 z-50 min-w-[180px] bg-white border border-gray-200 rounded-lg shadow-lg shadow-black/10 overflow-hidden animate-in fade-in-0 zoom-in-95 duration-150`}
          style={{ [align]: 0 }}
        >
          {children}
        </div>
      )}
    </div>
  );
}

function DropdownItem({ onClick, icon: Icon, label, desc, shortcut, disabled, selected }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full px-3 py-2.5 text-left flex items-center gap-3 transition-colors ${
        disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"
      } ${selected ? "bg-gray-50" : ""}`}
    >
      <Icon size={15} className={`text-gray-500 ${selected ? "text-gray-900" : ""}`} strokeWidth={2} />
      <div className="flex-1 min-w-0 text-left">
        <p className="text-[12px] font-medium text-gray-900 truncate">{label}</p>
        {desc && <p className="text-[10px] text-gray-400 truncate">{desc}</p>}
      </div>
      {shortcut && <span className="text-[10px] text-gray-300 font-mono px-1.5 py-0.5 rounded bg-gray-100">{shortcut}</span>}
      {selected && <Check size={14} className="text-gray-900" />}
    </button>
  );
}

export default function PreviewToolbar({
  activeTab,
  onTabChange,
  copied,
  downloading,
  onCopy,
  onDownload,
  raw,
}) {
  const [downloadFormat, setDownloadFormat] = useState("md");

  const handleExport = (format) => {
    setDownloadFormat(format);
    if (format === "md") onDownload();
    else if (format === "txt") downloadAsTxt(raw);
    else if (format === "html") downloadAsHtml(raw);
    setTimeout(() => setDownloadFormat("md"), 2000);
  };

  const downloadAsTxt = (content) => {
    const a = Object.assign(document.createElement("a"), {
      href: URL.createObjectURL(new Blob([content], { type: "text/plain" })),
      download: "README.txt",
    });
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const downloadAsHtml = (markdown) => {
    // Simple HTML wrapper with basic styling
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>README</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; max-width: 800px; margin: 0 auto; padding: 2rem; line-height: 1.6; color: #1a1a1a; }
    code { background: #f0f0f0; padding: 0.125rem 0.375rem; border-radius: 4px; font-family: 'SF Mono', monospace; }
    pre { background: #f6f8fa; padding: 1rem; border-radius: 8px; overflow-x: auto; border: 1px solid #e0e0e0; }
    pre code { background: none; padding: 0; }
    h1, h2, h3 { color: #000; }
    blockquote { border-left: 4px solid #d4d4d4; padding-left: 1rem; color: #555; margin: 1rem 0; }
  </style>
</head>
<body>${markdown}</body>
</html>`;
    const a = Object.assign(document.createElement("a"), {
      href: URL.createObjectURL(new Blob([html], { type: "text/html" })),
      download: "README.html",
    });
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="sticky top-0 z-10 flex-shrink-0 border-b border-gray-200 bg-[#FAFAFB] px-4 py-2.5 flex items-center justify-between">
      <div className="flex items-center gap-4 min-w-0">
        <div className="flex items-center gap-0.5 rounded-lg border border-gray-200 bg-gray-50 p-0.5">
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
              className={`
                px-3 py-1.5 rounded-md text-[12px] font-medium transition-all duration-200
                ${activeTab === tab.id ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}
              `}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <span className="text-[13px] text-gray-400 hidden sm:block">
          README <span className="text-gray-300">·</span>{" "}
          {activeTab === "preview" ? "Preview" : "Code"}
        </span>
      </div>

      <div className="flex items-center gap-1.5">
        <ActionBtn onClick={onCopy} done={copied} idleLabel="Copy" doneLabel="Copied!">
          <Copy size={13} />
        </ActionBtn>

        <Dropdown
          trigger={
            <ActionBtn
              onClick={() => {}}
              done={downloading}
              idleLabel="Download"
              doneLabel="Saved!"
            >
              <Download size={13} />
            </ActionBtn>
          }
          align="right"
        >
          {EXPORT_OPTIONS.map((opt) => (
            <DropdownItem
              key={opt.id}
              icon={opt.icon}
              label={opt.label}
              desc={opt.desc}
              selected={downloadFormat === opt.id}
              onClick={() => handleExport(opt.id)}
            />
          ))}
        </Dropdown>
      </div>
    </div>
  );
}