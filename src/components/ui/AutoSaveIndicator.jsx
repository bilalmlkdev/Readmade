import { useEffect, useState, useRef } from "react";
import { useReadme } from "../../store/useReadme.js";
import { Save, Clock, CheckCircle } from "lucide-react";

export default function AutoSaveIndicator() {
  const blocks = useReadme((s) => s.blocks);
  const [status, setStatus] = useState("saved");
  const [lastSaved, setLastSaved] = useState(null);
  const prevBlocksRef = useRef(blocks);

  useEffect(() => {
    if (prevBlocksRef.current === blocks) return;
    prevBlocksRef.current = blocks;

    setStatus("saving");
    const timer = setTimeout(() => {
      setStatus("saved");
      setLastSaved(new Date());
    }, 300);
    return () => clearTimeout(timer);
  }, [blocks]);

  const formatTime = (date) => {
    if (!date) return "Just now";
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  if (blocks.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-40 flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-gray-200 shadow-lg shadow-black/10 animate-in slide-in-from-bottom-4 duration-200">
      {status === "saving" ? (
        <>
          <Save size={14} className="text-gray-400 animate-spin" />
          <span className="text-[11px] text-gray-500 font-medium">Saving…</span>
        </>
      ) : (
        <>
          <CheckCircle size={14} className="text-green-500" />
          <span className="text-[11px] text-gray-500 font-medium">Saved</span>
          <span className="text-[10px] text-gray-300">·</span>
          <Clock size={12} className="text-gray-300" />
          <span className="text-[10px] text-gray-400">{formatTime(lastSaved)}</span>
        </>
      )}
    </div>
  );
}