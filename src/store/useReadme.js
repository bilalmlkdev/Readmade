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

export const BLOCKS_KEY = "readmade:blocks";
export const HISTORY_KEY = "readmade:history";
export const USER_KEY = "readmade:user";

const ADJECTIVES = ["Swift", "Bright", "Calm", "Bold", "Keen", "Wise", "Kind", "Pure", "True", "Cool"];
const NOUNS = ["Fox", "Owl", "Bear", "Hawk", "Wolf", "Deer", "Lynx", "Seal", "Crow", "Hare"];

function generateUsername() {
  const adj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
  const noun = NOUNS[Math.floor(Math.random() * NOUNS.length)];
  return `${adj} ${noun}`;
}

function getStoredUser() {
  try {
    const stored = localStorage.getItem(USER_KEY);
    if (stored) return JSON.parse(stored);
    const user = { name: generateUsername(), plan: "Free" };
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    return user;
  } catch {
    const user = { name: generateUsername(), plan: "Free" };
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    return user;
  }
}

function getStoredHistory() {
  try {
    const stored = localStorage.getItem(HISTORY_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

let _dupeCounter = 0;

export const useReadme = create(
  persist(
    (set, get) => ({
      blocks: DEFAULT_BLOCKS.map(createBlock),
      activeBlockId: null,
      expandedId: null,
      settings: {
        name: "README",
        description: "",
        author: "",
      },
      user: getStoredUser(),
      history: getStoredHistory(),

      updateSettings: (patch) =>
        set((s) => ({ settings: { ...s.settings, ...patch } })),

      toggleExpanded: (id) =>
        set((s) => ({ expandedId: s.expandedId === id ? null : id })),

      expandBlock: (id) => set({ expandedId: id }),

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

      removeBlocks: (ids) =>
        set((s) => ({
          blocks: s.blocks.filter((b) => !ids.includes(b.id)),
          activeBlockId: ids.includes(s.activeBlockId) ? null : s.activeBlockId,
          expandedId: ids.includes(s.expandedId) ? null : s.expandedId,
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

      deleteFromHistory: (id) => {
        set((s) => {
          const newHistory = s.history.filter((h) => h.id !== id);
          try {
            localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
          } catch { /* storage full */ }
          return { history: newHistory };
        });
      },

      resetToInitialTemplate: () => {
        set({
          blocks: DEFAULT_BLOCKS.map(createBlock),
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
