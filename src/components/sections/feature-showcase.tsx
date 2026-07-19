"use client";

import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { TextReveal } from "@/components/ui/text-reveal";
import { ParallaxLayer } from "@/components/ui/parallax-layer";
import { Bot, Eye, ShoppingCart, Clock } from "lucide-react";

const features = [
  { key: "f1", icon: Bot, from: "left" as const },
  { key: "f2", icon: Eye, from: "right" as const },
  { key: "f3", icon: ShoppingCart, from: "left" as const },
  { key: "f4", icon: Clock, from: "right" as const },
];

export function FeatureShowcase() {
  const t = useTranslations("features_showcase");

  return (
    <section className="py-20 md:py-32">
      <div className="text-center mb-16">
        <TextReveal
          text={t("title")}
          mode="words"
          as="h2"
          className="text-3xl font-bold tracking-tight sm:text-4xl"
        />
      </div>

      <div className="space-y-24">
        {features.map(({ key, icon: Icon, from }, i) => (
          <ScrollReveal key={key} variant={from} delay={0.1}>
            <div className={`grid gap-10 lg:grid-cols-2 lg:items-center ${i % 2 === 1 ? "lg:direction-rtl" : ""}`}>
              <div className={`space-y-4 ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                <div className="inline-flex rounded-xl bg-sky-500/10 p-3">
                  <Icon className="h-6 w-6 text-sky-400" />
                </div>
                <h3 className="text-2xl font-bold">{t(`${key}_title`)}</h3>
                <p className="text-slate-300 leading-relaxed">
                  {t(`${key}_desc`)}
                </p>
              </div>

              <ParallaxLayer speed={0.15} className={`${i % 2 === 1 ? "lg:order-1" : ""}`}>
                <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-8 backdrop-blur">
                  <div className="aspect-video rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                    <div className="text-center space-y-3">
                      <div className="mx-auto h-16 w-16 rounded-2xl bg-sky-500/10 flex items-center justify-center">
                        <Icon className="h-8 w-8 text-sky-400" />
                      </div>
                      <p className="text-sm text-slate-500">{t(`${key}_title`)}</p>
                    </div>
                  </div>
                </div>
              </ParallaxLayer>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
