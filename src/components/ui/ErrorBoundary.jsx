import { Component } from "react";
import { Link } from "react-router-dom";

// Catches render-time errors (including failures while loading a
// lazy route chunk after the code-split) and swaps in a recoverable
// fallback instead of a white screen. Error boundaries can't catch
// event-handler or async errors, so those need explicit handling where
// they happen - this covers render/commit failures.
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Readmade error boundary:", error, info?.componentStack);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <main className="min-h-screen w-full bg-white text-black flex flex-col items-center justify-center px-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#f5f4ef] border border-black/[0.06] flex items-center justify-center mb-6">
            <span className="text-2xl">⚠️</span>
          </div>

          <p className="text-[13px] font-semibold tracking-widest text-gray-400 uppercase mb-2">
            Something went wrong
          </p>
          <h1 className="text-[26px] md:text-[32px] font-bold tracking-tight">
            This part of the app hit an error
          </h1>
          <p className="mt-3 text-[14px] text-gray-500 max-w-sm leading-relaxed">
            Your workspace data is safe in localStorage. Reload to try again,
            or head back to the homepage.
          </p>

          <div className="mt-8 flex items-center gap-3">
            <button
              onClick={this.handleReload}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-black text-white! text-[13.5px] font-semibold hover:bg-gray-800 transition-colors shadow-lg shadow-black/10"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M23 4v6h-6" />
                <path d="M1 20v-6h6" />
                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10" />
                <path d="M20.49 15a9 9 0 0 1-14.85 3.36L1 14" />
              </svg>
              Reload
            </button>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 text-[13.5px] font-semibold text-gray-800! hover:bg-gray-50 transition-colors"
            >
              Back to Readmade
            </Link>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}