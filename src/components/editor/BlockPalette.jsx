import { useState, useRef, useEffect } from "react";
import useReadme from "../../store/useReadme.js";
import UserAccountPreview from "../ui/UserAccountPreview.jsx";
import { BLOCK_TYPES, BLOCK_META, BLOCK_ICONS } from "../../lib/blocks.js";
import {
  FolderClosed,
  Palette,
  Command,
} from "lucide-react";

const ALL_BLOCKS = Object.values(BLOCK_TYPES).map((type) => ({
  type,
  label: BLOCK_META[type].label,
  desc: BLOCK_META[type].desc,
  icon: BLOCK_ICONS[type],
}));

export default function BlockPalette({ onOpenTemplates }) {
  const { history, loadFromHistory, addBlock } = useReadme();
  const [showCommandMenu, setShowCommandMenu] = useState(false);
  const commandRef = useRef(null);

  useEffect(() => {
    if (!showCommandMenu) return;
    const handleClick = (e) => {
      if (commandRef.current && !commandRef.current.contains(e.target)) setShowCommandMenu(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showCommandMenu]);

  const formatTime = (iso) => {
    const date = new Date(iso);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  return (
    <div
      className="w-[240px] flex flex-col bg-[#FAFAFB] h-full border border-gray-200 rounded-lg"
      data-tour="sidebar"
    >
      {/* Header */}
      <div className="flex items-start px-3 pt-3 pb-2 shrink-0 border-b border-gray-200">
        <div>
          <h2 className="text-[14px] font-semibold text-black">Field Types</h2>
          <p className="text-[11px] text-black/ mt-0.5">Click to add a field</p>
        </div>
      </div>

      {/* All Blocks */}
      <div className="px-1 shrink-0 mt-3">
        <div className="px-3 pb-1 shrink-0">
          <span className="text-[11.5px] font-medium text-gray-400">
           Select Blocks
          </span>
        </div>
        <div className="space-y-1">
          {ALL_BLOCKS.map((block) => {
            const Icon = block.icon;
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

      {/* History */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="px-3 pt-3 pb-1 shrink-0">
          <span className="text-[11.5px] font-medium text-gray-400">
            History
          </span>
        </div>

        <div
          className="flex-1 overflow-y-auto px-1 pb-2"
          style={{ scrollbarWidth: "thin" }}
        >
          {history.length > 0 ? (
            <div className="space-y-0.5">
              {history.map((entry) => (
                <div
                  key={entry.id}
                  className="group flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                  onClick={() => loadFromHistory(entry.id)}
                >
                  <FolderClosed size={16} className="text-gray-400 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] text-gray-700 truncate">
                      {entry.title}
                    </p>
                    <p className="text-[10.5px] text-gray-400">
                      {entry.blockCount} blocks · {formatTime(entry.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="px-3 py-4 text-center">
              <p className="text-[12px] text-gray-300">No history yet</p>
            </div>
          )}
        </div>
      </div>

      {/* Palettes footer link */}
      <div className="h-10 flex items-center border-t border-gray-200 shrink-0">
        <button
          onClick={onOpenTemplates}
          className="w-full flex items-center gap-2.5 px-3 py-2 text-[13.5px] text-black bg-white transition-colors"
        >
          <Palette size={16} className="shrink-0" />
          Palettes
        </button>
      </div>

      {/* Bottom bar - user + command */}
      <div className="border-t border-gray-200 bg-white shrink-0">
        <div className="flex items-center justify-between gap-2 py-1.5">
          <UserAccountPreview />
          <div className="relative shrink-0" ref={commandRef}>
            <button
              onClick={() => setShowCommandMenu(!showCommandMenu)}
              className={`p-1.5 rounded-lg mr-1 transition-colors ${
                showCommandMenu
                  ? "text-black bg-gray-100"
                  : "text-gray-500 hover:text-black hover:bg-gray-100"
              }`}
              title="Keyboard shortcuts"
            >
              <Command size={15} />
            </button>

            {showCommandMenu && (
              <div className="absolute bottom-full left-0 mb-2 w-64 bg-white border border-gray-200 rounded-xl shadow-lg shadow-black/8 overflow-hidden z-50">
                <div className="px-3 py-2.5 border-b border-gray-100">
                  <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">
                    Keyboard Shortcuts
                  </p>
                </div>
                <div className="py-1.5">
                  {[
                    { keys: ["⌘", "S"], desc: "Download" },
                    { keys: ["⌘", "⇧", "C"], desc: "Copy Markdown" },
                    { keys: ["⌘", "/"], desc: "Search" },
                    { keys: ["⌘", "⇧", "P"], desc: "Command Palette" },
                    { keys: ["⌘", "⇧", "R"], desc: "Reset" },
                  ].map((s) => (
                    <div
                      key={s.desc}
                      className="flex items-center justify-between px-3 py-2 hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-[12px] text-gray-600">
                        {s.desc}
                      </span>
                      <div className="flex items-center gap-1">
                        {s.keys.map((k, i) => (
                          <span
                            key={i}
                            className="flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded bg-gray-100 text-[10px] font-medium text-gray-500 font-mono"
                          >
                            {k}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
