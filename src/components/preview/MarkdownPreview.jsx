import { useMemo, useState, useEffect } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";
import useReadme from "../../store/useReadme.js";
import { blocksToMarkdown } from "../../lib/markdown.js";
import PreviewToolbar from "./PreviewToolbar.jsx";
import PreviewContent from "./PreviewContent.jsx";
import PreviewFooter from "./PreviewFooter.jsx";
import { duotoneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

marked.setOptions({ breaks: true, gfm: true });

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

  /* Parse markdown → HTML with sanitization */
  useEffect(() => {
    let isMounted = true; // <-- anti-memory-leak guard
    if (!raw?.trim() || activeTab !== "preview") {
      if (isMounted) setHtml("");
      return;
    }

    const renderer = new marked.Renderer();
    renderer.image = (href, title, text) => {
      let src = typeof href === "string" ? href : href?.url || href?.href || "";
      src = src.trim();
      if (!src || src === "undefined" || src === "[object Object]") {
        return `<div class="img-error"><span>⚠️ Invalid image URL</span></div>`;
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
          <div class="img-err-msg">❌ Failed to load image</div>
          ${text && !isBadge ? `<div class="img-caption">${text.replace(/"/g, "&quot;")}</div>` : ""}
        </div>`;
    };
    marked.use({ renderer, mangle: false, headerIds: false });
    try {
      const result = marked.parse(raw);
      if (result && typeof result.then === "function") {
        result
          .then((res) => {
            if (isMounted) {
              const clean = DOMPurify.sanitize(res);
              setHtml(clean);
            }
          })
          .catch((err) => {
            if (isMounted)
              setHtml(`<div class="md-error">Error: ${err.message}</div>`);
          });
      } else {
        if (isMounted) {
          const cleanHtml = DOMPurify.sanitize(result);
          setHtml(cleanHtml);
        }
      }
    } catch (err) {
      if (isMounted)
        setHtml(`<div class="md-error">Error: ${err.message}</div>`);
    }
    return () => {
      isMounted = false;
    };
  }, [raw, activeTab]);

  const copyMarkdown = async () => {
    try {
      await navigator.clipboard.writeText(raw);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  const downloadReadme = () => {
    const a = Object.assign(document.createElement("a"), {
      href: URL.createObjectURL(new Blob([raw], { type: "text/markdown" })),
      download: "README.md",
    });
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setDownloading(true);
    setTimeout(() => setDownloading(false), 2000);
  };

  const screenshotsBlock = blocks.find((b) => b.type === "screenshots");
  const validScreenshots =
    screenshotsBlock?.content?.items?.filter((i) => i.url?.trim()) || [];
  const screenshotsKey = validScreenshots.map((s) => s.url).join(",");

  /* Code theme */
  const codeTheme = {
    ...duotoneLight,
    'pre[class*="language-"]': {
      ...duotoneLight['pre[class*="language-"]'],
      background: "#ffffff",
      margin: 0,
      borderRadius: 0,
      fontSize: "12.5px",
      lineHeight: "1.75",
      padding: "14px 0 18px",
      color: "#111111",
    },
    'code[class*="language-"]': {
      ...duotoneLight['code[class*="language-"]'],
      background: "none",
      fontSize: "12.5px",
      color: "#111111",
    },
  };

  return (
    <>
      <PreviewToolbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        copied={copied}
        downloading={downloading}
        onCopy={copyMarkdown}
        onDownload={downloadReadme}
      />
      <PreviewContent
        blocks={blocks}
        activeTab={activeTab}
        raw={raw}
        html={html}
        validScreenshots={validScreenshots}
        screenshotsKey={screenshotsKey}
        codeTheme={codeTheme}
      />
      <PreviewFooter
        kbSize={kbSize}
        validScreenshots={validScreenshots}
        wordCount={wordCount}
      />
    </>
  );
}