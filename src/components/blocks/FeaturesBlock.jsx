import { X } from "lucide-react";
import {
  inputFlexCls,
  createHelpers,
} from "./editorUtils.js";

export default function FeaturesBlock({ content, setContent }) {
  const { handleArrayChange, handleArrayRemove, handleArrayAdd } =
    createHelpers(setContent);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-[12px] font-medium text-gray-700 dark:text-gray-300">
          Features
        </label>
        <button
          onClick={() => handleArrayAdd("items", "New feature")}
          className="text-[12px] font-medium text-black dark:text-white hover:text-black/80 dark:hover:text-white/80"
        >
          + Add Feature
        </button>
      </div>
      <div className="space-y-2">
        {content.items.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              type="text"
              value={item}
              onChange={(e) =>
                handleArrayChange("items", i, "0", e.target.value)
              }
              className={inputFlexCls}
            />
            <button
              onClick={() => handleArrayRemove("items", i)}
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
