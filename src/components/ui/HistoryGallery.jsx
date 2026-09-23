import { useState } from "react";
import { useReadme } from "../../store/useReadme.js";
import { X, FolderClosed } from "lucide-react";

function formatTime(iso) {
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
}

export default function HistoryGallery({ onClose }) {
  const { history, loadFromHistory } = useReadme();
  const [pendingEntry, setPendingEntry] = useState(null);

  const handleConfirm = () => {
    if (!pendingEntry) return;
    loadFromHistory(pendingEntry.id);
    setPendingEntry(null);
    onClose?.();
  };

  const handleCancel = (e) => {
    e?.stopPropagation?.();
    setPendingEntry(null);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl shadow-2xl shadow-black/10 border border-gray-200 max-w-[560px] w-full mx-4 max-h-[80vh] flex flex-col animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 shrink-0">
          <div>
            <h2 className="text-[15px] font-semibold text-black">History</h2>
            <p className="text-[12px] text-gray-400 mt-0.5">
              Restore a previous version of your readme
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Close history"
          >
            <X size={16} />
          </button>
        </div>

        <div
          className="flex-1 overflow-y-auto p-3 space-y-1.5"
          style={{ scrollbarWidth: "thin" }}
        >
          {history.length === 0 ? (
            <div className="px-4 py-10 text-center">
              <p className="text-[13px] text-gray-400">No history yet</p>
              <p className="text-[12px] text-gray-300 mt-1">
                Autosaved versions of your readme will appear here.
              </p>
            </div>
          ) : (
            history.map((entry) => (
              <button
                key={entry.id}
                onClick={() => setPendingEntry(entry)}
                className="w-full px-4 py-3 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all text-left flex items-center gap-3.5"
              >
                <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                  <FolderClosed size={16} className="text-gray-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[13px] font-medium text-gray-900 truncate">
                    {entry.title}
                  </h3>
                  <p className="text-[12px] text-gray-400 mt-0.5">
                    {entry.blockCount} blocks · {formatTime(entry.timestamp)}
                  </p>
                </div>
                <span className="text-[11px] text-gray-400 shrink-0">
                  Restore
                </span>
              </button>
            ))
          )}
        </div>

        {pendingEntry && (
          <div
            className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 backdrop-blur-[2px] rounded-2xl p-4"
            onClick={handleCancel}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="history-confirm-title"
              aria-describedby="history-confirm-desc"
              className="bg-white rounded-xl shadow-2xl shadow-black/10 border border-gray-200 max-w-[360px] w-full p-5"
              onClick={(e) => e.stopPropagation()}
            >
              <h3
                id="history-confirm-title"
                className="text-[15px] font-semibold text-gray-900 mb-1.5"
              >
                Restore this version?
              </h3>
              <p
                id="history-confirm-desc"
                className="text-gray-500 text-[13px] leading-relaxed mb-5"
              >
                Loading “{pendingEntry.title}” will replace all your current
                fields. This cannot be undone.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={handleCancel}
                  className="flex-1 px-4 py-2 text-[13px] font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirm}
                  className="flex-1 px-4 py-2 text-[13px] font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  Restore
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
