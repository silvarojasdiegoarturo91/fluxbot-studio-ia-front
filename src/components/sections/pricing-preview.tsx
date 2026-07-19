"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { TextReveal } from "@/components/ui/text-reveal";
import { StaggerChildren, StaggerItem } from "@/components/ui/stagger-children";
import { TiltCard } from "@/components/ui/tilt-card";
import Link from "next/link";
import { Check } from "lucide-react";

export function PricingPreview() {
  const t = useTranslations("pricing_preview");
  const locale = useLocale();
  const [annual, setAnnual] = useState(false);

  return (
    <section className="py-20 md:py-28">
      <div className="text-center mb-12">
        <TextReveal
          text={t("title")}
          mode="words"
          as="h2"
          className="text-3xl font-bold tracking-tight sm:text-4xl"
        />
        <ScrollReveal variant="up" delay={0.3}>
          <p className="mt-4 text-lg text-slate-400">{t("subtitle")}</p>
        </ScrollReveal>

        <ScrollReveal variant="up" delay={0.4}>
          <div className="mt-8 inline-flex items-center rounded-full bg-slate-900 border border-white/10 p-1">
            <button
              onClick={() => setAnnual(false)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${!annual ? "bg-sky-500 text-white" : "text-slate-400 hover:text-white"}`}
            >
              {t("monthly")}
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-colors flex items-center gap-2 ${annual ? "bg-sky-500 text-white" : "text-slate-400 hover:text-white"}`}
            >
              {t("yearly")}
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded-full font-bold">
                {t("save")}
              </span>
            </button>
          </div>
        </ScrollReveal>
      </div>

      <StaggerChildren className="grid gap-6 lg:grid-cols-3 max-w-5xl mx-auto">
        <StaggerItem>
          <TiltCard intensity={4}>
            <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-8 h-full flex flex-col">
              <h3 className="text-xl font-semibold">{t("starter")}</h3>
              <p className="mt-1 text-sm text-slate-400">{t("starter_desc")}</p>
              <div className="mt-4 mb-6">
                <span className="text-4xl font-bold">{t("starter_price")}</span>
                <span className="text-slate-400">{t("starter_period")}</span>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {[t("feature_1_sitio"), t("feature_faq"), t("feature_email_support")].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-slate-300">
                    <Check className="h-4 w-4 text-sky-400" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href={`/${locale}/install`}
                className="block w-full rounded-xl border border-white/20 py-3 text-center text-sm font-medium hover:bg-white/5 transition-colors"
              >
                {t("cta_plan")}
              </Link>
            </div>
          </TiltCard>
        </StaggerItem>

        <StaggerItem>
          <TiltCard intensity={4}>
            <div className="rounded-2xl border border-sky-400/30 bg-sky-400/5 p-8 h-full flex flex-col relative">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-sky-500 px-3 py-1 text-xs font-bold text-white">
                {t("popular")}
              </span>
              <h3 className="text-xl font-semibold">{t("growth")}</h3>
              <p className="mt-1 text-sm text-slate-400">{t("growth_desc")}</p>
              <div className="mt-4 mb-6">
                <span className="text-4xl font-bold text-sky-300">
                  {annual ? "63€" : t("growth_price")}
                </span>
                <span className="text-slate-400">{t("growth_period")}</span>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {[t("feature_3_sitios"), t("feature_leads"), t("feature_customization")].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-slate-300">
                    <Check className="h-4 w-4 text-sky-400" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href={`/${locale}/install`}
                className="block w-full rounded-xl bg-sky-500 py-3 text-center text-sm font-semibold text-white hover:bg-sky-400 transition-colors"
              >
                {t("cta_plan")}
              </Link>
            </div>
          </TiltCard>
        </StaggerItem>

        <StaggerItem>
          <TiltCard intensity={4}>
            <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-8 h-full flex flex-col">
              <h3 className="text-xl font-semibold">{t("scale")}</h3>
              <p className="mt-1 text-sm text-slate-400">{t("scale_desc")}</p>
              <div className="mt-4 mb-6">
                <span className="text-4xl font-bold">{t("scale_price")}</span>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {[t("feature_unlimited"), t("feature_integrations"), t("feature_priority_support")].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-slate-300">
                    <Check className="h-4 w-4 text-sky-400" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href={`/${locale}/contact`}
                className="block w-full rounded-xl border border-white/20 py-3 text-center text-sm font-medium hover:bg-white/5 transition-colors"
              >
                {t("cta_scale")}
              </Link>
            </div>
          </TiltCard>
        </StaggerItem>
      </StaggerChildren>
    </section>
  );
}
