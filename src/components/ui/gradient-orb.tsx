"use client";

import { motion } from "motion/react";

type Props = {
  color?: "sky" | "purple" | "emerald" | "amber" | "rose";
  size?: number;
  blur?: number;
  className?: string;
  animate?: boolean;
  delay?: number;
}

const colorMap = {
  sky: "bg-sky-500",
  purple: "bg-purple-500",
  emerald: "bg-emerald-500",
  amber: "bg-amber-500",
  rose: "bg-rose-500",
};

export function GradientOrb({
  color = "sky",
  size = 400,
  blur = 194,
  className,
  animate = true,
  delay = 0,
}: Props) {
  return (
    <motion.div
      className={`absolute rounded-full ${colorMap[color]} opacity-20 ${className ?? ""}`}
      style={{
        width: size,
        height: size,
        filter: `blur(${blur}px)`,
      }}
      animate={
        animate
          ? {
              y: [0, -20, 0],
              x: [0, 10, 0],
            }
          : undefined
      }
      transition={{
        duration: 8,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}
