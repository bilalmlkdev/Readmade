import { useState } from "react";
import { FaGithub } from "react-icons/fa";

function getAvatarUrl() {
  return `https://api.dicebear.com/7.x/notionists/svg?seed=readmade&backgroundColor=f5f4ef`;
}

function BrandMark({ size }) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div
        className="rounded-full flex items-center justify-center text-white font-bold select-none shrink-0 bg-emerald-500"
        style={{ width: size, height: size, fontSize: size * 0.45 }}
      >
        R
      </div>
    );
  }

  return (
    <img
      src={getAvatarUrl()}
      alt="Readmade"
      onError={() => setErrored(true)}
      className="rounded-full shrink-0 object-cover bg-gray-100"
      style={{ width: size, height: size }}
    />
  );
}

// A small branding footer for the sidebar - previously this showed the
// logged-in user's name/email with a logout button, but login has been
// removed entirely, so there's no identity left to show. Kept the avatar
// and GitHub link since they're a nice, honest touch either way.
export default function UserAccountPreview({ minimized = false }) {
  if (minimized) {
    return (
      <a
        href="https://github.com/bilalmlkdev/readmade"
        target="_blank"
        rel="noopener noreferrer"
        title="View on GitHub"
        className="w-9 h-9 relative left-3 bottom-1 rounded-full flex items-center justify-center select-none hover:ring-2 hover:ring-gray-300 transition-all"
      >
        <BrandMark size={36} />
      </a>
    );
  }

  return (
    <div className="px-4 py-3 border-t border-gray-200 flex items-center gap-3 flex-shrink-0">
      <BrandMark size={36} />
      <div className="flex-1 min-w-0 leading-tight">
        <p className="text-[13px] font-medium text-gray-800">Readmade</p>
        <p className="text-[11px] text-gray-500">Free & open source</p>
      </div>
      <a
        href="https://github.com/bilalmlkdev/readmade"
        target="_blank"
        rel="noopener noreferrer"
        className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
        title="View on GitHub"
      >
        <FaGithub size={18} />
      </a>
    </div>
  );
}
