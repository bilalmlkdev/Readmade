export default function BadgesBlock({ content, onChange }) {
  const badges = content.badges || [];

  const update = (i, field, val) => {
    const next = badges.map((b, idx) =>
      idx === i ? { ...b, [field]: val } : b
    );
    onChange({ badges: next });
  };

  const add = () =>
    onChange({
      badges: [...badges, { label: "badge", url: "", link: "" }],
    });
  const remove = (i) =>
    onChange({ badges: badges.filter((_, idx) => idx !== i) });

  return (
    <div className="space-y-3">
      <label className="block text-xs font-medium text-gray-600">
        Badges
      </label>

      {badges.map((b, i) => (
        <div key={i} className="bg-white border border-gray-200 rounded-lg p-3 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-gray-400">
              Badge {i + 1}
            </span>
            <button
              onClick={() => remove(i)}
              className="text-gray-400 hover:text-gray-700 text-xs transition-colors"
            >
              Remove
            </button>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-gray-600">Label</label>
            <input
              className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-gray-700 text-sm
                         focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400/20
                         placeholder:text-gray-400 transition-colors"
              value={b.label}
              onChange={(e) => update(i, "label", e.target.value)}
              placeholder="build | version | license"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-gray-600">Badge URL</label>
            <input
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-600 text-sm font-mono
                         focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400/20
                         placeholder:text-gray-400 transition-colors"
              value={b.url}
              onChange={(e) => update(i, "url", e.target.value)}
              placeholder="https://img.shields.io/badge/..."
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-gray-600">
              Link <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <input
              className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-gray-600 text-sm
                         focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400/20
                         placeholder:text-gray-400 transition-colors"
              value={b.link}
              onChange={(e) => update(i, "link", e.target.value)}
              placeholder="https://github.com/user/repo"
            />
          </div>

          {b.url && (
            <div className="pt-2 border-t border-gray-100">
              <span className="text-[10px] font-medium text-gray-400 block mb-1.5">
                Preview
              </span>
              <div className="flex items-center gap-2">
                {b.link ? (
                  <a href={b.link} target="_blank" rel="noopener noreferrer">
                    <img src={b.url} alt={b.label || "badge"} className="h-5" />
                  </a>
                ) : (
                  <img src={b.url} alt={b.label || "badge"} className="h-5" />
                )}
              </div>
            </div>
          )}
        </div>
      ))}

      <button
        onClick={add}
        className="w-full border border-dashed border-gray-300 hover:border-gray-400 bg-gray-50 hover:bg-gray-100
                   text-gray-500 hover:text-gray-700 text-xs font-medium py-2 rounded-lg transition-colors"
      >
        Add badge
      </button>
    </div>
  );
}
