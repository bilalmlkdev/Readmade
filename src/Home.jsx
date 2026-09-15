import { lazy, Suspense, useState, useCallback, useEffect, useRef } from "react";
import BlockPalette from "./components/editor/BlockPalette.jsx";
import BlockArranger from "./components/editor/BlockArranger.jsx";
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
import { PanelLeftOpen } from "lucide-react";

const MarkdownPreview = lazy(() => import("./components/preview/MarkdownPreview"));
const OnboardingTour = lazy(() => import("./components/ui/OnboardingTour"));

export default function Home() {
  const { blocks, clearAllData, resetToInitialTemplate, saveToHistory } = useReadme();
  useDocumentTitle("Readmade - Build your README");

  const [paletteOpen, setPaletteOpen] = useState(false);
  const [arrangerOpen, setArrangerOpen] = useState(false);
  const [mobileActiveTab, setMobileActiveTab] = useState(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [sidebarMinimized, setSidebarMinimized] = useState(false);

  const saveTimeoutRef = useRef(null);
  const lastSavedBlocksRef = useRef(null);

  useEffect(() => {
    if (blocks.length === 0) return;
    const blocksKey = JSON.stringify(blocks);
    if (blocksKey === lastSavedBlocksRef.current) return;

    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    saveTimeoutRef.current = setTimeout(() => {
      lastSavedBlocksRef.current = blocksKey;
      saveToHistory();
    }, 2000);

    return () => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    };
  }, [blocks, saveToHistory]);

  const handleBlocksClick = () => {
    if (mobileActiveTab === "arranger") {
      setArrangerOpen(false);
      setMobileActiveTab(null);
    } else {
      setArrangerOpen(true);
      setPaletteOpen(false);
      setMobileActiveTab("arranger");
    }
  };

  const handlePaletteClick = () => {
    if (mobileActiveTab === "palette") {
      setPaletteOpen(false);
      setMobileActiveTab(null);
    } else {
      setPaletteOpen(true);
      setArrangerOpen(false);
      setMobileActiveTab("palette");
    }
  };

  const handleCloseArranger = () => {
    setArrangerOpen(false);
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

  const handleDownload = useCallback(() => {
    const event = new CustomEvent("readmade:download");
    window.dispatchEvent(event);
  }, []);

  const handleSearch = useCallback(() => {
    const event = new CustomEvent("readmade:search");
    window.dispatchEvent(event);
  }, []);

  useKeyboardShortcuts({
    onDownload: () => handleDownload(),
    onCopy: () => {
      const event = new CustomEvent("readmade:copy");
      window.dispatchEvent(event);
    },
    onSearch: () => handleSearch(),
    onPalette: () => handlePaletteClick(),
    onReset: () => setShowResetConfirm(true),
  });

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "var(--bg)" }}>
      {/* Left sidebar - Block palette */}
      {!sidebarMinimized && (
        <aside className="hidden md:flex flex-shrink-0 h-full">
          <BlockPalette
            onOpenTemplates={handleOpenTemplates}
          />
        </aside>
      )}

      {/* Minimized sidebar expand button */}
      {sidebarMinimized && (
        <div className="hidden md:flex flex-shrink-0 items-start pt-4 px-2">
          <button
            onClick={() => setSidebarMinimized(false)}
            className="p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-lg transition-colors"
            title="Expand sidebar"
          >
            <PanelLeftOpen size={18} />
          </button>
        </div>
      )}

      {/* Center - Preview */}
      <main className="flex-1 flex flex-col min-w-0 min-h-0 bg-white" data-tour="preview">
        <ErrorBoundary>
          <Suspense fallback={<PreviewFallback />}>
            <MarkdownPreview />
          </Suspense>
        </ErrorBoundary>
      </main>

      {/* Right sidebar - Block arrangement */}
      <aside className="hidden md:flex flex-shrink-0 h-full">
        <BlockArranger />
      </aside>

      {/* Mobile nav */}
      <MobileNavbar
        blocksCount={blocks.length}
        onBlocksClick={handleBlocksClick}
        onPaletteClick={handlePaletteClick}
        activeTab={mobileActiveTab}
      />

      {/* Mobile drawers */}
      <MobileDrawer open={paletteOpen} onClose={handleClosePalette} title="Add blocks">
        <div className="flex flex-col h-full overflow-y-auto">
          <BlockPalette
            onOpenTemplates={handleOpenTemplates}
          />
        </div>
      </MobileDrawer>

      <MobileDrawer open={arrangerOpen} onClose={handleCloseArranger} title="Arrange blocks">
        <div className="flex flex-col h-full overflow-y-auto">
          <BlockArranger />
        </div>
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
