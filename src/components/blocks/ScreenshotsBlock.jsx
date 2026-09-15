import { useState } from "react";
import { X, GripVertical, ChevronUp, ChevronDown, Image } from "lucide-react";

export default function ScreenshotsBlock({ content, onChange }) {
  const items = content.items || [];
  const [draggedIndex, setDraggedIndex] = useState(null);

  const update = (i, field, val) => {
    const newItems = items.map((x, idx) =>
      idx === i ? { ...x, [field]: val } : x
    );
    onChange({ items: newItems });
  };

  const add = () => {
    onChange({ items: [...items, { alt: "", url: "", caption: "" }] });
  };

  const remove = (i) => {
    onChange({ items: items.filter((_, idx) => idx !== i) });
  };

  const moveUp = (i) => {
    if (i > 0) {
      const newItems = [...items];
      [newItems[i - 1], newItems[i]] = [newItems[i], newItems[i - 1]];
      onChange({ items: newItems });
    }
  };

  const moveDown = (i) => {
    if (i < items.length - 1) {
      const newItems = [...items];
      [newItems[i], newItems[i + 1]] = [newItems[i + 1], newItems[i]];
      onChange({ items: newItems });
    }
  };

  const handleDragStart = (e, i) => {
    setDraggedIndex(i);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    if (draggedIndex === null) return;
    const newItems = [...items];
    const [draggedItem] = newItems.splice(draggedIndex, 1);
    newItems.splice(targetIndex, 0, draggedItem);
    onChange({ items: newItems });
    setDraggedIndex(null);
  };

  const validateUrl = (url) =>
    !!url &&
    (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("/"));

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-medium text-gray-600">
          Screenshots
        </label>
        {items.length > 0 && (
          <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
            {items.length} {items.length === 1 ? "item" : "items"}
          </span>
        )}
      </div>

      {items.length === 0 && (
        <div className="bg-gray-50 border border-dashed border-gray-300 rounded-lg p-6 text-center">
          <Image size={24} className="mx-auto text-gray-300 mb-2" strokeWidth={1.5} />
          <div className="text-sm text-gray-500 mb-1">No screenshots yet</div>
          <div className="text-[11px] text-gray-400 mb-3">
            Add a direct image URL to get started
          </div>
          <button
            onClick={add}
            className="px-4 py-1.5 rounded-lg bg-gray-900 text-white text-xs font-medium
                       hover:bg-gray-800 transition-colors"
          >
            Add screenshot
          </button>
        </div>
      )}

      {items.length > 0 && (
        <div className="space-y-3">
          {items.map((item, i) => {
            const imageSrc = validateUrl(item.url) ? item.url : null;
            return (
              <div
                key={i}
                draggable
                onDragStart={(e) => handleDragStart(e, i)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, i)}
                className="group bg-white border border-gray-200 rounded-lg overflow-hidden"
              >
                <div className="relative">
                  {imageSrc ? (
                    <img
                      src={imageSrc}
                      alt={item.alt || "Screenshot preview"}
                      className="w-full h-40 object-cover"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="w-full h-40 flex flex-col items-center justify-center bg-gray-50">
                      <Image size={20} className="text-gray-300 mb-1" strokeWidth={1.5} />
                      <span className="text-xs text-gray-400">Add an image URL to preview</span>
                    </div>
                  )}
                </div>

                <div className="p-3 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <GripVertical size={14} className="text-gray-300 cursor-move" />
                      <span className="text-[11px] font-medium text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
                        #{i + 1}
                      </span>
                    </div>

                    <div className="flex items-center gap-0.5">
                      <button
                        onClick={() => moveUp(i)}
                        disabled={i === 0}
                        className={`p-1 rounded transition-colors ${
                          i === 0
                            ? "text-gray-200 cursor-not-allowed"
                            : "text-gray-400 hover:text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <ChevronUp size={14} />
                      </button>
                      <button
                        onClick={() => moveDown(i)}
                        disabled={i === items.length - 1}
                        className={`p-1 rounded transition-colors ${
                          i === items.length - 1
                            ? "text-gray-200 cursor-not-allowed"
                            : "text-gray-400 hover:text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <ChevronDown size={14} />
                      </button>
                      <button
                        onClick={() => remove(i)}
                        className="p-1 rounded text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-gray-600">Image URL</label>
                    <input
                      className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-gray-700 text-sm
                                 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400/20
                                 placeholder:text-gray-400 transition-colors"
                      value={item.url || ""}
                      onChange={(e) => update(i, "url", e.target.value)}
                      placeholder="https://images.example.com/screenshot.png"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-gray-600">Alt text</label>
                    <input
                      className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-gray-700 text-sm
                                 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400/20
                                 placeholder:text-gray-400 transition-colors"
                      value={item.alt || ""}
                      onChange={(e) => update(i, "alt", e.target.value)}
                      placeholder="Describe the screenshot"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-gray-600">
                      Caption <span className="text-gray-400 font-normal">(optional)</span>
                    </label>
                    <textarea
                      className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-gray-700 text-sm
                                 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400/20
                                 placeholder:text-gray-400 transition-colors resize-none"
                      value={item.caption || ""}
                      onChange={(e) => update(i, "caption", e.target.value)}
                      placeholder="Add a caption"
                      rows={2}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {items.length > 0 && (
        <button
          onClick={add}
          className="w-full border border-dashed border-gray-300 hover:border-gray-400 bg-gray-50 hover:bg-gray-100
                     text-gray-500 hover:text-gray-700 text-xs font-medium py-2 rounded-lg transition-colors"
        >
          Add screenshot
        </button>
      )}

      <p className="text-[10px] text-gray-400 text-center">
        Only direct image URLs are accepted. Screenshots are linked, never uploaded.
      </p>
    </div>
  );
}
