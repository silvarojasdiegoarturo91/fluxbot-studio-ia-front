"use client";

import { useTranslations, useLocale } from "next-intl";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { TextReveal } from "@/components/ui/text-reveal";
import { GradientOrb } from "@/components/ui/gradient-orb";
import Link from "next/link";
import { Search, FileText, Bot, Globe } from "lucide-react";

export default function AEOPage() {
  const t = useTranslations("aeo_feature");
  const locale = useLocale();

  const benefits = [
    { icon: Search, title: "Visibilidad en IA", desc: "Tu tienda aparece en ChatGPT, Gemini, Claude y Perplexity." },
    { icon: FileText, title: "Generación automática", desc: "FluxBot genera llms.txt con tu catálogo, políticas y FAQs." },
    { icon: Bot, title: "Actualización continua", desc: "Se regenera cuando cambian tus productos o políticas." },
    { icon: Globe, title: "Caché inteligente", desc: "Optimizado para crawlers IA con gestión de frescura." },
  ];

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

      <div className="grid gap-6 sm:grid-cols-2">
        {benefits.map(({ icon: Icon, title, desc }, i) => (
          <ScrollReveal key={title} variant="up" delay={0.1 + i * 0.1}>
            <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-6">
              <div className="mb-4 inline-flex rounded-xl bg-emerald-500/10 p-3">
                <Icon className="h-6 w-6 text-emerald-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{title}</h3>
              <p className="text-sm text-slate-400">{desc}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <section className="text-center py-12">
        <Link href={`/${locale}/install`} className="rounded-full bg-sky-500 px-8 py-3.5 text-base font-semibold text-white hover:bg-sky-400 transition-colors inline-flex">
          Activar AEO →
        </Link>
      </section>
    </div>
  );
}
