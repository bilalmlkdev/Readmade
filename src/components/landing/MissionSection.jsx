export default function MissionSection() {
  return (
    <section className="px-5 pb-4 lg:px-15 lg:pb-6 bg-[#FAFAFA] text-[#1a1a1a]">
      <div className="mb-4 section-label">Our mission</div>
      <figure className="m-0 flex flex-col items-center gap-12 lg:flex-row lg:gap-20">
        <div className="w-full flex-1">
          <div className="h-80 w-full rounded-sm bg-gradient-to-br from-black/5 to-black/[0.02] border border-black/[0.06] flex items-center justify-center lg:h-96">
            <img
              src="/logo.svg"
              alt="Readmade"
              className="w-24 h-24 opacity-20"
            />
          </div>
        </div>
        <blockquote className="m-0 flex-1">
          <p className="m-0 text-lg leading-[1.55] font-light tracking-tight text-balance sm:text-xl lg:text-[1.375rem]">
            <span className="opacity-90">
              "Readmade is built so every developer can ship a README that
              actually helps.
            </span>{" "}
            <span className="opacity-40">
              Not a wall of text. Not an afterthought. A living document that
              makes your project make sense,
            </span>{" "}
            <span className="font-normal opacity-100">
              from a side project to a production system.
            </span>
            <span className="opacity-100">"</span>
          </p>
        </blockquote>
      </figure>
    </section>
  );
}
