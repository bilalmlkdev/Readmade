import { Eye, Code } from "lucide-react";

export const TABS = [
  { id: "preview", label: "Preview", icon: Eye },
  { id: "code", label: "Code", icon: Code },
];

export const EXPORT_OPTIONS = [
  { id: "md", label: "Markdown" },
  { id: "txt", label: "Plain Text" },
  { id: "html", label: "HTML" },
];

export function baseNameFrom(fileName) {
  return (fileName || "README").replace(/\.(md|txt|html)$/i, "") || "README";
}

export function downloadBlob(content, type, filename) {
  const a = Object.assign(document.createElement("a"), {
    href: URL.createObjectURL(new Blob([content], { type })),
    download: filename,
  });
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(a.href);
}

function buildHtmlDocument(raw, title) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
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
}

// Export README as md, txt, or styled HTML
export function exportReadme(format, { raw, fileName, onDownloadMd }) {
  const baseName = baseNameFrom(fileName);
  if (format === "md") {
    onDownloadMd();
    return;
  }
  if (format === "txt") {
    downloadBlob(raw, "text/plain", `${baseName}.txt`);
    return;
  }
  downloadBlob(
    buildHtmlDocument(raw, baseName),
    "text/html",
    `${baseName}.html`,
  );
}
