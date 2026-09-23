import { BLOCK_TYPES, BLOCK_META, BLOCK_ICONS } from "../lib/blocks.js";

// Flat list of palette entries for rendering and search
export const ALL_BLOCKS = Object.values(BLOCK_TYPES).map((type) => ({
  type,
  label: BLOCK_META[type].label,
  desc: BLOCK_META[type].desc,
  group: BLOCK_META[type].group,
  icon: BLOCK_ICONS[type],
}));

export const BLOCK_GROUPS = [
  "Header",
  "Text",
  "Content",
  "Media",
  "Docs",
  "Extras",
];

export function groupBlocks(blocks) {
  return BLOCK_GROUPS.map((group) => ({
    group,
    items: blocks.filter((b) => b.group === group),
  })).filter((section) => section.items.length > 0);
}

export function filterPaletteBlocks(query) {
  const q = query.trim().toLowerCase();
  if (!q) return ALL_BLOCKS;
  return ALL_BLOCKS.filter(
    (b) =>
      b.label.toLowerCase().includes(q) || b.desc.toLowerCase().includes(q),
  );
}
