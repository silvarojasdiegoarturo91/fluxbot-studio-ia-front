"use client";

import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { TextReveal } from "@/components/ui/text-reveal";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

export function CEOLetter() {
  const t = useTranslations("ceo_letter");
  const lineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(lineRef, { once: true, margin: "-100px" });

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "radial-gradient(circle, #64748b 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }} />

      <div className="relative z-10 mx-auto max-w-3xl text-center px-4">
        <TextReveal
          text={t("headline")}
          mode="words"
          as="h2"
          className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
          staggerDelay={0.05}
        />
        <div className="mt-2">
          <TextReveal
            text={t("headline_highlight")}
            mode="words"
            as="p"
            className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-sky-400"
            staggerDelay={0.05}
            delay={0.4}
          />
        </div>

        <ScrollReveal variant="up" delay={0.8}>
          <p className="mt-8 text-lg text-slate-300 leading-relaxed">
            {t("paragraph")}
          </p>
        </ScrollReveal>

        <ScrollReveal variant="up" delay={1.0}>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-slate-900/50 p-6 text-left">
              <p className="text-sm font-medium text-slate-500 mb-2">{t("others_label")}</p>
              <p className="text-lg text-slate-300">{t("others_text")}</p>
            </div>
            <div className="rounded-xl border border-sky-400/20 bg-sky-400/5 p-6 text-left">
              <p className="text-sm font-medium text-sky-400 mb-2">{t("us_label")}</p>
              <p className="text-lg text-white font-medium">{t("us_text")}</p>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="up" delay={1.2}>
          <blockquote className="mt-10 text-slate-400 italic text-lg leading-relaxed">
            &ldquo;{t("quote")}&rdquo;
          </blockquote>
          <p className="mt-4 text-sm text-slate-500">{t("signature")}</p>
        </ScrollReveal>

        <div ref={lineRef} className="mt-12 flex justify-center">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-px w-48 bg-gradient-to-r from-transparent via-sky-500 to-transparent origin-center"
          />
        </div>
      </div>
    </section>
  );
}
