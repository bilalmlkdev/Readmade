import { labelCls, textareaMonoCls, createHelpers } from "./editorUtils.js";

export default function CustomBlock({ content, setContent }) {
  const { handleChange } = createHelpers(setContent);

  return (
    <div>
      <label className={labelCls}>Markdown Content</label>
      <textarea
        value={content.markdown}
        onChange={(e) => handleChange("markdown", e.target.value)}
        rows={10}
        className={textareaMonoCls}
        spellCheck={false}
      />
    </div>
  );
}
