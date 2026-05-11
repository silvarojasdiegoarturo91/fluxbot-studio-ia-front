import { DemoChat } from "@/components/demo-chat";
import { EventLink } from "@/components/event-link";

export default function Home() {
  const benefits = [
    "Captura leads 24/7 con respuestas automáticas.",
    "Resuelve preguntas frecuentes en segundos.",
    "Escala sin depender de Shopify.",
  ];

  const useCases = [
    "Clínicas y centros estéticos.",
    "Restaurantes y reservas.",
    "Academias, cursos y coaching.",
    "Tiendas online con WooCommerce o custom.",
  ];

  return (
    <div className="space-y-16">
      <section className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div className="space-y-6">
          <p className="inline-flex rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 text-sm text-sky-200">
            Chatbot para webs sin Shopify
          </p>
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
            Convierte tu web en un canal de ventas con IA
          </h1>
          <p className="max-w-xl text-slate-300">
            Fluxbot Studio IA te permite vender, responder dudas y capturar
            clientes desde tu sitio web con un widget que instalas en 5 minutos.
          </p>
          <div className="flex flex-wrap gap-3">
            <EventLink
              href="/install"
              eventName="cta_instalacion_hero_main"
              className="rounded-xl bg-sky-500 px-5 py-3 font-medium text-white hover:bg-sky-400"
            >
              Instala en tu web en 5 minutos →
            </EventLink>
            <EventLink
              href="/contact"
              eventName="cta_contacto_hero"
              className="rounded-xl border border-white/20 px-5 py-3 font-medium hover:bg-white/5"
            >
              Solicitar demo
            </EventLink>
          </div>
        </div>
        <div className="card">
          <h2 className="mb-2 text-lg font-semibold">Resultado esperado</h2>
          <p className="text-slate-300">
            Instalación rápida en cualquier plataforma: HTML, WordPress, Next.js,
            Webflow y más.
          </p>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-slate-800/70 p-4">
              <p className="text-sm text-slate-300">Tiempo de instalación</p>
              <p className="text-2xl font-semibold">&lt; 5 min</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-800/70 p-4">
              <p className="text-sm text-slate-300">Disponibilidad</p>
              <p className="text-2xl font-semibold">24/7</p>
            </div>
          </div>
        </div>
      </section>

      <section className="card">
        <h2 className="text-2xl font-semibold">¿Por qué Fluxbot?</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {benefits.map((benefit) => (
            <article key={benefit} className="rounded-xl border border-white/10 p-4">
              <p className="text-slate-200">{benefit}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="card">
        <h2 className="text-2xl font-semibold">Casos de uso</h2>
        <ul className="mt-5 grid gap-3 md:grid-cols-2">
          {useCases.map((useCase) => (
            <li key={useCase} className="rounded-xl border border-white/10 p-4 text-slate-200">
              {useCase}
            </li>
          ))}
        </ul>
      </section>

      <section className="card space-y-4">
        <h2 className="text-2xl font-semibold">Instalación simplificada</h2>
        <p className="text-slate-300">
          Generador de snippet con validación de conexión, presets para múltiples
          plataformas y demostración en vivo.
        </p>
        <div className="flex flex-wrap gap-2">
          <EventLink
            href="/install"
            eventName="cta_install_features"
            className="rounded-lg bg-sky-500 px-4 py-2 text-sm font-medium text-white hover:bg-sky-400"
          >
            → Ir a instalación
          </EventLink>
          <EventLink
            href="/demo-widget"
            eventName="cta_demo_widget_features"
            className="rounded-lg border border-white/20 px-4 py-2 text-sm font-medium hover:bg-white/5"
          >
            Probar demo
          </EventLink>
        </div>
      </section>

      <section className="card">
        <h2 className="mb-4 text-2xl font-semibold">Demo interactiva</h2>
        <DemoChat />
      </section>
    </div>
  );
}
