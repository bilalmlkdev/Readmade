import { Showcase } from "./Showcase";

export function AboutSection() {
  return (
    <section className="w-full" id="about">
      <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-12 md:gap-12 lg:gap-16">
        <div className="flex flex-col gap-4 sm:gap-6 md:col-span-5">
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            About{" "}
            <span className="dancing-script font-normal normal-case tracking-normal">
              Readmade
            </span>
          </span>
          <h2 className="bg-linear-to-b from-foreground to-foreground/70 bg-clip-text text-3xl leading-[1.1] font-medium tracking-tighter text-transparent sm:text-4xl md:text-5xl lg:text-6xl dark:from-foreground dark:to-foreground/40">
            README
            <br />
            <span className="instrument-serif -tracking-normal bg-linear-to-b from-foreground to-foreground/70 bg-clip-text font-normal text-transparent dark:from-foreground dark:to-foreground/40">
              deserves better
            </span>
            <br />
            <span className="bg-linear-to-b from-foreground to-foreground/70 bg-clip-text text-transparent dark:from-foreground dark:to-foreground/40">
              tooling.
            </span>
          </h2>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
            Most projects ship with a messy README nobody wants to edit.
            Readmade replaces blank files and broken previews with a visual,
            local-first builder that grows with your project.
          </p>
        </div>

        <Showcase />
      </div>

      <div className="mt-12 grid grid-cols-2 gap-4 border-t border-border/50 pt-8 sm:mt-16 sm:gap-6 sm:pt-10 md:mt-20 md:grid-cols-4 md:pt-12">
        {[
          { value: "11", label: "Block types" },
          { value: "0", label: "Sign-ups required" },
          { value: "100%", label: "Local-first data" },
          { value: "0", label: "Vendor Lock-in" },
        ].map((stat) => (
          <div key={stat.label} className="flex flex-col gap-1 sm:gap-2">
            <span className="bg-linear-to-b from-foreground to-foreground/70 bg-clip-text text-2xl font-semibold tracking-tight text-transparent sm:text-3xl md:text-4xl dark:from-foreground dark:to-foreground/40">
              {stat.value}
            </span>
            <span className="text-xs font-medium text-muted-foreground sm:text-sm">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
