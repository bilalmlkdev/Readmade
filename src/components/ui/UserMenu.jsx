import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { GITHUB_URL, USER_PLAN } from "../../lib/userName.js";

function MenuItem({ label, onClick }) {
  return (
    <button
      type="button" onClick={onClick}
      className="w-full flex items-center justify-between px-3 py-2 text-[13px] text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-white"
    >
      <span className="flex items-center gap-2.5">{label}</span>
      <ChevronRight size={12} className="text-gray-300 dark:text-gray-600" />
    </button>
  );
}

export default function UserMenu({ open, onClose, name, onRename }) {
  const navigate = useNavigate();
  if (!open) return null;

  return (
    <div className="absolute top-full right-0 mt-2 w-52 overflow-hidden rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#1a1a1a] shadow-xl shadow-black/5 z-50">
      <div className="px-3 py-2.5 border-b border-gray-100 dark:border-white/10">
        <p className="text-[13px] font-medium text-gray-800 dark:text-white">
          {name}
        </p>
        <p className="text-[11px] text-gray-400 dark:text-gray-500">
          {USER_PLAN} plan
        </p>
      </div>
      <div className="py-1">
        <MenuItem label="Edit name" onClick={onRename} />
        <MenuItem
          label="Source code" onClick={() => {
            window.open(GITHUB_URL, "_blank");
            onClose();
          }}
        />
        <MenuItem
          label="Close workspace" onClick={() => {
            onClose();
            navigate("/");
          }}
        />
      </div>
    </div>
  );
}
