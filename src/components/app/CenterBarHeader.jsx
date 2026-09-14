import { HelpCircle, RefreshCw } from "lucide-react";

export default function CenterBarHeader({ onReset, onRestartTour }) {
  return (
    <div className="px-4 pt-3.5 pb-2.5 flex items-center gap-1.5 shrink-0 border-b border-gray-100">
      <p className="text-[15px] font-medium text-gray-800">
        Your README blocks
      </p>

      <div className="ml-auto flex items-center gap-1">
        <button
          onClick={onRestartTour}
          title="How it works"
          className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[12px] font-medium text-gray-500 hover:text-black hover:bg-gray-100 border border-transparent hover:border-gray-200 transition-colors"
        >
          <HelpCircle size={14} />
          <span className="hidden sm:inline">How it works</span>
        </button>
        <button
          onClick={onReset}
          title="Reset workspace"
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[12px] font-medium text-gray-500 hover:text-black hover:bg-gray-100 border border-transparent hover:border-gray-200 transition-colors"
        >
          <RefreshCw size={14} />
          <span className="hidden sm:inline">Reset</span>
        </button>
      </div>
    </div>
  );
}