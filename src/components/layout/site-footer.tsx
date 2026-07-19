"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

export function SiteFooter() {
  const t = useTranslations();
  const locale = useLocale();
  const year = new Date().getFullYear();

  const productLinks = [
    { label: t("footer.ai_sales_agent"), href: `/${locale}/features/sales-agent` },
    { label: t("footer.inbox"), href: `/${locale}/features/inbox` },
    { label: t("footer.aeo"), href: `/${locale}/features/aeo` },
    { label: t("footer.integrations"), href: `/${locale}/integrations` },
    { label: t("footer.pricing"), href: `/${locale}/pricing` },
  ];

  const featureLinks = [
    { label: t("footer.proactive_sales"), href: `/${locale}/features/sales-agent` },
    { label: t("footer.product_discovery"), href: `/${locale}/features` },
    { label: t("footer.human_handoff"), href: `/${locale}/features` },
    { label: t("footer.gdpr"), href: `/${locale}/features` },
    { label: t("footer.help_center"), href: `/${locale}/features` },
  ];

  const resourceLinks = [
    { label: t("footer.customers"), href: `/${locale}/customers` },
    { label: t("footer.install"), href: `/${locale}/install` },
    { label: t("footer.contact"), href: `/${locale}/contact` },
  ];

  const legalLinks = [
    { label: t("footer.privacy_policy"), href: "/privacy" },
    { label: t("footer.terms"), href: "/terms" },
    { label: "Cookies", href: "/cookies" },
    { label: "Accesibilidad", href: "/accessibility" },
    { label: t("footer.ai_compliance"), href: "/ai-compliance" },
    { label: "Tratamiento de datos", href: "/data-processing" },
    { label: "Aviso legal", href: "/legal-notice" },
  ];

  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-10 py-16">
        <div className="flex flex-col gap-12 lg:flex-row">
          <div className="lg:w-1/3 shrink-0 flex flex-col gap-5">
            <Link href={`/${locale}`} className="flex items-center gap-2 text-xl font-bold tracking-tight">
              <span className="text-sky-400">⚡</span>
              <span>{t("common.brand")}</span>
            </Link>
            <p className="text-sm text-slate-400 max-w-xs">
              {t("footer.tagline")}
            </p>
            <div className="flex items-center gap-3 text-sm text-slate-500">
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-sky-400 transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="lg:w-2/3">
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
              <div>
                <h3 className="font-medium text-white mb-4">{t("footer.product")}</h3>
                <ul className="space-y-3">
                  {productLinks.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-sm text-slate-400 hover:text-white transition-opacity hover:opacity-100 opacity-65">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-white mb-4">{t("footer.features_section")}</h3>
                <ul className="space-y-3">
                  {featureLinks.map((link) => (
                    <li key={link.href + link.label}>
                      <Link href={link.href} className="text-sm text-slate-400 hover:text-white transition-opacity hover:opacity-100 opacity-65">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-white mb-4">{t("footer.resources")}</h3>
                <ul className="space-y-3">
                  {resourceLinks.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-sm text-slate-400 hover:text-white transition-opacity hover:opacity-100 opacity-65">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-white mb-4">{t("footer.legal")}</h3>
                <ul className="space-y-3">
                  {legalLinks.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-sm text-slate-400 hover:text-white transition-opacity hover:opacity-100 opacity-65">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5">
          <p className="text-xs text-slate-500">
            {t("footer.copyright", { year })}
          </p>
        </div>
      </div>
    </footer>
  );
}
