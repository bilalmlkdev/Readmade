export const UNDO_LIMIT = 50;

let lastEditId = null;
let lastEditAt = 0;

export function resetEditCoalesce() {
  lastEditId = null;
  lastEditAt = 0;
}

export function snap(s) {
  return {
    blocks: s.blocks,
    activeBlockId: s.activeBlockId,
    expandedId: s.expandedId,
  };
}

export function pushPast(s, coalesce = false) {
  if (coalesce) return s.past;
  return [...s.past, snap(s)].slice(-UNDO_LIMIT);
}

export function coalesceUpdate(id) {
  const now = Date.now();
  const coalesce = lastEditId === id && now - lastEditAt < 700;
  lastEditId = id;
  lastEditAt = now;
  return coalesce;
}
