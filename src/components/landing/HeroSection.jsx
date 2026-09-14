import { Link } from "react-router-dom";
import dashboardImg from "../../assets/dashboard.png";

export default function HeroSection() {
  return (
    <section
      id="product"
      className="landing-container relative mx-auto overflow-hidden mt-15"
      style={{ width: "1438.25px", height: "737.808px" }}
    >
      {/* bg img for this section */}
      <img
        src="/background-image.jpg"
        alt=""
        aria-hidden
        loading="eager"
        className="pointer-events-none absolute inset-0 z-0 h-full w-full rounded-lg object-cover"
      />

      {/* white cloud mask — fades bg image to white at top, edges, and bottom */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] rounded-lg"
        style={{
          background: `
            linear-gradient(to bottom, #ffffff 0%, rgba(255,255,255,0.6) 12%, transparent 30%),
            radial-gradient(ellipse 70% 60% at 50% 40%, transparent 0%, rgba(255,255,255,0.4) 55%, rgba(255,255,255,0.85) 80%, #ffffff 100%)
          `,
        }}
      />

      {/* its content */}
      <div className="relative z-10 pt-25 pb-0">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[0.9rem] font-medium tracking-tight text-gray-500">
            Open-Source Project
          </p>

          <h1 className="mt-4 font-display text-[60px] leading-[1.02] font-medium tracking-[-0.02em]">
            Build always-on agents to deliver <br/> an 11-star experience
          </h1>

          <p className="mx-auto mt-4 max-w-[500px] text-base leading-[1.4] text-gray-500">
            Build professional GitHub READMEs from ready-made blocks. See a
            live, GitHub-faithful preview and export clean markdown, without
            writing a line of it.
          </p>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/app"
              className="inline-flex items-center rounded-lg bg-[#111111] px-3 py-1.5 text-sm font-medium text-white transition-colors duration-300 hover:bg-black/80 shadow-sm"
            >
              Get started
            </Link>
            <a
              href="#features"
              className="inline-flex items-center rounded-lg border border-black/10 px-3 py-1.5 text-sm font-medium text-[#111111] bg-white text-black transition-colors duration-300 shadow-sm"
            >
              View features
            </a>
          </div>
        </div>

        <div className="mx-auto mt-25 max-w-5xl overflow-hidden rounded-sm bg-black shadow-[0_20px_60px_-20px_rgba(0,0,0,0.3)]">
          <img
            src={dashboardImg}
            alt="Screenshot of the Readmade editor — a list of blocks on the left and a live markdown preview on the right"
            className="block h-auto w-full"
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
}
