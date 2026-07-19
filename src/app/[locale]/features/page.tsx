"use client";

import { useTranslations, useLocale } from "next-intl";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { TextReveal } from "@/components/ui/text-reveal";
import { StaggerChildren, StaggerItem } from "@/components/ui/stagger-children";
import { TiltCard } from "@/components/ui/tilt-card";
import Link from "next/link";
import { Bot, MessageSquare, Search, Zap, BarChart3, Shield } from "lucide-react";

const features = [
  { key: "sales_agent", icon: Bot, href: "/features/sales-agent", color: "sky" },
  { key: "inbox", icon: MessageSquare, href: "/features/inbox", color: "sky" },
  { key: "aeo", icon: Search, href: "/features/aeo", color: "sky" },
  { key: "proactive", icon: Zap, href: "/features/sales-agent", color: "sky" },
  { key: "discovery", icon: BarChart3, href: "/features", color: "sky" },
  { key: "compliance", icon: Shield, href: "/features", color: "sky" },
];

const featureLabels: Record<string, { title: string; desc: string }> = {
  sales_agent: { title: "Agente de Ventas IA", desc: "IA que conoce tu catálogo y vende 24/7" },
  inbox: { title: "Bandeja unificada", desc: "Gestiona todas las conversaciones en un solo lugar" },
  aeo: { title: "AEO / llms.txt", desc: "Optimización para motores de respuesta IA" },
  proactive: { title: "Ventas proactivas", desc: "Detecta intención de compra y actúa" },
  discovery: { title: "Descubrimiento de productos", desc: "Búsqueda semántica en tu catálogo" },
  compliance: { title: "Cumplimiento GDPR", desc: "Privacidad por diseño" },
};

export default function FeaturesPage() {
  const locale = useLocale();

  return (
    <div className="space-y-12">
      <header className="text-center pt-12">
        <TextReveal
          text="Funcionalidades"
          mode="words"
          as="h1"
          className="text-4xl font-bold tracking-tight sm:text-5xl"
        />
        <ScrollReveal variant="up" delay={0.3}>
          <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
            Todo lo que necesitas para convertir tu web en un canal de ventas automatizado.
          </p>
        </ScrollReveal>
      </header>

      <StaggerChildren className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map(({ key, icon: Icon, href }) => (
          <StaggerItem key={key}>
            <TiltCard intensity={4}>
              <Link
                href={`/${locale}${href}`}
                className="group block rounded-2xl border border-white/10 bg-slate-900/50 p-8 hover:border-sky-400/20 hover:bg-slate-900/80 transition-all h-full"
              >
                <div className="mb-4 inline-flex rounded-xl bg-sky-500/10 p-3 group-hover:bg-sky-500/20 transition-colors">
                  <Icon className="h-7 w-7 text-sky-400" />
                </div>
                <h2 className="text-xl font-semibold text-white mb-2">
                  {featureLabels[key]?.title}
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {featureLabels[key]?.desc}
                </p>
                <p className="mt-4 text-sm text-sky-400 font-medium group-hover:underline">
                  Saber más →
                </p>
              </Link>
            </TiltCard>
          </StaggerItem>
        ))}
      </StaggerChildren>
    </div>
  );
}
