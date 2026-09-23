import { Children } from "react";
import { motion } from "motion/react";

export function AnimatedGroup({
  children,
  className,
  variants,
  as: Component = "div",
  asChild: ChildComponent = "div",
}) {
  const MotionComponent = motion[Component] ?? motion.div;
  const MotionChild = motion[ChildComponent] ?? motion.div;

  const containerVariants = variants?.container ?? {
    visible: { transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = variants?.item ?? {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <MotionComponent
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={className}
    >
      {Children.map(children, (child, index) => (
        <MotionChild key={index} variants={itemVariants}>
          {child}
        </MotionChild>
      ))}
    </MotionComponent>
  );
}
