import { useState, useEffect } from "react";
import { Joyride, STATUS } from "react-joyride";
import { THEME_EVENT } from "../../lib/theme.js";
import { getTourStyles, TOUR_LOCALE } from "../../lib/tourStyles.js";
import { TOUR_STEPS } from "../../data/tourSteps.jsx";

export default function OnboardingTour() {
  const [run, setRun] = useState(false);
  const [dark, setDark] = useState(() =>
    document.documentElement.classList.contains("dark"),
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

  function handleJoyrideCallback(data) {
    const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED];
    if (finishedStatuses.includes(data.status)) setRun(false);
  }

  return (
    <Joyride
      steps={TOUR_STEPS}
      run={run}
      callback={handleJoyrideCallback}
      continuous
      showProgress
      showSkipButton
      disableOverlayClose
      disableCloseOnEsc
      styles={getTourStyles(dark)}
      locale={TOUR_LOCALE}
    />
  );
}
