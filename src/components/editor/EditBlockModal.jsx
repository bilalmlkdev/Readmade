import { useState } from "react";
import { X } from "lucide-react";
import { BLOCK_META, BLOCK_ICONS } from "../../lib/blocks.js";
import EditBlockFields from "../blocks/EditBlockFields.jsx";
import { cloneContent } from "../../lib/clone.js";

export default function EditBlockModal({ block, onClose, onSave }) {
  const [content, setContent] = useState(() => cloneContent(block.content));
  const meta = BLOCK_META[block.type];
  const Icon = BLOCK_ICONS[block.type];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 dark:bg-black/60 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-white dark:bg-[#161616] rounded-xl shadow-xl overflow-hidden animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-white/10">
          <div className="flex items-center gap-3">
            {Icon && (
              <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-white/10 shrink-0">
                <Icon size={16} className="text-gray-600 dark:text-gray-300" />
              </div>
            )}
            <div>
              <h3 className="text-[16px] font-semibold text-black dark:text-white">
                {meta?.label}
              </h3>
              <p className="text-[12px] text-gray-400 dark:text-gray-500">
                Edit block content
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-5 max-h-[60vh] overflow-y-auto">
          <EditBlockFields
            block={block}
            content={content}
            setContent={setContent}
          />
        </div>

        <div className="flex items-center justify-end gap-2 px-5 py-4 border-t border-gray-100 dark:border-white/10 bg-gray-50 dark:bg-[#121212]">
          <button
            onClick={onClose}
            className="px-4 py-2 text-[13px] font-medium text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(block.id, content)}
            className="px-4 py-2 text-[13px] font-medium text-white bg-black dark:bg-white dark:text-black hover:bg-black/90 dark:hover:bg-white/90 rounded-lg transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
