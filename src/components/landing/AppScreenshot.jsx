export function AppScreenshot({
  darkSrc = "/dashboard.png",
  lightSrc = "/dashboard.png",
  alt = "Readmade app screenshot",
}) {
  return (
    <div className="mask-b-from-55% relative -mr-56 mt-8 overflow-hidden sm:mr-0 sm:mt-12 md:mt-20">
      <div className="inset-shadow-2xs ring-background bg-background dark:inset-shadow-white/20 relative mx-auto max-w-7xl overflow-hidden rounded-2xl border border-border p-4 shadow-lg shadow-zinc-950/15 ring-1">
        <img
          alt={alt}
          width={2700}
          height={1440}
          className="bg-background aspect-15/8 relative hidden w-full rounded-2xl object-cover dark:block"
          src={darkSrc}
        />
        <img
          alt={alt}
          width={2700}
          height={1440}
          className="border-border/25 aspect-15/8 relative z-2 w-full rounded-2xl border object-cover dark:hidden"
          src={lightSrc}
        />
      </div>
    </div>
  );
}
