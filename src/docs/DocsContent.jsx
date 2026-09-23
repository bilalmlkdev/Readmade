import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { parseMarkdown } from "../lib/parseMarkdown.js";

export default function DocsContent({ page }) {
  const [html, setHtml] = useState("");
  const navigate = useNavigate();
  const body = page?.body || "";

  useEffect(() => {
    if (!body) return undefined;
    let cancelled = false;
    parseMarkdown(body)
      .then((res) => {
        if (!cancelled) setHtml(res);
      })
      .catch((err) => {
        if (!cancelled) {
          setHtml(`<div class="md-error">Error: ${err.message}</div>`);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [body]);

  useEffect(() => {
    const root = document.getElementById("docs-markdown");
    if (!root) return undefined;

    function onClick(e) {
      const a = e.target.closest?.("a");
      if (!a) return;
      const href = a.getAttribute("href") || "";
      if (!href.startsWith("/") || a.target === "_blank") return;
      e.preventDefault();
      const [path, hash] = href.split("#");
      if (path.startsWith("/docs")) {
        navigate(path);
        if (hash) {
          requestAnimationFrame(() => {
            document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
          });
        }
      } else {
        navigate(href);
      }
    }

    root.addEventListener("click", onClick);
    return () => root.removeEventListener("click", onClick);
  }, [navigate, html]);

  if (!page) {
    return (
      <div id="docs-markdown" className="docs-content min-w-0 flex-1 py-12">
        <div className="markdown-body">
          <h1>Page not found</h1>
          <p>
            That docs page does not exist.{" "}
            <a href="/docs/intro">Back to the introduction</a>.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div id="docs-markdown" className="docs-content min-w-0 flex-1">
      <div
        className="markdown-body"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
