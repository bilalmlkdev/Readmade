import { Children } from "react";
import { motion } from "motion/react";

export function HeroAnimations({ children }) {
  const childArray = Children.toArray(children);

  return (
    <motion.div
      className="space-y-16"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.15, delayChildren: 0.1 },
        },
      }}
    >
      {childArray.map((child, i) => (
        <motion.div
          key={i}
          variants={{
            hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
            visible: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
            },
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
