import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";

export default function MobileDrawer({ open, onClose, title, children }) {
  const [everOpened, setEverOpened] = useState(false);
  const [prevOpen, setPrevOpen] = useState(false);
  const drawerRef = useRef(null);

  if (open && !prevOpen) setEverOpened(true);
  if (prevOpen !== open) setPrevOpen(open);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    if (open && drawerRef.current) {
      drawerRef.current.focus();
    }
  }, [open]);

  return (
    <>
      <div
        onClick={onClose}
        aria-hidden="true"
        className="md:hidden fixed inset-0 z-50 bg-black/30 backdrop-blur-sm transition-opacity duration-300"
        style={{ opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none" }}
      />
      <div
        ref={drawerRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="md:hidden fixed top-0 right-0 z-50 h-full w-[90vw] max-w-[440px]
                   bg-white border-l border-gray-200
                   flex flex-col overflow-hidden
                   transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
        style={{ transform: open ? "translateX(0)" : "translateX(100%)" }}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 shrink-0">
          <span className="text-[13px] font-medium text-gray-600">{title}</span>
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex items-center justify-center w-7 h-7 rounded-lg
                       bg-gray-100 border border-gray-200
                       text-gray-400 hover:text-gray-700 transition-colors duration-150"
          >
            <X size={14} />
          </button>
        </div>
        <div className="flex-1 min-h-0 overflow-hidden flex flex-col bg-white">
          {everOpened ? children : null}
        </div>
      </div>
    </>
  );
}