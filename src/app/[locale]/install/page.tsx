"use client";

import { Suspense } from "react";
import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { TextReveal } from "@/components/ui/text-reveal";
import { SnippetGeneratorWrapper } from "@/components/snippet-generator-wrapper";
import { SnippetPresets } from "@/components/snippet-presets";
import { InstallFAQ } from "@/components/install-faq";
import { GradientOrb } from "@/components/ui/gradient-orb";

function SnippetGeneratorSkeleton() {
  return (
    <div className="space-y-4">
      <div className="h-10 w-full rounded-lg bg-slate-800 animate-pulse" />
      <div className="h-10 w-full rounded-lg bg-slate-800 animate-pulse" />
      <div className="h-20 w-full rounded-lg bg-slate-800 animate-pulse" />
    </div>
  );
}

export default function InstallPage() {
  const t = useTranslations("install_page");

  return (
    <div className="space-y-12">
      <section className="relative pt-12 pb-16 text-center overflow-hidden rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950">
        <GradientOrb color="sky" size={500} blur={200} className="-top-32 left-1/2 -translate-x-1/2" animate={false} />
        <div className="relative z-10">
          <TextReveal text={t("title")} mode="words" as="h1" className="text-4xl font-bold tracking-tight sm:text-5xl" />
          <ScrollReveal variant="up" delay={0.3}>
            <p className="mt-4 text-lg text-slate-400 max-w-3xl mx-auto px-4" dangerouslySetInnerHTML={{ __html: t("subtitle") }} />
          </ScrollReveal>
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-slate-900/50 p-6 md:p-8 space-y-4">
        <h2 className="text-2xl font-semibold">{t("snippet_generator")}</h2>
        <Suspense fallback={<SnippetGeneratorSkeleton />}>
          <SnippetGeneratorWrapper />
        </Suspense>
      </section>

      <section className="rounded-2xl border border-white/10 bg-slate-900/50 p-6 md:p-8 space-y-4">
        <h2 className="text-2xl font-semibold">{t("other_platforms")}</h2>
        <SnippetPresets domain="example.com" token="your-token" />
      </section>

      <section className="rounded-2xl border border-white/10 bg-slate-900/50 p-6 md:p-8 space-y-4">
        <h2 className="text-2xl font-semibold">{t("install_steps")}</h2>
        <ol className="space-y-3 text-slate-300">
          <li className="flex gap-3"><span className="flex-shrink-0 h-6 w-6 rounded-full bg-sky-500/20 text-sky-400 text-xs font-bold flex items-center justify-center">1</span><span>{t("step1")}</span></li>
          <li className="flex gap-3"><span className="flex-shrink-0 h-6 w-6 rounded-full bg-sky-500/20 text-sky-400 text-xs font-bold flex items-center justify-center">2</span><span>{t("step2")}</span></li>
          <li className="flex gap-3"><span className="flex-shrink-0 h-6 w-6 rounded-full bg-sky-500/20 text-sky-400 text-xs font-bold flex items-center justify-center">3</span><span>{t("step3")}</span></li>
          <li className="flex gap-3"><span className="flex-shrink-0 h-6 w-6 rounded-full bg-sky-500/20 text-sky-400 text-xs font-bold flex items-center justify-center">4</span><span>{t("step4")}</span></li>
          <li className="flex gap-3"><span className="flex-shrink-0 h-6 w-6 rounded-full bg-sky-500/20 text-sky-400 text-xs font-bold flex items-center justify-center">5</span><span>{t("step5")}</span></li>
          <li className="flex gap-3"><span className="flex-shrink-0 h-6 w-6 rounded-full bg-sky-500/20 text-sky-400 text-xs font-bold flex items-center justify-center">6</span><span>{t("step6")}</span></li>
        </ol>
      </section>

      <InstallFAQ />
    </div>
  );
}
