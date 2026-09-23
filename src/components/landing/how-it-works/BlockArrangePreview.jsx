import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { cn } from "../../../lib/cn";
import { wait } from "./canvasData";
import { GridDots, ProgressDots } from "./canvasParts";

export function BlockArrangePreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-50px" });
  const [order, setOrder] = useState([0, 1, 2, 3]);
  const [swapped, setSwapped] = useState(false);

  useEffect(() => {
    if (!isInView) return;
    let cancelled = false;

    const sequence = async () => {
      while (!cancelled) {
        await wait(50);
        if (cancelled) return;
        setOrder([0, 1, 2, 3]);
        setSwapped(false);
        await wait(800);
        if (cancelled) return;
        setOrder([0, 2, 1, 3]);
        setSwapped(true);
        await wait(3500);
      }
    };
    sequence();
    return () => {
      cancelled = true;
    };
  }, [isInView]);

  const items = ["Title", "Features", "Badges", "License"];

  return (
    <div ref={ref} className="relative h-full w-full overflow-hidden">
      <GridDots />
      <div className="absolute inset-0 flex flex-col justify-center gap-2 p-4 sm:p-6">
        {order.map((idx, i) => (
          <div
            key={items[idx]}
            className={cn(
              "flex items-center gap-2 rounded-lg border bg-card px-3 py-2 shadow-sm transition-all duration-500",
              swapped && i === 1 ? "border-primary/40" : "border-border",
            )}
            style={{ transform: `translateX(${i * 4}px)` }}
          >
            <span className="font-mono text-[10px] text-muted-foreground">{i + 1}</span>
            <span className="text-[11px] font-medium text-foreground">{items[idx]}</span>
            <span className="ml-auto text-[9px] text-muted-foreground">::</span>
          </div>
        ))}
      </div>
      <ProgressDots count={4} active={swapped ? 4 : 2} />
    </div>
  );
}
