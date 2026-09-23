import { useEffect, useRef } from "react";
import useReadme from "../store/useReadme.js";

// Debounced autosave of blocks into history (2s idle)
export function useAutosaveHistory() {
  const blocks = useReadme((s) => s.blocks);
  const saveToHistory = useReadme((s) => s.saveToHistory);
  const saveTimeoutRef = useRef(null);
  const lastSavedBlocksRef = useRef(null);

  useEffect(() => {
    if (blocks.length === 0) return;
    const blocksKey = JSON.stringify(blocks);
    if (blocksKey === lastSavedBlocksRef.current) return;

    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    saveTimeoutRef.current = setTimeout(() => {
      lastSavedBlocksRef.current = blocksKey;
      saveToHistory();
    }, 2000);

    return () => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    };
  }, [blocks, saveToHistory]);
}
