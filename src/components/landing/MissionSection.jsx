export default function MissionSection() {
  return (
    <section className="px-15 pb-4 lg:pb-6 bg-[#FAFAFA]">
      <div className="mb-4 section-label">Our mission</div>
      <figure className="m-0 flex flex-col items-center gap-12 lg:flex-row lg:gap-20">
        <div className="w-full flex-1">
          <div className="h-80 w-full rounded-lg bg-gradient-to-br from-gray-100 to-gray-50 border border-gray-200 flex items-center justify-center lg:h-96">
            <img
              src="/mission.webp"
              alt="Readmade"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <blockquote className="m-0 flex-1">
          <p className="m-0 text-lg leading-[1.6] font-normal tracking-tight text-balance sm:text-xl lg:text-[1.375rem]">
            <span className="text-black">
              "Readmade is built so every developer can ship a README that
              actually helps.
            </span>{" "}
            <span className="text-gray-400">
              Not a wall of text. Not an afterthought. A living document that
              makes your project make sense,
            </span>{" "}
            <span className="text-black">
              from a side project to a production system.
            </span>
            <span className="text-black">"</span>
          </p>
        </blockquote>
      </figure>
    </section>
  );
}
