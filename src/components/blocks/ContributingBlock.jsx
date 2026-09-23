import { X } from "lucide-react";
import { inputFlexCls, textareaCls, createHelpers } from "./editorUtils.js";

export default function ContributingBlock({ content, setContent }) {
  const { handleChange, handleArrayChange, handleArrayRemove, handleArrayAdd } =
    createHelpers(setContent);

  return (
    <div className="space-y-3">
      <div>
        <label className="block text-[12px] font-medium text-gray-700 mb-1">
          Intro Text
        </label>
        <textarea
          value={content.text}
          onChange={(e) => handleChange("text", e.target.value)}
          rows={3}
          className={textareaCls}
        />
      </div>
      <div className="flex items-center justify-between">
        <label className="block text-[12px] font-medium text-gray-700">
          Steps
        </label>
        <button
          onClick={() => handleArrayAdd("steps", "New step")}
          className="text-[12px] font-medium text-black hover:text-black/80"
        >
          + Add Step
        </button>
      </div>
      <div className="space-y-2">
        {content.steps.map((step, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              type="text"
              value={step}
              onChange={(e) =>
                handleArrayChange("steps", i, "0", e.target.value)
              }
              className={inputFlexCls}
            />
            <button
              onClick={() => handleArrayRemove("steps", i)}
              className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
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
