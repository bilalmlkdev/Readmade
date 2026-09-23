import { cn } from "../../lib/cn";
import { Timer, Blocks, BarChart3, MousePointerClick, Globe } from "lucide-react";

const features = [
  { id: "setup", children: <SetupVisual />, className: "md:col-span-2" },
  { id: "blocks", children: <BlocksVisual />, className: "md:col-span-2" },
  { id: "preview", children: <PreviewVisual />, className: "sm:col-span-2 md:col-span-2" },
  { id: "canvas", children: <CanvasVisual />, className: "sm:col-span-2 md:col-span-3 p-0" },
  { id: "export", children: <ExportVisual />, className: "sm:col-span-2 md:col-span-3 p-0" },
];

export function FeatureBento() {
  return (
    <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-6">
      {features.map((feature) => (
        <FeatureCard className={feature.className} key={feature.id}>
          {feature.children}
        </FeatureCard>
      ))}
    </div>
  );
}

function FeatureCard({ children, className }) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border bg-background px-8 pt-8 pb-6",
        className,
      )}
    >
      {children}
    </div>
  );
}

function FeatureTitle({ className, ...props }) {
  return <h3 className={cn("text-lg font-medium text-foreground", className)} {...props} />;
}

function FeatureDescription({ className, ...props }) {
  return <p className={cn("text-sm text-muted-foreground", className)} {...props} />;
}

function SetupVisual() {
  return (
    <>
      <div className="relative mx-auto flex size-32 items-center justify-center rounded-full border-4 border-dashed bg-background shadow-xs outline outline-border outline-offset-4">
        <div className="absolute inset-0 z-10 scale-120 rounded-full bg-radial from-foreground/20 via-foreground/5 to-transparent blur-xl" />
        <Timer className="size-14 text-primary/90" />
      </div>
      <div className="relative mt-8 space-y-1.5 text-center">
        <FeatureTitle>Minutes to first README</FeatureTitle>
        <FeatureDescription>
          Open the app, drop blocks, and export. No account, no setup wizard.
        </FeatureDescription>
      </div>
    </>
  );
}

function BlocksVisual() {
  return (
    <>
      <div className="relative mx-auto flex size-32 items-center justify-center rounded-full border bg-background shadow-xs outline outline-border outline-offset-4">
        <Blocks className="size-20 text-primary/70" strokeWidth={1.2} />
        <div className="absolute inset-0 scale-120 rounded-full bg-radial from-foreground/15 via-foreground/5 to-transparent blur-xl" />
      </div>
      <div className="relative mt-8 space-y-1.5 text-center">
        <FeatureTitle>11 ready-made blocks</FeatureTitle>
        <FeatureDescription>
          Title, badges, features, install, usage, API, license, and custom Markdown.
        </FeatureDescription>
      </div>
    </>
  );
}

function PreviewVisual() {
  return (
    <>
      <div className="min-h-32">
        <div className="absolute top-8 left-8 flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
            <BarChart3 className="size-4" />
          </div>
          <div className="font-medium text-muted-foreground">Live</div>
        </div>
        <div className="translate-x-[5%] -rotate-2 scale-150">
          <ChartSvg />
        </div>
      </div>
      <div className="relative z-10 mt-8 space-y-1.5 text-center">
        <FeatureTitle>GitHub-faithful preview</FeatureTitle>
        <FeatureDescription>
          See exactly what GitHub will render while you edit - badges, tables, code.
        </FeatureDescription>
      </div>
    </>
  );
}

