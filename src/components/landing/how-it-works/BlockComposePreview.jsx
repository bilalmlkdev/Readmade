import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { cn } from "../../../lib/cn";
import { BLOCK_NODES, wait } from "./canvasData";
import { GridDots, NodeChip, ProgressDots } from "./canvasParts";

export function BlockComposePreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-50px" });
  const [visible, setVisible] = useState([]);
  const [dropped, setDropped] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let cancelled = false;

    const sequence = async () => {
      while (!cancelled) {
        await wait(50);
        if (cancelled) return;
        setVisible([]);
        setDropped(0);
        await wait(500);
        for (const node of BLOCK_NODES) {
          if (cancelled) return;
          setVisible((prev) => [...prev, node.id]);
          setDropped((c) => c + 1);
          await wait(400);
        }
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
      <div className="absolute top-1.5 right-1.5 z-20 rounded-md border border-primary/20 bg-primary/10 px-2 py-1">
        <span className="font-mono text-[9px] font-medium text-primary">
          {dropped}/{BLOCK_NODES.length}
        </span>
      </div>
      {BLOCK_NODES.map((node) => (
        <div
          key={node.id}
          className={cn(
            "absolute -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-300",
            visible.includes(node.id) ? "scale-100 opacity-100" : "scale-50 opacity-0",
          )}
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
        >
          <NodeChip node={node} />
        </div>
      ))}
      <ProgressDots count={BLOCK_NODES.length} active={visible.length} />
    </div>
  );
}
