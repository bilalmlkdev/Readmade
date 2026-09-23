import { useState, useRef, useEffect } from "react";
import useReadme from "../../store/useReadme.js";
import UserAccountPreview from "../ui/UserAccountPreview.jsx";
import { BLOCK_TYPES, BLOCK_META, BLOCK_ICONS } from "../../lib/blocks.js";
import { Search, PanelLeftClose, PanelLeftOpen, X } from "lucide-react";

const ALL_BLOCKS = Object.values(BLOCK_TYPES).map((type) => ({
  type,
  label: BLOCK_META[type].label,
  desc: BLOCK_META[type].desc,
  icon: BLOCK_ICONS[type],
}));

export default function BlockPalette() {
  const { addBlock } = useReadme();
  const [minimized, setMinimized] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (!showSearch) return;
    if (searchInputRef.current) searchInputRef.current.focus();
    const onKey = (e) => {
      if (e.key === "Escape") setShowSearch(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [showSearch]);

  const trimmedQuery = query.trim().toLowerCase();
  const filteredBlocks = trimmedQuery
    ? ALL_BLOCKS.filter(
        (b) =>
          b.label.toLowerCase().includes(trimmedQuery) ||
          b.desc.toLowerCase().includes(trimmedQuery),
      )
    : ALL_BLOCKS;

  function handleAddFromSearch(type) {
    addBlock(type);
    setShowSearch(false);
    setQuery("");
  }

  return (
    <div
      className={`w-full ${minimized ? "app:w-[60px]" : "app:w-[240px]"} flex flex-col bg-[#FAFAFB] h-full border border-gray-200 rounded-lg transition-[width] duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]`}
      data-tour="sidebar"
    >
      {/* Header */}
      <div
        className={`shrink-0 border-b border-gray-200 ${
          minimized ? "flex flex-col items-center gap-1 px-1.5 pt-3 pb-2" : "flex items-start justify-between gap-2 px-3 pt-3 pb-2"
        }`}
      >
        {minimized ? (
          <button
            type="button"
            onClick={() => setMinimized(false)}
            className="hidden app:flex p-1.5 rounded-lg text-gray-400 hover:text-black hover:bg-gray-100 transition-colors"
            title="Expand palette"
            aria-label="Expand palette"
          >
            <PanelLeftOpen size={14} />
          </button>
        ) : (
          <>
            <div className="min-w-0">
              <h2 className="text-[14px] font-semibold text-black">Field Types</h2>
              <p className="text-[11px] text-black/ mt-0.5">Click to add a field</p>
            </div>
            <button
              type="button"
              onClick={() => setMinimized(true)}
              className="hidden app:flex p-1.5 rounded-lg text-gray-400 hover:text-black hover:bg-gray-100 transition-colors shrink-0"
              title="Minimize palette"
              aria-label="Minimize palette"
            >
              <PanelLeftClose size={14} />
            </button>
          </>
        )}
      </div>

      {/* All Blocks */}
      <div className={`shrink-0 mt-3 ${minimized ? "px-1.5" : "px-1"}`}>
        {!minimized && (
          <div className="px-3 pb-1 shrink-0">
            <span className="text-[11.5px] font-medium text-gray-400">
             Select Blocks
            </span>
          </div>
        )}
        <div className={minimized ? "flex flex-col items-center gap-1" : "space-y-1"}>
          {ALL_BLOCKS.map((block) => {
            const Icon = block.icon;
            if (minimized) {
              return (
                <button
                  key={block.type}
                  onClick={() => addBlock(block.type)}
                  className="w-9 h-9 flex items-center justify-center text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-colors"
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
                className="w-full flex items-center gap-2.5 px-3 py-2 text-[13.5px] text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-colors"
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

      {/* Spacer */}
      <div className="flex-1 min-h-0" />

      {/* Bottom bar - user + search */}
      <div className="border-t border-gray-200 bg-white shrink-0">
        <div
          className={
            minimized
              ? "flex items-center justify-center py-2"
              : "flex items-center justify-between gap-2 py-1.5"
          }
        >
          {minimized ? (
            <UserAccountPreview avatarOnly />
          ) : (
            <>
              <UserAccountPreview />
              <div className="flex items-center gap-0.5 shrink-0">
                <button
                  type="button"
                  onClick={() => setShowSearch(true)}
                  className="p-1.5 relative right-1.5 top-[3px] rounded-lg text-gray-500 hover:text-black hover:bg-gray-100 transition-colors"
                  title="Search blocks"
                  aria-label="Search blocks"
                >
                  <Search size={15} />
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Search blocks popup */}
      {showSearch && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4 bg-black/40 animate-fade-in"
          onClick={() => setShowSearch(false)}
        >
          <div
            className="w-full max-w-[420px] bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 px-3 py-2.5 border-b border-gray-100">
              <Search size={15} className="text-gray-400 shrink-0" />
              <input
                ref={searchInputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search all blocks..."
                className="flex-1 min-w-0 text-[13px] outline-none placeholder:text-gray-400"
                aria-label="Search blocks"
              />
              <button
                type="button"
                onClick={() => setShowSearch(false)}
                className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors shrink-0"
                aria-label="Close search"
              >
                <X size={14} />
              </button>
            </div>

            <div
              className="max-h-[50vh] overflow-y-auto py-1.5"
              style={{ scrollbarWidth: "thin" }}
            >
              {filteredBlocks.length === 0 ? (
                <p className="px-3 py-8 text-center text-[13px] text-gray-400">
                  No blocks match “{query.trim()}”
                </p>
              ) : (
                filteredBlocks.map((block) => {
                  const Icon = block.icon;
                  return (
                    <button
                      key={block.type}
                      type="button"
                      onClick={() => handleAddFromSearch(block.type)}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-left hover:bg-gray-50 transition-colors"
                    >
                      <span className="w-7 h-7 flex items-center justify-center rounded-lg bg-gray-100 shrink-0">
                        <Icon size={14} className="text-gray-500" />
                      </span>
                      <span className="flex-1 min-w-0">
                        <span className="block text-[13px] font-medium text-gray-800 truncate">
                          {block.label}
                        </span>
                        <span className="block text-[11px] text-gray-400 truncate">
                          {block.desc}
                        </span>
                      </span>
                      <span className="text-[11px] text-gray-300 shrink-0">
                        Add
                      </span>
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
