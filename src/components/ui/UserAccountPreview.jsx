import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ExternalLink, LogOut, ChevronRight } from "lucide-react";

const GITHUB_URL = "https://github.com/bilalmlkdev/readmade";

function getAvatarUrl() {
  return `https://api.dicebear.com/7.x/notionists/svg?seed=readmade&backgroundColor=f5f4ef`;
}

function BrandMark({ size, onClick }) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="rounded-full flex items-center justify-center text-white font-bold select-none shrink-0 bg-gray-900 hover:ring-2 hover:ring-gray-300 transition-all"
        style={{ width: size, height: size, fontSize: size * 0.4 }}
      >
        R
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full shrink-0 bg-gray-100 hover:ring-2 hover:ring-gray-300 transition-all overflow-hidden"
      style={{ width: size, height: size }}
    >
      <img
        src={getAvatarUrl()}
        alt="Readmade"
        onError={() => setErrored(true)}
        className="w-full h-full object-cover"
      />
    </button>
  );
}

export default function UserAccountPreview({ minimized = false }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) return;
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const handleEsc = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [open]);

  if (minimized) {
    return (
      <div ref={ref} className="relative flex justify-center">
        <BrandMark size={32} onClick={() => setOpen((v) => !v)} />
        {open && (
          <div className="absolute bottom-full left-0 mb-2 w-52 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl shadow-black/5">
            <div className="px-3 py-2.5 border-b border-gray-100">
              <p className="text-[13px] font-medium text-gray-800">Readmade</p>
              <p className="text-[11px] text-gray-400">Free & open source</p>
            </div>
            <div className="py-1">
              <button
                type="button"
                onClick={() => {
                  window.open(GITHUB_URL, "_blank");
                  setOpen(false);
                }}
                className="w-full flex items-center justify-between px-3 py-2 text-[13px] text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
              >
                <span className="flex items-center gap-2.5">
                  <ExternalLink size={14} className="text-gray-400" />
                  Source code
                </span>
                <ChevronRight size={12} className="text-gray-300" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  navigate("/");
                }}
                className="w-full flex items-center justify-between px-3 py-2 text-[13px] text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
              >
                <span className="flex items-center gap-2.5">
                  <LogOut size={14} className="text-gray-400" />
                  Close workspace
                </span>
                <ChevronRight size={12} className="text-gray-300" />
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div ref={ref} className="relative px-3 py-3 border-t border-gray-100 flex items-center gap-3 flex-shrink-0">
      <BrandMark size={32} onClick={() => setOpen((v) => !v)} />
      <div className="flex-1 min-w-0 leading-tight">
        <p className="text-[13px] font-medium text-gray-800 truncate">Readmade</p>
        <p className="text-[11px] text-gray-400">Free & open source</p>
      </div>
      {open && (
        <div className="absolute bottom-full left-0 mb-2 w-52 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl shadow-black/5">
          <div className="px-3 py-2.5 border-b border-gray-100">
            <p className="text-[13px] font-medium text-gray-800">Readmade</p>
            <p className="text-[11px] text-gray-400">Free & open source</p>
          </div>
          <div className="py-1">
            <button
              type="button"
              onClick={() => {
                window.open(GITHUB_URL, "_blank");
                setOpen(false);
              }}
              className="w-full flex items-center justify-between px-3 py-2 text-[13px] text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
            >
              <span className="flex items-center gap-2.5">
                <ExternalLink size={14} className="text-gray-400" />
                Source code
              </span>
              <ChevronRight size={12} className="text-gray-300" />
            </button>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                navigate("/");
              }}
              className="w-full flex items-center justify-between px-3 py-2 text-[13px] text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
            >
              <span className="flex items-center gap-2.5">
                <LogOut size={14} className="text-gray-400" />
                Close workspace
              </span>
              <ChevronRight size={12} className="text-gray-300" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
