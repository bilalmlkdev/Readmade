import { lazy, Suspense, useState, useCallback } from "react";
import BlockPalette from "./components/editor/BlockPalette.jsx";
import SortableBlockList from "./components/editor/SortableBlockList.jsx";
import ResetConfirmationModal from "./components/ui/ResetConfirmationModal.jsx";
import ErrorBoundary from "./components/ui/ErrorBoundary.jsx";
import MobileDrawer from "./components/app/MobileDrawer.jsx";
import MobileNavbar from "./components/app/MobileNavbar.jsx";
import PreviewFallback from "./components/app/PreviewFallback.jsx";
import KeyboardShortcutsHelp from "./components/ui/KeyboardShortcuts.jsx";
import { useKeyboardShortcuts } from "./hooks/useKeyboardShortcuts.js";
import AutoSaveIndicator from "./components/ui/AutoSaveIndicator.jsx";
import TemplateGallery from "./components/ui/TemplateGallery.jsx";
import useReadme from "./store/useReadme.js";
import { useDocumentTitle } from "./lib/utils.js";

const MarkdownPreview = lazy(() => import("./components/preview/MarkdownPreview"));
const OnboardingTour = lazy(() => import("./components/ui/OnboardingTour"));

const CENTER_WIDTH = 460;

export default function Home() {
  const { blocks, clearAllData, resetToInitialTemplate } = useReadme();
  useDocumentTitle("Readmade - Build your README");

  const [paletteOpen, setPaletteOpen] = useState(false);
  const [blocksOpen, setBlocksOpen] = useState(false);
  const [mobileActiveTab, setMobileActiveTab] = useState(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);

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

  const handleResetConfirmed = () => {
    setShowResetConfirm(false);
    clearAllData();
    resetToInitialTemplate();
  };

  const handleOpenTemplates = useCallback(() => {
    setShowTemplates(true);
  }, []);

  const handleCloseTemplates = useCallback(() => {
    setShowTemplates(false);
  }, []);

  const handleCloseShortcuts = useCallback(() => {
    setShowShortcuts(false);
  }, []);

  useKeyboardShortcuts({
    onDownload: () => {
      const event = new CustomEvent("readmade:download");
      window.dispatchEvent(event);
    },
    onCopy: () => {
      const event = new CustomEvent("readmade:copy");
      window.dispatchEvent(event);
    },
    onSearch: () => {
      const event = new CustomEvent("readmade:search");
      window.dispatchEvent(event);
    },
    onPalette: () => handlePaletteClick(),
    onReset: () => setShowResetConfirm(true),
  });

  return (
    <div className="flex flex-col h-screen" style={{ background: "var(--bg)" }}>
      <div className="flex flex-1 min-h-0">
        <div className="hidden md:flex flex-shrink-0 h-full">
          <BlockPalette onReset={() => setShowResetConfirm(true)} onOpenTemplates={handleOpenTemplates} />
        </div>

        <main
          className="hidden md:flex shrink-0 flex-col min-h-0 bg-white border-r border-gray-200"
          style={{ width: CENTER_WIDTH }}
          data-tour="blocks"
        >
          <SortableBlockList />
        </main>

        <div className="flex-1 flex flex-col min-h-0 overflow-hidden bg-white pb-16 md:pb-0" data-tour="preview">
          <ErrorBoundary>
            <Suspense fallback={<PreviewFallback />}>
              <MarkdownPreview />
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>

      <MobileNavbar
        blocksCount={blocks.length}
        onBlocksClick={handleBlocksClick}
        onPaletteClick={handlePaletteClick}
        activeTab={mobileActiveTab}
      />

      <MobileDrawer open={paletteOpen} onClose={handleClosePalette} title="Block palette">
        <div className="flex flex-col h-full overflow-y-auto">
          <BlockPalette onReset={() => setShowResetConfirm(true)} onOpenTemplates={handleOpenTemplates} />
        </div>
      </MobileDrawer>

      <MobileDrawer open={blocksOpen} onClose={handleCloseBlocks} title="Blocks">
        <SortableBlockList />
      </MobileDrawer>

      <ResetConfirmationModal
        isOpen={showResetConfirm}
        onConfirm={handleResetConfirmed}
        onCancel={() => setShowResetConfirm(false)}
      />

      {showShortcuts && (
        <KeyboardShortcutsHelp onClose={handleCloseShortcuts} />
      )}

      {showTemplates && (
        <TemplateGallery onClose={handleCloseTemplates} />
      )}

      <AutoSaveIndicator />

      <Suspense fallback={null}>
        <OnboardingTour />
      </Suspense>
    </div>
  );
}