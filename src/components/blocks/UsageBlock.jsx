const LANGS = ["js", "ts", "jsx", "tsx", "py", "bash", "go", "rust", "php", "ruby"];

export default function UsageBlock({ content, onChange }) {
  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <label className="block text-xs font-medium text-gray-600">
          Language
        </label>
        <div className="flex flex-wrap gap-1.5">
          {LANGS.map((l) => (
            <button
              key={l}
              onClick={() => onChange({ language: l })}
              aria-pressed={content.language === l}
              className={`px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                content.language === l
                  ? "border-gray-900 text-white bg-gray-900"
                  : "border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-700 hover:bg-gray-50"
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="block text-xs font-medium text-gray-600">
          Code
        </label>
        <textarea
          className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-gray-800 text-sm font-mono
                     focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400/20
                     placeholder:text-gray-400 transition-colors resize-none leading-relaxed"
          rows={8}
          value={content.code}
          onChange={(e) => onChange({ code: e.target.value })}
          placeholder="// your example code here"
          spellCheck={false}
        />
      </div>
    </div>
  );
}
