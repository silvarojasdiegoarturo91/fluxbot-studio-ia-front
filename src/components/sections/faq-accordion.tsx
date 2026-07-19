"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { TextReveal } from "@/components/ui/text-reveal";
import { ChevronDown } from "lucide-react";

const faqKeys = ["q1", "q2", "q3", "q4", "q5"] as const;

export function FAQAccordion() {
  const t = useTranslations("faq");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-[830px]">
        <TextReveal
          text={t("title")}
          mode="words"
          as="h2"
          className="text-3xl font-bold tracking-tight sm:text-4xl text-center"
        />

        <div className="mt-12 space-y-3">
          {faqKeys.map((key, i) => (
            <ScrollReveal key={key} variant="up" delay={0.1 + i * 0.05}>
              <div className="rounded-xl border border-white/10 bg-slate-900/30 overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="flex w-full items-center justify-between p-5 text-left text-slate-200 hover:text-white transition-colors"
                  aria-expanded={openIndex === i}
                >
                  <span className="font-medium pr-4">{t(`q${i + 1}` as never)}</span>
                  <ChevronDown
                    className={`h-5 w-5 flex-shrink-0 text-slate-500 transition-transform duration-200 ${
                      openIndex === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-200 ${
                    openIndex === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 pb-5 text-sm text-slate-400 leading-relaxed">
                      {t(`a${i + 1}` as never)}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
