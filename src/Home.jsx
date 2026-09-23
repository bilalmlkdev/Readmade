import { lazy, Suspense, useState, useCallback } from "react";
import BlockPalette from "./components/editor/BlockPalette.jsx";
import BlockArranger from "./components/editor/BlockArranger.jsx";
import ResetConfirmationModal from "./components/ui/ResetConfirmationModal.jsx";
import ErrorBoundary from "./components/ui/ErrorBoundary.jsx";
import MobileDrawer from "./components/app/MobileDrawer.jsx";
import MobileNavbar from "./components/app/MobileNavbar.jsx";
import PreviewFallback from "./components/app/PreviewFallback.jsx";
import HomeHeader from "./components/app/HomeHeader.jsx";
import { useKeyboardShortcuts } from "./hooks/useKeyboardShortcuts.js";
import { useRepoStars } from "./hooks/useRepoStars.js";
import { useAutosaveHistory } from "./hooks/useAutosaveHistory.js";
import { useWorkspacePanels } from "./hooks/useWorkspacePanels.js";
import TemplateGallery from "./components/ui/TemplateGallery.jsx";
import HistoryGallery from "./components/ui/HistoryGallery.jsx";
import useReadme from "./store/useReadme.js";
import { useDocumentTitle } from "./lib/utils.js";

const MarkdownPreview = lazy(() => import("./components/preview/MarkdownPreview"));
const OnboardingTour = lazy(() => import("./components/ui/OnboardingTour"));

export default function Home() {
  const {
    blocks,
    clearAllData,
    resetToInitialTemplate,
    past,
    future,
    undo,
    redo,
  } = useReadme();
  useDocumentTitle("Readmade - Build your README");
  useAutosaveHistory();
  const repoStars = useRepoStars();

  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const panels = useWorkspacePanels();

  const handleOpenTemplates = useCallback(() => setShowTemplates(true), []);
  const handleCloseTemplates = useCallback(() => setShowTemplates(false), []);
  const handleDownload = useCallback(() => {
    window.dispatchEvent(new CustomEvent("readmade:download"));
  }, []);

  useKeyboardShortcuts({
    onDownload: handleDownload,
    onPalette: panels.handlePaletteClick,
    onReset: () => setShowResetConfirm(true),
    onUndo: undo,
    onRedo: redo,
  });

  const handleResetConfirmed = () => {
    setShowResetConfirm(false);
    clearAllData();
    resetToInitialTemplate();
  };

  return (
    <div
      className="flex flex-col h-screen overflow-hidden" style={{ background: "var(--bg)" }}
    >
      <HomeHeader
        repoStars={repoStars}
        onHistory={() => setShowHistory(true)}
        onReset={() => setShowResetConfirm(true)}
        canUndo={past.length > 0}
        canRedo={future.length > 0}
        onUndo={undo}
        onRedo={redo}
        onClear={clearAllData}
      />

      <div className="flex flex-1 min-h-0 overflow-hidden gap-1 p-1 bg-white dark:bg-[#0c0c0c]">
        <aside className="hidden app:flex flex-shrink-0 h-full">
          <BlockPalette />
        </aside>

        <aside className="hidden app:flex flex-shrink-0 h-full">
          <BlockArranger onOpenTemplates={handleOpenTemplates} />
        </aside>

        <main
          className="flex-1 flex flex-col min-w-0 min-h-0 bg-[#FAFAFB] dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-lg overflow-hidden" data-tour="preview"
        >
          <ErrorBoundary>
            <Suspense fallback={<PreviewFallback />}>
              <MarkdownPreview />
            </Suspense>
          </ErrorBoundary>
        </main>
      </div>

      <MobileNavbar
        blocksCount={blocks.length}
        onBlocksClick={panels.handleBlocksClick}
        onPaletteClick={panels.handlePaletteClick}
        activeTab={panels.mobileActiveTab}
      />

      <MobileDrawer
        open={panels.paletteOpen}
        onClose={panels.closePalette}
        title="Add blocks"
      >
        <div className="flex flex-col h-full overflow-y-auto">
          <BlockPalette />
        </div>
      </MobileDrawer>

      <MobileDrawer
        open={panels.arrangerOpen}
        onClose={panels.closeArranger}
        title="Arrange blocks"
      >
        <div className="flex flex-col h-full overflow-y-auto">
          <BlockArranger onOpenTemplates={handleOpenTemplates} />
        </div>
      </MobileDrawer>

      <ResetConfirmationModal
        isOpen={showResetConfirm}
        onConfirm={handleResetConfirmed}
        onCancel={() => setShowResetConfirm(false)}
      />

      {showTemplates && <TemplateGallery onClose={handleCloseTemplates} />}

      {showHistory && <HistoryGallery onClose={() => setShowHistory(false)} />}

      <Suspense fallback={null}>
        <OnboardingTour />
      </Suspense>
    </div>
  );
}
