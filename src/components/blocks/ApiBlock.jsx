export default function ApiBlock({ content, onChange }) {
  const entries = content.entries || [];

  const update = (i, field, val) => {
    onChange({
      entries: entries.map((x, idx) =>
        idx === i ? { ...x, [field]: val } : x
      ),
    });
  };
  const add = () =>
    onChange({
      entries: [...entries, { name: "", description: "", params: "" }],
    });
  const remove = (i) =>
    onChange({ entries: entries.filter((_, idx) => idx !== i) });

  return (
    <div className="space-y-3">
      <label className="block text-xs font-medium text-gray-600">
        API entries
      </label>

      {entries.map((entry, i) => (
        <div key={i} className="bg-white border border-gray-200 rounded-lg p-3 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-[11px] font-medium text-gray-400">
              Entry {i + 1}
            </span>
            <button
              onClick={() => remove(i)}
              className="text-gray-400 hover:text-gray-700 text-xs transition-colors"
            >
              Remove
            </button>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-gray-600">Function</label>
            <input
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-800 text-sm font-mono
                         focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400/20
                         placeholder:text-gray-400 transition-colors"
              value={entry.name}
              onChange={(e) => update(i, "name", e.target.value)}
              placeholder="functionName(arg)"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-gray-600">Description</label>
            <input
              className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-gray-700 text-sm
                         focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400/20
                         placeholder:text-gray-400 transition-colors"
              value={entry.description}
              onChange={(e) => update(i, "description", e.target.value)}
              placeholder="What it does"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-gray-600">Parameters</label>
            <input
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-600 text-sm font-mono
                         focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400/20
                         placeholder:text-gray-400 transition-colors"
              value={entry.params}
              onChange={(e) => update(i, "params", e.target.value)}
              placeholder="param — type, description"
            />
          </div>
        </div>
      ))}

      <button
        onClick={add}
        className="w-full border border-dashed border-gray-300 hover:border-gray-400 bg-gray-50 hover:bg-gray-100
                   text-gray-500 hover:text-gray-700 text-xs font-medium py-2 rounded-lg transition-colors"
      >
        Add entry
      </button>
    </div>
  );
}
