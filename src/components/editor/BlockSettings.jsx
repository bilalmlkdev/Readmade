import { useState } from "react";
import { ChevronDown } from "lucide-react";
import useReadme from "../../store/useReadme.js";

const inputCls = "w-full px-3 py-1.5 text-[13px] bg-white dark:bg-[#1a1a1a] dark:text-white border border-gray-200 dark:border-white/10 rounded-lg placeholder:text-gray-400 focus:outline-none focus:border-gray-300 focus:ring-1 focus:ring-black dark:focus:ring-white";

function SettingRow({ label, value, onChange, placeholder, labelCols }) {
  return (
    <div className={`grid ${labelCols} gap-2 items-center`}>
      <label className="text-[12px] text-gray-500 dark:text-gray-400 text-right">
        {label}
      </label>
      <input
        type="text" value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={inputCls}
      />
    </div>
  );
}

export default function BlockSettings() {
  const { settings, updateSettings } = useReadme();
  const [open, setOpen] = useState(false);

  return (
    <div className="shrink-0 border-b border-gray-200 dark:border-white/10">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-3 py-3"
      >
        <span className="text-[14px] font-medium text-black dark:text-white">
          README Settings
        </span>
        <ChevronDown
          size={15}
          className={`text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="pb-3 space-y-2.5 animate-slide-down">
          <SettingRow
            label="README Name" value={settings.name}
            onChange={(v) => updateSettings({ name: v })}
            placeholder="README" labelCols="grid-cols-[100px_1fr]"
          />
          <SettingRow
            label="Description" value={settings.description}
            onChange={(v) => updateSettings({ description: v })}
            placeholder="Short summary" labelCols="grid-cols-[85px_1fr]"
          />
          <SettingRow
            label="Author" value={settings.author}
            onChange={(v) => updateSettings({ author: v })}
            placeholder="Your name" labelCols="grid-cols-[60px_1fr]"
          />
        </div>
      )}
    </div>
  );
}
