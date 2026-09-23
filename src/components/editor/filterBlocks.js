import { BLOCK_META } from "../../lib/blocks.js";

// Filter arranged blocks by search query against block labels
export function filterBlocksBySearch(blocks, search) {
  if (!search) return blocks;
  const q = search.toLowerCase();
  return blocks.filter((b) => BLOCK_META[b.type]?.label.toLowerCase().includes(q));
}
