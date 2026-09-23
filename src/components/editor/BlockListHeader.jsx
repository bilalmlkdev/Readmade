import { useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { CgTemplate } from "react-icons/cg";

export default function BlockListHeader({
  blockCount,
  showSearch,
  onToggleSearch,
  onOpenTemplates,
  search,
  onSearchChange,
  onCloseSearch,
}) {
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (showSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showSearch]);

  return (
    <div className="px-3 py-2.5 border-b border-gray-200 dark:border-white/10 shrink-0">
      <div className="flex items-center justify-between">
        <div className="flex flex-row gap-2">
          <h2 className="text-[14px] font-semibold text-black dark:text-white">
            Blocks
          </h2>
          <p className="text-xs text-black dark:text-white/70 mt-0.5">
            ({blockCount} {blockCount === 1 ? "block" : "blocks"})
          </p>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={onToggleSearch}
            className={`flex items-center gap-1 px-2 py-1.5 text-[12px] font-medium rounded-lg transition-colors bg-white dark:bg-[#1a1a1a] ${
              showSearch
                ? "text-black dark:text-white bg-gray-100 dark:bg-white/10"
                : "text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10"
            }`}
          >
            <Search size={14} />
          </button>
          <button
            onClick={onOpenTemplates}
            className="flex items-center gap-1 px-2 py-1 text-[12px] font-medium text-black dark:text-white bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
            title="Templates"
          >
            <CgTemplate size={15} />
            Templates
          </button>
        </div>
      </div>

      {showSearch && (
        <div className="relative animate-slide-down mt-2">
          <div className="flex items-center gap-2">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search blocks..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              className="flex-1 pl-2 pr-3 py-2 text-[13px] bg-gray-100 dark:bg-white/5 dark:text-white border border-gray-200 dark:border-white/10 rounded-lg placeholder:text-gray-400 focus:outline-none focus:border-gray-300 focus:bg-white dark:focus:bg-[#1a1a1a] transition-colors"
            />
            <button
              onClick={onCloseSearch}
              className="text-gray-400 hover:text-gray-600 transition-colors shrink-0"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
