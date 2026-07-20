"use client";

import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { TextReveal } from "@/components/ui/text-reveal";
import { DemoSection } from "@/components/sections/demo-section";
import { GradientOrb } from "@/components/ui/gradient-orb";

export default function DemoPage() {
  const t = useTranslations("demo_section");

  return (
    <div className="marketing-legacy space-y-12">
      <section className="relative pt-12 pb-16 text-center overflow-hidden rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950">
        <GradientOrb color="emerald" size={500} blur={200} className="-top-32 left-1/2 -translate-x-1/2" animate={false} />
        <div className="relative z-10">
          <TextReveal text={t("title")} mode="words" as="h1" className="text-4xl font-bold tracking-tight sm:text-5xl" />
          <ScrollReveal variant="up" delay={0.3}>
            <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto px-4">{t("subtitle")}</p>
          </ScrollReveal>
        </div>
      </section>

      <DemoSection />
    </div>
  );
}
