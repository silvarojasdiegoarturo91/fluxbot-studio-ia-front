import type { Metadata } from "next";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { SmoothScroll } from "@/components/ui/smooth-scroll";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  const t = messages.hero as Record<string, string>;

  return {
    title: t?.headline_2
      ? `${t.headline_1} ${t.headline_2}`
      : undefined,
    alternates: {
      languages: {
        es: "https://fluxbotia.com/es",
        en: "https://fluxbotia.com/en",
      },
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "es" | "en")) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-[#f8f4ec] text-[#173b4d]">
        <NextIntlClientProvider messages={messages}>
          <SmoothScroll>
            <SiteHeader />
            <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 md:px-8 lg:px-10">
              {children}
            </main>
            <SiteFooter />
          </SmoothScroll>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
