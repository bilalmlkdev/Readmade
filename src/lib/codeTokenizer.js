const INLINE_PATTERNS = [
  { type: "code-inline", re: /`[^`\n]+`/ },
  { type: "link", re: /!?\[[^\]]*\]\([^)]*\)/ },
  { type: "autolink", re: /https?:\/\/[^\s<>"')\]]+/ },
  { type: "bold", re: /\*\*[^*\n]+\*\*|__[^_\n]+__/ },
  { type: "italic", re: /\*[^*\n]+\*|_[^_\n]+_/ },
  { type: "strikethrough", re: /~~[^~\n]+~~/ },
  { type: "escape", re: /\\[\\`*{}[\]()#+\-.!_>~]/ },
];

export const TOKEN_CLASS = { "fence-open": "text-[#0550ae] dark:text-[#79c0ff] font-semibold", "fence-close": "text-[#0550ae] dark:text-[#79c0ff] font-semibold", "fence-body": "text-[#0550ae] dark:text-[#79c0ff]",
  hash: "text-[#cf222e] dark:text-[#ff7b72] font-bold", "heading-text": "text-[#1f2328] dark:text-[#e6edf3] font-bold",
  hr: "text-[#d0d7de] dark:text-[#30363d]",
  blockquote: "text-[#57606a] dark:text-[#8b949e] italic", "table-row": "text-[#0550ae] dark:text-[#79c0ff]", "list-indent": "text-[#24292f] dark:text-[#c9d1d9]", "list-bullet": "text-[#cf222e] dark:text-[#ff7b72] font-bold", "list-text": "text-[#24292f] dark:text-[#c9d1d9]",
  link: "text-[#0969da] dark:text-[#58a6ff] underline decoration-[#0969da]/40 dark:decoration-[#58a6ff]/40 underline-offset-2",
  autolink: "text-[#0969da] dark:text-[#58a6ff] underline decoration-[#0969da]/40 dark:decoration-[#58a6ff]/40 underline-offset-2",
  bold: "text-[#1f2328] dark:text-[#e6edf3] font-bold",
  italic: "text-[#1f2328] dark:text-[#e6edf3] italic",
  strikethrough: "text-[#57606a] dark:text-[#8b949e] line-through", "code-inline": "text-[#0550ae] dark:text-[#79c0ff] bg-[#f6f8fa] dark:bg-[#1a1a1a] border border-[#d0d7de] dark:border-white/10 rounded px-1 font-mono text-[0.9em]",
  escape: "text-[#57606a] dark:text-[#8b949e]",
  plain: "text-[#24292f] dark:text-[#c9d1d9]",
};

function matchAt(patterns, text, from) {
  let best = null;
  for (const p of patterns) {
    const m = p.re.exec(text.slice(from));
    if (m && m.index === 0) {
      if (!best || m[0].length > best.text.length) {
        best = { type: p.type, text: m[0] };
      }
    }
  }
  return best;
}

function tokenizeInline(text) {
  if (!text) return [];
  const tokens = [];
  let i = 0;

  while (i < text.length) {
    const hit = matchAt(INLINE_PATTERNS, text, i);
    if (hit) {
      tokens.push(hit);
      i += hit.text.length;
      continue;
    }

    let next = text.length;
    for (const p of INLINE_PATTERNS) {
      const m = p.re.exec(text.slice(i + 1));
      if (m) {
        const pos = i + 1 + m.index;
        if (pos < next) next = pos;
      }
    }

    const plain = text.slice(i, next);
    if (plain) tokens.push({ type: "plain", text: plain });
    i = next;
  }

  return tokens;
}

export function isBadgeLine(text) {
  const t = text.trim();
  if (!t || !t.includes("![")) return false;
  const rest = t
    .replace(/\[!\[[^\]]*\]\([^)]*\)\]\([^)]*\)/g, "")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\s+/g, "");
  return rest.length === 0;
}

// Collapse consecutive pure-badge lines onto one line for wrapping
export function mergeBadgeLines(raw) {
  const lines = raw.replace(/\n$/, "").split("\n");
  const out = [];
  let buf = [];

  const flush = () => {
    if (buf.length) {
      out.push(buf.join(""));
      buf = [];
    }
  };

  for (const line of lines) {
    if (isBadgeLine(line)) {
      buf.push(...line.trim().split(/\s+(?=(?:\[!\[|!\[))/));
    } else {
      flush();
      out.push(line);
    }
  }
  flush();
  return out;
}

function tokenizeLine(line, fenceState) {
  if (fenceState.open) {
    if (/^```/.test(line)) {
      fenceState.open = false;
      return [{ type: "fence-close", text: line }];
    }
    return [{ type: "fence-body", text: line }];
  }

  if (/^```/.test(line)) {
    fenceState.open = true;
    return [{ type: "fence-open", text: line }];
  }

  const heading = /^(#{1,6})(\s+)(.*)$/.exec(line);
  if (heading) {
    return [
      { type: "hash", text: heading[1] },
      { type: "plain", text: heading[2] },
      { type: "heading-text", text: heading[3] },
    ];
  }

  if (/^(?:-{3,}|\*{3,}|_{3,})\s*$/.test(line)) {
    return [{ type: "hr", text: line }];
  }

  if (line.startsWith(">")) {
    return [{ type: "blockquote", text: line }];
  }

  if (/^\|.*\|$/.test(line) || /^\|?[\s:-]+\|[\s:|-]*$/.test(line)) {
    return [{ type: "table-row", text: line }];
  }

  const list = /^(\s*)([-*+]|\d+[.)])(\s+)(.*)$/.exec(line);
  if (list) {
    return [
      { type: "list-indent", text: list[1] },
      { type: "list-bullet", text: list[2] },
      { type: "plain", text: list[3] },
      ...tokenizeInline(list[4]),
    ];
  }

  return tokenizeInline(line);
}

// Tokenize full markdown source into per-line highlight tokens
export function tokenizeCode(code) {
  if (!code) return [];
  const fenceState = { open: false };
  return mergeBadgeLines(code).map((text) => ({
    text,
    tokens: tokenizeLine(text, fenceState),
    badgeLine: isBadgeLine(text),
  }));
}
