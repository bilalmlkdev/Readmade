import { labelCls, textareaCls, createHelpers } from "./editorUtils.js";

export default function DescriptionBlock({ content, setContent }) {
  const { handleChange } = createHelpers(setContent);

  return (
    <div>
      <label className={labelCls}>Description</label>
      <textarea
        value={content.text}
        onChange={(e) => handleChange("text", e.target.value)}
        rows={6}
        className={textareaCls}
      />
    </div>
  );
}
