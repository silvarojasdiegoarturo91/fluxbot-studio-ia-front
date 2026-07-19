"use client";

import { useTranslations, useLocale } from "next-intl";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { TextReveal } from "@/components/ui/text-reveal";
import { GradientOrb } from "@/components/ui/gradient-orb";
import Link from "next/link";
import { Inbox, Globe, MessageSquare } from "lucide-react";

export default function InboxPage() {
  const t = useTranslations("inbox_feature");
  const locale = useLocale();

  const features = [
    { icon: Inbox, title: "Bandeja unificada", desc: "Todas las conversaciones en un solo lugar, sin importar el canal." },
    { icon: Globe, title: "Multicanal", desc: "Chat, email, messenger, WhatsApp — todo conectado." },
    { icon: MessageSquare, title: "Contexto completo", desc: "Historial de conversaciones, productos vistos y datos del cliente." },
  ];

  return (
    <div className="space-y-12">
      <section className="relative pt-12 pb-16 text-center overflow-hidden rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950">
        <GradientOrb color="purple" size={500} blur={200} className="-top-32 left-1/2 -translate-x-1/2" animate={false} />
        <div className="relative z-10">
          <TextReveal text={t("title")} mode="words" as="h1" className="text-4xl font-bold tracking-tight sm:text-5xl" />
          <ScrollReveal variant="up" delay={0.3}>
            <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto px-4">{t("subtitle")}</p>
          </ScrollReveal>
        </div>
      </section>

      <div className="grid gap-6 sm:grid-cols-3">
        {features.map(({ icon: Icon, title, desc }, i) => (
          <ScrollReveal key={title} variant="up" delay={0.1 + i * 0.1}>
            <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-6">
              <div className="mb-4 inline-flex rounded-xl bg-purple-500/10 p-3">
                <Icon className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{title}</h3>
              <p className="text-sm text-slate-400">{desc}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <section className="text-center py-12">
        <Link href={`/${locale}/install`} className="rounded-full bg-sky-500 px-8 py-3.5 text-base font-semibold text-white hover:bg-sky-400 transition-colors inline-flex">
          Empezar ahora →
        </Link>
      </section>
    </div>
  );
}
