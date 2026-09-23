import { useEffect } from "react";

export function useKeyboardShortcuts({ onDownload, onPalette, onReset, onUndo, onRedo }) {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA" || e.target.isContentEditable) {
        if (!(e.metaKey || e.ctrlKey)) return;
      }

      const isMac = navigator.platform.includes("Mac");
      const mod = isMac ? e.metaKey : e.ctrlKey;

      if (mod && e.key === "s" && !e.shiftKey) {
        e.preventDefault();
        onDownload?.();
      } else if (mod && e.shiftKey && e.key === "P") {
        e.preventDefault();
        onPalette?.();
      } else if (mod && e.shiftKey && e.key === "R") {
        e.preventDefault();
        onReset?.();
      } else if (mod && !e.shiftKey && (e.key === "z" || e.key === "Z")) {
        e.preventDefault();
        onUndo?.();
      } else if (mod && (e.key === "y" || e.key === "Y") || (mod && e.shiftKey && (e.key === "z" || e.key === "Z"))) {
        e.preventDefault();
        onRedo?.();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onDownload, onPalette, onReset, onUndo, onRedo]);
}