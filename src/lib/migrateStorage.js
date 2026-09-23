import { BLOCKS_KEY } from "../store/useReadme.js";

// Move data from older product names into the current storage key
export function migrateLegacyStorage() {
  if (localStorage.getItem(BLOCKS_KEY) !== null) return;
  for (const prefix of ["readmeforge", "brikk"]) {
    const oldValue = localStorage.getItem(`${prefix}:blocks`);
    if (oldValue !== null) {
      localStorage.setItem(BLOCKS_KEY, oldValue);
      return;
    }
  }
}
