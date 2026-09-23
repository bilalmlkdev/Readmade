// Theme-aware Joyride style overrides for the onboarding tour
export function getTourStyles(dark) {
  const tipBg = dark ? "#161616" : "#ffffff";
  const tipBorder = dark ? "rgba(255,255,255,0.1)" : "#e5e7eb";
  const tipText = dark ? "#d1d5db" : "#374151";

  return {
    options: {
      primaryColor: dark ? "#fafafa" : "#111111",
      backgroundColor: tipBg,
      textColor: tipText,
      arrowColor: tipBg,
      zIndex: 1000,
      overlayColor: "rgba(0, 0, 0, 0.15)",
      spotlightShadow: "0 0 0 1px rgba(0,0,0,0.08)",
    },
    spotlight: {
      borderRadius: "12px",
    },
    tooltipContainer: {
      textAlign: "left",
      borderRadius: "12px",
      border: `1px solid ${tipBorder}`,
      boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
      padding: "16px",
    },
    buttonNext: {
      backgroundColor: dark ? "#fafafa" : "#111111",
      color: dark ? "#0c0c0c" : "#ffffff",
      borderRadius: "8px",
      fontSize: "13px",
      fontWeight: "500",
      padding: "8px 16px",
    },
    buttonBack: {
      color: "#6b7280",
      fontSize: "13px",
      fontWeight: "500",
    },
    buttonSkip: {
      color: "#9ca3af",
      fontSize: "12px",
    },
  };
}

export const TOUR_LOCALE = {
  back: "Back",
  close: "Close",
  last: "Got it",
  next: "Next",
  skip: "Skip tour",
};
