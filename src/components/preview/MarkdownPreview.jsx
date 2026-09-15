import { useMemo, useState, useEffect, useCallback } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";
import useReadme from "../../store/useReadme.js";
import { blocksToMarkdown } from "../../lib/markdown.js";
import PreviewToolbar from "./PreviewToolbar.jsx";
import PreviewContent from "./PreviewContent.jsx";
import PreviewFooter from "./PreviewFooter.jsx";
marked.setOptions({ breaks: true, gfm: true });

function parseMarkdown(raw) {
  const renderer = new marked.Renderer();
  renderer.image = (href, title, text) => {
    let src = typeof href === "string" ? href : href?.url || href?.href || "";
    src = src.trim();
    if (!src || src === "undefined" || src === "[object Object]") {
      return `<div class="img-error"><span>Invalid image URL</span></div>`;
    }
    const isBadge =
      src.includes("img.shields.io") || text?.toLowerCase().includes("badge");
    return `
      <div class="img-wrap ${isBadge ? "badge-wrap" : ""}">
        <img src="${src.replace(/"/g, "&quot;")}"
             alt="${(text || "").replace(/"/g, "&quot;")}"
             title="${(title || "").replace(/"/g, "&quot;")}"
             loading="lazy"
             class="md-img ${isBadge ? "badge-img" : ""}"
             onclick="this.classList.toggle('zoomed')"
             onerror="this.style.display='none';this.nextElementSibling.style.display='flex'" />
        <div class="img-err-msg">Failed to load image</div>
        ${text && !isBadge ? `<div class="img-caption">${text.replace(/"/g, "&quot;")}</div>` : ""}
      </div>`;
  };
  marked.use({ renderer, mangle: false, headerIds: false });
  const result = marked.parse(raw);
  // marked.parse() returns a string when parsing is synchronous (the
  // normal case here) and a Promise only if an async extension is in
  // use. The caller always calls .then() on this, so always hand back
  // a real Promise - wrapping a plain string in Promise.resolve() is a
  // no-op for the async case and fixes the "X.then is not a function"
  // crash for the sync case (which is what tripped the preview's
  // ErrorBoundary every time blocks changed, e.g. adding a block).
  return Promise.resolve(result).then((res) => DOMPurify.sanitize(res));
}

export default function MarkdownPreview() {
  const blocks = useReadme((s) => s.blocks);
  const [activeTab, setActiveTab] = useState("preview");
  const [html, setHtml] = useState("");
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const raw = useMemo(() => blocksToMarkdown(blocks), [blocks]);
  const wordCount = useMemo(
    () => raw.split(/\s+/).filter((w) => w.length > 0).length,
    [raw],
  );
  const kbSize = useMemo(
    () => (new TextEncoder().encode(raw).length / 1024).toFixed(1),
    [raw],
  );

  useEffect(() => {
    if (!raw?.trim() || activeTab !== "preview") return;

    let cancelled = false;
    parseMarkdown(raw)
      .then((result) => {
        if (!cancelled) setHtml(result);
      })
      .catch((err) => {
        if (!cancelled)
          setHtml(`<div class="md-error">Error: ${err.message}</div>`);
      });
    return () => {
      cancelled = true;
    };
  }, [raw, activeTab]);

  const effectiveHtml = useMemo(() => {
    if (!raw?.trim() || activeTab !== "preview") return "";
    return html;
  }, [raw, activeTab, html]);

  const copyMarkdown = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(raw);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  }, [raw]);

  const downloadReadme = useCallback(() => {
    const a = Object.assign(document.createElement("a"), {
      href: URL.createObjectURL(new Blob([raw], { type: "text/markdown" })),
      download: "README.md",
    });
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setDownloading(true);
    setTimeout(() => setDownloading(false), 2000);
  }, [raw]);

  useEffect(() => {
    function handleDownload() { downloadReadme(); }
    function handleCopy() { copyMarkdown(); }
    window.addEventListener("readmade:download", handleDownload);
    window.addEventListener("readmade:copy", handleCopy);
    return () => {
      window.removeEventListener("readmade:download", handleDownload);
      window.removeEventListener("readmade:copy", handleCopy);
    };
  }, [copyMarkdown, downloadReadme]);

  const screenshotsBlock = blocks.find((b) => b.type === "screenshots");
  const validScreenshots =
    screenshotsBlock?.content?.items?.filter((i) => i.url?.trim()) || [];
  const screenshotsKey = validScreenshots.map((s) => s.url).join(",");

  return (
    <div className="flex flex-col h-full">
      <PreviewToolbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        copied={copied}
        downloading={downloading}
        onCopy={copyMarkdown}
        onDownload={downloadReadme}
        raw={raw}
        blocks={blocks}
      />
      <PreviewContent
        blocks={blocks}
        activeTab={activeTab}
        raw={raw}
        html={effectiveHtml}
        validScreenshots={validScreenshots}
        screenshotsKey={screenshotsKey}
      />
      <PreviewFooter
        kbSize={kbSize}
        validScreenshots={validScreenshots}
        wordCount={wordCount}
      />
    </div>
  );
}
