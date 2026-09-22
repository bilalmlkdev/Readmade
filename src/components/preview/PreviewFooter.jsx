import { Camera } from "lucide-react";

function StatChip({ icon, label }) {
  return (
    <div className="flex items-center gap-1.5 py-1 rounded-md bg-transparent text-gray-500">
      {icon}
      <span className="text-[12px]">{label}</span>
    </div>
  );
}

export default function PreviewFooter({ kbSize, validScreenshots, wordCount }) {
  return (
    <div className="border-t border-gray-200 sticky bottom-0 bg-[#FAFAFB] px-3 py-2 flex items-center justify-between gap-4 text-[9px] sm:text-[10px] text-gray-500 font-bold">
      <div className="flex items-center w-full gap-4 sm:gap-9">
        <div className="flex items-center gap-1.5">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <span>Updated {new Date().toLocaleTimeString()}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M4 7h16M4 12h16M4 17h10" />
          </svg>
          <span>~{kbSize} KB</span>
        </div>
      </div>
      <div className="flex items-center justify-end gap-2 px-1 w-full">
        <StatChip
          icon={<Camera size={14} />}
          label={`${validScreenshots.length} img`}
        />
        <StatChip
          icon={
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M4 7h16M4 12h16M4 17h10" />
            </svg>
          }
          label={`${wordCount} words`}
        />
      </div>
    </div>
  );
}
