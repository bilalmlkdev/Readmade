import { inputCls, labelCls, textareaMonoCls, createHelpers } from "./editorUtils.js";

export default function UsageBlock({ content, setContent }) {
  const { handleChange } = createHelpers(setContent);

  return (
    <div className="space-y-3">
      <div>
        <label className={labelCls}>Language</label>
        <select
          value={content.language}
          onChange={(e) => handleChange("language", e.target.value)}
          className={inputCls}
        >
          <option value="js">JavaScript</option>
          <option value="ts">TypeScript</option>
          <option value="py">Python</option>
          <option value="go">Go</option>
          <option value="rs">Rust</option>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
          <option value="sh">Bash</option>
        </select>
      </div>
      <div>
        <label className={labelCls}>Code Example</label>
        <textarea
          value={content.code}
          onChange={(e) => handleChange("code", e.target.value)}
          rows={8}
          className={textareaMonoCls}
          spellCheck={false}
        />
      </div>
    </div>
  );
}
