"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export function BigTextParallax() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const xLeft = useTransform(scrollYProgress, [0, 1], [-120, 120]);
  const xRight = useTransform(scrollYProgress, [0, 1], [120, -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.85, 1, 1, 0.85]);

  return (
    <section ref={ref} className="relative py-24 md:py-40 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.025]" style={{
        backgroundImage: "radial-gradient(circle, #64748b 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }} />

      <div className="relative z-10 space-y-4 px-4">
        <motion.div style={{ x: xLeft, opacity, scale }} className="overflow-hidden">
          <p className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-white/[0.06] whitespace-nowrap select-none">
            IA que vende • IA que vende • IA que vende •
          </p>
        </motion.div>
        <motion.div style={{ x: xRight, opacity, scale }} className="overflow-hidden">
          <p className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-sky-500/10 whitespace-nowrap select-none">
            24/7 para tu negocio • 24/7 para tu negocio •
          </p>
        </motion.div>
      </div>
    </section>
  );
}
