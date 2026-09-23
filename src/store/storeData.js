export const BLOCKS_KEY = "readmade:blocks";

function getStoredHistory() {
  try {
    const stored = localStorage.getItem("readmade:history");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export { getStoredHistory };

export function createHistoryActions(set, get, pushPast) {
  return {
    saveToHistory: () => {
      const { blocks, history } = get();
      if (blocks.length === 0) return;
      const title = blocks.find((b) => b.type === "title")?.content?.name || "Untitled";
      const entry = {
        id: Date.now(),
        title,
        blockCount: blocks.length,
        timestamp: new Date().toISOString(),
        blocks: JSON.parse(JSON.stringify(blocks)),
      };
      const newHistory = [entry, ...history.filter((h) => h.title !== title)].slice(0, 8);
      set({ history: newHistory });
      try {
        localStorage.setItem("readmade:history", JSON.stringify(newHistory));
      } catch {
        // storage full
      }
    },

    loadFromHistory: (id) => {
      const s = get();
      const entry = s.history.find((h) => h.id === id);
      if (entry) {
        set({
          blocks: JSON.parse(JSON.stringify(entry.blocks)),
          activeBlockId: null,
          expandedId: null,
          past: pushPast(s),
          future: [],
        });
      }
    },

    clearHistory: () => {
      set({ history: [] });
      try {
        localStorage.removeItem("readmade:history");
      } catch {
        // storage unavailable
      }
    },
  };
}
