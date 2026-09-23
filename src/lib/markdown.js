import { BLOCK_TYPES } from "./blocks.js";

export function blocksToMarkdown(blocks) {
  return mergeBadgeLines(
    blocks
      .filter((b) => !b.hidden)
      .map((b) => blockToMd(b.type, b.content))
      .filter(Boolean)
      .join("\n\n"),
  );
}

const BADGE_ONLY_LINE =
  /^(?:\s*(?:\[!\[[^\]]*\]\([^)]*\)\]\([^)]*\)|!\[[^\]]*\]\([^)]*\))\s*)+$/;

function mergeBadgeLines(md) {
  const lines = md.split("\n");
  const out = [];
  let badgeBuf = [];

  const flushBadges = () => {
    if (badgeBuf.length) {
      out.push(badgeBuf.join(" "));
      badgeBuf = [];
    }
  };

  for (const line of lines) {
    if (BADGE_ONLY_LINE.test(line) && line.trim()) {
      badgeBuf.push(...line.trim().split(/\s+(?=(?:\[!\[|!\[))/));
    } else {
      flushBadges();
      out.push(line);
    }
  }
  flushBadges();
  return out.join("\n");
}

function clean(s) {
  return String(s ?? "").replace(/\s+/g, " ").trim();
}

function cleanUrl(s) {
  return String(s ?? "").replace(/\s+/g, "").trim();
}

function blockToMd(type, c) {
  switch (type) {
    case BLOCK_TYPES.TITLE:
      return [`# ${c.name || "Untitled"}`, c.tagline ? `> ${c.tagline}` : ""]
        .filter(Boolean)
        .join("\n\n");

    case BLOCK_TYPES.BADGES: {
      const badges = (c.badges || [])
        .map((b) => ({
          label: clean(b.label || ""),
          url: cleanUrl(b.url || ""),
          link: cleanUrl(b.link || ""),
        }))
        .filter((b) => b.url);
      if (!badges.length) return "";
      return badges
        .map((b) =>
          b.link
            ? `[![${b.label}](${b.url})](${b.link})`
            : `![${b.label}](${b.url})`,
        )
        .join(" ");
    }

    case BLOCK_TYPES.DESCRIPTION:
      return (c.text || "").trim();

    case BLOCK_TYPES.FEATURES: {
      const items = (c.items || []).filter((f) => f?.trim());
      if (!items.length) return "";
      return `## Features\n\n${items.map((f) => `- ${f}`).join("\n")}`;
    }

    case BLOCK_TYPES.INSTALLATION: {
      const mgr = c.manager || "npm";
      const pkg = c.package || "your-package";
      const cmd =
        mgr === "yarn"
          ? `yarn add ${pkg}`
          : mgr === "pnpm"
            ? `pnpm add ${pkg}`
            : mgr === "bun"
              ? `bun add ${pkg}`
              : `npm install ${pkg}`;
      const extra = c.extra?.trim()
        ? `\n\n\`\`\`bash\n${c.extra.trim()}\n\`\`\``
        : "";
      return `## Installation\n\n\`\`\`bash\n${cmd}\n\`\`\`${extra}`;
    }

    case BLOCK_TYPES.USAGE:
      if (!c.code?.trim()) return "";
      return `## Usage\n\n\`\`\`${c.language || "js"}\n${c.code}\n\`\`\``;

    case BLOCK_TYPES.SCREENSHOTS: {
      const valid = (c.items || []).filter((i) => i.url?.trim());
      if (!valid.length) return "";
      const imgs = valid
        .map((i) => {
          const alt = i.alt || "Screenshot";
          const url = i.url.trim();
          const src = url.startsWith("data:")
            ? "REPLACE_WITH_HOSTED_IMAGE_URL"
            : url;
          const caption = i.caption ? `\n\n*${i.caption}*` : "";
          return `![${alt}](${src})${caption}`;
        })
        .join("\n\n");
      return `## Screenshots\n\n${imgs}`;
    }

    case BLOCK_TYPES.API: {
      const rows = (c.entries || [])
        .map(
          (e) =>
            `### \`${e.name}\`\n\n${e.description || ""}${
              e.options || e.params
                ? `\n\n**Params:** ${e.options || e.params}`
                : ""
            }`,
        )
        .join("\n\n");
      return rows ? `## API Reference\n\n${rows}` : "";
    }

    case BLOCK_TYPES.CONTRIBUTING: {
      const steps = (c.steps || [])
        .filter(Boolean)
        .map((s, i) => `${i + 1}. ${s}`)
        .join("\n");
      return ["## Contributing", c.text || "", steps]
        .filter(Boolean)
        .join("\n\n");
    }

    case BLOCK_TYPES.LICENSE:
      return `## License\n\nDistributed under the **${c.type || "MIT"}** License.\n\nSee LICENSE for more information.`;

    case BLOCK_TYPES.CUSTOM:
      return (c.markdown || "").trim();

    default:
      return "";
  }
}
