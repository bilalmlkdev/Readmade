import { useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { filterPaletteBlocks } from "../../data/blocks.js";

export default function BlockSearchPopup({
  open,
  query,
  onQueryChange,
  onClose,
  onSelect,
}) {
  const searchInputRef = useRef(null);
  const filteredBlocks = filterPaletteBlocks(query);

  useEffect(() => {
    if (!open) return;
    if (searchInputRef.current) searchInputRef.current.focus();
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4 bg-black/40 dark:bg-black/60 animate-fade-in" onClick={onClose}
    >
      <div
        className="w-full max-w-[420px] bg-white dark:bg-[#161616] rounded-xl shadow-xl border border-gray-200 dark:border-white/10 overflow-hidden animate-slide-up" onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 px-3 py-2.5 border-b border-gray-100 dark:border-white/10">
          <Search size={15} className="text-gray-400 shrink-0" />
          <input
            ref={searchInputRef}
            type="text" value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search all blocks..." className="flex-1 min-w-0 text-[13px] outline-none placeholder:text-gray-400 bg-transparent dark:text-white" aria-label="Search blocks"
          />
          <button
            type="button" onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded shrink-0" aria-label="Close search"
          >
            <X size={14} />
          </button>
        </div>

        <div
          className="max-h-[50vh] overflow-y-auto py-1.5" style={{ scrollbarWidth: "thin" }}
        >
          {filteredBlocks.length === 0 ? (
            <p className="px-3 py-8 text-center text-[13px] text-gray-400">
              No blocks match "{query.trim()}"
            </p>
          ) : (
            filteredBlocks.map((block) => {
              const Icon = block.icon;
              return (
                <button
                  key={block.type}
                  type="button" onClick={() => onSelect(block.type)}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-left hover:bg-gray-50 dark:hover:bg-white/5"
                >
                  <span className="w-7 h-7 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-white/10 shrink-0">
                    <Icon
                      size={14}
                      className="text-gray-500 dark:text-gray-400"
                    />
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block text-[13px] font-medium text-gray-800 dark:text-gray-100 truncate">
                      {block.label}
                    </span>
                    <span className="block text-[11px] text-gray-400 truncate">
                      {block.desc}
                    </span>
                  </span>
                  <span className="text-[11px] text-gray-300 dark:text-gray-600 shrink-0">
                    Add
                  </span>
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
