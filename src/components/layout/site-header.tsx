"use client";

import { ReactNode, useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "motion/react";
import {
  Bot,
  MessageSquare,
  Search,
  Zap,
  Shield,
  BarChart3,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

type MegaMenuSection = {
  title: string;
  items: {
    label: string;
    desc: string;
    href: string;
    icon: ReactNode;
  }[];
};

export function SiteHeader() {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const megaTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const megaMenuData: MegaMenuSection[] = [
    {
      title: t("mega_menu.products_title"),
      items: [
        {
          label: t("mega_menu.ai_sales_agent"),
          desc: t("mega_menu.ai_sales_agent_desc"),
          href: `/${locale}/features/sales-agent`,
          icon: <Bot className="h-5 w-5" />,
        },
        {
          label: t("mega_menu.inbox"),
          desc: t("mega_menu.inbox_desc"),
          href: `/${locale}/features/inbox`,
          icon: <MessageSquare className="h-5 w-5" />,
        },
        {
          label: t("mega_menu.aeo"),
          desc: t("mega_menu.aeo_desc"),
          href: `/${locale}/features/aeo`,
          icon: <Search className="h-5 w-5" />,
        },
      ],
    },
    {
      title: t("mega_menu.features_title"),
      items: [
        {
          label: t("mega_menu.proactive_sales"),
          desc: t("mega_menu.proactive_sales_desc"),
          href: `/${locale}/features/sales-agent`,
          icon: <Zap className="h-5 w-5" />,
        },
        {
          label: t("mega_menu.product_discovery"),
          desc: t("mega_menu.product_discovery_desc"),
          href: `/${locale}/features`,
          icon: <BarChart3 className="h-5 w-5" />,
        },
        {
          label: t("mega_menu.human_handoff"),
          desc: t("mega_menu.human_handoff_desc"),
          href: `/${locale}/features`,
          icon: <Shield className="h-5 w-5" />,
        },
      ],
    },
  ];

  const handleMegaEnter = (title: string) => {
    if (megaTimeout.current) clearTimeout(megaTimeout.current);
    setActiveMega(title);
  };

  const handleMegaLeave = () => {
    megaTimeout.current = setTimeout(() => setActiveMega(null), 150);
  };

  const otherLocale = locale === "es" ? "en" : "es";
  const localePath = pathname.replace(/^\/(es|en)(?=\/|$)/, "") || "/";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "translate-y-0 bg-slate-950/80 backdrop-blur-xl shadow-lg shadow-black/20 border-b border-white/5"
            : "translate-y-0 bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-[70px] max-w-[1340px] items-center justify-between px-4 md:px-8 lg:px-10">
          <Link href={`/${locale}`} className="flex items-center gap-2 text-lg font-bold tracking-tight">
            <span className="text-sky-400">⚡</span>
            <span className="hidden sm:inline">{t("common.brand")}</span>
            <span className="sm:hidden">FluxBot</span>
          </Link>

          <nav className="hidden xl:flex items-center gap-1">
            {megaMenuData.map((section) => (
              <div
                key={section.title}
                onMouseEnter={() => handleMegaEnter(section.title)}
                onMouseLeave={handleMegaLeave}
                className="relative"
              >
                <button className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
                  {section.title}
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform ${activeMega === section.title ? "rotate-180" : ""}`} />
                </button>
              </div>
            ))}

            <Link href={`/${locale}/pricing`} className="nav-link rounded-lg px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
              {t("nav.pricing")}
            </Link>
            <Link href={`/${locale}/demo`} className="nav-link rounded-lg px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
              {t("nav.demo")}
            </Link>
            <Link href={`/${locale}/customers`} className="nav-link rounded-lg px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
              {t("nav.customers")}
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href={`/${otherLocale}${localePath}`}
              className="hidden sm:flex items-center rounded-lg border border-white/10 px-2 py-1.5 text-xs text-slate-400 hover:text-white hover:border-white/20 transition-colors"
            >
              {otherLocale.toUpperCase()}
            </Link>

            <Link
              href={`/${locale}/contact`}
              className="hidden sm:flex rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white hover:bg-white/5 transition-colors"
            >
              {t("common.cta_contact")}
            </Link>
            <Link
              href={`/${locale}/install`}
              className="hidden sm:flex rounded-full bg-sky-500 px-4 py-2 text-sm font-medium text-white hover:bg-sky-400 transition-colors"
            >
              {t("common.cta_install")}
            </Link>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="xl:hidden p-2 rounded-lg hover:bg-white/5 transition-colors"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {activeMega && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15 }}
              onMouseEnter={() => handleMegaEnter(activeMega)}
              onMouseLeave={handleMegaLeave}
              className="hidden xl:block absolute left-0 right-0 z-40 border-t border-white/5 bg-slate-950/95 backdrop-blur-2xl"
            >
              <div className="mx-auto max-w-[1340px] px-10 py-8">
                <div className="grid grid-cols-2 gap-8 lg:grid-cols-3">
                  {megaMenuData
                    .filter((s) => s.title === activeMega)
                    .map((section) =>
                      section.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="flex items-start gap-4 rounded-xl p-4 hover:bg-white/5 transition-colors group"
                        >
                          <div className="mt-0.5 rounded-lg bg-sky-500/10 p-2.5 text-sky-400 group-hover:bg-sky-500/20 transition-colors">
                            {item.icon}
                          </div>
                          <div>
                            <p className="font-medium text-white">{item.label}</p>
                            <p className="mt-1 text-sm text-slate-400">{item.desc}</p>
                          </div>
                        </Link>
                      ))
                    )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm xl:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed left-0 right-0 top-[70px] z-40 xl:hidden"
            >
              <div className="mx-4 mt-2 max-h-[calc(100dvh-90px)] overflow-y-auto rounded-2xl border border-white/10 bg-slate-950/95 backdrop-blur-xl shadow-2xl">
                <div className="p-4 space-y-1">
                  {megaMenuData.map((section) => (
                    <MobileAccordion
                      key={section.title}
                      title={section.title}
                      items={section.items}
                      onNavigate={() => setMobileOpen(false)}
                    />
                  ))}

                  <Link
                    href={`/${locale}/pricing`}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-xl px-4 py-3 text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    {t("nav.pricing")}
                  </Link>
                  <Link
                    href={`/${locale}/demo`}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-xl px-4 py-3 text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    {t("nav.demo")}
                  </Link>
                  <Link
                    href={`/${locale}/customers`}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-xl px-4 py-3 text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    {t("nav.customers")}
                  </Link>
                  <Link
                    href={`/${locale}/install`}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-xl px-4 py-3 text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    {t("nav.install")}
                  </Link>
                  <Link
                    href={`/${locale}/contact`}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-xl px-4 py-3 text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    {t("nav.contact")}
                  </Link>

                  <div className="pt-4 flex flex-col gap-2">
                    <Link
                      href={`/${locale}/install`}
                      onClick={() => setMobileOpen(false)}
                      className="rounded-full bg-sky-500 px-4 py-3 text-center text-sm font-medium text-white hover:bg-sky-400 transition-colors"
                    >
                      {t("common.cta_install")}
                    </Link>
                    <Link
                      href={`/${locale}/contact`}
                      onClick={() => setMobileOpen(false)}
                      className="rounded-full border border-white/20 px-4 py-3 text-center text-sm font-medium hover:bg-white/5 transition-colors"
                    >
                      {t("common.cta_contact")}
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="h-[70px]" />
    </>
  );
}

function MobileAccordion({
  title,
  items,
  onNavigate,
}: {
  title: string;
  items: { label: string; desc: string; href: string; icon: ReactNode }[];
  onNavigate: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
      >
        <span>{title}</span>
        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      <div className={`grid transition-[grid-template-rows] duration-200 ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <div className="overflow-hidden">
          <div className="pb-2 pl-4">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                <span className="text-sky-400">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
