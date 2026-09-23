import { inputCls, labelCls, createHelpers } from "./editorUtils.js";

export default function TitleBlock({ content, setContent }) {
  const { handleChange } = createHelpers(setContent);

  return (
    <div className="space-y-3">
      <div>
        <label className={labelCls}>Project Name</label>
        <input
          type="text"
          value={content.name}
          onChange={(e) => handleChange("name", e.target.value)}
          className={inputCls}
        />
      </div>
      <div>
        <label className={labelCls}>Tagline</label>
        <input
          type="text"
          value={content.tagline}
          onChange={(e) => handleChange("tagline", e.target.value)}
          className={inputCls}
        />
      </div>
    </div>
  );
}
