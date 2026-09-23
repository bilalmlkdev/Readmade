import { useState, useRef } from "react";
import useReadme from "../../store/useReadme.js";
import { ALL_BLOCKS, groupBlocks } from "../../data/blocks.js";
import {
  readPaletteMinimized,
  writePaletteMinimized,
} from "../../data/paletteState.js";
import useScrollVisible from "../../hooks/useScrollVisible.js";
import PaletteHeader from "./PaletteHeader.jsx";

export default function BlockPalette() {
  const { addBlock } = useReadme();
  const [minimized, setMinimized] = useState(readPaletteMinimized);
  const [scrolled, setScrolled] = useState(false);
  const [atBottom, setAtBottom] = useState(false);
  const listRef = useRef(null);
  const { showing: scrollbarVisible, onScroll: onScrollbarScroll } =
    useScrollVisible();
  const sections = groupBlocks(ALL_BLOCKS);

  function updateMinimized(value) {
    setMinimized(value);
    writePaletteMinimized(value);
  }

  function handleScroll(e) {
    const el = e.currentTarget;
    setScrolled(el.scrollTop > 4);
    setAtBottom(el.scrollHeight - el.scrollTop - el.clientHeight <= 4);
    onScrollbarScroll();
  }

  if (minimized) {
    return (
      <div
        className="w-full app:w-[60px] flex flex-col bg-[#FAFAFB] dark:bg-[#111] h-full border border-gray-200 dark:border-white/10 rounded-lg transition-[width] duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]"
      >
        <PaletteHeader
          minimized={minimized}
          onExpand={() => updateMinimized(false)}
          onMinimize={() => updateMinimized(true)}
        />
        <div className="shrink-0 mt-3 px-1.5 flex flex-col items-center gap-1">
          {ALL_BLOCKS.map((block) => {
            const Icon = block.icon;
            return (
              <button
                key={block.type}
                onClick={() => addBlock(block.type)}
                className="w-9 h-9 flex items-center justify-center text-gray-600 dark:text-gray-300 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 rounded-lg hover:bg-gray-50 dark:hover:bg-white/10 hover:border-gray-300 dark:hover:border-white/20"
                title={`Add ${block.label}`}
                aria-label={`Add ${block.label}`}
              >
                <Icon size={16} className="shrink-0" />
              </button>
            );
          })}
        </div>
        <div className="flex-1 min-h-0" />
      </div>
    );
  }

  return (
    <div
      className="w-full app:w-[240px] flex flex-col bg-[#FAFAFB] dark:bg-[#111] h-full border border-gray-200 dark:border-white/10 rounded-lg"
    >
      <PaletteHeader
        minimized={minimized}
        onExpand={() => updateMinimized(false)}
        onMinimize={() => updateMinimized(true)}
      />

      <div className="relative flex-1 min-h-0 mt-3">
        <div
          ref={listRef}
          onScroll={handleScroll}
          className={`h-full overflow-y-auto px-1 pb-4 scroll-hide ${
            scrollbarVisible ? "scroll-hide-show" : ""
          }`}
        >
          <div className="space-y-3">
            {sections.map((section) => (
              <div key={section.group}>
                <div className="px-3 pb-1.5">
                  <span className="text-[11.5px] font-medium text-gray-400 dark:text-gray-500">
                    {section.group}
                  </span>
                </div>
                <div className="space-y-1">
                  {section.items.map((block) => {
                    const Icon = block.icon;
                    return (
                      <button
                        key={block.type}
                        onClick={() => addBlock(block.type)}
                        className="w-full flex items-stretch text-left bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 rounded-lg shadow-xs hover:bg-gray-50 hover:border-gray-300 dark:hover:bg-white/10 dark:hover:border-white/20 overflow-hidden"
                        title={`Add ${block.label}`}
                      >
                        <span className="w-10 flex items-center justify-center shrink-0 text-gray-500 dark:text-gray-400">
                          <Icon size={15} />
                        </span>
                        <span className="w-px self-stretch bg-gray-100 dark:bg-white/10 shrink-0" />
                        <span className="flex-1 min-w-0 px-3 py-2">
                          <span className="block text-[13.5px] font-semibold text-gray-900 dark:text-gray-100 truncate leading-tight">
                            {block.label}
                          </span>
                          <span className="block text-[12px] text-gray-400 dark:text-gray-500 truncate leading-snug mt-0.5">
                            {block.desc}
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-[#FAFAFB] via-[#FAFAFB]/85 to-transparent dark:from-[#111] dark:via-[#111]/85 transition-opacity duration-200 ${
            scrolled ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#FAFAFB] via-[#FAFAFB]/85 to-transparent dark:from-[#111] dark:via-[#111]/85 transition-opacity duration-200 ${
            atBottom ? "opacity-0" : "opacity-100"
          }`}
        />
      </div>
    </div>
  );
}
