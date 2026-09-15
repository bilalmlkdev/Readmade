import {
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
} from "react";

import { Joyride, STATUS } from "react-joyride";

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

const OnboardingTour = forwardRef((props, ref) => {
  const [run, setRun] = useState(false);

  useImperativeHandle(ref, () => ({
    restart: () => {},
  }));

  useEffect(() => {
    const hasSeen = localStorage.getItem("readmade:onboarded");
    if (!hasSeen) {
      const timer = setTimeout(() => {
        setRun(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleJoyrideCallback = (data) => {
    const { status } = data;
    const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED];
    if (finishedStatuses.includes(status)) {
      setRun(false);
      localStorage.setItem("readmade:onboarded", "true");
    }
  };

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
          primaryColor: "#111111",
          backgroundColor: "#ffffff",
          textColor: "#374151",
          arrowColor: "#ffffff",
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
          border: "1px solid #e5e7eb",
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
          padding: "16px",
        },
        buttonNext: {
          backgroundColor: "#111111",
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
});

export default OnboardingTour;
