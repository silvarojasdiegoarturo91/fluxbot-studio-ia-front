"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

type ScrollMotionStageProps = {
  children: ReactNode;
  className?: string;
  rotate?: [number, number];
  scale?: [number, number, number];
  y?: [number, number];
};

/**
 * A bounded scroll-driven stage for marketing surfaces.
 * The transform range is deliberately small so it remains legible and does not
 * cause layout shifts while Lenis owns the document scroll.
 */
export function ScrollMotionStage({
  children,
  className,
  rotate = [-2, 2],
  scale = [0.94, 1, 0.96],
  y = [36, -28],
}: ScrollMotionStageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const yRange: number[] = shouldReduceMotion ? [0, 0] : [...y];
  const rotateRange: number[] = shouldReduceMotion ? [0, 0] : [...rotate];
  const scaleRange: number[] = shouldReduceMotion ? [1, 1, 1] : [...scale];
  const motionY = useTransform(scrollYProgress, [0, 1], yRange);
  const motionRotate = useTransform(scrollYProgress, [0, 1], rotateRange);
  const motionScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    scaleRange,
  );

  return (
    <motion.div
      ref={ref}
      className={`will-change-transform ${className ?? ""}`}
      style={{ y: motionY, rotate: motionRotate, scale: motionScale }}
    >
      {children}
    </motion.div>
  );
}
