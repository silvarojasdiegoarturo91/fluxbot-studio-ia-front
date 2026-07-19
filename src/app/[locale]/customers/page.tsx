"use client";

import { useTranslations, useLocale } from "next-intl";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { TextReveal } from "@/components/ui/text-reveal";
import { StaggerChildren, StaggerItem } from "@/components/ui/stagger-children";
import { GradientOrb } from "@/components/ui/gradient-orb";
import Link from "next/link";
import { Star } from "lucide-react";

const testimonials = [
  { name: "TAV", role: "eCommerce", quote: "FluxBot transformó nuestra atención al cliente. Las ventas automáticas superaron nuestras expectativas.", rating: 5 },
  { name: "ShopPro", role: "Retail", quote: "La instalación fue increíblemente fácil. En 5 minutos teníamos un asistente de ventas IA funcionando.", rating: 5 },
  { name: "VentaMax", role: "Moda", quote: "El descubrimiento de productos es impresionante. Los clientes encuentran exactamente lo que buscan.", rating: 5 },
];

export default function CustomersPage() {
  const t = useTranslations("customers_page");
  const locale = useLocale();

  return (
    <div className="space-y-16">
      <section className="relative pt-12 pb-16 text-center overflow-hidden rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950">
        <GradientOrb color="amber" size={500} blur={200} className="-top-32 left-1/2 -translate-x-1/2" animate={false} />
        <div className="relative z-10">
          <TextReveal text={t("title")} mode="words" as="h1" className="text-4xl font-bold tracking-tight sm:text-5xl" />
          <ScrollReveal variant="up" delay={0.3}>
            <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto px-4">{t("subtitle")}</p>
          </ScrollReveal>
        </div>
      </section>

      <StaggerChildren className="grid gap-6 md:grid-cols-3">
        {testimonials.map(({ name, role, quote, rating }) => (
          <StaggerItem key={name}>
            <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-6 h-full flex flex-col">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-slate-300 flex-1 leading-relaxed">&ldquo;{quote}&rdquo;</p>
              <div className="mt-6 pt-4 border-t border-white/5">
                <p className="font-semibold text-white">{name}</p>
                <p className="text-xs text-slate-500">{role}</p>
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerChildren>

      <section className="text-center py-12">
        <Link href={`/${locale}/install`} className="rounded-full bg-sky-500 px-8 py-3.5 text-base font-semibold text-white hover:bg-sky-400 transition-colors inline-flex">
          Únete a ellos →
        </Link>
      </section>
    </div>
  );
}
