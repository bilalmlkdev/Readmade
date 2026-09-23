import { useState, useCallback, useMemo } from "react";

const INLINE_PATTERNS = [
  { type: "code-inline", re: /`[^`\n]+`/ },
  { type: "link", re: /!?\[[^\]]*\]\([^)]*\)/ },
  { type: "autolink", re: /https?:\/\/[^\s<>"')\]]+/ },
  { type: "bold", re: /\*\*[^*\n]+\*\*|__[^_\n]+__/ },
  { type: "italic", re: /\*[^*\n]+\*|_[^_\n]+_/ },
  { type: "strikethrough", re: /~~[^~\n]+~~/ },
  { type: "escape", re: /\\[\\`*{}[\]()#+\-.!_>~]/ },
];

const TOKEN_CLASS = {
  "fence-open": "text-[#0550ae] dark:text-[#79c0ff] font-semibold",
  "fence-close": "text-[#0550ae] dark:text-[#79c0ff] font-semibold",
  "fence-body": "text-[#0550ae] dark:text-[#79c0ff]",
  hash: "text-[#cf222e] dark:text-[#ff7b72] font-bold",
  "heading-text": "text-[#1f2328] dark:text-[#e6edf3] font-bold",
  hr: "text-[#d0d7de] dark:text-[#30363d]",
  blockquote: "text-[#57606a] dark:text-[#8b949e] italic",
  "table-row": "text-[#0550ae] dark:text-[#79c0ff]",
  "list-indent": "text-[#24292f] dark:text-[#c9d1d9]",
  "list-bullet": "text-[#cf222e] dark:text-[#ff7b72] font-bold",
  "list-text": "text-[#24292f] dark:text-[#c9d1d9]",
  link: "text-[#0969da] dark:text-[#58a6ff] underline decoration-[#0969da]/40 dark:decoration-[#58a6ff]/40 underline-offset-2",
  autolink: "text-[#0969da] dark:text-[#58a6ff] underline decoration-[#0969da]/40 dark:decoration-[#58a6ff]/40 underline-offset-2",
  bold: "text-[#1f2328] dark:text-[#e6edf3] font-bold",
  italic: "text-[#1f2328] dark:text-[#e6edf3] italic",
  strikethrough: "text-[#57606a] dark:text-[#8b949e] line-through",
  "code-inline":
    "text-[#0550ae] dark:text-[#79c0ff] bg-[#f6f8fa] dark:bg-[#1a1a1a] border border-[#d0d7de] dark:border-white/10 rounded px-1 font-mono text-[0.9em]",
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

function isBadgeLine(text) {
  const t = text.trim();
  if (!t || !t.includes("![")) return false;
  const rest = t
    .replace(/\[!\[[^\]]*\]\([^)]*\)\]\([^)]*\)/g, "")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\s+/g, "");
  return rest.length === 0;
}

function mergeBadgeLines(raw) {
  const lines = raw.replace(/\n$/, "").split("\n");
  const out = [];
  let buf = [];

  const flush = () => {
    if (buf.length) {
      out.push(buf.join(" "));
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

function HighlightedLine({ tokens }) {
  if (!tokens.length) return <span className="text-transparent"> </span>;
  return (
    <>
      {tokens.map((t, i) => (
        <span key={i} className={TOKEN_CLASS[t.type] || TOKEN_CLASS.plain}>
          {t.text}
        </span>
      ))}
    </>
  );
}

export default function CodeView({ code, fileName = "README" }) {
  const [copied, setCopied] = useState(false);

  const lines = useMemo(() => {
    if (!code) return [];
    const fenceState = { open: false };
    return mergeBadgeLines(code).map((text) => ({
      text,
      tokens: tokenizeLine(text, fenceState),
      badgeLine: isBadgeLine(text),
    }));
  }, [code]);

  const lineCount = lines.length;

  const handleCopy = useCallback(async () => {
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = code;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

  if (!code?.trim()) {
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

  return (
    <div className="flex-1 h-full m-1 flex flex-col overflow-hidden bg-white dark:bg-[#161616] rounded-tl-2xl rounded-tr-2xl rounded-bl-lg rounded-br-lg border border-gray-200 dark:border-white/10 relative">
      <div className="flex items-center justify-between gap-3 px-4 py-2.5 border-b border-gray-100 dark:border-white/10 bg-white dark:bg-[#161616] shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <div className="min-w-0 leading-tight">
            <p className="text-[12px] font-medium text-gray-900 dark:text-white truncate">
              {fileName}
              <span className="text-gray-400 dark:text-gray-500 font-normal">.md</span>
            </p>
            <p className="text-[10px] text-gray-400 dark:text-gray-500">
              markdown · {lineCount} {lineCount === 1 ? "line" : "lines"} ·
              wrap on
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className={`shrink-0 inline-flex items-center gap-1.5 px-2 py-1 text-[12px] font-medium rounded-lg border transition-all shadow-xs ${
            copied
              ? "bg-gray-900 text-white border-gray-900 dark:bg-white dark:text-black dark:border-white"
              : "bg-white dark:bg-[#1a1a1a] text-gray-600 dark:text-gray-300 border-gray-200 dark:border-white/10 hover:text-gray-900 hover:bg-gray-50 dark:hover:text-white dark:hover:bg-white/10 hover:border-gray-300 dark:hover:border-white/20"
          }`}
          aria-label="Copy code"
        >
          {copied ? (
            <>
              Copied!
            </>
          ) : (
            <>
              Copy code
            </>
          )}
        </button>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden">
        <div className="min-w-full py-3 font-mono text-[13px] leading-[1.7] [overflow-wrap:anywhere]">
          {lines.map((line, idx) => {
            const firstType = line.tokens[0]?.type;
            const isFence =
              firstType === "fence-open" ||
              firstType === "fence-close" ||
              firstType === "fence-body";
            return (
              <div
                key={idx}
                className={`flex items-start ${isFence ? "bg-[#f6f8fa] dark:bg-[#1a1a1a]" : ""}`}
              >
                <span
                  className={`sticky left-0 z-10 shrink-0 w-[3.5rem] select-none text-right pr-3 pl-3 text-[12px] text-gray-400 dark:text-gray-500 border-r border-gray-100 dark:border-white/10 ${
                    isFence ? "bg-[#f6f8fa] dark:bg-[#1a1a1a]" : "bg-white dark:bg-[#161616]"
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
          })}
        </div>
      </div>
    </div>
  );
}
