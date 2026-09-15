import { useState, lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import NotFound from "./components/pages/NotFound";
import LoadingSpinner from "./components/ui/LoadingSpinner";
import ErrorBoundary from "./components/ui/ErrorBoundary";
import { BLOCKS_KEY } from "./store/useReadme.js";

const Home = lazy(() => import("./Home"));
const LandingPage = lazy(() => import("./components/landing/LandingPage"));

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
      <ErrorBoundary key={location.pathname}>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes location={location}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/app" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
      {transitioning && (
        <LoadingSpinner onComplete={() => setTransitioning(false)} />
      )}
    </>
  );
}

export default function App() {
  return <AppRoutes />;
}
