import { SnippetGenerator } from "@/components/snippet-generator";

export default function InstallPage() {
  return (
    <div className="space-y-8">
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
        <SnippetGenerator />
      </section>

      <section className="card space-y-4">
        <h2 className="text-2xl font-semibold">Pasos</h2>
        <ol className="space-y-2 text-slate-300">
          <li>1. Configura token, endpoint y estilo en el generador.</li>
          <li>2. Copia el snippet generado.</li>
          <li>3. Pégalo en tu HTML antes de cerrar el body.</li>
          <li>4. Publica y verifica que el botón del chatbot aparezca.</li>
        </ol>
      </section>
    </div>
  );
}
