import { cn } from "../../lib/cn";

export function TextureButton({
  children,
  variant = "primary",
  size = "default",
  className = "",
  ...props
}) {
  const outer = cn(
    "group w-full cursor-pointer border border-black/10 p-px transition duration-300 ease-in-out dark:border-black",
    size === "sm" ? "rounded-[6px]" : "rounded-[12px]",
    className,
  );

  const inner = cn(
    "flex h-full w-full items-center justify-center gap-2",
    size === "sm" ? "rounded-[4px] px-4 py-1 text-xs" : "rounded-[10px] px-3.5 py-[7px] text-sm",
    variant === "primary" &&
      "bg-gradient-to-b from-neutral-800 to-black text-white/90 hover:from-stone-800 hover:to-neutral-800/70 dark:from-neutral-200 dark:to-neutral-50 dark:text-black/80 dark:hover:from-stone-200 dark:hover:to-neutral-200",
    variant === "minimal" &&
      "border border-black/20 bg-white/50 text-muted-foreground hover:bg-neutral-100 dark:border-neutral-950 dark:bg-neutral-600/80 dark:hover:bg-neutral-700",
  );

  return (
    <button className={outer} {...props}>
      <div className={inner}>{children}</div>
    </button>
  );
}
