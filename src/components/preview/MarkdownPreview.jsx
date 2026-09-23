import { useMemo, useState, useEffect, useCallback } from "react";
import useReadme from "../../store/useReadme.js";
import { blocksToMarkdown } from "../../lib/markdown.js";
import { parseMarkdown } from "../../lib/parseMarkdown.js";
import { downloadMarkdown } from "../../lib/download.js";
import PreviewToolbar from "./PreviewToolbar.jsx";
import PreviewContent from "./PreviewContent.jsx";

export default function MarkdownPreview() {
  const blocks = useReadme((s) => s.blocks);
  const settings = useReadme((s) => s.settings);
  const [activeTab, setActiveTab] = useState("preview");
  const [html, setHtml] = useState("");

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
    if (!raw?.trim()) return;

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
  }, [raw]);

  const renderedHtml = raw?.trim() ? html : "";

  const downloadReadme = useCallback(() => {
    downloadMarkdown(raw, settings?.name || "README");
  }, [raw, settings?.name]);

  useEffect(() => {
    function handleDownload() {
      downloadReadme();
    }
    window.addEventListener("readmade:download", handleDownload);
    return () => window.removeEventListener("readmade:download", handleDownload);
  }, [downloadReadme]);

  return (
    <div className="flex flex-col h-full">
      <PreviewToolbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onDownload={downloadReadme}
        raw={raw}
        fileName={settings?.name || "README"}
        kbSize={kbSize}
        wordCount={wordCount}
      />
      <PreviewContent
        activeTab={activeTab}
        raw={raw}
        html={renderedHtml}
        htmlKey={`${blocks.length}-${raw.length}`}
        fileName={settings?.name || "README"}
      />
    </div>
  );
}
