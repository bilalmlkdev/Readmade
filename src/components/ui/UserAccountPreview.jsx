import { useState, useRef, useMemo, useCallback } from "react";
import { ChevronDown } from "lucide-react";
import {
  getBrowserId,
  getDisplayName,
  setStoredName,
  USER_PLAN,
} from "../../lib/userName.js";
import { useDismiss } from "../../hooks/useDismiss.js";
import BrandMark from "./BrandMark.jsx";
import UserMenu from "./UserMenu.jsx";

export default function UserAccountPreview({ avatarOnly = false }) {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [draftName, setDraftName] = useState("");
  const ref = useRef(null);
  const browserId = useMemo(() => getBrowserId(), []);
  const [name, setName] = useState(() => getDisplayName(browserId));
  const close = useCallback(() => setOpen(false), []);
  useDismiss(ref, open, close);

  function startRename() {
    setDraftName(name);
    setEditing(true);
    setOpen(false);
  }

  function commitRename() {
    const next = draftName.trim();
    if (next) {
      setStoredName(next);
      setName(next);
    }
    setEditing(false);
  }

  return (
    <div
      ref={ref}
      className={`relative bg-white dark:bg-[#151515] rounded-lg ${
        avatarOnly
          ? "flex items-center"
          : "flex-1 min-w-0 px-2 flex items-center gap-2.5"
      }`}
    >
      <BrandMark
        size={26}
        browserId={browserId}
        onClick={() => setOpen((v) => !v)}
      />
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
          <span className="text-[12px] text-gray-400 dark:text-gray-500 mt-1.5">
            ·
          </span>
          <span className="text-[12px] text-gray-400 dark:text-gray-500 mt-1.5">
            {USER_PLAN}
          </span>
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
