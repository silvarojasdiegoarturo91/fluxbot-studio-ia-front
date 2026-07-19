"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { TextReveal } from "@/components/ui/text-reveal";
import { StaggerChildren, StaggerItem } from "@/components/ui/stagger-children";
import { TiltCard } from "@/components/ui/tilt-card";
import { GradientOrb } from "@/components/ui/gradient-orb";
import { Check } from "lucide-react";
import Link from "next/link";

export default function PricingPage() {
  const t = useTranslations("pricing_page");
  const tPlans = useTranslations("pricing_preview");
  const tFaq = useTranslations("faq");
  const locale = useLocale();
  const [annual, setAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="space-y-16">
      <section className="relative pt-12 pb-16 text-center overflow-hidden rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950">
        <GradientOrb color="sky" size={600} blur={200} className="-top-40 left-1/2 -translate-x-1/2" animate={false} />
        <div className="relative z-10">
          <TextReveal text={t("title")} mode="words" as="h1" className="text-4xl font-bold tracking-tight sm:text-5xl" />
          <ScrollReveal variant="up" delay={0.3}>
            <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto px-4">{t("subtitle")}</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="text-center">
        <div className="inline-flex items-center rounded-full bg-slate-900 border border-white/10 p-1">
          <button onClick={() => setAnnual(false)} className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${!annual ? "bg-sky-500 text-white" : "text-slate-400 hover:text-white"}`}>
            {tPlans("monthly")}
          </button>
          <button onClick={() => setAnnual(true)} className={`rounded-full px-5 py-2 text-sm font-medium transition-colors flex items-center gap-2 ${annual ? "bg-sky-500 text-white" : "text-slate-400 hover:text-white"}`}>
            {tPlans("yearly")}
            <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded-full font-bold">{tPlans("save")}</span>
          </button>
        </div>

        <StaggerChildren className="mt-10 grid gap-6 lg:grid-cols-3 max-w-5xl mx-auto">
          <StaggerItem>
            <TiltCard intensity={4}>
              <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-8 h-full flex flex-col text-left">
                <h3 className="text-xl font-semibold">{tPlans("starter")}</h3>
                <p className="mt-1 text-sm text-slate-400">{tPlans("starter_desc")}</p>
                <div className="mt-4 mb-6"><span className="text-4xl font-bold">{tPlans("starter_price")}</span><span className="text-slate-400">{tPlans("starter_period")}</span></div>
                <ul className="space-y-3 mb-8 flex-1">
                  {[tPlans("feature_1_sitio"), tPlans("feature_faq"), tPlans("feature_email_support")].map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-slate-300"><Check className="h-4 w-4 text-sky-400" />{f}</li>
                  ))}
                </ul>
                <Link href={`/${locale}/install`} className="block w-full rounded-xl border border-white/20 py-3 text-center text-sm font-medium hover:bg-white/5 transition-colors">{tPlans("cta_plan")}</Link>
              </div>
            </TiltCard>
          </StaggerItem>

          <StaggerItem>
            <TiltCard intensity={4}>
              <div className="rounded-2xl border border-sky-400/30 bg-sky-400/5 p-8 h-full flex flex-col relative text-left">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-sky-500 px-3 py-1 text-xs font-bold text-white">{tPlans("popular")}</span>
                <h3 className="text-xl font-semibold">{tPlans("growth")}</h3>
                <p className="mt-1 text-sm text-slate-400">{tPlans("growth_desc")}</p>
                <div className="mt-4 mb-6"><span className="text-4xl font-bold text-sky-300">{annual ? "63€" : tPlans("growth_price")}</span><span className="text-slate-400">{tPlans("growth_period")}</span></div>
                <ul className="space-y-3 mb-8 flex-1">
                  {[tPlans("feature_3_sitios"), tPlans("feature_leads"), tPlans("feature_customization")].map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-slate-300"><Check className="h-4 w-4 text-sky-400" />{f}</li>
                  ))}
                </ul>
                <Link href={`/${locale}/install`} className="block w-full rounded-xl bg-sky-500 py-3 text-center text-sm font-semibold text-white hover:bg-sky-400 transition-colors">{tPlans("cta_plan")}</Link>
              </div>
            </TiltCard>
          </StaggerItem>

          <StaggerItem>
            <TiltCard intensity={4}>
              <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-8 h-full flex flex-col text-left">
                <h3 className="text-xl font-semibold">{tPlans("scale")}</h3>
                <p className="mt-1 text-sm text-slate-400">{tPlans("scale_desc")}</p>
                <div className="mt-4 mb-6"><span className="text-4xl font-bold">{tPlans("scale_price")}</span></div>
                <ul className="space-y-3 mb-8 flex-1">
                  {[tPlans("feature_unlimited"), tPlans("feature_integrations"), tPlans("feature_priority_support")].map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-slate-300"><Check className="h-4 w-4 text-sky-400" />{f}</li>
                  ))}
                </ul>
                <Link href={`/${locale}/contact`} className="block w-full rounded-xl border border-white/20 py-3 text-center text-sm font-medium hover:bg-white/5 transition-colors">{tPlans("cta_scale")}</Link>
              </div>
            </TiltCard>
          </StaggerItem>
        </StaggerChildren>
      </section>

      <section className="mx-auto max-w-[830px]">
        <TextReveal text={t("faq_title")} mode="words" as="h2" className="text-2xl font-bold tracking-tight" />
        <div className="mt-8 space-y-3">
          {(["q1", "q2", "q3", "q4", "q5"] as const).map((key, i) => (
            <ScrollReveal key={key} variant="up" delay={0.05 * i}>
              <div className="rounded-xl border border-white/10 bg-slate-900/30 overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="flex w-full items-center justify-between p-5 text-left text-slate-200 hover:text-white transition-colors" aria-expanded={openFaq === i}>
                  <span className="font-medium pr-4">{tFaq(`q${i + 1}` as never)}</span>
                  <span className={`transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`}>▼</span>
                </button>
                <div className={`grid transition-[grid-template-rows] duration-200 ${openFaq === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden"><div className="px-5 pb-5 text-sm text-slate-400">{tFaq(`a${i + 1}` as never)}</div></div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  );
}
