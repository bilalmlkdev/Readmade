import { useEffect, useRef } from "react";

// Trap focus, handle Escape, restore focus when a dialog closes
export function useFocusTrap(dialogRef, isOpen, onCancel) {
  const previousFocusRef = useRef(null);
  const onCancelRef = useRef(onCancel);

  useEffect(() => {
    onCancelRef.current = onCancel;
  }, [onCancel]);

  useEffect(() => {
    if (!isOpen) return;

    const previous = document.activeElement;
    previousFocusRef.current = previous;

    const focusable = () => {
      const nodes = dialogRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      return nodes ? Array.from(nodes).filter((n) => !n.disabled) : [];
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onCancelRef.current();
        return;
      }
      if (e.key === "Tab") {
        const els = focusable();
        if (els.length === 0) return;
        const first = els[0];
        const last = els[els.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    const timer = setTimeout(() => focusable()[0]?.focus(), 0);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      clearTimeout(timer);
      previousFocusRef.current?.focus?.();
    };
  }, [isOpen, dialogRef]);
}
