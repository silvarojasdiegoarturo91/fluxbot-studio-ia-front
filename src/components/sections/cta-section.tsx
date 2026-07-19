"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { TextReveal } from "@/components/ui/text-reveal";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { GradientOrb } from "@/components/ui/gradient-orb";
import { MouseParallax } from "@/components/ui/mouse-parallax";

export function CTASection() {
  const t = useTranslations("cta_final");
  const tCommon = useTranslations("common");
  const locale = useLocale();

  return (
    <section className="relative py-24 md:py-36 overflow-hidden rounded-2xl bg-gradient-to-b from-sky-500/10 via-slate-900 to-slate-950">
      <MouseParallax intensity={8} className="absolute inset-0 pointer-events-none">
        <GradientOrb color="sky" size={600} blur={200} className="-top-40 left-1/4" delay={0} />
        <GradientOrb color="purple" size={400} blur={180} className="-bottom-20 right-1/4" delay={2} />
        <GradientOrb color="emerald" size={250} blur={150} className="top-1/2 left-1/2" delay={4} />
      </MouseParallax>

      <div className="relative z-10 mx-auto max-w-3xl text-center px-4">
        <TextReveal
          text={t("title")}
          mode="words"
          as="h2"
          className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
          staggerDelay={0.05}
        />

        <ScrollReveal variant="up" delay={0.5}>
          <p className="mt-6 text-lg text-slate-300 max-w-xl mx-auto">
            {t("subtitle")}
          </p>
        </ScrollReveal>

        <ScrollReveal variant="up" delay={0.7}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton strength={3}>
              <Link
                href={`/${locale}/install`}
                className="inline-flex rounded-full bg-sky-500 px-8 py-4 text-base font-semibold text-white hover:bg-sky-400 transition-colors shadow-lg shadow-sky-500/25 animate-pulse-glow"
              >
                {t("cta_install")} →
              </Link>
            </MagneticButton>
            <MagneticButton strength={3}>
              <Link
                href={`/${locale}/contact`}
                className="inline-flex rounded-full border border-white/20 px-8 py-4 text-base font-semibold hover:bg-white/5 transition-colors"
              >
                {t("cta_demo")}
              </Link>
            </MagneticButton>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
