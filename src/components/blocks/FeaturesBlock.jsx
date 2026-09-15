import { X } from "lucide-react";

export default function FeaturesBlock({ content, onChange }) {
  const items = content.items || [];

  const update = (i, val) =>
    onChange({ items: items.map((x, idx) => (idx === i ? val : x)) });
  const add = () => onChange({ items: [...items, ""] });
  const remove = (i) =>
    onChange({ items: items.filter((_, idx) => idx !== i) });

  return (
    <div className="space-y-2">
      <label className="block text-xs font-medium text-gray-600">
        Features
      </label>

      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="text-gray-300 text-xs w-4 shrink-0 select-none text-right">
              {i + 1}.
            </span>
            <input
              className="flex-1 bg-white border border-gray-200 rounded-lg px-3 py-2 text-gray-700 text-sm
                         focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400/20
                         placeholder:text-gray-400 transition-colors"
              value={item}
              onChange={(e) => update(i, e.target.value)}
              placeholder={`Feature ${i + 1}`}
            />
            <button
              onClick={() => remove(i)}
              className="text-gray-300 hover:text-gray-600 p-1 rounded transition-colors shrink-0"
              title="Remove"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={add}
        className="w-full border border-dashed border-gray-300 hover:border-gray-400 bg-gray-50 hover:bg-gray-100
                   text-gray-500 hover:text-gray-700 text-xs font-medium py-2 rounded-lg transition-colors"
      >
        Add feature
      </button>
    </div>
  );
}
