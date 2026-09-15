export default function CustomBlock({ content, onChange }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-medium text-gray-600">
        Markdown content
      </label>
      <textarea
        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-gray-800 text-sm font-mono
                   focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400/20
                   placeholder:text-gray-400 transition-colors resize-none leading-relaxed"
        rows={10}
        value={content.markdown || ""}
        onChange={(e) => onChange({ markdown: e.target.value })}
        placeholder={"## Section Title\n\nWrite any **markdown** here..."}
        spellCheck={false}
      />
    </div>
  );
}
