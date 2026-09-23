import { useState } from "react";
import { useReadme } from "../../store/useReadme.js";
import { TEMPLATES } from "../../data/templates.js";
import { X, Star } from "lucide-react";
import ConfirmDialog from "./ConfirmDialog.jsx";

const BLANK_TEMPLATE = { id: "blank", name: "Blank Canvas", blocks: [] };

export default function TemplateGallery({ onClose }) {
  const { clearAllData, addBlock } = useReadme();
  const [activeId, setActiveId] = useState(null);
  const [pendingTemplate, setPendingTemplate] = useState(null);

  function applyTemplate(template) {
    setActiveId(template.id);
    clearAllData();
    template.blocks.forEach((block) => {
      if (typeof block === "string") {
        addBlock(block);
      } else {
        addBlock(block.type, block.content);
      }
    });
    onClose?.();
  }

  function handleConfirm() {
    if (!pendingTemplate) return;
    applyTemplate(pendingTemplate);
    setPendingTemplate(null);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 dark:bg-black/60 backdrop-blur-sm" onClick={onClose}
    >
      <div
        className="relative bg-white dark:bg-[#161616] rounded-2xl shadow-2xl shadow-black/10 border border-gray-200 dark:border-white/10 max-w-[560px] w-full mx-4 max-h-[80vh] flex flex-col animate-slide-up" onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-white/10 shrink-0">
          <div>
            <h2 className="text-[15px] font-semibold text-black dark:text-white">
              Templates
            </h2>
            <p className="text-[12px] text-gray-400 mt-0.5">
              Start with a pre-built structure
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-white/10"
          >
            <X size={16} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
          {TEMPLATES.map((template) => {
            const Icon = template.icon || X;
            return (
              <button
                key={template.id}
                onClick={() => setPendingTemplate(template)}
                className={`w-full px-4 py-3 rounded-xl border transition-all text-left flex items-center gap-3.5 ${
                  activeId === template.id
                    ? "border-black bg-gray-50 dark:border-white dark:bg-white/10"
                    : "border-gray-100 dark:border-white/10 hover:border-gray-200 dark:hover:border-white/20 hover:bg-gray-50 dark:hover:bg-white/5"
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    activeId === template.id
                      ? "bg-black dark:bg-white"
                      : "bg-gray-100 dark:bg-white/10"
                  }`}
                >
                  <Icon
                    size={16}
                    className={
                      activeId === template.id
                        ? "text-white dark:text-black"
                        : "text-gray-500 dark:text-gray-300"
                    }
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-[13px] font-medium text-gray-900 dark:text-white">
                      {template.name}
                    </h3>
                    {template.starred && (
                      <Star size={10} className="text-amber-400 fill-amber-400" />
                    )}
                  </div>
                  <p className="text-[12px] text-gray-400 mt-0.5">
                    {template.desc}
                  </p>
                </div>
                <span className="text-[11px] text-gray-400 shrink-0 tabular-nums">
                  {template.blocks.length > 0
                    ? `${template.blocks.length} blocks`
                    : "Empty"}
                </span>
              </button>
            );
          })}
        </div>

        <div className="px-5 py-3 border-t border-gray-100 dark:border-white/10 shrink-0">
          <button
            onClick={() => setPendingTemplate(BLANK_TEMPLATE)}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 text-[13px] font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50 hover:border-gray-300 dark:text-gray-400 dark:hover:text-white dark:hover:bg-white/10"
          >
            Start with blank
          </button>
        </div>

        {pendingTemplate && (
          <ConfirmDialog
            title="Replace current readme?" description={`Loading "${pendingTemplate.name}" will replace all your current fields. This cannot be undone.`}
            confirmLabel="Replace" titleId="template-confirm-title" descId="template-confirm-desc" onConfirm={handleConfirm}
            onCancel={() => setPendingTemplate(null)}
          />
        )}
      </div>
    </div>
  );
}
