import { X } from "lucide-react";
import { inputFlexCls, labelCls, createHelpers } from "./editorUtils.js";

export default function ChangelogBlock({ content, setContent }) {
  const { handleArrayChange, handleArrayRemove, handleArrayAdd } =
    createHelpers(setContent);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className={labelCls}>Releases</label>
        <button
          type="button"
          onClick={() =>
            handleArrayAdd("items", { version: "1.0.0", date: "", notes: "" })
          }
          className="text-[12px] font-medium text-black dark:text-white hover:text-black/80 dark:hover:text-white/80"
        >
          + Add Release
        </button>
      </div>
      <div className="space-y-3">
        {content.items.map((item, i) => (
          <div
            key={i}
            className="space-y-2 p-3 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 rounded-lg"
          >
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={item.version}
                placeholder="Version"
                onChange={(e) =>
                  handleArrayChange("items", i, "version", e.target.value)
                }
                className={inputFlexCls}
              />
              <input
                type="text"
                value={item.date}
                placeholder="Date"
                onChange={(e) =>
                  handleArrayChange("items", i, "date", e.target.value)
                }
                className={inputFlexCls}
              />
              <button
                type="button"
                onClick={() => handleArrayRemove("items", i)}
                className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded"
                title="Remove"
              >
                <X size={13} />
              </button>
            </div>
            <textarea
              value={item.notes}
              placeholder="Release notes"
              rows={3}
              onChange={(e) =>
                handleArrayChange("items", i, "notes", e.target.value)
              }
              className="w-full px-3 py-2 text-[13px] bg-white dark:bg-[#1a1a1a] dark:text-white border border-gray-200 dark:border-white/10 rounded-lg focus:outline-none focus:border-gray-300 focus:ring-1 focus:ring-black dark:focus:ring-white resize-y font-sans"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
