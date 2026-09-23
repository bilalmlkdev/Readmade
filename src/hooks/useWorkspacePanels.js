import { useState } from "react";

// Mobile palette/arranger drawer visibility
export function useWorkspacePanels() {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [arrangerOpen, setArrangerOpen] = useState(false);
  const [mobileActiveTab, setMobileActiveTab] = useState(null);

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

  const closeArranger = () => {
    setArrangerOpen(false);
    setMobileActiveTab(null);
  };

  const closePalette = () => {
    setPaletteOpen(false);
    setMobileActiveTab(null);
  };

  return {
    paletteOpen,
    arrangerOpen,
    mobileActiveTab,
    handleBlocksClick,
    handlePaletteClick,
    closeArranger,
    closePalette,
  };
}
