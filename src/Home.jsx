import { lazy, Suspense, useRef, useState } from "react";
import BlockPalette from "./components/editor/BlockPalette.jsx";
import SortableBlockList from "./components/editor/SortableBlockList.jsx";
import ResetConfirmationModal from "./components/ui/ResetConfirmationModal.jsx";
import ErrorBoundary from "./components/ui/ErrorBoundary.jsx";
import MobileDrawer from "./components/app/MobileDrawer.jsx";
import MobileNavbar from "./components/app/MobileNavbar.jsx";
import CenterBarHeader from "./components/app/CenterBarHeader.jsx";
import PreviewFallback from "./components/app/PreviewFallback.jsx";
import useReadme from "./store/useReadme.js";
import { useDocumentTitle } from "./lib/utils.js";

const MarkdownPreview = lazy(() => import("./components/preview/MarkdownPreview"));
const OnboardingTour = lazy(() => import("./components/ui/OnboardingTour"));

export default function Home() {
  const { blocks, clearAllData, resetToInitialTemplate } = useReadme();
  const tourRef = useRef();
  useDocumentTitle("Readmade - Build your README");

  const [paletteOpen, setPaletteOpen] = useState(false);
  const [blocksOpen, setBlocksOpen] = useState(false);
  const [mobileActiveTab, setMobileActiveTab] = useState(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleBlocksClick = () => {
    if (mobileActiveTab === "blocks") {
      setBlocksOpen(false);
      setMobileActiveTab(null);
    } else {
      setBlocksOpen(true);
      setPaletteOpen(false);
      setMobileActiveTab("blocks");
    }
  };

  const handlePaletteClick = () => {
    if (mobileActiveTab === "palette") {
      setPaletteOpen(false);
      setMobileActiveTab(null);
    } else {
      setPaletteOpen(true);
      setBlocksOpen(false);
      setMobileActiveTab("palette");
    }
  };

  const handleCloseBlocks = () => {
    setBlocksOpen(false);
    setMobileActiveTab(null);
  };

  const handleClosePalette = () => {
    setPaletteOpen(false);
    setMobileActiveTab(null);
  };

  const handleRestartTour = () => {
    if (tourRef.current) tourRef.current.restart();
  };

  const handleResetConfirmed = () => {
    setShowResetConfirm(false);
    clearAllData();
    resetToInitialTemplate();
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <div className="flex flex-1 min-h-0">
        <div className="hidden md:flex border-r border-gray-200">
          <BlockPalette />
        </div>

        <main className="hidden md:flex w-[41rem] shrink-0 flex-col min-h-0 bg-white">
          <CenterBarHeader
            onReset={() => setShowResetConfirm(true)}
            onRestartTour={handleRestartTour}
          />
          <div className="flex-1 overflow-y-auto">
            <SortableBlockList />
          </div>
        </main>

        <div className="hidden md:block w-[1px] bg-gray-200 relative hover:bg-black/20 transition-colors">
          <div className="absolute top-1/2 -translate-y-1/2 h-6 w-2 rounded-full -left-[3px] bg-gray-300 shadow-sm" />
        </div>

        <div className="flex-1 flex flex-col min-h-0 overflow-hidden bg-white pb-16 md:pb-0 markdown-preview-container">
          <div className="flex-1 overflow-y-auto">
            <ErrorBoundary>
              <Suspense fallback={<PreviewFallback />}>
                <MarkdownPreview />
              </Suspense>
            </ErrorBoundary>
          </div>
        </div>
      </div>

      <MobileNavbar
        blocksCount={blocks.length}
        onBlocksClick={handleBlocksClick}
        onPaletteClick={handlePaletteClick}
        activeTab={mobileActiveTab}
      />

      <MobileDrawer
        open={paletteOpen}
        onClose={handleClosePalette}
        title="Block palette"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            overflowY: "auto",
          }}
        >
          <BlockPalette />
        </div>
      </MobileDrawer>

      <MobileDrawer
        open={blocksOpen}
        onClose={handleCloseBlocks}
        title="Blocks"
      >
        <div className="flex flex-col h-full">
          <CenterBarHeader
            onReset={() => setShowResetConfirm(true)}
            onRestartTour={handleRestartTour}
          />
          <SortableBlockList />
        </div>
      </MobileDrawer>

      <ResetConfirmationModal
        isOpen={showResetConfirm}
        onConfirm={handleResetConfirmed}
        onCancel={() => setShowResetConfirm(false)}
      />

      <Suspense fallback={null}>
        <OnboardingTour ref={tourRef} />
      </Suspense>
    </div>
  );
}