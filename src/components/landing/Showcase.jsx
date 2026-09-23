import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { cn } from "../../lib/cn";
import { BrowserChrome } from "./BrowserChrome";
import { ShowcaseCanvas } from "./ShowcaseCanvas";
import { EDGES, INSIGHTS, NODES, wait } from "./showcaseData";

export function Showcase({ className }) {
  const ref = useRef(null);
  const svgRef = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-50px" });
  const [visibleNodes, setVisibleNodes] = useState([]);
  const [visibleEdges, setVisibleEdges] = useState([]);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [visibleInsights, setVisibleInsights] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [positions, setPositions] = useState({});

  useEffect(() => {
    let raf = 0;
    const update = () => {
      if (!svgRef.current) return;
      const rect = svgRef.current.getBoundingClientRect();
      const next = {};
      NODES.forEach((node) => {
        next[node.id] = {
          x: (node.x / 100) * rect.width,
          y: (node.y / 100) * rect.height,
        };
      });
      setPositions(next);
    };
    raf = requestAnimationFrame(update);
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", update);
    };
  }, [visibleNodes]);

  useEffect(() => {
    if (!isInView) return;
    let cancelled = false;

    const sequence = async () => {
      while (!cancelled) {
        await wait(50);
        if (cancelled) return;
        setVisibleNodes([]);
        setVisibleEdges([]);
        setShowAnalysis(false);
        setVisibleInsights([]);
        setIsAnalyzing(false);
        await wait(400);

        for (let i = 0; i < NODES.length; i++) {
          if (cancelled) return;
          const id = NODES[i].id;
          setVisibleNodes((prev) => [...prev, id]);
          await wait(350);
        }

        await wait(300);
        for (let i = 0; i < EDGES.length; i++) {
          if (cancelled) return;
          setVisibleEdges((prev) => [...prev, i]);
          await wait(200);
        }

        await wait(400);
        if (cancelled) return;
        setShowAnalysis(true);
        setIsAnalyzing(true);
        await wait(600);
        setIsAnalyzing(false);

        for (let i = 0; i < INSIGHTS.length; i++) {
          if (cancelled) return;
          setVisibleInsights((prev) => [...prev, i]);
          await wait(250);
        }

        await wait(3500);
      }
    };

    sequence();
    return () => {
      cancelled = true;
    };
  }, [isInView]);

  return (
    <div ref={ref} className={cn("md:col-span-7", className)}>
      <div className="mask-b-from-55% relative mt-8 overflow-hidden sm:mt-12 md:mt-20">
        <div className="inset-shadow-2xs ring-background bg-background dark:inset-shadow-white/20 relative overflow-hidden rounded-2xl border border-border p-2.5 shadow-lg shadow-zinc-950/15 ring-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <BrowserChrome url="readmade.vercel.app">
              <ShowcaseCanvas
                svgRef={svgRef}
                positions={positions}
                visibleNodes={visibleNodes}
                visibleEdges={visibleEdges}
                showAnalysis={showAnalysis}
                isAnalyzing={isAnalyzing}
                visibleInsights={visibleInsights}
              />
            </BrowserChrome>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
