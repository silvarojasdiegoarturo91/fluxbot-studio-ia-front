import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { ScrollMotionStage } from "@/components/ui/scroll-motion-stage";

const pillars = [
  ["Respuestas que se pueden demostrar", "Precio, stock y políticas con una fuente clara. Sin promesas inventadas."],
  ["Un catálogo que aprende", "Cada duda repetida se convierte en una mejora que tu equipo aprueba."],
  ["Ventas que puedes medir", "Prueba qué conversación ayuda a vender y cuál solo hace ruido."],
];

const roadmap = [
  "Comercio Seguro ES",
  "Chat accesible",
  "Catálogo autorreparable",
  "Guardian de acciones",
  "WhatsApp Commerce",
  "Sales Lab",
];

export default function HomePage() {
  return (
    <div className="pb-12 pt-8 text-[#173b4d] md:pt-14">
      <section className="relative overflow-hidden rounded-[2rem] border border-[#173b4d]/10 bg-[#fffdf8] px-6 py-14 shadow-[0_24px_80px_rgba(23,59,77,0.10)] md:px-14 md:py-20">
        <div className="absolute -right-16 -top-24 h-72 w-72 rounded-full bg-[#d9654b]/15 blur-3xl" />
        <div className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-[#6c8b74]/15 blur-3xl" />
        <div className="relative grid gap-12 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
          <ScrollReveal variant="left" duration={0.7}>
            <p className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#173b4d] px-4 py-2 text-sm font-semibold text-white"><Sparkles className="h-4 w-4 text-[#f6bf73]" /> Comercio conversacional, con criterio</p>
            <h1 className="max-w-3xl text-5xl font-semibold tracking-[-0.05em] text-[#173b4d] md:text-7xl">Convierte preguntas en ventas. Y ventas en una tienda mejor.</h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[#47616f]">FluxBot recomienda con datos reales, sabe cuándo derivar a una persona y transforma lo que preguntan tus clientes en mejoras concretas para tu catálogo.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/es/install" className="inline-flex items-center gap-2 rounded-full bg-[#d9654b] px-6 py-3 font-semibold text-white shadow-lg shadow-[#d9654b]/20 transition hover:bg-[#bd5039]">Instalar en Shopify <ArrowRight className="h-4 w-4" /></Link>
              <Link href="/es/demo" className="rounded-full border border-[#173b4d]/20 px-6 py-3 font-semibold text-[#173b4d] transition hover:bg-[#173b4d]/5">Ver una conversación</Link>
            </div>
            <p className="mt-5 text-sm text-[#6c8b74]">Diseñado para vender con evidencia, no con respuestas bonitas.</p>
          </ScrollReveal>
          <ScrollMotionStage rotate={[-5, 4]} scale={[0.9, 1.05, 0.94]} y={[72, -56]}>
          <div className="rounded-3xl border border-[#173b4d]/10 bg-white p-5 shadow-xl shadow-[#173b4d]/10">
            <div className="flex items-center justify-between border-b border-[#173b4d]/10 pb-4 text-sm"><span className="font-semibold">Asistente de tienda</span><span className="rounded-full bg-[#eaf1e8] px-3 py-1 text-[#426d50]">Verificado</span></div>
            <div className="space-y-4 py-6 text-sm leading-6"><p className="max-w-[85%] rounded-2xl rounded-tl-sm bg-[#f2eee5] p-4">¿Cuál me recomendáis para piel sensible y entrega esta semana?</p><p className="ml-auto max-w-[90%] rounded-2xl rounded-tr-sm bg-[#173b4d] p-4 text-white">Te recomiendo Calm Cleanser. Está disponible para entrega esta semana y su fórmula no contiene perfume. <span className="block pt-2 text-xs text-[#b9d7c1]">Basado en ficha de producto y política de envío actualizadas hoy.</span></p></div>
            <div className="rounded-2xl bg-[#f8f4ec] p-4"><p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6c8b74]">Por qué FluxBot</p><p className="mt-2 font-medium">La recomendación tiene una razón, una fuente y un siguiente paso.</p></div>
          </div>
          </ScrollMotionStage>
        </div>
      </section>

      <section className="grid gap-5 py-16 md:grid-cols-3">
        {pillars.map(([title, detail], index) => <ScrollReveal key={title} variant="up" delay={index * 0.12} className="h-full"><ScrollMotionStage className="h-full" rotate={index % 2 === 0 ? [-2, 2] : [2, -2]} scale={[0.92, 1.03, 0.98]} y={[42, -32]}><article className="h-full rounded-3xl border border-[#173b4d]/10 bg-white p-7 shadow-[0_12px_30px_rgba(23,59,77,0.04)]"><span className="text-sm font-semibold text-[#d9654b]">0{index + 1}</span><h2 className="mt-5 text-2xl font-semibold tracking-tight">{title}</h2><p className="mt-3 leading-7 text-[#526a76]">{detail}</p></article></ScrollMotionStage></ScrollReveal>)}
      </section>

      <ScrollReveal variant="scale" className="origin-center"><section className="rounded-[2rem] bg-[#173b4d] px-7 py-12 text-white md:px-12"><div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]"><div><p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#f6bf73]">La hoja de ruta</p><h2 className="mt-4 text-4xl font-semibold tracking-tight">Una IA que se gana la confianza antes de pedirla.</h2><p className="mt-4 leading-7 text-[#d4e0e4]">No vendemos otra caja negra. Construimos las seis capas que hacen que una conversación sea útil para la persona y rentable para la tienda.</p></div><ol className="grid gap-3 sm:grid-cols-2">{roadmap.map((item, index) => <ScrollReveal key={item} variant={index % 2 === 0 ? "right" : "left"} delay={index * 0.06}><li className="flex items-center gap-3 rounded-2xl border border-white/15 px-4 py-4 transition-transform duration-300 hover:-translate-y-1"><span className="grid h-7 w-7 place-items-center rounded-full bg-[#d9654b] text-xs font-bold">{index + 1}</span><span className="font-medium">{item}</span></li></ScrollReveal>)}</ol></div></section></ScrollReveal>

      <section className="grid gap-6 py-16 lg:grid-cols-2"><ScrollReveal variant="left"><div><p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#6c8b74]">Para equipos que venden</p><h2 className="mt-4 text-4xl font-semibold tracking-tight">Saber qué pregunta un cliente es útil. Saber qué cambiar después es crecimiento.</h2></div></ScrollReveal><ScrollMotionStage rotate={[3, -3]} scale={[0.9, 1.04, 0.97]} y={[54, -38]}><div className="rounded-3xl border border-[#173b4d]/10 bg-[#eaf1e8] p-7 shadow-[0_18px_38px_rgba(66,109,80,0.10)]"><ShieldCheck className="h-7 w-7 text-[#426d50]" /><p className="mt-4 text-xl font-medium leading-8">“No puedo confirmar esa compatibilidad. He creado una mejora para que el equipo la revise.”</p><p className="mt-3 text-[#526a76]">El agente protege la confianza del cliente y convierte la incertidumbre en una tarea accionable.</p></div></ScrollMotionStage></section>
      <ScrollReveal variant="up"><section className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-[#d9654b]/30 bg-[#fff1eb] p-8 md:flex-row md:items-center"><div><h2 className="text-2xl font-semibold">Empieza por una conversación que sí sabe cuándo parar.</h2><p className="mt-2 text-[#526a76]">Instalación guiada, catálogo conectado y control desde el primer día.</p></div><Link href="/es/contact" className="inline-flex items-center gap-2 rounded-full bg-[#173b4d] px-6 py-3 font-semibold text-white transition-transform hover:-translate-y-1">Hablar con el equipo <CheckCircle2 className="h-4 w-4" /></Link></section></ScrollReveal>
    </div>
  );
}
