import { DemoChat } from "@/components/demo-chat";

export default function DemoPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-3">
        <h1 className="text-4xl font-semibold">Demo del chatbot</h1>
        <p className="max-w-2xl text-slate-300">
          Esta demo usa respuestas de muestra para validar la experiencia de
          interacción y conversión.
        </p>
      </header>
      <div className="card">
        <DemoChat />
      </div>
    </div>
  );
}
