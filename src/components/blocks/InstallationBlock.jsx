import { inputCls, labelCls, textareaCls, createHelpers } from "./editorUtils.js";

export default function InstallationBlock({ content, setContent }) {
  const { handleChange } = createHelpers(setContent);

  return (
    <div className="space-y-3">
      <div>
        <label className={labelCls}>Package Manager</label>
        <select
          value={content.manager}
          onChange={(e) => handleChange("manager", e.target.value)}
          className={inputCls}
        >
          <option value="npm">npm</option>
          <option value="yarn">yarn</option>
          <option value="pnpm">pnpm</option>
          <option value="bun">bun</option>
        </select>
      </div>
      <div>
        <label className={labelCls}>Package Name</label>
        <input
          type="text" value={content.package}
          onChange={(e) => handleChange("package", e.target.value)}
          className={inputCls}
        />
      </div>
      <div>
        <label className={labelCls}>Extra Commands (optional)</label>
        <textarea
          value={content.extra}
          onChange={(e) => handleChange("extra", e.target.value)}
          rows={3}
          className={textareaCls}
          placeholder="Additional install steps..."
        />
      </div>
    </div>
  );
}
