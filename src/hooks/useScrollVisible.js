import { useCallback, useEffect, useRef, useState } from "react";

export default function useScrollVisible(delay = 600) {
  const [showing, setShowing] = useState(false);
  const timer = useRef(null);

  const onScroll = useCallback(() => {
    setShowing(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setShowing(false), delay);
  }, [delay]);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  return { showing, onScroll };
}
