import { Layers, LayoutGrid } from "lucide-react";

export default function MobileNavbar({
  blocksCount,
  onBlocksClick,
  onPaletteClick,
  activeTab,
}) {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-lg shadow-black/5">
      <div className="flex items-center justify-around h-16 px-4 pb-safe">
        <button
          onClick={onBlocksClick}
          className={`flex flex-col items-center justify-center gap-1 w-full h-full rounded-lg transition-colors
            ${activeTab === "blocks" ? "text-black" : "text-gray-400 hover:text-gray-600"}`}
        >
          <div className="relative">
            <Layers size={20} />
            {blocksCount > 0 && (
              <span className="absolute -top-1 -right-2 flex items-center justify-center w-4 h-4 rounded-full bg-black text-white text-[9px] font-bold leading-none">
                {blocksCount}
              </span>
            )}
          </div>
          <span className="text-[11px] font-medium">Blocks</span>
        </button>

        <button
          onClick={onPaletteClick}
          className={`flex flex-col items-center justify-center gap-1 w-full h-full rounded-lg transition-colors
            ${activeTab === "palette" ? "text-black" : "text-gray-400 hover:text-gray-600"}`}
        >
          <LayoutGrid size={20} />
          <span className="text-[11px] font-medium">Palette</span>
        </button>
      </div>
    </nav>
  );
}