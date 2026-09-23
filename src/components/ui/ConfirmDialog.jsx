// Shared nested confirmation dialog (solid overlay, no blur)
export default function ConfirmDialog({
  title,
  description,
  confirmLabel,
  onConfirm,
  onCancel,
  titleId,
  descId,
}) {
  return (
    <div
      className="absolute inset-0 z-10 flex items-center justify-center bg-black/50 rounded-2xl p-4" onClick={(e) => {
        e.stopPropagation();
        onCancel();
      }}
    >
      <div
        role="dialog" aria-modal="true" aria-labelledby={titleId}
        aria-describedby={descId}
        className="bg-white dark:bg-[#161616] rounded-xl shadow-2xl shadow-black/10 border border-gray-200 dark:border-white/10 max-w-[360px] w-full p-5" onClick={(e) => e.stopPropagation()}
      >
        <h3
          id={titleId}
          className="text-[15px] font-semibold text-gray-900 dark:text-white mb-1.5"
        >
          {title}
        </h3>
        <p
          id={descId}
          className="text-gray-500 dark:text-gray-400 text-[13px] leading-relaxed mb-5"
        >
          {description}
        </p>
        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onCancel();
            }}
            className="flex-1 px-4 py-2 text-[13px] font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/15 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2 text-[13px] font-medium text-white bg-gray-900 dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-white/90 rounded-lg"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
