"use client";

import { ReactNode, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

type Props = {
  children: ReactNode;
  speed?: number;
  className?: string;
  as?: "div" | "section" | "article";
};

export function ParallaxLayer({
  children,
  speed = 0.3,
  className,
  as: Tag = "div",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [speed * 100, speed * -100]);

  return (
    <Tag ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </Tag>
  );
}
