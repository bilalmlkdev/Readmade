import { cn } from "../../../lib/cn";
import { AnimatedTextBlock } from "./AnimatedTextBlock";
import { CanvasPreview } from "./CanvasPreview";

export function StepSection({ step, index, isLast }) {
  const isReversed = index % 2 !== 0;

  return (
    <div
      className={cn(
        "grid grid-cols-1 items-center gap-6 sm:gap-8 md:grid-cols-2 lg:gap-14",
        !isLast && "pb-12 sm:pb-16 md:pb-20 lg:pb-24",
      )}
    >
      <div className={cn("order-2", isReversed ? "md:order-2" : "md:order-1")}>
        <AnimatedTextBlock
          step={step.step}
          title={step.title}
          description={step.description}
          highlights={step.highlights}
          icon={step.icon}
        />
      </div>

      <div className={cn("order-1", isReversed ? "md:order-1" : "md:order-2")}>
        <CanvasPreview visual={step.visual} />
      </div>
    </div>
  );
}
