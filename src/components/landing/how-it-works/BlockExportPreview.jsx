import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { cn } from "../../../lib/cn";
import { Check, Download } from "lucide-react";
import { wait } from "./canvasData";
import { GridDots, ProgressDots } from "./canvasParts";

const files = ["README.md", "clipboard", "GitHub"];

export function BlockExportPreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-50px" });
  const [phase, setPhase] = useState("idle");

  useEffect(() => {
    if (!isInView) return;
    let cancelled = false;

    const sequence = async () => {
      while (!cancelled) {
        await wait(50);
        if (cancelled) return;
        setPhase("idle");
        await wait(600);
        setPhase("selecting");
        await wait(800);
        setPhase("generating");
        await wait(1000);
        setPhase("complete");
        await wait(3500);
      }
    };
    sequence();
    return () => {
      cancelled = true;
    };
  }, [isInView]);

  return (
    <div ref={ref} className="relative h-full w-full overflow-hidden">
      <GridDots />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4">
        <div
          className={cn(
            "flex items-center gap-1.5 rounded-lg border px-3 py-2 transition-all duration-300",
            phase === "idle"
              ? "border-border bg-card opacity-100"
              : "border-transparent bg-transparent opacity-0",
          )}
        >
          <Download className="size-3.5 text-primary" />
          <span className="text-[11px] font-medium text-foreground">Export README</span>
        </div>

        <div
          className={cn(
            "w-full max-w-[200px] space-y-1.5 transition-all duration-300",
            phase === "selecting" || phase === "generating"
              ? "translate-y-0 opacity-100"
              : "pointer-events-none translate-y-2 opacity-0",
          )}
        >
          {files.map((file) => (
            <div
              key={file}
              className={cn(
                "flex items-center gap-2 rounded-md border px-2 py-1.5 transition-all duration-300",
                phase !== "idle"
                  ? "border-primary/30 bg-primary/5"
                  : "border-border bg-card/60",
              )}
            >
              <span className="size-1.5 rounded-full bg-primary/60" />
              <span className="font-mono text-[10px] text-foreground">{file}</span>
              {phase === "complete" && <Check className="ml-auto size-3 text-primary" />}
            </div>
          ))}
        </div>

        <div
          className={cn(
            "rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 transition-all duration-300",
            phase === "complete" ? "scale-100 opacity-100" : "scale-90 opacity-0",
          )}
        >
          <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
            Export complete
          </span>
        </div>
      </div>
      <ProgressDots
        count={3}
        active={
          phase === "complete" ? 3 : phase === "generating" ? 2 : phase === "selecting" ? 1 : 0
        }
      />
    </div>
  );
}
