import { useState } from "react";
import { useReadme } from "../../store/useReadme.js";
import { X, FolderClosed, Trash2 } from "lucide-react";

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
  const { history, loadFromHistory, clearHistory } = useReadme();
  const [pendingEntry, setPendingEntry] = useState(null);
  const [confirmClear, setConfirmClear] = useState(false);

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

  const handleClearConfirm = () => {
    clearHistory();
    setConfirmClear(false);
  };

  const handleClearCancel = (e) => {
    e?.stopPropagation?.();
    setConfirmClear(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 dark:bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-white dark:bg-[#161616] rounded-2xl shadow-2xl shadow-black/10 border border-gray-200 dark:border-white/10 max-w-[560px] w-full mx-4 max-h-[80vh] flex flex-col animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-white/10 shrink-0">
          <div>
            <h2 className="text-[15px] font-semibold text-black dark:text-white">History</h2>
            <p className="text-[12px] text-gray-400 dark:text-gray-500 mt-0.5">
              Restore a previous version of your readme
            </p>
          </div>
          <div className="flex items-center gap-1">
            {history.length > 0 && (
              <button
                onClick={() => setConfirmClear(true)}
                className="flex items-center gap-1.5 px-2 py-1.5 text-[12px] font-medium text-gray-500 dark:text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                title="Clear history"
              >
                <Trash2 size={13} />
                Clear
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
              aria-label="Close history"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        <div
          className="flex-1 overflow-y-auto p-3 space-y-1.5"
          style={{ scrollbarWidth: "thin" }}
        >
          {history.length === 0 ? (
            <div className="px-4 py-10 text-center">
              <p className="text-[13px] text-gray-400 dark:text-gray-500">No history yet</p>
              <p className="text-[12px] text-gray-300 dark:text-gray-600 mt-1">
                Autosaved versions of your readme will appear here.
              </p>
            </div>
          ) : (
            history.map((entry) => (
              <button
                key={entry.id}
                onClick={() => setPendingEntry(entry)}
                className="w-full px-4 py-3 rounded-xl border border-gray-100 dark:border-white/10 hover:border-gray-200 dark:hover:border-white/20 hover:bg-gray-50 dark:hover:bg-white/5 transition-all text-left flex items-center gap-3.5"
              >
                <div className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-white/10 flex items-center justify-center shrink-0">
                  <FolderClosed size={16} className="text-gray-500 dark:text-gray-300" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[13px] font-medium text-gray-900 dark:text-white truncate">
                    {entry.title}
                  </h3>
                  <p className="text-[12px] text-gray-400 dark:text-gray-500 mt-0.5">
                    {entry.blockCount} blocks · {formatTime(entry.timestamp)}
                  </p>
                </div>
                <span className="text-[11px] text-gray-400 dark:text-gray-500 shrink-0">
                  Restore
                </span>
              </button>
            ))
          )}
        </div>

        {pendingEntry && (
          <div
            className="absolute inset-0 z-10 flex items-center justify-center bg-black/50 rounded-2xl p-4"
            onClick={handleCancel}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="history-confirm-title"
              aria-describedby="history-confirm-desc"
              className="bg-white dark:bg-[#161616] rounded-xl shadow-2xl shadow-black/10 border border-gray-200 dark:border-white/10 max-w-[360px] w-full p-5"
              onClick={(e) => e.stopPropagation()}
            >
              <h3
                id="history-confirm-title"
                className="text-[15px] font-semibold text-gray-900 dark:text-white mb-1.5"
              >
                Restore this version?
              </h3>
              <p
                id="history-confirm-desc"
                className="text-gray-500 dark:text-gray-400 text-[13px] leading-relaxed mb-5"
              >
                Loading “{pendingEntry.title}” will replace all your current
                fields. This cannot be undone.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={handleCancel}
                  className="flex-1 px-4 py-2 text-[13px] font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/15 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirm}
                  className="flex-1 px-4 py-2 text-[13px] font-medium text-white bg-gray-900 dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-white/90 rounded-lg transition-colors"
                >
                  Restore
                </button>
              </div>
            </div>
          </div>
        )}

        {confirmClear && (
          <div
            className="absolute inset-0 z-10 flex items-center justify-center bg-black/50 rounded-2xl p-4"
            onClick={handleClearCancel}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="history-clear-title"
              aria-describedby="history-clear-desc"
              className="bg-white dark:bg-[#161616] rounded-xl shadow-2xl shadow-black/10 border border-gray-200 dark:border-white/10 max-w-[360px] w-full p-5"
              onClick={(e) => e.stopPropagation()}
            >
              <h3
                id="history-clear-title"
                className="text-[15px] font-semibold text-gray-900 dark:text-white mb-1.5"
              >
                Clear all history?
              </h3>
              <p
                id="history-clear-desc"
                className="text-gray-500 dark:text-gray-400 text-[13px] leading-relaxed mb-5"
              >
                This permanently removes every saved version. This cannot be
                undone.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={handleClearCancel}
                  className="flex-1 px-4 py-2 text-[13px] font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/15 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleClearConfirm}
                  className="flex-1 px-4 py-2 text-[13px] font-medium text-white bg-gray-900 dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-white/90 rounded-lg transition-colors"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
