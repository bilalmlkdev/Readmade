import { TOKEN_CLASS } from "../../lib/codeTokenizer.js";

export default function HighlightedLine({ tokens }) {
  if (!tokens.length) return <span className="text-transparent"> </span>;
  return (
    <>
      {tokens.map((t, i) => (
        <span key={i} className={TOKEN_CLASS[t.type] || TOKEN_CLASS.plain}>
          {t.text}
        </span>
      ))}
    </>
  );
}
