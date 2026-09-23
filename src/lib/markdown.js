import { blockToMd } from "./blockToMd.js";

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
      out.push(badgeBuf.join(""));
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
