"use client";

import { FormEvent, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { trackEvent } from "@/lib/analytics";

type Message = { role: "bot" | "user"; text: string };

export function DemoSection() {
  const t = useTranslations("demo_section");
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: t("initial_message") },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const canSubmit = useMemo(() => input.trim().length > 0, [input]);

  const getReply = (text: string): string => {
    const lower = text.toLowerCase();
    if (lower.includes("precio") || lower.includes("price") || lower.includes("plan")) return t("reply_pricing");
    if (lower.includes("instal") || lower.includes("install")) return t("reply_install");
    if (lower.includes("demo")) return t("reply_demo");
    return t("reply_default");
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const text = input.trim();
    if (!text) return;

    setMessages((prev) => [...prev, { role: "user", text }]);
    setInput("");
    setIsTyping(true);
    trackEvent("demo_message_sent");

    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "bot", text: getReply(text) }]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-2xl">
        <ScrollReveal variant="up">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-center">
            {t("title")}
          </h2>
          <p className="mt-4 text-center text-slate-400">
            {t("subtitle")}
          </p>
        </ScrollReveal>

        <ScrollReveal variant="scale" delay={0.2}>
          <div className="mt-10 rounded-2xl border border-white/10 bg-slate-900/80 p-1 shadow-2xl shadow-black/30 backdrop-blur-xl">
            <div className="rounded-xl bg-slate-950 p-5">
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/5">
                <div className="h-8 w-8 rounded-full bg-sky-500/20 flex items-center justify-center text-xs font-bold text-sky-400">FB</div>
                <div>
                  <p className="text-sm font-medium text-white">FluxBot</p>
                  <p className="text-xs text-emerald-400">● Online</p>
                </div>
              </div>

              <div className="h-72 space-y-3 overflow-y-auto rounded-lg bg-slate-900/50 p-3 mb-4">
                {messages.map((message, index) => (
                  <div
                    key={`${message.role}-${index}`}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                        message.role === "user"
                          ? "rounded-br-sm bg-sky-500 text-white"
                          : "rounded-bl-sm bg-slate-800 text-slate-100"
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="rounded-2xl rounded-bl-sm bg-slate-800 px-4 py-3 flex gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-slate-500 animate-[typing-dot_1.4s_infinite_0s]" />
                      <span className="h-2 w-2 rounded-full bg-slate-500 animate-[typing-dot_1.4s_infinite_0.2s]" />
                      <span className="h-2 w-2 rounded-full bg-slate-500 animate-[typing-dot_1.4s_infinite_0.4s]" />
                    </div>
                  </div>
                )}
              </div>

              <form onSubmit={onSubmit} className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={t("placeholder")}
                  className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-sky-400/50 transition-all"
                />
                <button
                  type="submit"
                  disabled={!canSubmit}
                  className="rounded-xl bg-sky-500 px-5 py-3 text-sm font-medium text-white hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                >
                  {t("send")}
                </button>
              </form>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