function CanvasVisual() {
  return (
    <div className="grid h-full sm:grid-cols-2">
      <div className="relative z-10 space-y-6 py-8 pe-2 ps-8">
        <div className="flex size-12 items-center justify-center rounded-full border bg-card shadow-xs outline outline-border/80 outline-offset-2">
          <MousePointerClick className="size-5 text-primary/80" />
        </div>
        <div className="space-y-2">
          <FeatureTitle className="text-base">Visual drag-and-drop</FeatureTitle>
          <FeatureDescription>
            Reorder sections without touching raw Markdown syntax.
          </FeatureDescription>
        </div>
      </div>
      <div className="mask-b-from-90% mask-r-from-90% relative aspect-video sm:aspect-auto">
        <div className="absolute -right-1 -bottom-1 aspect-video max-h-50 rounded-tl-md border border-border bg-card p-1 sm:max-h-42 md:aspect-square md:max-h-50 lg:aspect-16/12">
          <div className="aspect-video h-full overflow-hidden rounded-tl-sm border border-border *:pointer-events-none *:size-full *:shrink-0 *:select-none">
            <img alt="Canvas preview" className="dark:hidden" height={360} src="/dashboard.png" width={640} />
            <img alt="Canvas preview" className="hidden dark:block" height={360} src="/dashboard.png" width={640} />
          </div>
        </div>
      </div>
    </div>
  );
}

function ExportVisual() {
  return (
    <div className="grid max-h-120 sm:grid-cols-2">
      <div className="space-y-6 pt-8 pb-4 pl-8 sm:pb-8">
        <div className="flex size-12 items-center justify-center rounded-full border bg-card shadow-xs outline outline-border/80 outline-offset-2">
          <Globe className="size-5 text-primary/80" />
        </div>
        <div className="space-y-2">
          <FeatureTitle className="text-base">Export anywhere</FeatureTitle>
          <FeatureDescription>
            Copy Markdown to clipboard or download README.md. Your data stays local.
          </FeatureDescription>
        </div>
      </div>
      <div className="relative flex items-center justify-center p-6">
        <div className="w-full max-w-[220px] space-y-2 rounded-xl border border-border bg-card p-4 shadow-lg">
          {["README.md", "clipboard", "GitHub"].map((item) => (
            <div
              key={item}
              className="flex items-center gap-2 rounded-md border border-border/50 bg-muted/40 px-2 py-1.5"
            >
              <span className="size-1.5 rounded-full bg-primary/60" />
              <span className="font-mono text-[10px] text-muted-foreground">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ChartSvg(props) {
  return (
    <svg fill="none" viewBox="0 0 300 128" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        clipRule="evenodd"
        d="M3 123C3 123 14.33 94.15 35.13 88.1C55.93 82.04 65.93 80.55 65.93 80.55C65.93 80.55 80.7 80.55 92.18 80.55C103.66 80.55 100.89 63.53 109.06 63.53C117.23 63.53 117.22 91.97 124.78 91.97C132.34 91.97 142.26 78.03 153.83 80.55C165.4 83.07 186.83 91.97 193.76 91.97C200.7 91.97 206.3 63.53 214.07 63.53C221.84 63.53 238.65 93.78 244.23 91.97C249.81 90.17 258.8 60 266.19 60C272.08 60 284.1 88.06 286.68 88.1C294.76 88.22 300.19 72.93 305.42 72.93C312.32 72.93 323.38 65.24 335.55 63.53C347.73 61.83 348.22 82.07 363.64 80.55C367.88 80.13 372.95 82.2 376.44 87.1C379.45 91.33 381.05 97.43 382.52 104.65C383.48 109.36 382.52 123 382.52 123"
        fill="currentColor"
        className="text-primary/20"
        fillRule="evenodd"
      />
      <path
        d="M3 121.08C3 121.08 15.3 93.67 36.02 87.76C56.73 81.84 66.66 80.97 66.66 80.97C66.66 80.97 80.03 80.97 91.47 80.97C102.9 80.97 100.42 64.28 108.56 64.28C116.7 64.28 117.69 92.13 125.23 92.13C132.76 92.13 142.07 78.51 153.59 80.97C165.11 83.43 186.09 92.13 193 92.13C199.91 92.13 205.27 64.28 213.02 64.28C220.76 64.28 237.83 93.89 243.39 92.13C248.95 90.37 257.92 60.5 265.28 60.5C271.15 60.5 283.2 87.72 285.77 87.76C293.82 87.87 299.2 73.08 304.41 73.08C311.28 73.08 321.43 65.95 333.55 64.28C345.68 62.61 346.91 82.46 362.27 80.97C377.63 79.49 383 106.61 383 106.61"
        stroke="currentColor"
        className="text-primary"
        strokeWidth="1"
      />
    </svg>
  );
}
