import { useState } from "react";
import EditBlockFields from "../blocks/EditBlockFields.jsx";
import { cloneContent } from "../../lib/clone.js";

export default function InlineBlockEditor({ block, updateBlock }) {
  const [content, setContent] = useState(() => cloneContent(block.content));

  function setAndSave(action) {
    setContent((prev) => {
      const next = typeof action === "function" ? action(prev) : action;
      updateBlock(block.id, next);
      return next;
    });
  }

  return (
    <EditBlockFields block={block} content={content} setContent={setAndSave} />
  );
}
