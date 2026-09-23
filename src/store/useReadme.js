import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { createBlock } from "../lib/blocks.js";
import { createDefaultBlocks } from "../lib/defaultTemplate.js";
import {
  UNDO_LIMIT,
  pushPast,
  snap,
  coalesceUpdate,
  resetEditCoalesce,
} from "./undoHelpers.js";
import {
  BLOCKS_KEY,
  getStoredHistory,
  createHistoryActions,
} from "./storeData.js";

export { BLOCKS_KEY };

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
      past: [],
      future: [],

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
          past: pushPast(s),
          future: [],
        }));
        return block;
      },

      removeBlock: (id) =>
        set((s) => ({
          blocks: s.blocks.filter((b) => b.id !== id),
          activeBlockId: s.activeBlockId === id ? null : s.activeBlockId,
          expandedId: s.expandedId === id ? null : s.expandedId,
          past: pushPast(s),
          future: [],
        })),

      reorderBlocks: (blocks) =>
        set((s) => ({
          blocks,
          past: pushPast(s),
          future: [],
        })),

      updateBlock: (id, patch) =>
        set((s) => ({
          blocks: s.blocks.map((b) =>
            b.id === id ? { ...b, content: { ...b.content, ...patch } } : b,
          ),
          past: pushPast(s, coalesceUpdate(id)),
          future: [],
        })),

      toggleBlockHidden: (id) =>
        set((s) => ({
          blocks: s.blocks.map((b) =>
            b.id === id ? { ...b, hidden: !b.hidden } : b,
          ),
          past: pushPast(s),
          future: [],
        })),

      setActiveBlock: (id) => set({ activeBlockId: id }),

      undo: () => {
        const s = get();
        if (!s.past.length) return;
        const prev = s.past[s.past.length - 1];
        set({
          ...prev,
          past: s.past.slice(0, -1),
          future: [snap(s), ...s.future].slice(0, UNDO_LIMIT),
        });
        resetEditCoalesce();
      },

      redo: () => {
        const s = get();
        if (!s.future.length) return;
        const next = s.future[0];
        set({
          ...next,
          past: pushPast(s),
          future: s.future.slice(1),
        });
        resetEditCoalesce();
      },

      ...createHistoryActions(set, get, pushPast),

      resetToInitialTemplate: () =>
        set((s) => ({
          blocks: createDefaultBlocks(),
          activeBlockId: null,
          expandedId: null,
          past: pushPast(s),
          future: [],
        })),

      clearAllData: () =>
        set((s) => {
          if (s.blocks.length === 0) return {};
          return {
            blocks: [],
            activeBlockId: null,
            expandedId: null,
            past: pushPast(s),
            future: [],
          };
        }),
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
