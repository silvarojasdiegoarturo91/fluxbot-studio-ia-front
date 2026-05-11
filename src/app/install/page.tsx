import { Suspense } from "react";
import { SnippetGeneratorWrapper } from "@/components/snippet-generator-wrapper";
import { SnippetPresets } from "@/components/snippet-presets";
import { InstallFAQ } from "@/components/install-faq";

function SnippetGeneratorSkeleton() {
  return (
    <div className="space-y-4">
      <div className="h-10 w-full rounded-lg bg-slate-800 animate-pulse" />
      <div className="h-10 w-full rounded-lg bg-slate-800 animate-pulse" />
      <div className="h-20 w-full rounded-lg bg-slate-800 animate-pulse" />
    </div>
  );
}

export default function InstallPage() {
  return (
    <div className="space-y-12">
      <header className="space-y-3">
        <h1 className="text-4xl font-semibold">Instala el widget en tu web</h1>
        <p className="max-w-3xl text-slate-300">
          Configura tu snippet y pégalo antes del cierre de{" "}
          <code>&lt;/body&gt;</code>. El widget cargará sin bloquear el resto
          del sitio.
        </p>
      </header>

      <section className="card space-y-4">
        <h2 className="text-2xl font-semibold">Generador de snippet</h2>
        <Suspense fallback={<SnippetGeneratorSkeleton />}>
          <SnippetGeneratorWrapper />
        </Suspense>
      </section>

      <section className="card space-y-4">
        <h2 className="text-2xl font-semibold">Otras plataformas</h2>
        <SnippetPresets domain="example.com" token="your-token" />
      </section>

      <section className="card space-y-4">
        <h2 className="text-2xl font-semibold">Pasos de instalación</h2>
        <ol className="space-y-2 text-slate-300">
          <li>
            <strong>Paso 1:</strong> Completa Token y Dominio en el generador
            arriba.
          </li>
          <li>
            <strong>Paso 2:</strong> Haz clic en &quot;Validar conexión&quot; para
            verificar que tu dominio esté autorizado.
          </li>
          <li>
            <strong>Paso 3:</strong> Copia el snippet generado.
          </li>
          <li>
            <strong>Paso 4:</strong> Pégalo en tu HTML antes de cerrar el
            body.
          </li>
          <li>
            <strong>Paso 5:</strong> Publica y verifica que el widget
            aparezca.
          </li>
        </ol>
      </section>

      <section className="card space-y-4">
        <h2 className="text-2xl font-semibold">Demo</h2>
        <p className="text-slate-300">
          Prueba el widget en vivo sin instalarlo:
        </p>
        <a
          href="/demo-widget"
          className="inline-block rounded-lg bg-sky-500 px-4 py-2 text-sm font-medium text-white hover:bg-sky-400"
        >
          → Ir a demo
        </a>
      </section>

      <InstallFAQ />
    </div>
  );
}
