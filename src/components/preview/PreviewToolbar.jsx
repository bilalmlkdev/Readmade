const TABS = [
  { id: "preview", label: "Preview" },
  { id: "code", label: "Code" },
];

function ActionBtn({ onClick, done, doneLabel, idleLabel }) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className="px-3 py-1.5 text-[12px] font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
    >
      {done ? doneLabel : idleLabel}
    </button>
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
    <div className="sticky top-0 z-10 flex-shrink-0 border-b border-gray-200 bg-white px-4 py-2.5 flex items-center justify-between overflow-hidden">
      <div className="flex items-center gap-4 min-w-0">
        <div className="flex items-center gap-0.5 rounded-lg border border-gray-200 bg-gray-50 p-0.5">
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
                px-3 py-1.5 rounded-md text-[12px] font-medium transition-all duration-200
                ${activeTab === tab.id ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}
              `}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <span className="text-[13px] text-gray-400 hidden sm:block">
          README <span className="text-gray-300">·</span>{" "}
          {activeTab === "preview" ? "Preview" : "Code"}
        </span>
      </div>

      <div className="flex items-center gap-1">
        <ActionBtn
          onClick={onCopy}
          done={copied}
          idleLabel="Copy"
          doneLabel="Copied!"
        />
        <ActionBtn
          onClick={onDownload}
          done={downloading}
          idleLabel="Download"
          doneLabel="Saved!"
        />
      </div>
    </div>
  );
}
