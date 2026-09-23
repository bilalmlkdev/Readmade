import { useEffect, useState } from "react";
import { REPO_API } from "../lib/repo.js";

// Fetch GitHub star count once on mount
export function useRepoStars() {
  const [repoStars, setRepoStars] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetch(REPO_API, { headers: { Accept: "application/vnd.github+json" } })
      .then((res) =>
        res.ok ? res.json() : Promise.reject(new Error("stars fetch failed")),
      )
      .then((data) => {
        if (!cancelled && typeof data.stargazers_count === "number") {
          setRepoStars(data.stargazers_count);
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  return repoStars;
}
