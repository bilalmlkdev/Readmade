import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { createBlock } from "../lib/blocks.js";
import { createDefaultBlocks } from "../lib/defaultTemplate.js";

export const BLOCKS_KEY = "readmade:blocks";
const HISTORY_KEY = "readmade:history";

function getStoredHistory() {
  try {
    const stored = localStorage.getItem(HISTORY_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export const useReadme = create(
  persist(
    (set, get) => ({
      blocks: createDefaultBlocks(),
      activeBlockId: null,
      expandedId: null,
      settings: {
        name: "README",
        description: "",
        author: "",
      },
      history: getStoredHistory(),

      updateSettings: (patch) =>
        set((s) => ({ settings: { ...s.settings, ...patch } })),

      toggleExpanded: (id) =>
        set((s) => ({ expandedId: s.expandedId === id ? null : id })),

      addBlock: (type, contentOverride) => {
        const block = createBlock(type, contentOverride);
        set((s) => ({
          blocks: [...s.blocks, block],
          expandedId: block.id,
          activeBlockId: block.id,
        }));
        return block;
      },

      removeBlock: (id) =>
        set((s) => ({
          blocks: s.blocks.filter((b) => b.id !== id),
          activeBlockId: s.activeBlockId === id ? null : s.activeBlockId,
          expandedId: s.expandedId === id ? null : s.expandedId,
        })),

      reorderBlocks: (blocks) => set({ blocks }),

      updateBlock: (id, patch) =>
        set((s) => ({
          blocks: s.blocks.map((b) =>
            b.id === id ? { ...b, content: { ...b.content, ...patch } } : b,
          ),
        })),

      toggleBlockHidden: (id) =>
        set((s) => ({
          blocks: s.blocks.map((b) =>
            b.id === id ? { ...b, hidden: !b.hidden } : b,
          ),
        })),

      setActiveBlock: (id) => set({ activeBlockId: id }),

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
        const newHistory = [entry, ...history.filter((h) => h.title !== title)].slice(0, 20);
        set({ history: newHistory });
        try {
          localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
        } catch { /* storage full */ }
      },

      loadFromHistory: (id) => {
        const { history } = get();
        const entry = history.find((h) => h.id === id);
        if (entry) {
          set({
            blocks: JSON.parse(JSON.stringify(entry.blocks)),
            activeBlockId: null,
            expandedId: null,
          });
        }
      },

      resetToInitialTemplate: () => {
        set({
          blocks: createDefaultBlocks(),
          activeBlockId: null,
          expandedId: null,
        });
      },

      clearAllData: () => {
        set({ blocks: [], activeBlockId: null, expandedId: null });
      },
    }),
    {
      name: "readmade-workspace",
      storage: createJSONStorage(() => ({
        getItem: () => localStorage.getItem(BLOCKS_KEY),
        setItem: (name, value) => localStorage.setItem(BLOCKS_KEY, value),
        removeItem: () => localStorage.removeItem(BLOCKS_KEY),
      })),
      partialize: (state) => ({
        blocks: state.blocks,
        activeBlockId: state.activeBlockId,
        settings: state.settings,
      }),
    },
  ),
);

export default useReadme;
