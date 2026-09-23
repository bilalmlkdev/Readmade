import { useEffect, useRef, useState } from "react";
import useReadme from "../store/useReadme.js";

const IDLE_MS = 900;

// Debounced autosave of blocks into history + save status for the header
export function useAutosaveHistory() {
  const blocks = useReadme((s) => s.blocks);
  const saveToHistory = useReadme((s) => s.saveToHistory);
  const [savedKey, setSavedKey] = useState(() => JSON.stringify(blocks));
  const saveTimeoutRef = useRef(null);

  const blocksKey = JSON.stringify(blocks);
  const status = blocksKey === savedKey ? "saved" : "saving";

  useEffect(() => {
    if (blocksKey === savedKey) return;

    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    saveTimeoutRef.current = setTimeout(() => {
      if (blocks.length > 0) saveToHistory();
      setSavedKey(blocksKey);
    }, IDLE_MS);

    return () => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    };
  }, [blocksKey, savedKey, blocks.length, saveToHistory]);

  return status;
}
