import dashboardImg from "../../assets/dashboard.png";

export default function ScreenshotSection() {
  return (
    <section className="px-6 pb-24 lg:px-15 bg-[#FAFAFA] text-[#1a1a1a]">
      <div className="mx-auto max-w-full">
        <figure className="m-0 grid grid-cols-1 gap-5 lg:grid-cols-12 lg:gap-8">
          <figcaption className="order-2 m-0 flex items-end text-sm leading-relaxed opacity-40 lg:order-1 lg:col-span-5 lg:max-w-sm">
            Your README takes shape as you build it. Every block, every edit,
            visible in real time. What you see is exactly what GitHub renders.
          </figcaption>
          <div className="order-1 overflow-hidden lg:order-2 lg:col-span-7">
            <img
              src={dashboardImg}
              alt="Readmade editor showing drag-and-drop blocks on the left and a live GitHub-faithful preview on the right"
              loading="lazy"
              decoding="async"
              className="block h-64 w-full object-contain sm:h-80 lg:h-96"
            />
          </div>
        </figure>
      </div>
    </section>
  );
}
