"use client";

import { FormEvent, useMemo, useState } from "react";
import { trackEvent } from "@/lib/analytics";

type Message = {
  role: "bot" | "user";
  text: string;
};

const initialMessages: Message[] = [
  {
    role: "bot",
    text: "Hola, soy Fluxbot. ¿Quieres una demo, precios o ayuda con instalación?",
  },
];

function getReply(input: string): string {
  const text = input.toLowerCase();
  if (text.includes("precio") || text.includes("plan")) {
    return "Tenemos planes desde 29€/mes. Puedes ver detalle en la sección de precios.";
  }
  if (text.includes("instal")) {
    return "La instalación se hace con un snippet JS. En menos de 5 minutos queda activo.";
  }
  if (text.includes("demo")) {
    return "Perfecto. Déjanos tus datos en contacto y te activamos una demo guiada.";
  }
  return "Te puedo ayudar con precios, casos de uso e instalación. ¿Qué necesitas?";
}

export function DemoChat() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");

  const canSubmit = useMemo(() => input.trim().length > 0, [input]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const text = input.trim();
    if (!text) {
      return;
    }

    const nextMessages: Message[] = [
      ...messages,
      { role: "user", text },
      { role: "bot", text: getReply(text) },
    ];

    setMessages(nextMessages);
    setInput("");
    trackEvent("demo_message_sent");
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950 p-4">
      <div className="h-72 space-y-3 overflow-y-auto rounded-xl border border-white/10 bg-slate-900 p-3">
        {messages.map((message, index) => (
          <p
            key={`${message.role}-${index}`}
            className={`max-w-[90%] rounded-lg px-3 py-2 text-sm ${
              message.role === "user"
                ? "ml-auto bg-sky-500 text-white"
                : "bg-slate-800 text-slate-100"
            }`}
          >
            {message.text}
          </p>
        ))}
      </div>
      <form onSubmit={onSubmit} className="mt-3 flex gap-2">
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Escribe tu mensaje..."
          className="w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-sm outline-none ring-sky-400 focus:ring-2"
        />
        <button
          type="submit"
          disabled={!canSubmit}
          className="rounded-lg bg-sky-500 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
