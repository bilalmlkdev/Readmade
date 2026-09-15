import { Keyboard } from "lucide-react";

const SHORTCUTS = [
  { keys: ["⌘", "S"], desc: "Save / Download", action: "download" },
  { keys: ["⌘", "⇧", "C"], desc: "Copy Markdown", action: "copy" },
  { keys: ["⌘", "/"], desc: "Focus Search", action: "search" },
  { keys: ["⌘", "⇧", "P"], desc: "Command Palette", action: "palette" },
  { keys: ["⌘", "⇧", "R"], desc: "Reset Workspace", action: "reset" },
];

export default function KeyboardShortcutsHelp({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-2xl shadow-black/10 border border-gray-200 max-w-[480px] w-full mx-4 p-6 animate-in zoom-in-95 slide-in-from-bottom-2 duration-200" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Keyboard Shortcuts</h2>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
            <Keyboard size={20} />
          </button>
        </div>
        <div className="space-y-3">
          {SHORTCUTS.map((s) => (
            <div key={s.action} className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-gray-50">
              <span className="text-sm text-gray-600">{s.desc}</span>
              <div className="flex items-center gap-1.5">
                {s.keys.map((k, i) => (
                  <span key={i} className="flex items-center justify-center min-w-[28px] h-6 px-2 rounded bg-white border border-gray-200 text-[10px] font-medium text-gray-700 font-mono">
                    {k}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}