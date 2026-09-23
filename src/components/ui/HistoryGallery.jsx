import { useState } from "react";
import { useReadme } from "../../store/useReadme.js";
import { formatTime } from "../../lib/formatTime.js";
import { X, FolderClosed, Trash2 } from "lucide-react";
import ConfirmDialog from "./ConfirmDialog.jsx";

export default function HistoryGallery({ onClose }) {
  const { history, loadFromHistory, clearHistory } = useReadme();
  const [pendingEntry, setPendingEntry] = useState(null);
  const [confirmClear, setConfirmClear] = useState(false);

  function handleConfirm() {
    if (!pendingEntry) return;
    loadFromHistory(pendingEntry.id);
    setPendingEntry(null);
    onClose?.();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 dark:bg-black/60 backdrop-blur-sm" onClick={onClose}
    >
      <div
        className="relative bg-white dark:bg-[#161616] rounded-2xl shadow-2xl shadow-black/10 border border-gray-200 dark:border-white/10 max-w-[560px] w-full mx-4 max-h-[80vh] flex flex-col animate-slide-up" onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-white/10 shrink-0">
          <div>
            <h2 className="text-[15px] font-semibold text-black dark:text-white">
              History
            </h2>
            <p className="text-[12px] text-gray-400 dark:text-gray-500 mt-0.5">
              Restore a previous version of your readme
            </p>
          </div>
          <div className="flex items-center gap-1">
            {history.length > 0 && (
              <button
                onClick={() => setConfirmClear(true)}
                className="flex items-center gap-1.5 px-2 py-1.5 text-[12px] font-medium text-gray-500 dark:text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg" title="Clear history"
              >
                <Trash2 size={13} />
                Clear
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-white/10" aria-label="Close history"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        <div
          className="flex-1 overflow-y-auto p-3 space-y-1.5" style={{ scrollbarWidth: "thin" }}
        >
          {history.length === 0 ? (
            <div className="px-4 py-10 text-center">
              <p className="text-[13px] text-gray-400 dark:text-gray-500">
                No history yet
              </p>
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
                  <FolderClosed
                    size={16}
                    className="text-gray-500 dark:text-gray-300"
                  />
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
          <ConfirmDialog
            title="Restore this version?" description={`Loading "${pendingEntry.title}" will replace all your current fields. This cannot be undone.`}
            confirmLabel="Restore" titleId="history-confirm-title" descId="history-confirm-desc" onConfirm={handleConfirm}
            onCancel={() => setPendingEntry(null)}
          />
        )}

        {confirmClear && (
          <ConfirmDialog
            title="Clear all history?" description="This permanently removes every saved version. This cannot be undone." confirmLabel="Clear" titleId="history-clear-title" descId="history-clear-desc" onConfirm={() => {
              clearHistory();
              setConfirmClear(false);
            }}
            onCancel={() => setConfirmClear(false)}
          />
        )}
      </div>
    </div>
  );
}
