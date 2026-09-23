import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Trash2,
  History,
  Undo2,
  Redo2,
  Check,
  Loader2,
  Search,
} from "lucide-react";
import { REPO_URL } from "../../lib/repo.js";
import { formatStars } from "../../lib/formatStars.js";
import ThemeToggle from "../ui/ThemeToggle.jsx";
import UserAccountPreview from "../ui/UserAccountPreview.jsx";

const iconBtn =
  "flex items-center justify-center p-1.5 rounded-lg text-gray-500 hover:text-black hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-white/10 disabled:opacity-35 disabled:pointer-events-none";

const rightBtn =
  "flex items-center gap-1.5 px-2 py-1.5 text-[13px] font-medium rounded-lg bg-white border border-gray-300 shadow-xs hover:bg-gray-50 dark:bg-[#1a1a1a] dark:border-white/20 dark:hover:bg-white/10";

function SaveStatus({ status }) {
  const saving = status === "saving";
  return (
    <span
      className="flex items-center gap-1 text-[12px] font-normal text-gray-400 dark:text-gray-500"
      title={saving ? "Saving" : "Saved"}
      aria-live="polite"
    >
      {saving ? (
        <Loader2 size={12} className="animate-spin" aria-hidden="true" />
      ) : (
        <Check size={12} aria-hidden="true" />
      )}
      {saving ? "Saving" : "Saved"}
    </span>
  );
}

export default function HomeHeader({
  repoStars,
  saveStatus = "saved",
  onHistory,
  onReset,
  canUndo,
  canRedo,
  canClear,
  onUndo,
  onRedo,
  onClear,
  onSearch,
}) {
  return (
    <header className="relative hidden app:flex items-center justify-between h-15 px-4 shrink-0 bg-white dark:bg-[#111] border-b border-gray-200 dark:border-white/10">
      <div className="flex items-center gap-4">
        <Link
          to="/"
          className="flex items-center gap-1.5 text-[13.5px] font-medium text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
        >
          <ArrowLeft size={16} />
          Back
        </Link>
        <div className="w-px h-6 bg-gray-200 dark:bg-white/10" />
        <div className="flex items-center gap-4">
          <div className="leading-tight">
            <p className="text-[14.5px] font-medium text-black dark:text-white mt-0.5">
              Readmade
            </p>
          </div>
          <SaveStatus status={saveStatus} />
        </div>
      </div>

      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-0.5">
        <button
          type="button"
          onClick={onUndo}
          disabled={!canUndo}
          className={iconBtn}
          title="Undo"
          aria-label="Undo"
        >
          <Undo2 size={16} />
        </button>
        <button
          type="button"
          onClick={onRedo}
          disabled={!canRedo}
          className={iconBtn}
          title="Redo"
          aria-label="Redo"
        >
          <Redo2 size={16} />
        </button>
        <button
          type="button"
          onClick={onClear}
          disabled={!canClear}
          className={iconBtn}
          title="Clear all blocks"
          aria-label="Clear all blocks"
        >
          <Trash2 size={16} />
        </button>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onSearch}
          className={`${rightBtn} text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white`}
          title="Search blocks"
          aria-label="Search blocks"
        >
          <Search size={14.5} />
          Search
        </button>
        <a
          href={REPO_URL}
          target="_blank"
          rel="noreferrer"
          className={`${rightBtn} text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white`}
          title="GitHub stars"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.833.092-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.269 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.747-1.026 2.747-1.026.546 1.378.203 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
          </svg>
          <span className="tabular-nums text-gray-700 dark:text-gray-500">
            {formatStars(repoStars) ?? "…"}
          </span>
        </a>
        <ThemeToggle
          className="bg-white border border-gray-300 shadow-xs hover:bg-gray-50 dark:bg-[#1a1a1a] dark:border-white/20 dark:hover:bg-white/10"
        />
        <button
          onClick={onHistory}
          className={`${rightBtn} text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white`}
          title="History"
        >
          <History size={14.5} />
          History
        </button>
        <button
          onClick={onReset}
          className={`${rightBtn} text-gray-600 hover:text-black dark:text-gray-400`}
        >
          <Trash2 size={14.5} />
          Reset Canvas
        </button>
        <div className="flex items-center bg-white border border-gray-300 shadow-xs rounded-lg p-0.5 dark:bg-[#1a1a1a] dark:border-white/20">
          <UserAccountPreview avatarOnly />
        </div>
      </div>
    </header>
  );
}
