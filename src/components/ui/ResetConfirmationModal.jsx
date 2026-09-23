import { useRef } from "react";
import { useFocusTrap } from "../../hooks/useFocusTrap.js";

export default function ResetConfirmationModal({
  isOpen,
  onConfirm,
  onCancel,
}) {
  const dialogRef = useRef(null);
  useFocusTrap(dialogRef, isOpen, onCancel);

  if (!isOpen) return null;

  return (
    <div
      onClick={onCancel}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    >
      <div
        ref={dialogRef}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="reset-modal-title"
        aria-describedby="reset-modal-description"
        className="bg-white dark:bg-[#161616] rounded-xl shadow-2xl shadow-black/10 border border-gray-200 dark:border-white/10 max-w-[360px] w-full mx-4 p-5 outline-none"
      >
        <h3
          id="reset-modal-title"
          className="text-[15px] font-semibold text-gray-900 dark:text-white mb-1.5"
        >
          Reset workspace?
        </h3>
        <p
          id="reset-modal-description"
          className="text-gray-500 dark:text-gray-400 text-[13px] leading-relaxed mb-5"
        >
          This clears every block and setting. You'll start over with a fresh
          README - this can't be undone.
        </p>

        <div className="flex gap-2">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2 text-[13px] font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/15 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2 text-[13px] font-medium text-white bg-gray-900 dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-white/90 rounded-lg transition-colors"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
