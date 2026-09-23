import { Search } from "lucide-react";
import UserAccountPreview from "../ui/UserAccountPreview.jsx";

export default function PaletteFooter({ minimized, onOpenSearch }) {
  return (
    <div className="border-t border-gray-200 dark:border-white/10 bg-white dark:bg-[#151515] shrink-0">
      <div
        className={
          minimized
            ? "flex items-center justify-center py-2"
            : "flex items-center justify-between gap-2 py-1.5"
        }
      >
        {minimized ? (
          <UserAccountPreview avatarOnly />
        ) : (
          <>
            <UserAccountPreview />
            <div className="flex items-center gap-0.5 shrink-0">
              <button
                type="button"
                onClick={onOpenSearch}
                className="p-1.5 relative right-1.5 top-0.5 rounded-lg text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                title="Search blocks"
                aria-label="Search blocks"
              >
                <Search size={15} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
