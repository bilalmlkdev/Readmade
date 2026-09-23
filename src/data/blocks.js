import { BLOCK_TYPES, BLOCK_META, BLOCK_ICONS } from "../lib/blocks.js";

// Flat list of palette entries for rendering and search
export const ALL_BLOCKS = Object.values(BLOCK_TYPES).map((type) => ({
  type,
  label: BLOCK_META[type].label,
  desc: BLOCK_META[type].desc,
  icon: BLOCK_ICONS[type],
}));

export function filterPaletteBlocks(query) {
  const q = query.trim().toLowerCase();
  if (!q) return ALL_BLOCKS;
  return ALL_BLOCKS.filter(
    (b) =>
      b.label.toLowerCase().includes(q) || b.desc.toLowerCase().includes(q),
  );
}
