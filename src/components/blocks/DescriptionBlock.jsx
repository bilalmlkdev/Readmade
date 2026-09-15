export default function DescriptionBlock({ content, onChange }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-medium text-gray-600">
        About text
      </label>
      <textarea
        className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-gray-700 text-sm
                   focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400/20
                   placeholder:text-gray-400 transition-colors resize-none leading-relaxed"
        rows={5}
        value={content.text || ""}
        onChange={(e) => onChange({ text: e.target.value })}
        placeholder="Describe your project..."
      />
    </div>
  );
}
