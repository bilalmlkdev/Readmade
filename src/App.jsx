import { useState, lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import NotFound from "./components/pages/NotFound";
import LoadingSpinner from "./components/ui/LoadingSpinner";
import ErrorBoundary from "./components/ui/ErrorBoundary";
import { migrateLegacyStorage } from "./lib/migrateStorage.js";

const Home = lazy(() => import("./Home"));
const LandingPage = lazy(() => import("./components/landing/LandingPage"));
const DocsPage = lazy(() => import("./docs/DocsPage"));

migrateLegacyStorage();

function AppRoutes() {
  const location = useLocation();
  const [prevPath, setPrevPath] = useState(location.pathname);
  const [transitioning, setTransitioning] = useState(false);
  const [hasNavigated, setHasNavigated] = useState(false);

  if (location.pathname !== prevPath) {
    setTransitioning(true);
    setPrevPath(location.pathname);
    setHasNavigated(true);
  }

  return (
    <>
      <ErrorBoundary key={location.pathname}>
        <Suspense fallback={hasNavigated ? <LoadingSpinner /> : null}>
          <Routes location={location}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/app" element={<Home />} />
            <Route path="/docs" element={<DocsPage />} />
            <Route path="/docs/:slug" element={<DocsPage />} />
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
