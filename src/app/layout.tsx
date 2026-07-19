import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
    default: "FluxBot Studio IA | AI Sales Agent for eCommerce",
    template: "%s | FluxBot Studio IA",
  },
  description:
    "Turn your website into a sales channel with AI. FluxBot is an AI sales agent that knows your catalog, recommends products, and closes deals 24/7.",
  metadataBase: new URL("https://fluxbotia.com"),
  openGraph: {
    title: "FluxBot Studio IA",
    description: "Turn visitors into sales with an AI chatbot for your website.",
    type: "website",
    url: "https://fluxbotia.com",
    siteName: "FluxBot Studio IA",
  },
  twitter: {
    card: "summary_large_image",
    title: "FluxBot Studio IA",
    description: "Turn visitors into sales with an AI chatbot for your website.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#f8f4ec] text-[#173b4d]">
        {children}
      </body>
    </html>
  );
}
