"use client";

import { useTranslations, useLocale } from "next-intl";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { TextReveal } from "@/components/ui/text-reveal";
import { StaggerChildren, StaggerItem } from "@/components/ui/stagger-children";
import { TiltCard } from "@/components/ui/tilt-card";
import { GradientOrb } from "@/components/ui/gradient-orb";
import { ShoppingCart, MessageSquare, Mail, BarChart3, Shield, Plug } from "lucide-react";
import Link from "next/link";

const integrations = [
  { name: "Shopify", desc: "Sincronización automática de catálogo y pedidos", icon: ShoppingCart, color: "text-green-400 bg-green-400/10" },
  { name: "Zendesk", desc: "Escala conversaciones a tu helpdesk", icon: MessageSquare, color: "text-blue-400 bg-blue-400/10" },
  { name: "Klaviyo", desc: "Segmentación y email marketing", icon: Mail, color: "text-purple-400 bg-purple-400/10" },
  { name: "Google Analytics", desc: "Tracking de conversiones del chatbot", icon: BarChart3, color: "text-amber-400 bg-amber-400/10" },
  { name: "Judge.me", desc: "Reseñas y social proof automatizados", icon: Shield, color: "text-rose-400 bg-rose-400/10" },
  { name: "17TRACK", desc: "Tracking de envíos en tiempo real", icon: Plug, color: "text-sky-400 bg-sky-400/10" },
];

export default function IntegrationsPage() {
  const t = useTranslations("integrations_page");
  const locale = useLocale();

  return (
    <div className="space-y-16">
      <section className="relative pt-12 pb-16 text-center overflow-hidden rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950">
        <GradientOrb color="sky" size={500} blur={200} className="-top-32 left-1/2 -translate-x-1/2" animate={false} />
        <div className="relative z-10">
          <TextReveal text={t("title")} mode="words" as="h1" className="text-4xl font-bold tracking-tight sm:text-5xl" />
          <ScrollReveal variant="up" delay={0.3}>
            <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto px-4">{t("subtitle")}</p>
          </ScrollReveal>
        </div>
      </section>

      <StaggerChildren className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {integrations.map(({ name, desc, icon: Icon, color }) => (
          <StaggerItem key={name}>
            <TiltCard intensity={4}>
              <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-6 hover:border-sky-400/20 transition-all">
                <div className={`mb-4 inline-flex rounded-xl p-3 ${color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">{name}</h3>
                <p className="text-sm text-slate-400">{desc}</p>
              </div>
            </TiltCard>
          </StaggerItem>
        ))}
      </StaggerChildren>

      <section className="text-center py-12">
        <p className="text-slate-400 mb-6">¿No encuentras tu integración?</p>
        <Link href={`/${locale}/contact`} className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold hover:bg-white/5 transition-colors inline-flex">
          Contactar para integración custom →
        </Link>
      </section>
    </div>
  );
}
