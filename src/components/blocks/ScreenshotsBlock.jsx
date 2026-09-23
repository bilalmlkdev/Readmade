import { inputCls, createHelpers } from "./editorUtils.js";

export default function ScreenshotsBlock({ content, setContent }) {
  const { handleArrayChange, handleArrayRemove, handleArrayAdd } =
    createHelpers(setContent);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-[12px] font-medium text-gray-700">
          Screenshots
        </label>
        <button
          onClick={() =>
            handleArrayAdd("items", { url: "", alt: "", caption: "" })
          }
          className="text-[12px] font-medium text-black hover:text-black/80"
        >
          + Add Screenshot
        </button>
      </div>
      <div className="space-y-3">
        {content.items.length === 0 && (
          <p className="text-[13px] text-gray-400 text-center py-4">
            No screenshots yet. Click “+ Add Screenshot” to begin.
          </p>
        )}
        {content.items.map((item, i) => (
          <div
            key={i}
            className="space-y-2 p-3 bg-white border border-gray-200 rounded-lg"
          >
            <div>
              <label className="block text-[11px] font-medium text-gray-500 mb-0.5">
                Image URL
              </label>
              <input
                type="text"
                value={item.url}
                onChange={(e) =>
                  handleArrayChange("items", i, "url", e.target.value)
                }
                className={inputCls}
                placeholder="https://example.com/image.png"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-gray-500 mb-0.5">
                Alt Text
              </label>
              <input
                type="text"
                value={item.alt}
                onChange={(e) =>
                  handleArrayChange("items", i, "alt", e.target.value)
                }
                className={inputCls}
                placeholder="Description for accessibility"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-gray-500 mb-0.5">
                Caption (optional)
              </label>
              <input
                type="text"
                value={item.caption}
                onChange={(e) =>
                  handleArrayChange("items", i, "caption", e.target.value)
                }
                className={inputCls}
                placeholder="Shown below the image"
              />
            </div>
            <button
              onClick={() => handleArrayRemove("items", i)}
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
