const MANAGERS = ["npm", "yarn", "pnpm", "bun"];

export default function InstallationBlock({ content, onChange }) {
  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <label className="block text-xs font-medium text-gray-600">
          Package manager
        </label>
        <div className="flex gap-1.5">
          {MANAGERS.map((m) => (
            <button
              key={m}
              onClick={() => onChange({ manager: m })}
              aria-pressed={content.manager === m}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                content.manager === m
                  ? "border-gray-900 text-white bg-gray-900"
                  : "border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-700 hover:bg-gray-50"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="block text-xs font-medium text-gray-600">
          Package name
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 text-sm select-none">
            $
          </span>
          <input
            className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-7 pr-3 py-2 text-gray-800 text-sm
                       focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400/20
                       placeholder:text-gray-400 transition-colors"
            value={content.package}
            onChange={(e) => onChange({ package: e.target.value })}
            placeholder="your-package-name"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="block text-xs font-medium text-gray-600">
          Extra commands <span className="text-gray-400 font-normal">(optional)</span>
        </label>
        <textarea
          className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-600 text-sm font-mono
                     focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400/20
                     placeholder:text-gray-400 transition-colors resize-none"
          rows={2}
          value={content.extra}
          onChange={(e) => onChange({ extra: e.target.value })}
          placeholder="cp .env.example .env"
          spellCheck={false}
        />
      </div>
    </div>
  );
}
