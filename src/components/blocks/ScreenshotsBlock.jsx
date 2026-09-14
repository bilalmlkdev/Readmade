import { useState } from 'react';

export default function ScreenshotsBlock({ content, onChange }) {
  const items = content.items || [];
  const [draggedIndex, setDraggedIndex] = useState(null);

  const update = (i, field, val) => {
    const newItems = items.map((x, idx) => (idx === i ? { ...x, [field]: val } : x));
    onChange({ items: newItems });
  };

  const add = () => {
    onChange({ items: [...items, { alt: '', url: '', caption: '' }] });
  };

  const remove = (i) => {
    if (window.confirm('Remove this screenshot?')) {
      onChange({ items: items.filter((_, idx) => idx !== i) });
    }
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
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
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
    !!url && (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('/'));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <div className="w-1 h-4 bg-amber-400 rounded-full" />
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Screenshots Gallery
          </span>
        </div>
        <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
          {items.length} {items.length === 1 ? 'item' : 'items'}
        </span>
      </div>

      {items.length === 0 && (
        <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
          <div className="text-5xl mb-3">📸</div>
          <div className="text-sm text-gray-500 mb-2">No screenshots yet</div>
          <div className="text-[11px] text-gray-400 mb-3">
            Add a direct image URL to get started
          </div>
          <button
            onClick={add}
            className="px-4 py-2 rounded-lg bg-amber-500! text-white! text-xs
                       hover:bg-amber-600! transition-colors"
          >
            + Add screenshot
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
                className="group bg-white border border-gray-200 hover:border-gray-300 rounded-lg transition-all duration-200"
              >
                <div className="relative">
                  {imageSrc ? (
                    <>
                      <img
                        src={imageSrc}
                        alt={item.alt || 'Screenshot preview'}
                        className="w-full h-48 object-cover rounded-t-lg"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          const errorDiv = e.target.parentElement?.querySelector('.preview-error');
                          if (errorDiv) errorDiv.style.display = 'flex';
                        }}
                      />
                      <div className="preview-error hidden w-full h-48 flex-col items-center justify-center bg-gray-100 rounded-t-lg">
                        <span className="text-3xl mb-2">🖼️</span>
                        <span className="text-xs text-gray-500">Failed to load image</span>
                        <span className="text-[10px] text-gray-400 mt-1">
                          Check that the URL points directly to an image
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-48 flex flex-col items-center justify-center bg-gray-100 rounded-t-lg">
                      <span className="text-3xl mb-2">🔗</span>
                      <span className="text-xs text-gray-500">Add an image URL to preview</span>
                    </div>
                  )}

                  {imageSrc && (
                    <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => window.open(imageSrc, '_blank')}
                        className="p-1.5 bg-white/80! hover:bg-white! rounded shadow-sm transition-colors"
                        title="Open in new tab"
                        aria-label="Open screenshot in new tab"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-600">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>

                <div className="p-3 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="cursor-move text-gray-400 group-hover:text-gray-600 transition-colors" title="Drag to reorder">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="9" cy="12" r="1" />
                          <circle cx="9" cy="8" r="1" />
                          <circle cx="9" cy="16" r="1" />
                          <circle cx="15" cy="12" r="1" />
                          <circle cx="15" cy="8" r="1" />
                          <circle cx="15" cy="16" r="1" />
                        </svg>
                      </div>
                      <span className="text-[11px] font-semibold text-amber-500 bg-amber-50 px-2 py-0.5 rounded">
                        #{i + 1}
                      </span>
                      {imageSrc && (
                        <span className="text-[10px] text-emerald-500 bg-emerald-50 px-1.5 py-0.5 rounded">
                          ✓ linked
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => moveUp(i)}
                        disabled={i === 0}
                        className={`p-1 rounded transition-colors ${
                          i === 0 ? 'text-gray-300! cursor-not-allowed' : 'text-gray-500! hover:text-amber-500! hover:bg-gray-100!'
                        }`}
                        title="Move up"
                        aria-label="Move screenshot up"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="18 15 12 9 6 15" />
                        </svg>
                      </button>
                      <button
                        onClick={() => moveDown(i)}
                        disabled={i === items.length - 1}
                        className={`p-1 rounded transition-colors ${
                          i === items.length - 1 ? 'text-gray-300! cursor-not-allowed' : 'text-gray-500 hover:text-amber-500! hover:bg-gray-100!'
                        }`}
                        title="Move down"
                        aria-label="Move screenshot down"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </button>
                      <button
                        onClick={() => remove(i)}
                        className="p-1 rounded text-gray-500! hover:text-red-500! hover:bg-red-50! transition-colors"
                        title="Remove"
                        aria-label="Remove screenshot"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-gray-500 uppercase tracking-wider">Image URL</label>
                    <input
                      className="w-full bg-white! border! border-gray-200! rounded px-3 py-2 text-gray-800! text-sm focus:outline-none focus:border-amber-400! transition-colors placeholder:text-gray-300"
                      value={item.url || ''}
                      onChange={(e) => update(i, 'url', e.target.value)}
                      placeholder="https://images.example.com/screenshot.png"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-gray-500 uppercase tracking-wider">Alt Text</label>
                    <input
                      className="w-full bg-white! border! border-gray-200! rounded px-3 py-2 text-gray-800! text-sm focus:outline-none focus:border-amber-400! transition-colors placeholder:text-gray-300"
                      value={item.alt || ''}
                      onChange={(e) => update(i, 'alt', e.target.value)}
                      placeholder="Describe the screenshot for accessibility"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-gray-500 uppercase tracking-wider">Caption (Optional)</label>
                    <textarea
                      className="w-full bg-white! border! border-gray-200! rounded px-3 py-2 text-gray-800! text-sm focus:outline-none focus:border-amber-400! transition-colors placeholder:text-gray-300 resize-none"
                      value={item.caption || ''}
                      onChange={(e) => update(i, 'caption', e.target.value)}
                      placeholder="Add a descriptive caption..."
                      rows={2}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <button
        onClick={add}
        className="w-full border-2! border-dashed border-gray-200! hover:border-amber-400! bg-gray-50! hover:bg-gray-100! text-gray-500! hover:text-amber-600! text-sm py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 group"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:rotate-90 transition-transform duration-200">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        Add Screenshot
      </button>

      <div className="text-[10px] text-gray-400 text-center px-2 py-1 bg-gray-50 rounded border border-gray-100 space-y-1">
        <div>💡 Only direct image URLs (https://) are accepted - screenshots are linked, never uploaded</div>
        <div className="text-[9px] text-gray-400">📋 Drag to reorder, or use the arrow buttons</div>
      </div>
    </div>
  );
}