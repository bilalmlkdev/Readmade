import { useEffect } from "react";

export default function LoadingSpinner({ onComplete, duration = 450 }) {
  useEffect(() => {
    const t = setTimeout(() => onComplete?.(), duration);
    return () => clearTimeout(t);
  }, [onComplete, duration]);

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center" style={{ background: "var(--bg)" }}>
      <div className="w-[34px] h-[34px] rounded-full border-[3px] border-gray-200 dark:border-white/10 border-t-gray-500 dark:border-t-white/60 animate-spin" />
    </div>
  );
}