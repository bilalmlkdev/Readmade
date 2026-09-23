import { FeatureBento } from "./FeatureBento";

export function FeaturesSection() {
  return (
    <section className="w-full" id="features">
      <div className="mb-10 flex flex-col gap-4 sm:mb-12 sm:gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-3 sm:gap-4">
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Features
          </span>
          <h2 className="text-3xl leading-[1.1] font-medium tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
            Everything you need to
            <br className="hidden sm:block" />
            <span className="instrument-serif -tracking-normal">
              {" "}
              ship better READMEs
            </span>
          </h2>
        </div>
        <p className="max-w-sm text-sm leading-relaxed text-muted-foreground sm:text-base md:text-right">
          A purpose-built toolkit that transforms how developers write, preview,
          and maintain project documentation.
        </p>
      </div>

      <FeatureBento />
    </section>
  );
}
