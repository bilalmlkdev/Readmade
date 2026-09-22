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
    <div className="absolute bottom-full left-0 mb-2 w-52 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl shadow-black/5 z-50">
      <div className="px-3 py-2.5 border-b border-gray-100">
        <p className="text-[13px] font-medium text-gray-800">{name}</p>
        <p className="text-[11px] text-gray-400">{USER_PLAN} plan</p>
      </div>
      <div className="py-1">
        <button
          type="button"
          onClick={onRename}
          className="w-full flex items-center justify-between px-3 py-2 text-[13px] text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
        >
          <span className="flex items-center gap-2.5">

            Edit name
          </span>
          <ChevronRight size={12} className="text-gray-300" />
        </button>
        <button
          type="button"
          onClick={() => {
            window.open(GITHUB_URL, "_blank");
            onClose();
          }}
          className="w-full flex items-center justify-between px-3 py-2 text-[13px] text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
        >
          <span className="flex items-center gap-2.5">

            Source code
          </span>
          <ChevronRight size={12} className="text-gray-300" />
        </button>
        <button
          type="button"
          onClick={() => {
            onClose();
            navigate("/");
          }}
          className="w-full flex items-center justify-between px-3 py-2 text-[13px] text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
        >
          <span className="flex items-center gap-2.5">
            Close workspace
          </span>
          <ChevronRight size={12} className="text-gray-300" />
        </button>
      </div>
    </div>
  );
}

export default function UserAccountPreview({ minimized = false }) {
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

  if (minimized) {
    return (
      <div ref={ref} className="relative flex justify-center">
        {trigger}
        <UserMenu
          open={open}
          onClose={() => setOpen(false)}
          name={name}
          onRename={startRename}
        />
        {editing && (
          <RenameDialog
            value={draftName}
            onChange={setDraftName}
            onCancel={() => setEditing(false)}
            onSave={commitRename}
          />
        )}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className="relative w-full bg-white px-2 py-1.5 flex items-center gap-2.5 flex-shrink-0"
    >
      {trigger}
      {editing ? (
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
          className="flex-1 min-w-0 text-[13px] font-medium text-gray-800 bg-transparent border-b border-gray-300 focus:border-black outline-none py-0.5"
        />
      ) : (
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex-1 min-w-0 flex items-center gap-1.5 text-left hover:opacity-80 transition-opacity"
        >
          <span className="text-[13px] font-medium text-gray-800 truncate mt-1">
            {name}
          </span>
          <span className="text-[12px] text-gray-400 mt-1">·</span>
          <span className="text-[12px] text-gray-400 mt-1">{USER_PLAN}</span>
          <ChevronDown
            size={13}
            className={`text-gray-400 shrink-0 transition-transform mt-1 ${
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

function RenameDialog({ value, onChange, onCancel, onSave }) {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/30 px-2">
      <div className="w-full bg-white border border-gray-200 shadow-lg p-2 flex items-center gap-1.5">
        <input
          autoFocus
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onSave();
            if (e.key === "Escape") onCancel();
          }}
          maxLength={32}
          placeholder="Your name"
          className="flex-1 min-w-0 text-[13px] px-2 py-1.5 border border-gray-200 rounded-md focus:border-black outline-none"
        />
        <button
          type="button"
          onClick={onSave}
          className="px-2.5 py-1.5 text-[12px] font-medium text-white bg-black rounded-md hover:bg-black/80"
        >
          Save
        </button>
      </div>
    </div>
  );
}
