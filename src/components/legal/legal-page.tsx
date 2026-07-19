import type { ReactNode } from "react";
import Link from "next/link";

type LegalSection = {
  title: string;
  content: ReactNode;
};

type LegalPageProps = {
  eyebrow: string;
  title: string;
  summary: string;
  sections: LegalSection[];
};

const legalLinks = [
  ["Privacidad", "/privacy"],
  ["Términos", "/terms"],
  ["Cookies", "/cookies"],
  ["Encargo de tratamiento", "/data-processing"],
  ["Accesibilidad", "/accessibility"],
  ["Uso responsable de IA", "/ai-compliance"],
  ["Aviso legal", "/legal-notice"],
] as const;

export function LegalPage({ eyebrow, title, summary, sections }: LegalPageProps) {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-12 text-[#173b4d] md:px-8 md:py-20">
      <nav aria-label="Navegación legal" className="mb-12 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[#526a76]">
        <Link className="font-semibold text-[#173b4d] hover:text-[#d9654b]" href="/es">FluxBot</Link>
        {legalLinks.map(([label, href]) => (
          <Link className="hover:text-[#d9654b]" href={href} key={href}>{label}</Link>
        ))}
      </nav>

      <article className="rounded-[2rem] border border-[#173b4d]/10 bg-[#fffdf8] p-7 shadow-[0_24px_80px_rgba(23,59,77,0.08)] md:p-12">
        <header className="border-b border-[#173b4d]/10 pb-9">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#6c8b74]">{eyebrow} · Última actualización: 20 de julio de 2026</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] md:text-5xl">{title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-[#526a76]">{summary}</p>
        </header>
        <div className="mt-10 space-y-10 leading-7 text-[#405b68]">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-2xl font-semibold tracking-tight text-[#173b4d]">{section.title}</h2>
              <div className="mt-3 space-y-4">{section.content}</div>
            </section>
          ))}
        </div>
      </article>
    </main>
  );
}

export function PrivacyContact() {
  return <Link className="font-semibold text-[#d9654b] underline underline-offset-4" href="/es/contact">formulario de contacto de privacidad</Link>;
}
