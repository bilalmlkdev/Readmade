import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { cn } from "../../../lib/cn";
import { Check, Info, AlertTriangle, Sparkles } from "lucide-react";
import { wait } from "./canvasData";
import { GridDots, ProgressDots } from "./canvasParts";

const code = [
  "# My Project",
  "",
  "> A modern toolkit",
  "",
  "## Features",
  "- Fast",
  "- Local",
];

const insights = ["GitHub-ready structure", "Add screenshots", "License present"];

export function BlockLivePreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-50px" });
  const [line, setLine] = useState(0);
  const [showPanel, setShowPanel] = useState(false);

  useEffect(() => {
    if (!isInView) return;
    let cancelled = false;

    const sequence = async () => {
      while (!cancelled) {
        await wait(50);
        if (cancelled) return;
        setLine(0);
        setShowPanel(false);
        await wait(400);
        for (let i = 1; i <= 6; i++) {
          if (cancelled) return;
          setLine(i);
          await wait(200);
        }
        setShowPanel(true);
        await wait(3500);
      }
    };
    sequence();
    return () => {
      cancelled = true;
    };
  }, [isInView]);

  const insightIcons = [Check, Info, AlertTriangle];
  const insightClasses = [
    "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  ];

  return (
    <div ref={ref} className="relative h-full w-full overflow-hidden">
      <GridDots />
      <div className="absolute inset-0 flex flex-col p-3 sm:p-4">
        <div className="mb-2 flex items-center gap-1.5">
          <Sparkles className="size-3 text-primary" />
          <span className="font-mono text-[9px] text-muted-foreground">preview</span>
        </div>
        <div className="flex-1 space-y-0.5 rounded-md border border-border/50 bg-muted/30 p-2 font-mono text-[8px] leading-relaxed sm:text-[10px]">
          {code.map((l, i) => {
            const Icon = insightIcons[i % insightIcons.length];
            return (
              <div
                key={i}
                className={cn(
                  "transition-opacity duration-200",
                  i < line ? "opacity-100" : "opacity-0",
                )}
              >
                <span className="mr-2 text-muted-foreground/40">{i + 1}</span>
                <span className={i === 0 ? "text-foreground" : "text-muted-foreground"}>{l}</span>
                <Icon className="ml-2 inline size-2 opacity-0" />
              </div>
            );
          })}
        </div>
        <AnimatePresence>
          {showPanel && (
            <motion.div
              className="absolute top-2 right-2 w-36 rounded-md border border-border bg-card/95 p-1.5 shadow-lg sm:w-44"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
            >
              {insights.map((text, i) => {
                const Icon = insightIcons[i];
                return (
                  <div
                    key={text}
                    className={cn(
                      "mb-1 flex items-start gap-1 rounded px-1.5 py-1 text-[9px]",
                      insightClasses[i],
                    )}
                  >
                    <Icon className="mt-0.5 size-2.5 shrink-0" />
                    <span>{text}</span>
                  </div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <ProgressDots count={4} active={line >= 6 ? 4 : 3} />
    </div>
  );
}
