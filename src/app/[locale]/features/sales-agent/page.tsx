"use client";

import { useTranslations, useLocale } from "next-intl";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { TextReveal } from "@/components/ui/text-reveal";
import { GradientOrb } from "@/components/ui/gradient-orb";
import { CounterNumber } from "@/components/ui/counter-number";
import Link from "next/link";
import { Bot, Eye, ShoppingCart, Clock, Shield, Zap } from "lucide-react";

export default function SalesAgentPage() {
  const t = useTranslations("sales_agent_page");
  const locale = useLocale();

  const capabilities = [
    { icon: Bot, title: "Catálogo completo", desc: "Aprende todos tus productos, precios y políticas de forma automática." },
    { icon: Eye, title: "Detección de intención", desc: "Rastrea comportamiento de navegación para entender qué quiere cada cliente." },
    { icon: ShoppingCart, title: "Recomendaciones IA", desc: "Sugiere productos complementarios y detecta oportunidades de upsell." },
    { icon: Clock, title: "24/7 sin descanso", desc: "Vende mientras duermes. Sin pausas. Sin vacaciones." },
    { icon: Shield, title: "Handoff humano", desc: "Escala a agentes humanos cuando el caso lo requiere." },
    { icon: Zap, title: "Ventas proactivas", desc: "Dispara mensajes contextuales según el comportamiento del visitante." },
  ];

  return (
    <div className="marketing-legacy space-y-12">
      <section className="relative pt-12 pb-16 text-center overflow-hidden rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950">
        <GradientOrb color="sky" size={500} blur={200} className="-top-32 left-1/2 -translate-x-1/2" animate={false} />
        <div className="relative z-10">
          <TextReveal text={t("title")} mode="words" as="h1" className="text-4xl font-bold tracking-tight sm:text-5xl" />
          <ScrollReveal variant="up" delay={0.3}>
            <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto px-4">{t("subtitle")}</p>
          </ScrollReveal>
          <ScrollReveal variant="up" delay={0.5}>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href={`/${locale}/install`} className="rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-white hover:bg-sky-400 transition-colors">
                Instalar gratis →
              </Link>
              <Link href={`/${locale}/demo`} className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold hover:bg-white/5 transition-colors">
                Ver demo
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-12">
        <ScrollReveal variant="up">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t("what_is_title")}</h2>
        </ScrollReveal>
        <ScrollReveal variant="up" delay={0.2}>
          <p className="mt-4 text-lg text-slate-300 leading-relaxed max-w-3xl">{t("what_is_desc")}</p>
        </ScrollReveal>
      </section>

      <section className="py-12">
        <ScrollReveal variant="up">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-10">{t("why_title")}</h2>
        </ScrollReveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map(({ icon: Icon, title, desc }, i) => (
            <ScrollReveal key={title} variant="up" delay={0.1 + i * 0.08}>
              <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-6 hover:border-sky-400/20 transition-all">
                <div className="mb-4 inline-flex rounded-xl bg-sky-500/10 p-3">
                  <Icon className="h-6 w-6 text-sky-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="py-12 rounded-2xl bg-gradient-to-b from-slate-900/50 to-slate-950">
        <div className="grid gap-8 md:grid-cols-3 text-center">
          <ScrollReveal variant="scale" delay={0.1}>
            <CounterNumber to={125} prefix="$" suffix="K+" className="text-4xl font-bold text-sky-400" />
            <p className="mt-2 text-sm text-slate-400">Ingresos asistidos</p>
          </ScrollReveal>
          <ScrollReveal variant="scale" delay={0.2}>
            <CounterNumber to={20} suffix="%" className="text-4xl font-bold text-sky-400" />
            <p className="mt-2 text-sm text-slate-400">Tasa chat-to-venta</p>
          </ScrollReveal>
          <ScrollReveal variant="scale" delay={0.3}>
            <CounterNumber to={95} suffix="%" className="text-4xl font-bold text-sky-400" />
            <p className="mt-2 text-sm text-slate-400">Resolución con IA</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-12 text-center">
        <TextReveal text="¿Listo para vender con IA?" mode="words" as="h2" className="text-3xl font-bold tracking-tight sm:text-4xl" />
        <ScrollReveal variant="up" delay={0.3}>
          <p className="mt-4 text-slate-400 mb-8">Instalación gratuita en menos de 5 minutos.</p>
          <Link href={`/${locale}/install`} className="rounded-full bg-sky-500 px-8 py-3.5 text-base font-semibold text-white hover:bg-sky-400 transition-colors inline-flex">
            Instalar FluxBot gratis →
          </Link>
        </ScrollReveal>
      </section>
    </div>
  );
}
