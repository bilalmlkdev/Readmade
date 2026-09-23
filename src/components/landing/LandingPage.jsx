import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Header } from "./Header";
import { HeroAnimations } from "./HeroAnimations";
import { AppScreenshot } from "./AppScreenshot";
import { AboutSection } from "./AboutSection";
import { FeaturesSection } from "./FeaturesSection";
import { HowItWorksSection } from "./how-it-works/HowItWorksSection";
import { ContactSection } from "./ContactSection";
import { FAQSection } from "./FAQSection";
import { Footer } from "./Footer";
import { AnimatedGroup } from "../ui/AnimatedGroup";

const transitionVariants = {
  item: {
    hidden: { opacity: 0, filter: "blur(12px)", y: 12 },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: { type: "spring", bounce: 0.3, duration: 1.5 },
    },
  },
};

const techStack = [
  { label: "Blocks", short: "Bk" },
  { label: "Markdown", short: "Md" },
  { label: "GitHub", short: "Gh" },
  { label: "Local", short: "Lo" },
  { label: "PWA", short: "Pw" },
];

function LandingBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 h-full w-full">
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-linear-to-b from-background via-background to-primary/5" />

        <div
          className="absolute inset-0 opacity-[0.35] dark:opacity-[0.09]"
          style={{
            backgroundImage:
              `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        <div className="absolute -top-1/4 left-1/2 aspect-square w-full max-w-3xl -translate-x-1/2 rounded-full bg-primary/5 blur-[150px]" />

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--background)_80%)]" />
      </div>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <Header />
      <LandingBackground />

      <main className="relative z-0">
        <div className="mx-auto max-w-7xl space-y-16 overflow-hidden px-3 pt-20 lg:px-6.5">
          <HeroAnimations>
            <section className="relative w-full" data-hero="heading">
              <div className="flex flex-col items-start gap-6 md:flex-row md:gap-16">
                <div className="relative flex-1">
                  <div className="absolute top-8 right-0 hidden text-4xl font-light tracking-widest text-muted-foreground lg:block">
                    **
                  </div>

                  <h1 className="text-4xl leading-[1.15] font-light tracking-tighter sm:text-5xl md:text-7xl lg:text-8xl">
                    Design Your System
                  </h1>
                  <h2 className="mt-1 text-4xl leading-[1.05] sm:mt-2 sm:text-5xl md:mt-4 md:text-7xl lg:text-8xl">
                    <span className="instrument-serif"> Before You Build It.</span>
                  </h2>
                </div>
              </div>
            </section>

            <section
              className="grid w-full grid-cols-1 items-end gap-8 md:grid-cols-12 md:gap-10"
              data-hero="cta"
            >
              <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-end sm:gap-8 md:col-span-5">
                <div className="shrink-0 cursor-pointer group">
                  <Link
                    to="/app"
                    className="flex items-center gap-2 text-base font-light text-foreground/80 sm:text-lg"
                  >
                    Start Building
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                  </Link>
                  <p className="mt-2 text-[10px] leading-relaxed font-medium tracking-wide text-muted-foreground uppercase md:text-xs">
                    Open source & free forever
                    <br />
                    No credit card required
                  </p>
                </div>

                <div className="flex -space-x-3 pl-0 sm:-space-x-4 sm:pl-4" data-hero="techstack">
                  {techStack.map((tech) => (
                    <div
                      key={tech.label}
                      title={tech.label}
                      className="relative z-0 flex size-10 cursor-default items-center justify-center rounded-full border-2 border-background bg-muted text-foreground transition-all hover:z-10 hover:scale-110 sm:size-12"
                    >
                      <span className="text-[10px] font-semibold sm:text-xs">{tech.short}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="hidden md:col-span-2 md:block" />

              <div
                className="text-sm leading-relaxed text-muted-foreground md:col-span-5 md:text-right lg:text-left lg:max-w-md lg:ml-auto md:text-base"
                data-hero="description"
              >
                The local-first README builder for developers. Drag ready-made
                blocks, reorder sections, preview GitHub-faithful Markdown in real
                time, and export clean output - without writing a line of it.
                Everything stays on your machine.
              </div>
            </section>
          </HeroAnimations>

          <AnimatedGroup
            variants={{
              container: {
                visible: { transition: { staggerChildren: 0.05, delayChildren: 0.75 } },
              },
              ...transitionVariants,
            }}
          >
            <AppScreenshot />
          </AnimatedGroup>

          <AboutSection />
          <FeaturesSection />
          <HowItWorksSection />
          <ContactSection />
          <FAQSection />

          <section className="grid grid-cols-1 gap-6 pt-6 sm:gap-8 sm:pt-8 md:grid-cols-12 md:gap-12 md:pt-16">
            <div className="flex flex-col justify-end md:col-span-4">
              <p className="max-w-48 text-xs leading-snug text-muted-foreground sm:text-sm">
                Open source project built for developers who think before they
                ship
              </p>
            </div>

            <div className="md:col-span-8">
              <p className="text-lg leading-snug font-light text-muted-foreground sm:text-xl md:text-2xl lg:text-3xl">
                Blank files are a bad starting point. Templates go stale.{" "}
                <span className="border-b border-border pb-0.5 text-foreground">
                  Readmade gives docs a canvas
                </span>{" "}
                - where your README becomes a first-class part of the project, not
                an afterthought.
              </p>
            </div>
          </section>

          <Footer />
        </div>
      </main>
    </div>
  );
}
