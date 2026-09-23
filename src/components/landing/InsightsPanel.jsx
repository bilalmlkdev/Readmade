import { AnimatePresence, motion } from "motion/react";
import { Sparkles } from "lucide-react";
import { cn } from "../../lib/cn";
import { INSIGHTS } from "./showcaseData";

export function InsightsPanel({ showAnalysis, isAnalyzing, visibleInsights }) {
  return (
    <AnimatePresence>
      {showAnalysis && (
        <motion.div
          className="absolute top-2 right-2 z-20 w-40 sm:top-3 sm:right-3 sm:w-48"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <div className="overflow-hidden rounded-lg border border-border bg-card/95 shadow-lg backdrop-blur-sm">
            <div className="flex items-center gap-1.5 border-b border-border bg-muted/40 px-2.5 py-1.5">
              <Sparkles className="size-3 text-primary" />
              <span className="text-[10px] font-medium text-foreground sm:text-xs">
                Live preview
              </span>
              {isAnalyzing && (
                <motion.span
                  className="ml-auto text-[9px] text-muted-foreground"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  rendering...
                </motion.span>
              )}
            </div>
            <div className="space-y-1 p-1.5">
              {INSIGHTS.map((insight, i) => (
                <AnimatePresence key={i}>
                  {visibleInsights.includes(i) && (
                    <motion.div
                      className={cn(
                        "flex items-start gap-1.5 rounded-md px-2 py-1.5 text-[10px] sm:text-[11px]",
                        insight.type === "success" &&
                          "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
                        insight.type === "info" &&
                          "bg-blue-500/10 text-blue-600 dark:text-blue-400",
                        insight.type === "warning" &&
                          "bg-amber-500/10 text-amber-600 dark:text-amber-400",
                      )}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <insight.Icon className="mt-0.5 size-3 shrink-0" />
                      <span className="leading-tight">{insight.text}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
