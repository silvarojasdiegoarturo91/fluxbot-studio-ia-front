"use client";

import { useTranslations, useLocale } from "next-intl";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { TextReveal } from "@/components/ui/text-reveal";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import Link from "next/link";
import { Plug, Brain, TrendingUp } from "lucide-react";

const steps = [
  { key: "step1", icon: Plug },
  { key: "step2", icon: Brain },
  { key: "step3", icon: TrendingUp },
];

export function SetupTimeline() {
  const t = useTranslations("setup");
  const locale = useLocale();
  const timelineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(timelineRef, { once: true, margin: "-100px" });

  return (
    <section className="py-20 md:py-28">
      <div className="text-center mb-16">
        <TextReveal
          text={t("title")}
          mode="words"
          as="h2"
          className="text-3xl font-bold tracking-tight sm:text-4xl"
        />
        <ScrollReveal variant="up" delay={0.3}>
          <p className="mt-4 text-lg text-slate-400">{t("subtitle")}</p>
        </ScrollReveal>
      </div>

      <div className="relative mx-auto max-w-2xl" ref={timelineRef}>
        <div className="absolute left-8 top-0 bottom-0 w-px bg-white/10 origin-top">
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="w-full h-full bg-gradient-to-b from-sky-500 to-sky-500/20 origin-top"
          />
        </div>

        <div className="space-y-12">
          {steps.map(({ key, icon: Icon }, i) => (
            <ScrollReveal key={key} variant="up" delay={0.2 + i * 0.2}>
              <div className="flex items-start gap-6">
                <div className="relative z-10 flex-shrink-0">
                  <div className="h-16 w-16 rounded-2xl bg-sky-500/10 border border-sky-400/20 flex items-center justify-center">
                    <Icon className="h-7 w-7 text-sky-400" />
                  </div>
                </div>
                <div className="pt-2">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-xs font-bold text-sky-400 bg-sky-400/10 px-2 py-0.5 rounded-full">
                      {i + 1}
                    </span>
                    <h3 className="text-xl font-semibold">{t(`${key}_title`)}</h3>
                  </div>
                  <p className="text-slate-400">{t(`${key}_desc`)}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal variant="up" delay={1.0} className="mt-12 text-center">
          <Link
            href={`/${locale}/install`}
            className="inline-flex rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-white hover:bg-sky-400 transition-colors"
          >
            {t("title")} →
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
