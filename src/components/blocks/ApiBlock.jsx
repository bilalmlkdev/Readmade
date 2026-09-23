import { inputMonoCls, textareaCls, createHelpers } from "./editorUtils.js";

export default function ApiBlock({ content, setContent }) {
  const { handleArrayChange, handleArrayRemove, handleArrayAdd } =
    createHelpers(setContent);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-[12px] font-medium text-gray-700 dark:text-gray-300">
          API Entries
        </label>
        <button
          onClick={() =>
            handleArrayAdd("entries", {
              name: "",
              description: "",
              params: "",
            })
          }
          className="text-[12px] font-medium text-black dark:text-white hover:text-black/80 dark:hover:text-white/80"
        >
          + Add Entry
        </button>
      </div>
      <div className="space-y-3">
        {content.entries.map((entry, i) => (
          <div
            key={i}
            className="space-y-2 p-3 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 rounded-lg"
          >
            <div>
              <label className="block text-[11px] font-medium text-gray-500 dark:text-gray-400 mb-0.5">
                Function / Method Name
              </label>
              <input
                type="text"
                value={entry.name}
                onChange={(e) =>
                  handleArrayChange("entries", i, "name", e.target.value)
                }
                className={inputMonoCls}
                placeholder="functionName(options)"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-gray-500 dark:text-gray-400 mb-0.5">
                Description
              </label>
              <textarea
                value={entry.description}
                onChange={(e) =>
                  handleArrayChange("entries", i, "description", e.target.value)
                }
                rows={2}
                className={textareaCls}
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-gray-500 dark:text-gray-400 mb-0.5">
                Parameters
              </label>
              <input
                type="text"
                value={entry.params}
                onChange={(e) =>
                  handleArrayChange("entries", i, "params", e.target.value)
                }
                className={inputMonoCls}
                placeholder="options — object with configuration"
              />
            </div>
            <button
              onClick={() => handleArrayRemove("entries", i)}
              className="text-[12px] font-medium text-red-500 hover:text-red-600"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
