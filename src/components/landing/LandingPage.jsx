import LandingHeader from "./LandingHeader";
import HeroSection from "./HeroSection";

export default function LandingPage() {
  return (
    <div className="min-h-screen overflow-x-clip text-[#111111] antialiased">
      <LandingHeader />
      <main>
        <HeroSection />
      </main>
    </div>
  );
}