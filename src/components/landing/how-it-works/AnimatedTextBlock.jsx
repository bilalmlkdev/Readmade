import { motion } from "motion/react";
import { cn } from "../../../lib/cn";
import { CheckCircle2 } from "lucide-react";

const textVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const highlightVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 6 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { delay: 0.3 + i * 0.06, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export function AnimatedTextBlock({ step, title, description, highlights, icon: Icon }) {
  return (
    <div className="flex flex-col">
      <motion.div
        custom={0}
        variants={textVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="mb-4 flex items-center gap-2.5"
      >
        <div className="flex size-9 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 sm:size-10">
          <Icon className="size-[18px] text-primary" />
        </div>
        <span className="font-mono text-[11px] tracking-[0.2em] text-primary uppercase">
          Step {step}
        </span>
      </motion.div>

      <motion.h3
        custom={1}
        variants={textVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="mb-3 text-xl leading-[1.15] font-medium tracking-tight sm:text-2xl lg:text-3xl"
      >
        {title}
      </motion.h3>

      <motion.div
        custom={2}
        variants={textVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="mb-4 h-0.5 w-10 rounded-full bg-primary"
      />

      <motion.p
        custom={3}
        variants={textVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="mb-5 max-w-md text-sm leading-[1.7] text-muted-foreground lg:text-[15px]"
      >
        {description}
      </motion.p>

      <div className="flex flex-wrap gap-2">
        {highlights.map((highlight, i) => (
          <motion.span
            key={highlight}
            custom={i}
            variants={highlightVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border",
              "border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-medium text-foreground",
            )}
          >
            <CheckCircle2 className="size-3 text-primary" />
            {highlight}
          </motion.span>
        ))}
      </div>
    </div>
  );
}
