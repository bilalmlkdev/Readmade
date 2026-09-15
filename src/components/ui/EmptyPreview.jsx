import { FileText } from "lucide-react";

export default function EmptyPreview({ activeTab }) {
  return (
    <div className="flex-1 flex items-center justify-center h-full min-h-[300px] select-none px-4">
      <div className="flex flex-col items-center text-center space-y-5 max-w-[260px]">
        <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-gray-100 border border-gray-200">
          <FileText size={20} className="text-gray-400" strokeWidth={1.5} />
        </div>

        <div className="space-y-1.5">
          <p className="text-[14px] font-medium text-gray-700">
            {activeTab === "preview" ? "Nothing to preview" : "No code yet"}
          </p>
          <p className="text-[12px] text-gray-400 leading-relaxed">
            {activeTab === "preview"
              ? "Add blocks on the left and your README preview will appear here."
              : "Your generated Markdown will appear here once you add blocks."}
          </p>
        </div>
      </div>
    </div>
  );
}
