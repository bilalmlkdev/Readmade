import { Layers, LayoutGrid } from "lucide-react";

export default function MobileNavbar({
  blocksCount,
  onBlocksClick,
  onPaletteClick,
  activeTab,
}) {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200">
      <div className="flex items-center justify-around h-14 px-4 pb-safe">
        <button
          onClick={onBlocksClick}
          className={`flex flex-col items-center justify-center gap-0.5 w-full h-full transition-colors
            ${activeTab === "arranger" ? "text-black" : "text-gray-400 hover:text-gray-600"}`}
        >
          <div className="relative">
            <Layers size={18} strokeWidth={activeTab === "arranger" ? 2 : 1.5} />
            {blocksCount > 0 && (
              <span className="absolute -top-1 -right-2.5 flex items-center justify-center min-w-[16px] h-4 px-1 rounded-full bg-black text-white text-[9px] font-semibold leading-none">
                {blocksCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium">Blocks</span>
        </button>

        <button
          onClick={onPaletteClick}
          className={`flex flex-col items-center justify-center gap-0.5 w-full h-full transition-colors
            ${activeTab === "palette" ? "text-black" : "text-gray-400 hover:text-gray-600"}`}
        >
          <LayoutGrid size={18} strokeWidth={activeTab === "palette" ? 2 : 1.5} />
          <span className="text-[10px] font-medium">Palette</span>
        </button>
      </div>
    </nav>
  );
}
