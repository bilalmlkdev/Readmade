import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { createBlock } from "../lib/blocks.js";
import { blocksToMarkdown } from "../lib/markdown.js";

const DEFAULT_BLOCKS = [
  "title",
  "badges",
  "description",
  "features",
  "installation",
  "usage",
];
// A single fixed workspace key, now that there's no login/identity system
// to scope storage per user. Every visitor to this browser shares the one
// workspace, same as how the app behaves today with no one logged in.
const BLOCKS_KEY = "readmade:blocks";

let _dupeCounter = 0;

const useReadme = create(
  persist(
    (set, get) => ({
      blocks: DEFAULT_BLOCKS.map(createBlock),
      activeBlockId: null,

      addBlock: (type) =>
        set((s) => ({ blocks: [...s.blocks, createBlock(type)] })),

      removeBlock: (id) =>
        set((s) => ({
          blocks: s.blocks.filter((b) => b.id !== id),
          activeBlockId: s.activeBlockId === id ? null : s.activeBlockId,
        })),

      reorderBlocks: (blocks) => set({ blocks }),

      updateBlock: (id, patch) =>
        set((s) => ({
          blocks: s.blocks.map((b) =>
            b.id === id ? { ...b, content: { ...b.content, ...patch } } : b,
          ),
        })),

      setActiveBlock: (id) => set({ activeBlockId: id }),

      getMarkdown: () => blocksToMarkdown(get().blocks),

      duplicateBlock: (id) =>
        set((s) => {
          const idx = s.blocks.findIndex((b) => b.id === id);
          if (idx === -1) return s;
          _dupeCounter += 1;
          const copy = {
            ...JSON.parse(JSON.stringify(s.blocks[idx])),
            id: `block_copy_${Date.now()}_${_dupeCounter}`,
          };
          const next = [...s.blocks];
          next.splice(idx + 1, 0, copy);
          return { blocks: next };
        }),

      resetToInitialTemplate: () => {
        set({ blocks: DEFAULT_BLOCKS.map(createBlock), activeBlockId: null });
      },

      clearAllData: () => {
        set({ blocks: [], activeBlockId: null });
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
      }),
    },
  ),
);

export default useReadme;
