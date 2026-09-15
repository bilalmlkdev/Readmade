import LandingHeader from "./LandingHeader";
import HeroSection from "./HeroSection";
import StatsSection from "./StatsSection";
import FeaturesSection from "./FeaturesSection";
import ScreenshotSection from "./ScreenshotSection";
import CommunitySection from "./CommunitySection";
import ToolkitSection from "./ToolkitSection";
import MissionSection from "./MissionSection";
import GetStartedSection from "./GetStartedSection";
import Footer from "./Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen overflow-x-clip antialiased">
      <LandingHeader />
      <main>
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <ScreenshotSection />
        <CommunitySection />
        <ToolkitSection />
        <MissionSection />
        <GetStartedSection />
      </main>
      <Footer />
    </div>
  );
}
