import { X } from "lucide-react";
import {
  inputFlexCls,
  labelCls,
  textareaCls,
  createHelpers,
} from "./editorUtils.js";

export default function FaqBlock({ content, setContent }) {
  const { handleArrayChange, handleArrayRemove, handleArrayAdd } =
    createHelpers(setContent);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className={labelCls}>Questions</label>
        <button
          type="button"
          onClick={() =>
            handleArrayAdd("entries", { question: "New question?", answer: "" })
          }
          className="text-[12px] font-medium text-black dark:text-white hover:text-black/80 dark:hover:text-white/80"
        >
          + Add Question
        </button>
      </div>
      <div className="space-y-3">
        {content.entries.map((entry, i) => (
          <div
            key={i}
            className="space-y-2 p-3 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 rounded-lg"
          >
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={entry.question}
                placeholder="Question"
                onChange={(e) =>
                  handleArrayChange("entries", i, "question", e.target.value)
                }
                className={inputFlexCls}
              />
              <button
                type="button"
                onClick={() => handleArrayRemove("entries", i)}
                className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded"
                title="Remove"
              >
                <X size={13} />
              </button>
            </div>
            <textarea
              value={entry.answer}
              placeholder="Answer"
              rows={3}
              onChange={(e) =>
                handleArrayChange("entries", i, "answer", e.target.value)
              }
              className={textareaCls}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
