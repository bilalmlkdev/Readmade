import { useState } from "react";
import { getDisplayName, getAvatarUrl } from "../../lib/userName.js";

export default function BrandMark({ size, browserId, onClick }) {
  const [errored, setErrored] = useState(false);
  const name = getDisplayName(browserId);
  const initial = (name || "U").charAt(0).toUpperCase();

  if (errored) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="rounded-full flex items-center justify-center text-white font-semibold select-none shrink-0 bg-gray-800 hover:ring-2 hover:ring-gray-300 transition-all"
        style={{ width: size, height: size, fontSize: Math.round(size * 0.42) }}
        aria-label={name}
      >
        {initial}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full shrink-0 bg-gray-100 hover:ring-2 hover:ring-gray-300 transition-all overflow-hidden"
      style={{ width: size, height: size }}
      aria-label={name}
    >
      <img
        src={getAvatarUrl(browserId)}
        alt={name}
        onError={() => setErrored(true)}
        className="w-full h-full object-cover"
      />
    </button>
  );
}
