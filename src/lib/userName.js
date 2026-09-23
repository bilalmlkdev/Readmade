// Deterministic guest names from a stable browser id
const NAME_POOL = [
  "Alex",
  "Jordan",
  "Sam",
  "Casey",
  "Riley",
  "Morgan",
  "Quinn",
  "Avery",
  "Rowan",
  "Skyler",
  "Reese",
  "Hayden",
  "Emerson",
  "Finley",
  "Dakota",
  "Blake",
  "Charlie",
  "Jamie",
  "Taylor",
  "Drew",
  "Harper",
  "Parker",
  "Ari",
  "Noel",
  "Shay",
  "Kai",
  "Robin",
  "Jules",
  "Marlow",
  "Sage",
];

const FALLBACK_NAMES = [
  "Guest",
  "Visitor",
  "Creator",
  "Builder",
  "Maker",
  "Explorer",
];

export const GITHUB_URL = "https://github.com/bilalmlkdev/readmade";
export const USER_PLAN = "Free";

function hashString(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

export function getBrowserId() {
  try {
    let id = localStorage.getItem("readmade_browser_id");
    if (!id) {
      id =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : `b_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
      localStorage.setItem("readmade_browser_id", id);
    }
    return id;
  } catch {
    return "readmade_default_browser";
  }
}

function getStoredName() {
  try {
    return localStorage.getItem("readmade_user_name") || "";
  } catch {
    return "";
  }
}

export function setStoredName(name) {
  try {
    localStorage.setItem("readmade_user_name", name);
  } catch {
    // storage unavailable
  }
}

function generateName(browserId) {
  const pool = NAME_POOL.length ? NAME_POOL : FALLBACK_NAMES;
  return pool[hashString(browserId) % pool.length];
}

export function getDisplayName(browserId) {
  return getStoredName() || generateName(browserId);
}

export function getAvatarUrl(browserId) {
  return `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(
    browserId,
  )}&backgroundColor=f5f4ef`;
}
