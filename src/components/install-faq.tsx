"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "¿Cómo obtengo el token?",
    answer: "El token lo obtienes en tu dashboard de Fluxbot Studio. Dirígete a Settings > API Tokens y genera uno nuevo. Es importante mantenerlo en secreto.",
  },
  {
    question: "¿Qué es 'dominio permitido'?",
    answer: "Es la URL de tu sitio web donde instalarás el widget. Por razones de seguridad, el widget solo funciona en dominios autorizados. Puedes autorizar múltiples dominios.",
  },
  {
    question: "¿Puedo usar subdominios?",
    answer: "Sí, pero debes autorizarlos explícitamente. Por ejemplo, si autorizas 'example.com', también debes autorizar 'help.example.com' y 'blog.example.com' por separado.",
  },
  {
    question: "¿Cómo cambio el color del widget?",
    answer: "En el generador de snippet, usa el campo 'Color principal'. El color se aplica al botón y elementos principales del widget. Usa formato hexadecimal (#0ea5e9).",
  },
  {
    question: "¿Puedo usar el mismo token en múltiples dominios?",
    answer: "Sí, el token es independiente del dominio. Puedes usar el mismo token en varias webs autorizadas. Cada dominio debe estar registrado en tu cuenta.",
  },
  {
    question: "¿Qué significa error 403 (dominio no autorizado)?",
    answer: "Tu dominio no está autorizado en el dashboard. Ve a Settings > Dominios autorizados y añade el tuyo. Luego intenta nuevamente la validación.",
  },
  {
    question: "¿Cuánto tiempo tarda en cargar el widget?",
    answer: "El widget se carga de forma asíncrona (defer attribute), por lo que no bloquea el resto de tu sitio. Generalmente aparece en 1-2 segundos.",
  },
  {
    question: "¿Es necesario validar la conexión?",
    answer: "No es obligatorio, pero es recomendado. Validar asegura que tu token y dominio sean correctos antes de copiar el snippet.",
  },
];

export function InstallFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="card space-y-4">
      <h2 className="text-2xl font-semibold">Preguntas frecuentes</h2>

      <div className="space-y-2">
        {faqs.map((faq, index) => (
          <details
            key={index}
            open={openIndex === index}
            className="group rounded-lg border border-white/10 bg-slate-900/30 p-4 transition-all"
          >
            <summary
              onClick={() => toggle(index)}
              className="flex cursor-pointer items-center justify-between text-slate-200 hover:text-slate-100"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  toggle(index);
                }
              }}
            >
              <span className="font-medium">{faq.question}</span>
              <span className="transition-transform group-open:rotate-180">▼</span>
            </summary>
            <div className="mt-3 text-sm text-slate-400">{faq.answer}</div>
          </details>
        ))}
      </div>

      <div className="rounded-lg border border-sky-500/30 bg-sky-500/10 p-4">
        <h3 className="text-sm font-medium text-sky-300">¿Necesitas más ayuda?</h3>
        <p className="mt-2 text-xs text-sky-200">
          Contáctanos en{" "}
          <a href="mailto:support@fluxbot.studio" className="underline hover:no-underline">
            support@fluxbot.studio
          </a>{" "}
          o visita nuestra documentación completa.
        </p>
      </div>
    </section>
  );
}
