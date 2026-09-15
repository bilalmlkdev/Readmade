import { Link } from "react-router-dom";
import dashboardImg from "../../assets/dashboard.png";

export default function HeroSection() {
  return (
    <section className="px-5 pt-32 pb-8 lg:px-15 lg:pt-40 lg:pb-10 bg-[#FAFAFA] text-[#1a1a1a]">
      <div className="mx-auto max-w-full">
        <div className="mb-4 section-label">Readmade</div>

        <h1 className="m-0 max-w-3xl text-2xl leading-[1.15] font-light tracking-tight lg:text-4xl">
          The README stack.
        </h1>

        <p className="m-0 mt-6 max-w-xl text-sm leading-relaxed font-light opacity-60 lg:text-base">
          Build professional GitHub READMEs from ready-made blocks. See a
          live, GitHub-faithful preview and export clean markdown, without
          writing a line of it. Your data stays on your machine.
        </p>

        <div className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
          <Link
            to="/app"
            className="group inline-flex min-w-56 items-center justify-between gap-2 bg-black px-7 py-3.5 text-sm text-white transition hover:bg-black/85"
          >
            Get Readmade
            <svg
              className="h-4 w-4 transition group-hover:translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
          <a
            href="https://github.com/bilalmlkdev/readmade"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex w-fit items-center gap-2 text-sm opacity-60 transition hover:opacity-100"
          >
            View on GitHub
            <span className="text-xs opacity-60">MIT License</span>
          </a>
        </div>

        <div className="mt-16">
          <div className="overflow-hidden border border-black/10">
            <img
              src={dashboardImg}
              alt="Screenshot of the Readmade editor — blocks on the left, live markdown preview on the right"
              className="block aspect-video w-full object-contain"
              loading="eager"
            />
          </div>
          <p className="m-0 mt-5 text-sm opacity-40">
            Freedom is local-first. Your README, built on your own machine,
            exactly how you want it.
          </p>
        </div>
      </div>
    </section>
  );
}
