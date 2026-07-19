"use client";

import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { CounterNumber } from "@/components/ui/counter-number";
import { GradientOrb } from "@/components/ui/gradient-orb";

export function StatsSection() {
  const t = useTranslations("stats");

  return (
    <section className="relative py-20 md:py-28 overflow-hidden rounded-2xl bg-gradient-to-b from-slate-900/50 to-slate-950">
      <GradientOrb color="sky" size={500} blur={200} className="-top-40 left-1/2 -translate-x-1/2" animate={false} />

      <div className="relative z-10 mx-auto max-w-5xl px-4">
        <ScrollReveal variant="up">
          <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl mb-16">
            {t("title")}
          </h2>
        </ScrollReveal>

        <div className="grid gap-8 md:grid-cols-3">
          <ScrollReveal variant="scale" delay={0.1}>
            <div className="text-center space-y-2">
              <CounterNumber
                to={125}
                prefix="$"
                suffix="K+"
                className="text-5xl font-bold text-sky-400"
              />
              <p className="text-sm text-slate-400">{t("revenue_label")}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="scale" delay={0.2}>
            <div className="text-center space-y-2">
              <CounterNumber
                to={20}
                suffix="%"
                className="text-5xl font-bold text-sky-400"
              />
              <p className="text-sm text-slate-400">{t("conversion_label")}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="scale" delay={0.3}>
            <div className="text-center space-y-2">
              <CounterNumber
                to={95}
                suffix="%"
                className="text-5xl font-bold text-sky-400"
              />
              <p className="text-sm text-slate-400">{t("resolution_label")}</p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
