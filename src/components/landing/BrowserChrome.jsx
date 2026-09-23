export function BrowserChrome({ url, children }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border/50 bg-card shadow-lg">
      <div className="flex items-center gap-2 border-b border-border/50 bg-muted/50 px-3 py-2">
        <div className="flex gap-1.5">
          <div className="size-2.5 rounded-full bg-muted-foreground/15" />
          <div className="size-2.5 rounded-full bg-muted-foreground/15" />
          <div className="size-2.5 rounded-full bg-muted-foreground/15" />
        </div>
        <div className="flex flex-1 justify-center">
          <div className="rounded-md border border-border/40 bg-muted/60 px-3 py-0.5">
            <span className="font-mono text-[9px] text-muted-foreground">{url}</span>
          </div>
        </div>
        <div className="w-12" />
      </div>
      <div className="relative w-full overflow-hidden bg-card/40">{children}</div>
    </div>
  );
}
