"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const PLACEHOLDER_LOGOS = [
  "TAV", "ShopPro", "VentaMax", "EcomPlus",
  "TiendaLive", "RetailHub", "ComercioIA", "DigitalStore",
];

export function LogoCarousel() {
  const t = useTranslations("logos");

  return (
    <section className="py-16 md:py-20">
      <ScrollReveal variant="up">
        <p className="text-center text-sm font-medium text-slate-400 mb-10">
          {t("title")}
        </p>
      </ScrollReveal>

      <div className="relative overflow-hidden marquee-mask">
        <div className="flex animate-looptext" style={{ width: "max-content" }}>
          {[...PLACEHOLDER_LOGOS, ...PLACEHOLDER_LOGOS].map((logo, i) => (
            <div
              key={`${logo}-${i}`}
              className="flex-shrink-0 mx-8 flex items-center justify-center h-12 px-6 rounded-lg border border-white/5 bg-white/[0.02]"
            >
              <span className="text-lg font-semibold text-slate-600 tracking-wide">{logo}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative overflow-hidden marquee-mask mt-4">
        <div className="flex animate-looptext-reverse" style={{ width: "max-content" }}>
          {[...PLACEHOLDER_LOGOS.slice(4), ...PLACEHOLDER_LOGOS.slice(0, 4), ...PLACEHOLDER_LOGOS.slice(4), ...PLACEHOLDER_LOGOS.slice(0, 4)].map((logo, i) => (
            <div
              key={`rev-${logo}-${i}`}
              className="flex-shrink-0 mx-8 flex items-center justify-center h-12 px-6 rounded-lg border border-white/5 bg-white/[0.02]"
            >
              <span className="text-lg font-semibold text-slate-600 tracking-wide">{logo}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
