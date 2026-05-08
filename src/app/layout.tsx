import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Fluxbot Studio IA | Chatbot para tu web",
    template: "%s | Fluxbot Studio IA",
  },
  description:
    "Landing para vender e instalar el chatbot Fluxbot Studio IA en webs sin Shopify.",
  metadataBase: new URL("https://fluxbot-studio-ia-front.vercel.app"),
  openGraph: {
    title: "Fluxbot Studio IA",
    description: "Convierte visitas en ventas con un chatbot para tu web.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100">
        <SiteHeader />
        <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-12 md:px-10">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
