import { AnimatePresence, motion } from "motion/react";
import { cn } from "../../lib/cn";
import { EDGES, NODES } from "./showcaseData";
import { InsightsPanel } from "./InsightsPanel";

export function ShowcaseCanvas({
  svgRef,
  positions,
  visibleNodes,
  visibleEdges,
  showAnalysis,
  isAnalyzing,
  visibleInsights,
}) {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden bg-card/40 sm:aspect-[16/10] md:aspect-[16/9]">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(color-mix(in srgb, var(--muted-foreground) 18%, transparent) 1px, transparent 0)",
          backgroundSize: "20px 20px",
        }}
      />

      <svg ref={svgRef} className="absolute inset-0 h-full w-full" style={{ overflow: "visible" }}>
        {EDGES.map((edge, i) => {
          const from = positions[edge.from];
          const to = positions[edge.to];
          if (!from || !to) return null;
          const dx = to.x - from.x;
          const path = `M ${from.x} ${from.y} C ${from.x + dx * 0.4} ${from.y}, ${to.x - dx * 0.4} ${to.y}, ${to.x} ${to.y}`;
          const isVisible = visibleEdges.includes(i);
          return (
            <g key={i}>
              <motion.path
                d={path}
                fill="none"
                className="stroke-muted-foreground/30"
                strokeWidth={1.5}
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={
                  isVisible ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }
                }
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
              {isVisible && (
                <motion.circle
                  r={3}
                  className="fill-primary"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <animateMotion dur="2s" repeatCount="indefinite" path={path} />
                </motion.circle>
              )}
            </g>
          );
        })}
      </svg>

      {NODES.map((node) => (
        <AnimatePresence key={node.id}>
          {visibleNodes.includes(node.id) && (
            <motion.div
              className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <div className="flex items-center gap-1.5 rounded-lg border border-border bg-card px-2.5 py-1.5 shadow-md sm:gap-2 sm:rounded-xl sm:px-3 sm:py-2">
                <div
                  className={cn(
                    "flex size-6 items-center justify-center rounded-md sm:size-7",
                    node.bg,
                  )}
                >
                  <span className={cn("text-[10px] font-bold", node.color)}>
                    {node.label.slice(0, 2)}
                  </span>
                </div>
                <span className="text-[11px] font-medium whitespace-nowrap text-foreground sm:text-xs">
                  {node.label}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      ))}

      <InsightsPanel
        showAnalysis={showAnalysis}
        isAnalyzing={isAnalyzing}
        visibleInsights={visibleInsights}
      />

      <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-1 sm:bottom-3">
        {[1, 2, 3, 4, 5].map((s) => (
          <div
            key={s}
            className={cn(
              "h-1 rounded-full transition-all duration-300",
              visibleNodes.length >= s || (s === 5 && showAnalysis)
                ? "w-4 bg-primary"
                : "w-1 bg-muted-foreground/20",
            )}
          />
        ))}
      </div>
    </div>
  );
}
