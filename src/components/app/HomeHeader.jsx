import { ArrowLeft, Trash2, History } from "lucide-react";
import { REPO_URL } from "../../lib/repo.js";
import { formatStars } from "../../lib/formatStars.js";
import ThemeToggle from "../ui/ThemeToggle.jsx";
import logoIcon from "/logo.svg";

export default function HomeHeader({ repoStars, onHistory, onReset }) {
  return (
    <header className="hidden app:flex items-center justify-between h-15 px-4 shrink-0 bg-white dark:bg-[#111] border-b border-gray-200 dark:border-white/10">
      <div className="flex items-center gap-4">
        <a
          href="/"
          className="flex items-center gap-1.5 text-[13.5px] font-medium text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
        >
          <ArrowLeft size={16} />
          Back
        </a>
        <div className="w-px h-6 bg-gray-200 dark:bg-white/10" />
        <div className="flex items-center gap-2.5">
          <span className="h-8 w-8 flex items-center justify-center shrink-0">
            <img src={logoIcon} alt="" />
          </span>
          <div className="leading-tight">
            <p className="text-[14.5px] font-medium text-black dark:text-white mt-0.5">
              Readmade
            </p>
            <p className="text-xs text-black/80 dark:text-white/60 relative top-[1px]">
              Build READMEs visually, copy production-ready markdown
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <a
          href={REPO_URL}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 px-2 py-1.5 text-[13px] font-medium text-gray-500 hover:text-black hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-white/10 rounded-lg transition-colors"
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
          <span className="tabular-nums text-gray-600 dark:text-gray-300">
            {formatStars(repoStars) ?? "…"}
          </span>
        </a>
        <ThemeToggle />
        <button
          onClick={onHistory}
          className="flex items-center gap-1.5 px-2 py-1.5 text-[13px] font-medium text-gray-500 hover:text-black hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-white/10 rounded-lg transition-colors"
          title="History"
        >
          <History size={14.5} />
          History
        </button>
        <button
          onClick={onReset}
          className="flex items-center gap-1.5 px-2 py-1.5 text-[13px] font-medium text-black bg-gray-200 hover:bg-gray-200/80 dark:text-black dark:bg-gray-100 dark:hover:bg-gray-200 rounded-lg transition-colors"
        >
          <Trash2 size={14.5} />
          Reset Canvas
        </button>
      </div>
    </header>
  );
}
