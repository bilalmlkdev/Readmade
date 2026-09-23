import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="px-15 pt-28 pb-10 lg:pt-38 lg:pb-12 bg-[#FAFAFA] dark:bg-[#0c0c0c]">
      <div className="mx-auto max-w-full">
        <div className="mb-5 section-label">Readmade</div>

        <h1 className="m-0 max-w-3xl text-[2rem] leading-[1.1] font-normal tracking-[-0.025em] lg:text-[2.75rem] relative right-1.5">
          The README stack.
        </h1>

        <p className="m-0 mt-5 max-w-xl text-[15px] leading-relaxed text-gray-500 dark:text-gray-400 lg:text-base">
          Build professional GitHub READMEs from ready-made blocks. See a
          live, GitHub-faithful preview and export clean markdown, without
          writing a line of it. Your data stays on your machine.
        </p>

        <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <Link
            to="/app" className="group inline-flex min-w-[200px] items-center justify-between gap-2 bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-black/90"
          >
            Start Readmade
            <svg
              className="h-4 w-4 transition group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"
            >
              <path
                strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
          <a
            href="https://github.com/bilalmlkdev/readmade" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-black dark:text-gray-400 dark:hover:text-white"
          >
            View on GitHub
            <span className="text-xs text-gray-400 dark:text-gray-500">MIT License</span>
          </a>
        </div>

        <div className="mt-16">
          <div className="overflow-hidden border border-gray-200 dark:border-white/10">
            <video
              src="/landing.mp4" autoPlay
              loop
              muted
              playsInline
              className="block w-full"
            />
          </div>
          <p className="m-0 mt-4 text-[13px] text-gray-400 dark:text-gray-500">
            Freedom is local-first. Your README, built on your own machine,
            exactly how you want it.
          </p>
        </div>
      </div>
    </section>
  );
}
