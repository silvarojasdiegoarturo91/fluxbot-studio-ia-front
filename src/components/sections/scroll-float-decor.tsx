"use client";

import { ScrollFloatObject } from "@/components/ui/scroll-float-object";
import { GradientOrb } from "@/components/ui/gradient-orb";
import { Bot, MessageSquare, ShoppingCart, Zap, BarChart3, Shield } from "lucide-react";

const floatingIcons = [
  { Icon: Bot, className: "top-[10%] left-[5%]", size: "h-14 w-14", speed: 0.8, rotate: [0, 25] as [number, number], scale: [1, 1.3] as [number, number], opacity: [0, 1] as [number, number], hShift: 30 },
  { Icon: MessageSquare, className: "top-[20%] right-[8%]", size: "h-10 w-10", speed: -0.6, rotate: [0, -20] as [number, number], scale: [0.8, 1.2] as [number, number], opacity: [0, 0.7] as [number, number], hShift: -20 },
  { Icon: ShoppingCart, className: "top-[50%] left-[3%]", size: "h-12 w-12", speed: 1.0, rotate: [0, 30] as [number, number], scale: [0.5, 1.1] as [number, number], opacity: [0, 0.6] as [number, number], hShift: 40 },
  { Icon: Zap, className: "top-[65%] right-[4%]", size: "h-16 w-16", speed: -0.9, rotate: [0, -15] as [number, number], scale: [1, 1.4] as [number, number], opacity: [0, 0.8] as [number, number], hShift: -35 },
  { Icon: BarChart3, className: "top-[35%] left-[8%]", size: "h-8 w-8", speed: 0.5, rotate: [0, 40] as [number, number], scale: [0.6, 1] as [number, number], opacity: [0, 0.5] as [number, number], hShift: 15 },
  { Icon: Shield, className: "top-[80%] right-[6%]", size: "h-11 w-11", speed: -0.7, rotate: [0, -25] as [number, number], scale: [0.9, 1.2] as [number, number], opacity: [0, 0.65] as [number, number], hShift: -25 },
];

export function ScrollFloatDecor() {
  return (
    <div className="relative h-0 pointer-events-none select-none overflow-visible">
      <GradientOrb color="sky" size={300} blur={180} className="absolute top-0 left-1/4" animate delay={0} />
      <GradientOrb color="purple" size={250} blur={160} className="absolute top-20 right-1/4" animate delay={3} />
      <GradientOrb color="emerald" size={200} blur={150} className="absolute top-40 left-1/2" animate delay={5} />

      {floatingIcons.map(({ Icon, className, size, speed, rotate, scale, opacity, hShift }, i) => (
        <ScrollFloatObject
          key={i}
          speed={speed}
          rotateRange={rotate}
          scaleRange={scale}
          opacityRange={opacity}
          horizontalShift={hShift}
          className={`absolute ${className}`}
        >
          <div className={`${size} rounded-2xl bg-slate-800/50 border border-white/10 backdrop-blur-sm flex items-center justify-center shadow-lg shadow-black/20`}>
            <Icon className="h-1/2 w-1/2 text-sky-400/60" />
          </div>
        </ScrollFloatObject>
      ))}
    </div>
  );
}
