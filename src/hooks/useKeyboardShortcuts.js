import { useEffect } from "react";

export function useKeyboardShortcuts({ onDownload, onCopy, onSearch, onPalette, onReset }) {
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
      } else if (mod && e.shiftKey && e.key === "C") {
        e.preventDefault();
        onCopy?.();
      } else if (mod && e.key === "/") {
        e.preventDefault();
        onSearch?.();
      } else if (mod && e.shiftKey && e.key === "P") {
        e.preventDefault();
        onPalette?.();
      } else if (mod && e.shiftKey && e.key === "R") {
        e.preventDefault();
        onReset?.();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onDownload, onCopy, onSearch, onPalette, onReset]);
}