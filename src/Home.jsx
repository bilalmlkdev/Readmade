import { lazy, Suspense, useState, useCallback, useEffect, useRef } from "react";
import BlockPalette from "./components/editor/BlockPalette.jsx";
import BlockArranger from "./components/editor/BlockArranger.jsx";
import ResetConfirmationModal from "./components/ui/ResetConfirmationModal.jsx";
import ErrorBoundary from "./components/ui/ErrorBoundary.jsx";
import MobileDrawer from "./components/app/MobileDrawer.jsx";
import MobileNavbar from "./components/app/MobileNavbar.jsx";
import PreviewFallback from "./components/app/PreviewFallback.jsx";
import { useKeyboardShortcuts } from "./hooks/useKeyboardShortcuts.js";
import TemplateGallery from "./components/ui/TemplateGallery.jsx";
import useReadme from "./store/useReadme.js";
import { useDocumentTitle } from "./lib/utils.js";
import { ArrowLeft, Trash2 } from "lucide-react";
import logoIcon from '/logo.svg';

const MarkdownPreview = lazy(() => import("./components/preview/MarkdownPreview"));
const OnboardingTour = lazy(() => import("./components/ui/OnboardingTour"));

const REPO_URL = "https://github.com/bilalmlkdev/readmade";
const REPO_API = "https://api.github.com/repos/bilalmlkdev/readmade";

function formatStars(count) {
  if (count == null || Number.isNaN(count)) return null;
  if (count >= 1_000_000) {
    const v = count / 1_000_000;
    return `${v >= 10 ? Math.round(v) : Math.round(v * 10) / 10}M`;
  }
  if (count >= 1_000) {
    const v = count / 1_000;
    return `${v >= 10 ? Math.round(v) : Math.round(v * 10) / 10}k`;
  }
  return String(count);
}

export default function Home() {
  const { blocks, clearAllData, resetToInitialTemplate, saveToHistory } = useReadme();
  useDocumentTitle("Readmade - Build your README");

  const [paletteOpen, setPaletteOpen] = useState(false);
  const [arrangerOpen, setArrangerOpen] = useState(false);
  const [mobileActiveTab, setMobileActiveTab] = useState(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [repoStars, setRepoStars] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetch(REPO_API, { headers: { Accept: "application/vnd.github+json" } })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error("stars fetch failed"))))
      .then((data) => {
        if (!cancelled && typeof data.stargazers_count === "number") {
          setRepoStars(data.stargazers_count);
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

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

  const handleDownload = useCallback(() => {
    const event = new CustomEvent("readmade:download");
    window.dispatchEvent(event);
  }, []);

  useKeyboardShortcuts({
    onDownload: () => handleDownload(),
    onPalette: () => handlePaletteClick(),
    onReset: () => setShowResetConfirm(true),
  });

  return (
    <div
      className="flex flex-col h-screen overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      {/* Top header bar */}
      <header className="hidden app:flex items-center justify-between h-15 px-4 shrink-0 bg-white border-b border-gray-200">
        <div className="flex items-center gap-4">
          <a
            href="/"
            className="flex items-center gap-1.5 text-[13.5px] font-medium text-gray-600 hover:text-black transition-colors"
          >
            <ArrowLeft size={16} />
            Back
          </a>
          <div className="w-px h-6 bg-gray-200" />
          <div className="flex items-center gap-2.5">
            <span className="h-8 w-8 flex items-center justify-center shrink-0">
              <img src={logoIcon} />
            </span>
            <div className="leading-tight">
              <p className="text-[14.5px] font-medium text-black mt-0.5">Readmade</p>
              <p className="text-xs text-black/80 relative top-[1px]">
                Build READMEs visually, copy production-ready markdown
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={REPO_URL}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-2 py-1.5 text-[13px] font-medium text-gray-500 hover:text-black hover:bg-gray-100 rounded-lg transition-colors"
            title="GitHub stars"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.833.092-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.269 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.747-1.026 2.747-1.026.546 1.378.203 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
            </svg>
            <span className="tabular-nums text-gray-600">
              {formatStars(repoStars) ?? "…"}
            </span>
          </a>
          <button
            onClick={() => setShowResetConfirm(true)}
            className="flex items-center gap-1.5 px-2 py-1.5 text-[13px] font-medium text-black bg-gray-200 hover:bg-gray-200/80 rounded-lg transition-colors"
          >
            <Trash2 size={14.5} />
            Reset Canvas
          </button>
        </div>
      </header>

      {/* Body - three columns */}
      <div className="flex flex-1 min-h-0 overflow-hidden gap-1 p-1 bg-white">
        {/* Left column - Block palette (Field Types) */}
        <aside className="hidden app:flex flex-shrink-0 h-full">
          <BlockPalette />
        </aside>

        {/* Middle column - Settings / Fields (Block arrangement) */}
        <aside className="hidden app:flex flex-shrink-0 h-full">
          <BlockArranger onOpenTemplates={handleOpenTemplates} />
        </aside>

        {/* Right column - big Preview/Code canvas */}
        <main
          className="flex-1 flex flex-col min-w-0 min-h-0 bg-[#FAFAFB] border border-gray-200 rounded-lg overflow-hidden"
          data-tour="preview"
        >
          <ErrorBoundary>
            <Suspense fallback={<PreviewFallback />}>
              <MarkdownPreview />
            </Suspense>
          </ErrorBoundary>
        </main>
      </div>

      {/* Mobile nav */}
      <MobileNavbar
        blocksCount={blocks.length}
        onBlocksClick={handleBlocksClick}
        onPaletteClick={handlePaletteClick}
        activeTab={mobileActiveTab}
      />

      {/* Mobile drawers */}
      <MobileDrawer
        open={paletteOpen}
        onClose={handleClosePalette}
        title="Add blocks"
      >
        <div className="flex flex-col h-full overflow-y-auto">
          <BlockPalette />
        </div>
      </MobileDrawer>

      <MobileDrawer
        open={arrangerOpen}
        onClose={handleCloseArranger}
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

      <Suspense fallback={null}>
        <OnboardingTour />
      </Suspense>
    </div>
  );
}
