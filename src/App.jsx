import { useState, lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import NotFound from "./components/pages/NotFound";
import LoadingSpinner from "./components/ui/LoadingSpinner";

const Home = lazy(() => import("./Home"));
const LandingPage = lazy(() => import("./components/landing/LandingPage"));

const BLOCKS_KEY = "readmade:blocks";

// One-time migration for existing users: this project was previously
// called ReadmeForge (and briefly Brikk). Copy over any saved blocks
// under the old app name to the new key the first time the app loads
// under the new name, so no one's workspace silently disappears. Safe to
// run every load: it's a no-op once the new key exists.
function migrateLegacyStorage() {
  if (localStorage.getItem(BLOCKS_KEY) !== null) return;
  for (const prefix of ["readmeforge", "brikk"]) {
    const oldValue = localStorage.getItem(`${prefix}:blocks`);
    if (oldValue !== null) {
      localStorage.setItem(BLOCKS_KEY, oldValue);
      return;
    }
  }
}
migrateLegacyStorage();

// Shows the loading spinner as a brief overlay whenever navigating
// directly between the landing page and the app (either direction).
//
// This deliberately sets state *during render* rather than in a
// useEffect - that's the documented React pattern for "adjust state
// when a value changes" (see react.dev/learn/you-might-not-need-an-effect
// #adjusting-some-state-when-a-prop-changes). A useEffect only runs
// *after* the browser has already committed and painted the new route,
// which is exactly why the previous version flashed the new page first
// and only covered it with the spinner a frame later. Setting state
// synchronously in the render body makes React redo that render with
// the overlay already included before anything reaches the screen - no
// flash, because the browser never gets a chance to paint the
// in-between state.
function AppRoutes() {
  const location = useLocation();
  const [prevPath, setPrevPath] = useState(location.pathname);
  const [transitioning, setTransitioning] = useState(false);

  if (location.pathname !== prevPath) {
    const isLandingAppSwap =
      (prevPath === "/" && location.pathname === "/app") ||
      (prevPath === "/app" && location.pathname === "/");
    if (isLandingAppSwap) setTransitioning(true);
    setPrevPath(location.pathname);
  }

  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes location={location}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/app" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      {transitioning && (
        <LoadingSpinner onComplete={() => setTransitioning(false)} />
      )}
    </>
  );
}

export default function App() {
  return <AppRoutes />;
}
