export const THEME_KEY = "readmade:theme";
export const THEME_EVENT = "readmade:theme-change";

export function getStoredTheme() {
  try {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    // storage unavailable
  }
  return null;
}

export function systemTheme() {
  try {
    return window.matchMedia?.("(prefers-color-scheme: dark)")?.matches
      ? "dark"
      : "light";
  } catch {
    return "light";
  }
}

export function getTheme() {
  return getStoredTheme() || systemTheme();
}

export function applyTheme(theme) {
  const next = theme === "dark" ? "dark" : "light";
  document.documentElement.classList.toggle("dark", next === "dark");
  document.documentElement.style.colorScheme = next;
  try {
    localStorage.setItem(THEME_KEY, next);
  } catch {
    // storage unavailable
  }
  window.dispatchEvent(new CustomEvent(THEME_EVENT, { detail: { theme: next } }));
}

export function toggleTheme() {
  const next = getTheme() === "dark" ? "light" : "dark";
  applyTheme(next);
  return next;
}

export function initTheme() {
  applyTheme(getTheme());
}
