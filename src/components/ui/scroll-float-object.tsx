"use client";

import { ReactNode, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

type Props = {
  children: ReactNode;
  speed?: number;
  rotateRange?: [number, number];
  scaleRange?: [number, number];
  opacityRange?: [number, number];
  horizontalShift?: number;
  className?: string;
};

export function ScrollFloatObject({
  children,
  speed = 0.5,
  rotateRange = [0, 0],
  scaleRange = [1, 1],
  opacityRange = [1, 1],
  horizontalShift = 0,
  className,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [speed * 200, speed * -200]);
  const rotate = useTransform(scrollYProgress, [0, 1], rotateRange);
  const scale = useTransform(scrollYProgress, [0, 1], scaleRange);
  const opacity = useTransform(scrollYProgress, [0, 1], opacityRange);
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [horizontalShift * -1, horizontalShift]
  );

  return (
    <motion.div
      ref={ref}
      style={{ y, rotate, scale, opacity, x }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
