import { EventLink } from "@/components/event-link";

const plans = [
  {
    name: "Starter",
    price: "29€/mes",
    features: ["1 sitio web", "FAQ automatizada", "Soporte por email"],
  },
  {
    name: "Growth",
    price: "79€/mes",
    features: ["Hasta 3 sitios", "Captura de leads", "Personalización avanzada"],
  },
  {
    name: "Scale",
    price: "A medida",
    features: ["Sitios ilimitados", "Integraciones custom", "Soporte prioritario"],
  },
];

export default function PricingPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <h1 className="text-4xl font-semibold">Precios</h1>
        <p className="text-slate-300">
          Planes para negocios que quieren vender con un chatbot en su propia
          web.
        </p>
      </header>
      <section className="grid gap-4 md:grid-cols-3">
        {plans.map((plan) => (
          <article key={plan.name} className="card space-y-4">
            <h2 className="text-xl font-semibold">{plan.name}</h2>
            <p className="text-3xl font-bold text-sky-300">{plan.price}</p>
            <ul className="space-y-2 text-slate-300">
              {plan.features.map((feature) => (
                <li key={feature}>• {feature}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>
      <EventLink
        href="/contact"
        eventName="cta_contacto_pricing"
        className="inline-flex rounded-xl bg-sky-500 px-5 py-3 font-medium text-white hover:bg-sky-400"
      >
        Hablar con ventas
      </EventLink>
    </div>
  );
}
