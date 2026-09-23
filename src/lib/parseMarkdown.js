import { marked } from "marked";
import DOMPurify from "dompurify";

function escapeAttr(s) {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g,"&quot;");
}

function slugify(text) {
  return String(text || "")
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

marked.setOptions({ breaks: true, gfm: true });

// Parse markdown to sanitized HTML with GitHub-like renderer tweaks
export function parseMarkdown(raw) {
  const renderer = new marked.Renderer();

  renderer.heading = function ({ tokens, depth, text }) {
    const id = slugify(text);
    const inner = this.parser.parseInline(tokens);
    return `<h${depth} id="${escapeAttr(id)}">${inner}<a class="heading-anchor" href="#${escapeAttr(id)}" aria-hidden="true" tabindex="-1">#</a></h${depth}>\n`;
  };

  renderer.code = function ({ text, lang }) {
    const language = (lang || "").split(/\s+/)[0] || "";
    const langClass = language
      ? ` class="language-${escapeAttr(language)}"`
      : "";
    const langLabel = language
      ? `<div class="code-lang">${escapeAttr(language)}</div>`
      : "";
    const escaped = text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    return `<div class="code-block">${langLabel}<pre><code${langClass}>${escaped}\n</code></pre></div>\n`;
  };

  renderer.image = function ({ href, title, text }) {
    let src = (typeof href === "string" ? href : "").trim();
    if (!src || src === "undefined" || src === "[object Object]") {
      return `<div class="img-error"><span>Invalid image URL</span></div>`;
    }
    const isBadge =
      src.includes("img.shields.io") ||
      (text || "").toLowerCase().includes("badge");
    const safeSrc = escapeAttr(src);
    const safeAlt = escapeAttr(text || "");
    const safeTitle = title ? ` title="${escapeAttr(title)}"` : "";
    if (isBadge) {
      return `<img src="${safeSrc}" alt="${safeAlt}"${safeTitle} class="md-badge" loading="lazy" />`;
    }
    return `<figure class="md-figure">
      <img src="${safeSrc}" alt="${safeAlt}"${safeTitle} loading="lazy" class="md-img" />
      <div class="img-err-msg">Failed to load image</div>
  ${text ? `<figcaption>${text}</figcaption>` : ""}
    </figure>`;
  };

  renderer.link = function ({ href, title, text, tokens }) {
    const url = typeof href === "string" ? href : "";
    const external = /^https?:\/\//i.test(url);
    const titleAttr = title ? ` title="${escapeAttr(title)}"` : "";
    const rel = external ? ' rel="noreferrer noopener" target="_blank"' : "";
    const inner = tokens ? this.parser.parseInline(tokens) : text;
    return `<a href="${escapeAttr(url)}"${titleAttr}${rel}>${inner}</a>`;
  };

  renderer.checkbox = (checked) =>
    `<input type="checkbox" disabled${checked ? "checked" : ""} />`;

  marked.use({ renderer, mangle: false, headerIds: false });

  const result = marked.parse(raw);
  return Promise.resolve(result).then((res) =>
    DOMPurify.sanitize(res, {
      ADD_ATTR: ["target", "rel", "aria-hidden", "tabindex"],
    }),
  );
}
