import { useState, useRef, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {  ChevronRight, ChevronDown, } from "lucide-react";

const GITHUB_URL = "https://github.com/bilalmlkdev/readmade";
const USER_PLAN = "Free";

const NAME_POOL = [
  "Alex", "Jordan", "Sam", "Casey", "Riley", "Morgan", "Quinn", "Avery",
  "Rowan", "Skyler", "Reese", "Hayden", "Emerson", "Finley", "Dakota",
  "Blake", "Charlie", "Jamie", "Taylor", "Drew", "Harper", "Parker",
  "Ari", "Noel", "Shay", "Kai", "Robin", "Jules", "Marlow", "Sage",
];

const FALLBACK_NAMES = [
  "Guest", "Visitor", "Creator", "Builder", "Maker", "Explorer",
];

function hashString(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function getBrowserId() {
  try {
    let id = localStorage.getItem("readmade_browser_id");
    if (!id) {
      id =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : `b_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
      localStorage.setItem("readmade_browser_id", id);
    }
    return id;
  } catch {
    return "readmade_default_browser";
  }
}

function getStoredName() {
  try {
    return localStorage.getItem("readmade_user_name") || "";
  } catch {
    return "";
  }
}

function setStoredName(name) {
  try {
    localStorage.setItem("readmade_user_name", name);
  } catch {
    /* storage unavailable */
  }
}

function generateName(browserId) {
  const pool = NAME_POOL.length ? NAME_POOL : FALLBACK_NAMES;
  return pool[hashString(browserId) % pool.length];
}

function getDisplayName(browserId) {
  return getStoredName() || generateName(browserId);
}

function getAvatarUrl(browserId) {
  return `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(
    browserId,
  )}&backgroundColor=f5f4ef`;
}

function BrandMark({ size, browserId, onClick }) {
  const [errored, setErrored] = useState(false);
  const name = getDisplayName(browserId);
  const initial = (name || "U").charAt(0).toUpperCase();

  if (errored) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="rounded-full flex items-center justify-center text-white font-semibold select-none shrink-0 bg-gray-800 hover:ring-2 hover:ring-gray-300 transition-all"
        style={{ width: size, height: size, fontSize: Math.round(size * 0.42) }}
        aria-label={name}
      >
        {initial}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full shrink-0 bg-gray-100 hover:ring-2 hover:ring-gray-300 transition-all overflow-hidden"
      style={{ width: size, height: size }}
      aria-label={name}
    >
      <img
        src={getAvatarUrl(browserId)}
        alt={name}
        onError={() => setErrored(true)}
        className="w-full h-full object-cover"
      />
    </button>
  );
}

function UserMenu({ open, onClose, name, onRename }) {
  const navigate = useNavigate();

  if (!open) return null;

  return (
    <div className="absolute bottom-full left-0 mb-2 w-52 overflow-hidden rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#1a1a1a] shadow-xl shadow-black/5 z-50">
      <div className="px-3 py-2.5 border-b border-gray-100 dark:border-white/10">
        <p className="text-[13px] font-medium text-gray-800 dark:text-white">{name}</p>
        <p className="text-[11px] text-gray-400 dark:text-gray-500">{USER_PLAN} plan</p>
      </div>
      <div className="py-1">
        <button
          type="button"
          onClick={onRename}
          className="w-full flex items-center justify-between px-3 py-2 text-[13px] text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <span className="flex items-center gap-2.5">

            Edit name
          </span>
          <ChevronRight size={12} className="text-gray-300 dark:text-gray-600" />
        </button>
        <button
          type="button"
          onClick={() => {
            window.open(GITHUB_URL, "_blank");
            onClose();
          }}
          className="w-full flex items-center justify-between px-3 py-2 text-[13px] text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <span className="flex items-center gap-2.5">

            Source code
          </span>
          <ChevronRight size={12} className="text-gray-300 dark:text-gray-600" />
        </button>
        <button
          type="button"
          onClick={() => {
            onClose();
            navigate("/");
          }}
          className="w-full flex items-center justify-between px-3 py-2 text-[13px] text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <span className="flex items-center gap-2.5">
            Close workspace
          </span>
          <ChevronRight size={12} className="text-gray-300 dark:text-gray-600" />
        </button>
      </div>
    </div>
  );
}

export default function UserAccountPreview({ avatarOnly = false }) {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [draftName, setDraftName] = useState("");
  const ref = useRef(null);
  const browserId = useMemo(() => getBrowserId(), []);
  const [name, setName] = useState(() => getDisplayName(browserId));

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

  const startRename = () => {
    setDraftName(name);
    setEditing(true);
    setOpen(false);
  };

  const commitRename = () => {
    const next = draftName.trim();
    if (next) {
      setStoredName(next);
      setName(next);
    }
    setEditing(false);
  };

  const trigger = (
    <BrandMark size={26} browserId={browserId} onClick={() => setOpen((v) => !v)} />
  );

  return (
    <div
      ref={ref}
      className={`relative bg-white dark:bg-[#151515] rounded-lg ${
        avatarOnly ? "flex items-center" : "flex-1 min-w-0 px-2 flex items-center gap-2.5"
      }`}
    >
      {trigger}
      {avatarOnly ? null : editing ? (
        <input
          autoFocus
          value={draftName}
          onChange={(e) => setDraftName(e.target.value)}
          onBlur={commitRename}
          onKeyDown={(e) => {
            if (e.key === "Enter") commitRename();
            if (e.key === "Escape") setEditing(false);
          }}
          maxLength={32}
          className="flex-1 min-w-0 text-[13px] font-medium text-gray-800 dark:text-white bg-transparent border-b border-gray-300 dark:border-white/20 focus:border-black dark:focus:border-white outline-none py-0.5"
        />
      ) : (
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex-1 min-w-0 flex items-center gap-1.5 text-left hover:opacity-80 transition-opacity"
        >
          <span className="text-[13px] font-medium text-gray-800 dark:text-white truncate mt-1">
            {name}
          </span>
          <span className="text-[12px] text-gray-400 dark:text-gray-500 mt-1.5">·</span>
          <span className="text-[12px] text-gray-400 dark:text-gray-500 mt-1.5">{USER_PLAN}</span>
          <ChevronDown
            size={13}
            className={`text-gray-400 dark:text-gray-500 shrink-0 transition-transform mt-1.5 ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>
      )}
      <UserMenu
        open={open}
        onClose={() => setOpen(false)}
        name={name}
        onRename={startRename}
      />
    </div>
  );
}
