import { Layers } from "lucide-react";

export default function EmptyBlocks() {
  return (
    <div className="flex items-center justify-center h-full min-h-[300px] select-none">
      <div className="flex flex-col items-center text-center space-y-4 max-w-[200px]">
        <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-gray-100">
          <Layers size={20} className="text-gray-400" strokeWidth={1.5} />
        </div>
        <div className="space-y-1">
          <p className="text-[13px] font-medium text-gray-600">
            No blocks yet
          </p>
          <p className="text-[11px] text-gray-400 leading-relaxed">
            Click any icon on the left to add a block
          </p>
        </div>
      </div>
    </div>
  );
}
