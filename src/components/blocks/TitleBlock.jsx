export default function TitleBlock({ content, onChange }) {
  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <label className="block text-xs font-medium text-gray-600">
          Project name
        </label>
        <input
          className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-gray-800 text-sm
                     focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400/20
                     placeholder:text-gray-400 transition-colors"
          value={content.name || ""}
          onChange={(e) => onChange({ name: e.target.value })}
          placeholder="My Awesome Project"
        />
      </div>

      <div className="space-y-1.5">
        <label className="block text-xs font-medium text-gray-600">
          Tagline
        </label>
        <input
          className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-gray-700 text-sm
                     focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400/20
                     placeholder:text-gray-400 transition-colors"
          value={content.tagline || ""}
          onChange={(e) => onChange({ tagline: e.target.value })}
          placeholder="A short, snappy description"
        />
      </div>
    </div>
  );
}
