import { X } from "lucide-react";

export default function ContributingBlock({ content, onChange }) {
  const steps = content.steps || [];

  const updateStep = (i, val) =>
    onChange({ steps: steps.map((x, idx) => (idx === i ? val : x)) });
  const addStep = () => onChange({ steps: [...steps, ""] });
  const removeStep = (i) =>
    onChange({ steps: steps.filter((_, idx) => idx !== i) });

  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <label className="block text-xs font-medium text-gray-600">
          Intro text
        </label>
        <textarea
          className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-gray-700 text-sm
                     focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400/20
                     placeholder:text-gray-400 transition-colors resize-none"
          rows={2}
          value={content.text || ""}
          onChange={(e) => onChange({ text: e.target.value })}
          placeholder="Contributions are welcome..."
        />
      </div>

      <div className="space-y-1.5">
        <label className="block text-xs font-medium text-gray-600">Steps</label>
        <div className="space-y-2">
          {steps.map((step, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-gray-400 text-xs font-medium w-5 shrink-0 text-right">
                {i + 1}.
              </span>
              <input
                className="flex-1 bg-white border border-gray-200 rounded-lg px-3 py-2 text-gray-700 text-sm
                           focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400/20
                           placeholder:text-gray-400 transition-colors"
                value={step}
                onChange={(e) => updateStep(i, e.target.value)}
                placeholder={`Step ${i + 1}`}
              />
              <button
                onClick={() => removeStep(i)}
                className="text-gray-300 hover:text-gray-600 p-1 rounded transition-colors shrink-0"
              >
                <X size={14} />
              </button>
            </div>
          ))}
          <button
            onClick={addStep}
            className="w-full border border-dashed border-gray-300 hover:border-gray-400 bg-gray-50 hover:bg-gray-100
                       text-gray-500 hover:text-gray-700 text-xs font-medium py-2 rounded-lg transition-colors"
          >
            Add step
          </button>
        </div>
      </div>
    </div>
  );
}
