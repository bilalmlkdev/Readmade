import { useState, useRef, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";

export default function Tooltip({ children, content, side = "right", delay = 300 }) {
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const triggerRef = useRef(null);
  const timeoutRef = useRef(null);

  const show = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      if (!triggerRef.current) return;
      const rect = triggerRef.current.getBoundingClientRect();
      const gap = 12;
      let top, left;

      if (side === "right") {
        top = rect.top + rect.height / 2;
        left = rect.right + gap;
      } else if (side === "left") {
        top = rect.top + rect.height / 2;
        left = rect.left - gap;
      } else if (side === "top") {
        top = rect.top - gap;
        left = rect.left + rect.width / 2;
      } else {
        top = rect.bottom + gap;
        left = rect.left + rect.width / 2;
      }

      setCoords({ top, left });
      setVisible(true);
    }, delay);
  }, [delay, side]);

  const hide = useCallback(() => {
    clearTimeout(timeoutRef.current);
    setVisible(false);
  }, []);

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  const transform =
    side === "right" ? "translateY(-50%)" :
    side === "left" ? "translate(-100%, -50%)" :
    side === "top" ? "translate(-50%, -100%)" :
    "translate(-50%, 0)";

  return (
    <>
      <span
        ref={triggerRef}
        onMouseEnter={show}
        onMouseLeave={hide}
        className="inline-flex"
      >
        {children}
      </span>
      {createPortal(
        visible ? (
          <div
            role="tooltip"
            className="fixed z-[9999] pointer-events-none px-2.5 py-1.5 rounded-lg bg-gray-900 text-white text-[11px] font-medium leading-tight whitespace-nowrap shadow-lg"
            style={{ top: coords.top, left: coords.left, transform }}
          >
            {content}
          </div>
        ) : null,
        document.body
      )}
    </>
  );
}
