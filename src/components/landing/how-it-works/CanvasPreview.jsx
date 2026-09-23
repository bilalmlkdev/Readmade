import { motion } from "motion/react";
import { BlockComposePreview } from "./BlockComposePreview";
import { BlockArrangePreview } from "./BlockArrangePreview";
import { BlockLivePreview } from "./BlockLivePreview";
import { BlockExportPreview } from "./BlockExportPreview";

const PREVIEWS = {
  Compose: BlockComposePreview,
  Arrange: BlockArrangePreview,
  Preview: BlockLivePreview,
  Export: BlockExportPreview,
};

export function CanvasPreview({ visual }) {
  const PreviewComponent = PREVIEWS[visual] ?? BlockComposePreview;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="w-full"
    >
      <div className="mask-b-from-55% relative">
        <div className="inset-shadow-2xs ring-background bg-background dark:inset-shadow-white/20 relative rounded-2xl border border-border p-4 shadow-lg shadow-zinc-950/15 ring-1">
          <div className="overflow-hidden rounded-xl border border-border/50 bg-card shadow-lg">
            <div className="flex items-center gap-1.5 border-b border-border/50 bg-muted/50 px-2.5 py-1.5 sm:px-3 sm:py-2">
              <div className="flex gap-1 sm:gap-1.5">
                <div className="size-2 rounded-full bg-muted-foreground/15 sm:size-2.5" />
                <div className="size-2 rounded-full bg-muted-foreground/15 sm:size-2.5" />
                <div className="size-2 rounded-full bg-muted-foreground/15 sm:size-2.5" />
              </div>
              <div className="flex flex-1 justify-center">
                <div className="rounded-md border border-border/40 bg-muted/60 px-2 py-0.5 sm:px-3">
                  <span className="font-mono text-[7px] text-muted-foreground sm:text-[9px]">
                    readmade.app/{visual.toLowerCase()}
                  </span>
                </div>
              </div>
              <div className="w-8 sm:w-12" />
            </div>
            <div className="relative aspect-[4/3] w-full bg-card/40">
              <PreviewComponent />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
