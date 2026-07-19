"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { MouseParallax } from "@/components/ui/mouse-parallax";
import { GradientOrb } from "@/components/ui/gradient-orb";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { TextReveal } from "@/components/ui/text-reveal";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { TiltCard } from "@/components/ui/tilt-card";
import { CheckCircle, Clock, Star } from "lucide-react";

export function HeroSection() {
  const t = useTranslations("hero");
  const tCommon = useTranslations("common");
  const locale = useLocale();

  return (
    <section className="relative isolate overflow-hidden rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 pt-20 pb-16 md:pt-32 md:pb-24 lg:pb-32">
      <MouseParallax intensity={12} className="absolute inset-0 pointer-events-none">
        <GradientOrb color="sky" size={600} blur={194} className="-top-40 -left-40" delay={0} />
        <GradientOrb color="purple" size={500} blur={194} className="-bottom-32 -right-32" delay={2} />
        <GradientOrb color="emerald" size={300} blur={150} className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" delay={4} />
      </MouseParallax>

      <div className="relative z-10 mx-auto max-w-4xl text-center px-4">
        <ScrollReveal variant="up" delay={0.1}>
          <span className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-400/10 px-4 py-1.5 text-sm text-sky-200 backdrop-blur-sm">
            <Zap className="h-3.5 w-3.5" />
            {t("badge")}
          </span>
        </ScrollReveal>

        <div className="mt-8">
          <TextReveal
            text={`${t("headline_1")} ${t("headline_2")}`}
            mode="words"
            as="h1"
            className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl leading-tight"
            staggerDelay={0.04}
          />
        </div>

        <ScrollReveal variant="up" delay={0.6}>
          <p className="mt-6 text-lg text-slate-300 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </ScrollReveal>

        <ScrollReveal variant="up" delay={0.8}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton strength={3}>
              <Link
                href={`/${locale}/install`}
                className="inline-flex rounded-full bg-sky-500 px-8 py-3.5 text-base font-semibold text-white hover:bg-sky-400 transition-colors shadow-lg shadow-sky-500/25"
              >
                {tCommon("cta_install")} →
              </Link>
            </MagneticButton>
            <MagneticButton strength={3}>
              <Link
                href={`/${locale}/demo`}
                className="inline-flex rounded-full border border-white/20 px-8 py-3.5 text-base font-semibold hover:bg-white/5 transition-colors"
              >
                {tCommon("cta_demo")}
              </Link>
            </MagneticButton>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="up" delay={1.0}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle className="h-4 w-4 text-sky-400" />
              {t("trust_1")}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-sky-400" />
              {t("trust_2")}
            </span>
            <span className="flex items-center gap-1.5">
              <Star className="h-4 w-4 text-sky-400" />
              {t("trust_3")}
            </span>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="scale" delay={1.2} className="mt-12">
          <TiltCard intensity={4} className="mx-auto max-w-2xl">
            <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-1 shadow-2xl shadow-black/40 backdrop-blur">
              <div className="rounded-xl bg-slate-950 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-3 w-3 rounded-full bg-red-500" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500" />
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                  <span className="ml-2 text-xs text-slate-500">FluxBot Widget Demo</span>
                </div>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <div className="h-8 w-8 rounded-full bg-sky-500/20 flex items-center justify-center text-xs text-sky-400">FB</div>
                    <div className="rounded-xl rounded-tl-none bg-slate-800 px-4 py-2.5 text-sm text-slate-200">
                      {t("chat_placeholder")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TiltCard>
        </ScrollReveal>
      </div>
    </section>
  );
}

function Zap(props: React.SVGProps<SVGSVGElement> & { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}
