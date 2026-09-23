import { cn } from "../../../lib/cn";

export function GridDots() {
  return (
    <div
      className="absolute inset-0 opacity-40"
      style={{
        backgroundImage:
          "radial-gradient(color-mix(in srgb, var(--muted-foreground) 18%, transparent) 1px, transparent 0)",
        backgroundSize: "20px 20px",
      }}
    />
  );
}

export function ProgressDots({ count, active }) {
  return (
    <div className="absolute bottom-1.5 left-1/2 flex -translate-x-1/2 items-center gap-1 sm:bottom-2">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "h-1 rounded-full transition-all duration-300",
            i < active ? "w-3 bg-primary" : "w-1 bg-muted-foreground/20",
          )}
        />
      ))}
    </div>
  );
}

export function NodeChip({ node }) {
  return (
    <div className="flex items-center gap-1 rounded-md border border-border bg-card px-1.5 py-1 shadow-md sm:gap-1.5 sm:rounded-lg sm:px-2 sm:py-1.5">
      <div className={cn("flex size-4 items-center justify-center rounded sm:size-5", node.bg)}>
        <span className={cn("text-[8px] font-bold sm:text-[10px]", node.color)}>
          {node.label.slice(0, 2)}
        </span>
      </div>
      <span className="text-[8px] font-medium whitespace-nowrap text-foreground sm:text-[10px]">
        {node.label}
      </span>
    </div>
  );
}
