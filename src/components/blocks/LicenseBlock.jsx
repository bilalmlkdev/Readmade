import { inputCls, labelCls, createHelpers } from "./editorUtils.js";

export default function LicenseBlock({ content, setContent }) {
  const { handleChange } = createHelpers(setContent);

  return (
    <div className="space-y-3">
      <div>
        <label className={labelCls}>License Type</label>
        <select
          value={content.type}
          onChange={(e) => handleChange("type", e.target.value)}
          className={inputCls}
        >
          <option value="MIT">MIT</option>
          <option value="Apache-2.0">Apache 2.0</option>
          <option value="GPL-3.0">GPL 3.0</option>
          <option value="BSD-3-Clause">BSD 3-Clause</option>
          <option value="ISC">ISC</option>
          <option value="Unlicense">Unlicense</option>
        </select>
      </div>
      <div>
        <label className={labelCls}>Year</label>
        <input
          type="text" value={content.year}
          onChange={(e) => handleChange("year", e.target.value)}
          className={inputCls}
        />
      </div>
      <div>
        <label className={labelCls}>Author</label>
        <input
          type="text" value={content.author}
          onChange={(e) => handleChange("author", e.target.value)}
          className={inputCls}
        />
      </div>
    </div>
  );
}
