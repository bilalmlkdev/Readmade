const PALETTE_MIN_KEY = "readmade:paletteMinimized";

// Persisted minimize state for the field palette
export function readPaletteMinimized() {
  try {
    return localStorage.getItem(PALETTE_MIN_KEY) === "1";
  } catch {
    return false;
  }
}

export function writePaletteMinimized(value) {
  try {
    localStorage.setItem(PALETTE_MIN_KEY, value ? "1" : "0");
  } catch {
    // storage unavailable
  }
}
