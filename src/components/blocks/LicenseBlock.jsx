const LICENSE_TYPES = [
  "MIT",
  "Apache-2.0",
  "GPL-3.0",
  "BSD-2-Clause",
  "BSD-3-Clause",
  "ISC",
  "MPL-2.0",
  "Unlicense",
];

export default function LicenseBlock({ content, onChange }) {
  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <label className="block text-xs font-medium text-gray-600">
          License type
        </label>
        <div className="flex flex-wrap gap-1.5">
          {LICENSE_TYPES.map((l) => (
            <button
              key={l}
              onClick={() => onChange({ type: l })}
              aria-pressed={content.type === l}
              className={`px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                content.type === l
                  ? "border-gray-900 text-white bg-gray-900"
                  : "border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-700 hover:bg-gray-50"
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <div className="flex-1 space-y-1.5">
          <label className="block text-xs font-medium text-gray-600">Year</label>
          <input
            className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-gray-700 text-sm
                       focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400/20
                       placeholder:text-gray-400 transition-colors"
            value={content.year || ""}
            onChange={(e) => onChange({ year: e.target.value })}
            placeholder="2025"
          />
        </div>
        <div className="flex-1 space-y-1.5">
          <label className="block text-xs font-medium text-gray-600">Author</label>
          <input
            className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-gray-700 text-sm
                       focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400/20
                       placeholder:text-gray-400 transition-colors"
            value={content.author || ""}
            onChange={(e) => onChange({ author: e.target.value })}
            placeholder="Your Name"
          />
        </div>
      </div>
    </div>
  );
}
