import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { getTheme, toggleTheme, THEME_EVENT } from "../../lib/theme.js";

export default function ThemeToggle({ className = "" }) {
  const [theme, setTheme] = useState(getTheme);

  useEffect(() => {
    const onChange = (e) => setTheme(e.detail?.theme ?? getTheme());
    window.addEventListener(THEME_EVENT, onChange);
    return () => window.removeEventListener(THEME_EVENT, onChange);
  }, []);

  const isDark = theme === "dark";
  const label = isDark ? "Switch to light mode" : "Switch to dark mode";

  return (
    <button
      type="button" onClick={() => toggleTheme()}
      className={`flex items-center gap-1.5 px-2 py-1.5 text-[13px] font-medium text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg ${className}`}
      title={label}
      aria-label={label}
      aria-pressed={isDark}
    >
      {isDark ? <Sun size={14.5} /> : <Moon size={14.5} />}
      <span className="hidden sm:inline">{isDark ? "Light" : "Dark"}</span>
    </button>
  );
}
