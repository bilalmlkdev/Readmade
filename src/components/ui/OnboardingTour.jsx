import { useState, useEffect } from "react";
import { Joyride, STATUS } from "react-joyride";
import { THEME_EVENT } from "../../lib/theme.js";

const STEPS = [
  {
    target: '[data-tour="sidebar"]',
    content: (
      <div>
        <h3 className="text-base font-semibold mb-1.5">Block palette</h3>
        <p className="text-sm text-gray-500 leading-relaxed">
          Click any icon to add a block to your README. There are 11 blocks
          covering titles, features, installation, API docs, and more.
        </p>
      </div>
    ),
    placement: "right",
    disableBeacon: true,
  },
  {
    target: '[data-tour="blocks"]',
    content: (
      <div>
        <h3 className="text-base font-semibold mb-1.5">Your blocks</h3>
        <p className="text-sm text-gray-500 leading-relaxed">
          Click a block to expand and edit its content. Drag the handle to
          reorder. The preview updates as you type.
        </p>
      </div>
    ),
    placement: "right",
    disableBeacon: true,
  },
  {
    target: '[data-tour="preview"]',
    content: (
      <div>
        <h3 className="text-base font-semibold mb-1.5">Live preview</h3>
        <p className="text-sm text-gray-500 leading-relaxed">
          Your README renders in real time. Use the tabs to switch between
          preview and raw Markdown code.
        </p>
      </div>
    ),
    placement: "left",
    disableBeacon: true,
  },
];

export default function OnboardingTour() {
  const [run, setRun] = useState(false);
  const [dark, setDark] = useState(() =>
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const onTheme = () =>
      setDark(document.documentElement.classList.contains("dark"));
    window.addEventListener(THEME_EVENT, onTheme);
    return () => window.removeEventListener(THEME_EVENT, onTheme);
  }, []);

  useEffect(() => {
    const hasSeen = localStorage.getItem("readmade:onboarded");
    if (!hasSeen) {
      const timer = setTimeout(() => {
        setRun(true);
        localStorage.setItem("readmade:onboarded", "true");
      }, 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleJoyrideCallback = (data) => {
    const { status } = data;
    const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED];
    if (finishedStatuses.includes(status)) {
      setRun(false);
    }
  };

  const tipBg = dark ? "#161616" : "#ffffff";
  const tipBorder = dark ? "rgba(255,255,255,0.1)" : "#e5e7eb";
  const tipText = dark ? "#d1d5db" : "#374151";

  return (
    <Joyride
      steps={STEPS}
      run={run}
      callback={handleJoyrideCallback}
      continuous
      showProgress
      showSkipButton
      disableOverlayClose
      disableCloseOnEsc
      styles={{
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
      }}
      locale={{
        back: "Back",
        close: "Close",
        last: "Got it",
        next: "Next",
        skip: "Skip tour",
      }}
    />
  );
}