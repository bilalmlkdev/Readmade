import { Check, Code2, Eye, CopySlash, Download } from "lucide-react";

const TABS = [
  { id: "preview", icon: <Eye size={17} />, label: "Preview" },
  { id: "code", icon: <Code2 size={17} />, label: "Code" },
];

/* Action button */
function ActionBtn({ onClick, done, doneLabel, idleLabel, icon }) {
  return (
    <div className="border-[1.5px] border-[#EFEEEB] rounded-[8px] flex items-center justify-between">
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        className="flex items-center gap-2 px-2 py-[4px] text-[11px]"
      >
        <span>{done ? doneLabel : idleLabel}</span>
      </button>
      <div className="h-9 w-[0.5px] bg-[#EFEEEB] mx-2 relative right-2" />
      <span className="relative right-2 top-[2px] w-4 h-4 rounded-full">
        {" "}
        {done ? <Check size={11} strokeWidth={2.5} /> : icon}
      </span>
    </div>
  );
}

export default function PreviewToolbar({
  activeTab,
  onTabChange,
  copied,
  downloading,
  onCopy,
  onDownload,
}) {
  return (
    <div className="sticky top-0 z-10 flex-shrink-0 border-b border-gray-200 bg-white px-4 py-2.5 flex flex-col items-start gap-2">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-3">
          <div className="flex items-center p-[1px] rounded-[10px] border border-gray-200 bg-[#EFEEEB]">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  onTabChange(tab.id);
                }}
                type="button"
                aria-pressed={activeTab === tab.id}
                className={`
                  flex items-center gap-1.5 px-[10px] py-[6px] rounded-[9px]
                   transition-all duration-200
                  ${activeTab === tab.id ? "bg-white! text-black! shadow-sm font-semibold" : "text-gray-500 hover:text-gray-700"}
                `}
              >
                {tab.icon}
                <span className="hidden sm:inline text-[11px]">
                  {tab.label}
                </span>
              </button>
            ))}
          </div>
          <span className="text-[14px] tracking-tight text hidden sm:block">
            <span>README</span> <span className="relative bottom-1">.</span>{" "}
            &nbsp;
            <span className="text-gray-400">
              {activeTab === "preview" ? "Preview" : "Code"}
            </span>
          </span>
        </div>
        <div className="action-toolbar flex items-center gap-2 flex-wrap justify-end">
          <div className="w-px h-4 bg-white/[0.07] mx-1" />
          <ActionBtn
            onClick={onCopy}
            done={copied}
            idleLabel="Copy"
            doneLabel="Copied!"
            icon={<CopySlash size={11} />}
          />
          <ActionBtn
            onClick={onDownload}
            done={downloading}
            idleLabel="Download"
            doneLabel="Saved!"
            icon={<Download size={11} />}
          />
        </div>
      </div>
    </div>
  );
}