import { BLOCK_TYPES } from "./blocks.js";

function clean(s) {
  return String(s ?? "").replace(/\s+/g, "").trim();
}

function cleanUrl(s) {
  return String(s ?? "").replace(/\s+/g, "").trim();
}

function listItemSection(title, items) {
  const list = (items || []).filter((f) => f?.trim());
  if (!list.length) return "";
  return `## ${title}\n\n${list.map((f) => `- ${f}`).join("\n")}`;
}

export function blockToMd(type, c) {
  switch (type) {
    case BLOCK_TYPES.TITLE:
      return `# ${c.name || "Untitled"}`;

    case BLOCK_TYPES.TAGLINE: {
      const text = (c.text || c.tagline || "").trim();
      return text ? `> ${text}` : "";
    }

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
        .join("");
    }

    case BLOCK_TYPES.DESCRIPTION:
      return (c.text || "").trim();

    case BLOCK_TYPES.FEATURES:
      return listItemSection("Features", c.items);

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

    case BLOCK_TYPES.REQUIREMENTS:
      return listItemSection("Requirements", c.items);

    case BLOCK_TYPES.ROADMAP:
      return listItemSection("Roadmap", c.items);

    case BLOCK_TYPES.TABLE: {
      const headers = (c.headers || []).filter((h) => h?.trim());
      const rows = (c.rows || []).filter(
        (r) => Array.isArray(r) && r.some((x) => x?.trim()),
      );
      if (!headers.length || !rows.length) return "";
      const head = `| ${headers.join(" | ")} |`;
      const sep = `| ${headers.map(() => "---").join(" | ")} |`;
      const body = rows
        .map(
          (r) =>
            `| ${headers.map((_, i) => (r[i] || "").trim()).join(" | ")} |`,
        )
        .join("\n");
      return `## Table\n\n${head}\n${sep}\n${body}`;
    }

    case BLOCK_TYPES.CHANGELOG: {
      const items = (c.items || []).filter((e) => e?.version?.trim());
      if (!items.length) return "";
      const rows = items.map((e) => {
        const title = e.date
          ? `## ${e.version} (${e.date})`
          : `## ${e.version}`;
        return e.notes?.trim() ? `${title}\n\n${e.notes.trim()}` : title;
      });
      return `## Changelog\n\n${rows.join("\n\n")}`;
    }

    case BLOCK_TYPES.FAQ: {
      const entries = (c.entries || []).filter((e) => e?.question?.trim());
      if (!entries.length) return "";
      const rows = entries.map(
        (e) => `### ${e.question.trim()}\n\n${(e.answer || "").trim()}`.trim(),
      );
      return `## FAQ\n\n${rows.join("\n\n")}`;
    }

    case BLOCK_TYPES.CREDITS:
      return listItemSection("Credits", c.items);

    case BLOCK_TYPES.LICENSE:
      return `## License\n\nDistributed under the **${c.type || "MIT"}** License.\n\nSee LICENSE for more information.`;

    case BLOCK_TYPES.CUSTOM:
      return (c.markdown || "").trim();

    default:
      return "";
  }
}
