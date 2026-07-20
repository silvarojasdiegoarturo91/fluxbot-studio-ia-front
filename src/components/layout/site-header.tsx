"use client";

import { ReactNode, useState, useEffect, useRef } from "react";
import Image from "next/image";
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
            ? "translate-y-0 border-b border-[#173b4d]/10 bg-[#fffdf8]/95 shadow-lg shadow-[#173b4d]/10 backdrop-blur-xl"
            : "translate-y-0 border-b border-[#173b4d]/5 bg-[#fffdf8]/80 backdrop-blur"
        }`}
      >
        <div className="mx-auto flex h-[70px] max-w-[1340px] items-center justify-between px-4 md:px-8 lg:px-10">
          <Link href={`/${locale}`} className="flex items-center gap-2 text-lg font-bold tracking-tight text-[#173b4d]">
            <Image
              src="/brand/fluxbot-shopify-icon.jpg"
              alt=""
              width={40}
              height={40}
              priority
              className="h-9 w-9 rounded-[0.7rem] object-cover shadow-sm"
            />
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
                <button className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-[#526a76] transition-colors hover:bg-[#173b4d]/5 hover:text-[#173b4d]">
                  {section.title}
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform ${activeMega === section.title ? "rotate-180" : ""}`} />
                </button>
              </div>
            ))}

            <Link href={`/${locale}/pricing`} className="nav-link rounded-lg px-3 py-2 text-sm text-[#526a76] transition-colors hover:bg-[#173b4d]/5 hover:text-[#173b4d]">
              {t("nav.pricing")}
            </Link>
            <Link href={`/${locale}/demo`} className="nav-link rounded-lg px-3 py-2 text-sm text-[#526a76] transition-colors hover:bg-[#173b4d]/5 hover:text-[#173b4d]">
              {t("nav.demo")}
            </Link>
            <Link href={`/${locale}/customers`} className="nav-link rounded-lg px-3 py-2 text-sm text-[#526a76] transition-colors hover:bg-[#173b4d]/5 hover:text-[#173b4d]">
              {t("nav.customers")}
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href={`/${otherLocale}${localePath}`}
              className="hidden sm:flex items-center rounded-lg border border-[#173b4d]/15 px-2 py-1.5 text-xs text-[#526a76] transition-colors hover:border-[#173b4d]/30 hover:text-[#173b4d]"
            >
              {otherLocale.toUpperCase()}
            </Link>

            <Link
              href={`/${locale}/contact`}
              className="hidden sm:flex rounded-full border border-[#173b4d]/20 px-4 py-2 text-sm font-semibold text-[#173b4d] transition-colors hover:bg-[#173b4d]/5"
            >
              {t("common.cta_contact")}
            </Link>
            <Link
              href={`/${locale}/install`}
              className="hidden sm:flex rounded-full bg-[#d9654b] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#bd5039]"
            >
              {t("common.cta_install")}
            </Link>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="rounded-lg p-2 text-[#173b4d] transition-colors hover:bg-[#173b4d]/5 xl:hidden"
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
              className="absolute left-0 right-0 z-40 hidden border-t border-[#173b4d]/10 bg-[#fffdf8]/95 backdrop-blur-2xl xl:block"
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
                          className="group flex items-start gap-4 rounded-xl p-4 transition-colors hover:bg-[#173b4d]/5"
                        >
                          <div className="mt-0.5 rounded-lg bg-[#d9654b]/10 p-2.5 text-[#d9654b] transition-colors group-hover:bg-[#d9654b]/20">
                            {item.icon}
                          </div>
                          <div>
                            <p className="font-medium text-[#173b4d]">{item.label}</p>
                            <p className="mt-1 text-sm text-[#526a76]">{item.desc}</p>
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
              className="fixed inset-0 z-40 bg-[#173b4d]/30 backdrop-blur-sm xl:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed left-0 right-0 top-[70px] z-40 xl:hidden"
            >
              <div className="mx-4 mt-2 max-h-[calc(100dvh-90px)] overflow-y-auto rounded-2xl border border-[#173b4d]/10 bg-[#fffdf8]/95 shadow-2xl shadow-[#173b4d]/15 backdrop-blur-xl">
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
                    className="block rounded-xl px-4 py-3 text-[#526a76] transition-colors hover:bg-[#173b4d]/5 hover:text-[#173b4d]"
                  >
                    {t("nav.pricing")}
                  </Link>
                  <Link
                    href={`/${locale}/demo`}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-xl px-4 py-3 text-[#526a76] transition-colors hover:bg-[#173b4d]/5 hover:text-[#173b4d]"
                  >
                    {t("nav.demo")}
                  </Link>
                  <Link
                    href={`/${locale}/customers`}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-xl px-4 py-3 text-[#526a76] transition-colors hover:bg-[#173b4d]/5 hover:text-[#173b4d]"
                  >
                    {t("nav.customers")}
                  </Link>
                  <Link
                    href={`/${locale}/install`}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-xl px-4 py-3 text-[#526a76] transition-colors hover:bg-[#173b4d]/5 hover:text-[#173b4d]"
                  >
                    {t("nav.install")}
                  </Link>
                  <Link
                    href={`/${locale}/contact`}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-xl px-4 py-3 text-[#526a76] transition-colors hover:bg-[#173b4d]/5 hover:text-[#173b4d]"
                  >
                    {t("nav.contact")}
                  </Link>

                  <div className="pt-4 flex flex-col gap-2">
                    <Link
                      href={`/${locale}/install`}
                      onClick={() => setMobileOpen(false)}
                      className="rounded-full bg-[#d9654b] px-4 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-[#bd5039]"
                    >
                      {t("common.cta_install")}
                    </Link>
                    <Link
                      href={`/${locale}/contact`}
                      onClick={() => setMobileOpen(false)}
                      className="rounded-full border border-[#173b4d]/20 px-4 py-3 text-center text-sm font-semibold text-[#173b4d] transition-colors hover:bg-[#173b4d]/5"
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
        className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-[#526a76] transition-colors hover:bg-[#173b4d]/5 hover:text-[#173b4d]"
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
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-[#526a76] transition-colors hover:bg-[#173b4d]/5 hover:text-[#173b4d]"
              >
                <span className="text-[#d9654b]">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
