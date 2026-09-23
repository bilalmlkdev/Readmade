import { useState, useRef, useMemo, useCallback } from "react";
import { ChevronDown } from "lucide-react";
import { getBrowserId, getDisplayName, USER_PLAN } from "../../lib/userName.js";
import { useDismiss } from "../../hooks/useDismiss.js";
import BrandMark from "./BrandMark.jsx";
import UserMenu from "./UserMenu.jsx";

export default function UserAccountPreview({ avatarOnly = false }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const browserId = useMemo(() => getBrowserId(), []);
  const name = useMemo(() => getDisplayName(browserId), [browserId]);
  const close = useCallback(() => setOpen(false), []);
  useDismiss(ref, open, close);

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
        size={28}
        browserId={browserId}
        onClick={() => setOpen((v) => !v)}
      />
      {avatarOnly ? null : (
        <button
          type="button" onClick={() => setOpen((v) => !v)}
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
      />
    </div>
  );
}
