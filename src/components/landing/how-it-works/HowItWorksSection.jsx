import { motion } from "motion/react";
import { steps } from "./stepData";
import { StepSection } from "./StepSection";

const headerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
      staggerChildren: 0.1,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export function HowItWorksSection() {
  return (
    <section className="w-full" id="how-it-works">
      <motion.div
        variants={headerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="mb-12 flex flex-col gap-3 sm:mb-16 sm:gap-4 md:mb-20 lg:mb-24"
      >
        <motion.span
          variants={childVariants}
          className="font-mono text-xs uppercase tracking-widest text-muted-foreground"
        >
          How It Works
        </motion.span>
        <motion.h2
          variants={childVariants}
          className="max-w-2xl text-3xl leading-[1.1] font-light tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl"
        >
          From blank file to
          <br className="hidden sm:block" />
          <span className="instrument-serif -tracking-normal"> polished README</span>
        </motion.h2>
        <motion.p
          variants={childVariants}
          className="mt-1 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base"
        >
          Four steps. Zero Markdown stress. Go from idea to a GitHub-ready README
          in minutes, not hours.
        </motion.p>
      </motion.div>

      <div className="space-y-0">
        {steps.map((step, index) => (
          <StepSection
            key={step.step}
            step={step}
            index={index}
            isLast={index === steps.length - 1}
          />
        ))}
      </div>
    </section>
  );
}
