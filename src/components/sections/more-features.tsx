"use client";

import { useTranslations, useLocale } from "next-intl";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { TextReveal } from "@/components/ui/text-reveal";
import { StaggerChildren, StaggerItem } from "@/components/ui/stagger-children";
import { TiltCard } from "@/components/ui/tilt-card";
import Link from "next/link";
import { Inbox, Globe, BookOpen, Zap, Search, Shield } from "lucide-react";

const features = [
  { key: "inbox", icon: Inbox, href: "/features/inbox" },
  { key: "omnichannel", icon: Globe, href: "/features" },
  { key: "help_center", icon: BookOpen, href: "/features" },
  { key: "proactive", icon: Zap, href: "/features/sales-agent" },
  { key: "aeo", icon: Search, href: "/features/aeo" },
  { key: "gdpr", icon: Shield, href: "/features" },
];

export function MoreFeatures() {
  const t = useTranslations("more_features");
  const locale = useLocale();

  return (
    <section className="py-20 md:py-28">
      <div className="text-center mb-16">
        <TextReveal
          text={t("title")}
          mode="words"
          as="h2"
          className="text-3xl font-bold tracking-tight sm:text-4xl"
        />
        <ScrollReveal variant="up" delay={0.3}>
          <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </ScrollReveal>
      </div>

      <StaggerChildren className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map(({ key, icon: Icon, href }) => (
          <StaggerItem key={key}>
            <TiltCard intensity={4}>
              <Link
                href={`/${locale}${href}`}
                className="group block rounded-2xl border border-white/10 bg-slate-900/50 p-6 hover:border-sky-400/20 hover:bg-slate-900/80 transition-all"
              >
                <div className="mb-4 inline-flex rounded-xl bg-sky-500/10 p-3 group-hover:bg-sky-500/20 transition-colors">
                  <Icon className="h-6 w-6 text-sky-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {t(`${key}_title` as never)}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {t(`${key}_desc` as never)}
                </p>
              </Link>
            </TiltCard>
          </StaggerItem>
        ))}
      </StaggerChildren>
    </section>
  );
}
