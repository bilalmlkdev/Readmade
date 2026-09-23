import { labelCls, inputCls, createHelpers } from "./editorUtils.js";

export default function TaglineBlock({ content, setContent }) {
  const { handleChange } = createHelpers(setContent);

  return (
    <div>
      <label className={labelCls}>Tagline</label>
      <input
        type="text"
        value={content.text}
        onChange={(e) => handleChange("text", e.target.value)}
        className={inputCls}
      />
    </div>
  );
}
