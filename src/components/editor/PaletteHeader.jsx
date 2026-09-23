import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

export default function PaletteHeader({ minimized, onExpand, onMinimize }) {
  if (minimized) {
    return (
      <div className="shrink-0 border-b border-gray-200 dark:border-white/10 flex flex-col items-center gap-1 px-1.5 pt-3 pb-2">
        <button
          type="button" onClick={onExpand}
          className="hidden app:flex p-1.5 rounded-lg text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10" title="Expand palette" aria-label="Expand palette"
        >
          <PanelLeftOpen size={14} />
        </button>
      </div>
    );
  }

  return (
    <div className="shrink-0 border-b border-gray-200 dark:border-white/10 flex items-start justify-between gap-2 px-3 pt-3 pb-2">
      <div className="min-w-0">
        <h2 className="text-[14px] font-semibold text-black dark:text-white">
          Field Types
        </h2>
        <p className="text-[11px] text-black/50 dark:text-white/50 mt-0.5">
          Click to add a field
        </p>
      </div>
      <button
        type="button" onClick={onMinimize}
        className="hidden app:flex p-1.5 rounded-lg text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 shrink-0" title="Minimize palette" aria-label="Minimize palette"
      >
        <PanelLeftClose size={14} />
      </button>
    </div>
  );
}
