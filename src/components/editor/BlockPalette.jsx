import { useState } from "react";
import useReadme from "../../store/useReadme.js";
import { ALL_BLOCKS } from "../../data/blocks.js";
import {
  readPaletteMinimized,
  writePaletteMinimized,
} from "../../data/paletteState.js";
import PaletteHeader from "./PaletteHeader.jsx";
import PaletteFooter from "./PaletteFooter.jsx";
import BlockSearchPopup from "./BlockSearchPopup.jsx";

export default function BlockPalette() {
  const { addBlock } = useReadme();
  const [minimized, setMinimized] = useState(readPaletteMinimized);
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");

  function updateMinimized(value) {
    setMinimized(value);
    writePaletteMinimized(value);
  }

  function handleAddFromSearch(type) {
    addBlock(type);
    setShowSearch(false);
    setQuery("");
  }

  return (
    <div
      className={`w-full ${minimized ? "app:w-[60px]" : "app:w-[240px]"} flex flex-col bg-[#FAFAFB] dark:bg-[#111] h-full border border-gray-200 dark:border-white/10 rounded-lg transition-[width] duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]`}
      data-tour="sidebar"
    >
      <PaletteHeader
        minimized={minimized}
        onExpand={() => updateMinimized(false)}
        onMinimize={() => updateMinimized(true)}
      />

      <div className={`shrink-0 mt-3 ${minimized ? "px-1.5" : "px-1"}`}>
        {!minimized && (
          <div className="px-3 pb-1 shrink-0">
            <span className="text-[11.5px] font-medium text-gray-400 dark:text-gray-500">
              Select Blocks
            </span>
          </div>
        )}
        <div
          className={minimized ? "flex flex-col items-center gap-1" : "space-y-1"}
        >
          {ALL_BLOCKS.map((block) => {
            const Icon = block.icon;
            if (minimized) {
              return (
                <button
                  key={block.type}
                  onClick={() => addBlock(block.type)}
                  className="w-9 h-9 flex items-center justify-center text-gray-600 dark:text-gray-300 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 rounded-lg hover:bg-gray-50 dark:hover:bg-white/10 hover:border-gray-300 dark:hover:border-white/20 transition-colors"
                  title={`Add ${block.label}`}
                  aria-label={`Add ${block.label}`}
                >
                  <Icon size={16} className="shrink-0" />
                </button>
              );
            }
            return (
              <button
                key={block.type}
                onClick={() => addBlock(block.type)}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-[13.5px] text-gray-700 dark:text-gray-300 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 rounded-lg hover:bg-gray-50 dark:hover:bg-white/10 hover:border-gray-300 dark:hover:border-white/20 transition-colors"
              >
                <Icon size={16} className="shrink-0" />
                <span className="flex-1 text-left truncate">{block.label}</span>
                <span className="text-[11px] text-gray-400 shrink-0">
                  ({block.desc})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex-1 min-h-0" />

      <PaletteFooter
        minimized={minimized}
        onOpenSearch={() => setShowSearch(true)}
      />

      <BlockSearchPopup
        open={showSearch}
        query={query}
        onQueryChange={setQuery}
        onClose={() => setShowSearch(false)}
        onSelect={handleAddFromSearch}
      />
    </div>
  );
}
