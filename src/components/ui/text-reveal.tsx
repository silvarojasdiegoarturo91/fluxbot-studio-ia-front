"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";

type Props = {
  text: string;
  mode?: "words" | "chars" | "lines";
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
  staggerDelay?: number;
};

export function TextReveal({
  text,
  mode = "words",
  className,
  as: Tag = "h2",
  delay = 0,
  staggerDelay = 0.03,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const units = mode === "words"
    ? text.split(" ")
    : mode === "chars"
      ? text.split("")
      : text.split("\n");

  return (
    <div ref={ref}>
      <Tag className={className}>
        {units.map((unit, i) => (
          <motion.span
            key={`${unit}-${i}`}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{
              duration: 0.4,
              delay: delay + i * staggerDelay,
              ease: "easeOut",
            }}
            className="inline-block"
          >
            {unit}
            {mode === "words" && i < units.length - 1 ? "\u00A0" : ""}
          </motion.span>
        ))}
      </Tag>
    </div>
  );
}
