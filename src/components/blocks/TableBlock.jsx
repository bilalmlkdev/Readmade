import { X } from "lucide-react";
import { inputFlexCls, inputCls, labelCls, createHelpers } from "./editorUtils.js";

export default function TableBlock({ content, setContent }) {
  const { handleChange, handleArrayChange, handleArrayRemove, handleArrayAdd } =
    createHelpers(setContent);

  return (
    <div className="space-y-3">
      <div>
        <label className={labelCls}>Headers (comma separated)</label>
        <input
          type="text"
          value={(content.headers || []).join(", ")}
          onChange={(e) =>
            handleChange(
              "headers",
              e.target.value.split(",").map((h) => h.trim()),
            )
          }
          className={inputCls}
        />
      </div>
      <div className="flex items-center justify-between">
        <label className={labelCls}>Rows</label>
        <button
          type="button"
          onClick={() =>
            handleArrayAdd(
              "rows",
              (content.headers || ["Col 1", "Col 2"]).map(() => ""),
            )
          }
          className="text-[12px] font-medium text-black dark:text-white hover:text-black/80 dark:hover:text-white/80"
        >
          + Add Row
        </button>
      </div>
      <div className="space-y-2">
        {(content.rows || []).map((row, ri) => (
          <div key={ri} className="flex items-start gap-2">
            <div className="flex-1 grid grid-cols-3 gap-1.5">
              {(row || []).map((cell, ci) => (
                <input
                  key={ci}
                  type="text"
                  value={cell}
                  onChange={(e) => handleArrayChange("rows", ri, ci, e.target.value)}
                  className={inputFlexCls}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => handleArrayRemove("rows", ri)}
              className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded"
              title="Remove"
            >
              <X size={13} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
