import { inputCls, createHelpers } from "./editorUtils.js";

export default function BadgesBlock({ content, setContent }) {
  const { handleArrayChange, handleArrayRemove, handleArrayAdd } =
    createHelpers(setContent);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-[12px] font-medium text-gray-700 dark:text-gray-300">
          Badges
        </label>
        <button
          onClick={() =>
            handleArrayAdd("badges", { label: "", url: "", link: "" })
          }
          className="text-[12px] font-medium text-black dark:text-white hover:text-black/80 dark:hover:text-white/80"
        >
          + Add Badge
        </button>
      </div>
      <div className="space-y-3">
        {content.badges.map((badge, i) => (
          <div
            key={i}
            className="space-y-2 p-3 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 rounded-lg"
          >
            <div>
              <label className="block text-[11px] font-medium text-gray-500 dark:text-gray-400 mb-0.5">
                Label
              </label>
              <input
                type="text"
                value={badge.label}
                onChange={(e) =>
                  handleArrayChange("badges", i, "label", e.target.value)
                }
                className={inputCls}
                placeholder="Build"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-gray-500 dark:text-gray-400 mb-0.5">
                Badge Image URL
              </label>
              <input
                type="text"
                value={badge.url}
                onChange={(e) =>
                  handleArrayChange("badges", i, "url", e.target.value)
                }
                className={inputCls}
                placeholder="https://img.shields.io/badge/build-passing-brightgreen"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-gray-500 dark:text-gray-400 mb-0.5">
                Link (optional)
              </label>
              <input
                type="text"
                value={badge.link}
                onChange={(e) =>
                  handleArrayChange("badges", i, "link", e.target.value)
                }
                className={inputCls}
                placeholder="https://github.com/..."
              />
            </div>
            <button
              onClick={() => handleArrayRemove("badges", i)}
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
