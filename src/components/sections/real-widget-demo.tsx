"use client";

import { FormEvent, useMemo, useState, useRef, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { trackEvent } from "@/lib/analytics";

const DEMO_TOKEN = process.env.NEXT_PUBLIC_DEMO_WIDGET_TOKEN || "";
const DEMO_ENDPOINT = "https://api.fluxbotia.com";
const MAX_MESSAGES = 10;

type Message = { role: "bot" | "user"; text: string };

function generateSessionId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `demo-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function RealWidgetDemo() {
  const t = useTranslations("demo_section");
  const locale = useLocale();
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: t("initial_message") },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const [showLogin, setShowLogin] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const sessionId = useRef(generateSessionId());
  const conversationId = useRef<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const canSubmit = useMemo(
    () => input.trim().length > 0 && !isTyping && messageCount < MAX_MESSAGES,
    [input, isTyping, messageCount]
  );

  const remaining = MAX_MESSAGES - messageCount;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const text = input.trim();
    if (!text || messageCount >= MAX_MESSAGES) return;

    setMessages((prev) => [...prev, { role: "user", text: text }]);
    setInput("");
    setIsTyping(true);
    setError(null);
    trackEvent("demo_message_sent");

    try {
      const response = await fetch(
        `${DEMO_ENDPOINT}/api/v1/widget/chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${DEMO_TOKEN}`,
            "X-Correlation-Id": generateSessionId(),
          },
          body: JSON.stringify({
            message: text,
            sessionId: sessionId.current,
            conversationId: conversationId.current,
            metadata: {
              channel: "external-widget",
              url: window.location.href,
              title: document.title,
              locale: "es",
              referrer: document.referrer || null,
              userAgent: navigator.userAgent,
            },
          }),
        }
      );

      if (!response.ok) {
        const errData = await response.json().catch(() => null);
        throw new Error(
          errData?.message || `Error ${response.status}`
        );
      }

      const data = await response.json();
      const reply = data.data?.reply || data.reply || "Lo siento, no pude procesar tu mensaje.";
      conversationId.current = data.data?.conversationId || data.conversationId || conversationId.current;

      setMessages((prev) => [...prev, { role: "bot", text: reply }]);
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : "Error de conexión";
      setError(errMsg);
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "Lo siento, hubo un error. Por favor, intenta de nuevo.",
        },
      ]);
    } finally {
      setIsTyping(false);
      const newCount = messageCount + 1;
      setMessageCount(newCount);

      if (newCount >= MAX_MESSAGES) {
        setTimeout(() => setShowLogin(true), 500);
      }
    }
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
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-sky-500/20 flex items-center justify-center text-xs font-bold text-sky-400">
                    FB
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">FluxBot</p>
                    <p className="text-xs text-emerald-400">● Online</p>
                  </div>
                </div>
                {messageCount > 0 && (
                  <div className="text-xs text-slate-500">
                    {remaining > 0 ? (
                      <span>
                        {remaining} mensaje{remaining !== 1 ? "s" : ""} restante{remaining !== 1 ? "s" : ""}
                      </span>
                    ) : null}
                  </div>
                )}
              </div>

              <div className="relative h-72 overflow-hidden rounded-lg bg-slate-900/50 mb-4">
                <div className="h-full space-y-3 overflow-y-auto p-3">
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
                  <div ref={messagesEndRef} />
                </div>

                {/* Login overlay */}
                {showLogin && (
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-950/90 backdrop-blur-sm">
                    <div className="text-center space-y-4 p-6">
                      <div className="mx-auto h-12 w-12 rounded-full bg-sky-500/20 flex items-center justify-center">
                        <svg
                          className="h-6 w-6 text-sky-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                          />
                        </svg>
                      </div>
                      <p className="text-sm font-medium text-white">
                        Has alcanzado el límite de mensajes de la demo
                      </p>
                      <p className="text-xs text-slate-400">
                        Regístrate gratis para continuar chateando con IA ilimitada.
                      </p>
                      <div className="flex gap-2 justify-center">
                        <Link
                          href={`/${locale}/install`}
                          className="rounded-lg bg-sky-500 px-4 py-2 text-sm font-medium text-white hover:bg-sky-400 transition-colors"
                        >
                          Crear cuenta gratis
                        </Link>
                        <Link
                          href={`/${locale}/pricing`}
                          className="rounded-lg border border-white/20 px-4 py-2 text-sm font-medium hover:bg-white/5 transition-colors"
                        >
                          Ver planes
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {error && (
                <div className="mb-3 rounded-lg bg-red-500/10 border border-red-500/20 px-3 py-2 text-xs text-red-400">
                  {error}
                </div>
              )}

              <form onSubmit={onSubmit} className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={
                    messageCount >= MAX_MESSAGES
                      ? "Límite alcanzado. Regístrate para continuar."
                      : t("placeholder")
                  }
                  disabled={messageCount >= MAX_MESSAGES}
                  className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-sky-400/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <button
                  type="submit"
                  disabled={!canSubmit}
                  className="rounded-xl bg-sky-500 px-5 py-3 text-sm font-medium text-white hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                >
                  {t("send")}
                </button>
              </form>

              {!DEMO_TOKEN && (
                <p className="mt-2 text-[10px] text-amber-500/70 text-center">
                  Demo sin token configurado. Configura NEXT_PUBLIC_DEMO_WIDGET_TOKEN para conectar al backend real.
                </p>
              )}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
