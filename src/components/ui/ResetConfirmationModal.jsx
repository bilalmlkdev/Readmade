import { useEffect, useRef } from "react";

export default function ResetConfirmationModal({
  isOpen,
  onConfirm,
  onCancel,
}) {
  const dialogRef = useRef(null);
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
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      onClick={onCancel}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px]"
    >
      <div
        ref={dialogRef}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="reset-modal-title"
        aria-describedby="reset-modal-description"
        className="bg-white rounded-xl shadow-2xl shadow-black/10 border border-gray-200 max-w-[360px] w-full mx-4 p-5 outline-none"
      >
        <h3 id="reset-modal-title" className="text-[15px] font-semibold text-gray-900 mb-1.5">
          Reset workspace?
        </h3>
        <p id="reset-modal-description" className="text-gray-500 text-[13px] leading-relaxed mb-5">
          This clears every block and setting. You'll start over with a fresh
          README — this can't be undone.
        </p>

        <div className="flex gap-2">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2 text-[13px] font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2 text-[13px] font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-lg transition-colors"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
