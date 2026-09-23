import { Component } from "react";
import { Link } from "react-router-dom";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
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
        <main className="min-h-screen w-full flex flex-col items-center justify-center px-6 text-center" style={{ background: "var(--bg)" }}>
          <h1 className="mt-[-20px] md:mt-[-30px] text-[28px] md:text-[36px] font-normal tracking-tight text-black dark:text-white">
            Something went wrong
          </h1>

          <p className="mt-4 text-base text-black dark:text-gray-300 max-w-sm leading-relaxed">
            This part of the app hit an error. Your workspace data is safe.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={this.handleReload}
              className="inline-flex items-center px-2 py-1.5 bg-black text-white text-[14px] font-medium hover:bg-black/90 rounded-lg shadow-xs dark:bg-white dark:text-black dark:hover:bg-white/90"
            >
              Reload
            </button>
            <Link
              to="/" className="inline-flex items-center bg-gray-200 dark:bg-white/10 rounded-lg px-2 py-1.5 text-[14px] font-medium text-gray-500 hover:text-black dark:text-gray-300 dark:hover:text-white"
            >
              Back to Readmade
            </Link>
          </div>

          {this.state.error && (
            <details className="mt-10 w-full max-w-md text-left">
              <summary className="cursor-pointer text-[13px] text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 font-medium mb-3">
                Error details
              </summary>
              <pre className="bg-gray-50 dark:bg-white/5 p-4 text-[12px] overflow-auto max-h-40 font-mono text-red-500">
                {this.state.error.message}
              </pre>
            </details>
          )}
        </main>
      );
    }

    return this.props.children;
  }
}
