export default function TrainingPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-3">
        <p className="inline-flex rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 text-sm text-sky-200">
          Panel separado
        </p>
        <h1 className="text-4xl font-semibold">La operativa ya no vive en esta web</h1>
        <p className="max-w-3xl text-slate-300">
          Esta web externa queda solo para venta, captación e instalación. La gestión de clientes,
          entrenamiento, políticas y operativa se moverá a un proyecto aparte de panel,
          normalmente en un subdominio como <code>panel.tu-dominio.com</code>.
        </p>
      </header>

      <section className="card space-y-4">
        <h2 className="text-2xl font-semibold">Qué va en el panel</h2>
        <ul className="grid gap-3 text-slate-300 md:grid-cols-2">
          <li className="rounded-xl border border-white/10 p-4">Gestión de tenants y clientes.</li>
          <li className="rounded-xl border border-white/10 p-4">Entrenamiento del chatbot por negocio.</li>
          <li className="rounded-xl border border-white/10 p-4">Temas permitidos y bloqueados.</li>
          <li className="rounded-xl border border-white/10 p-4">Auditoría, cuotas y seguimiento operativo.</li>
        </ul>
      </section>

      <section className="card space-y-4">
        <h2 className="text-2xl font-semibold">Cómo quedará la estructura</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-white/10 p-4">
            <p className="font-medium text-white">Web pública</p>
            <p className="mt-2 text-sm text-slate-300">
              Landing, precios, contacto, demo e instalación del widget.
            </p>
          </div>
          <div className="rounded-xl border border-white/10 p-4">
            <p className="font-medium text-white">Panel</p>
            <p className="mt-2 text-sm text-slate-300">
              Panel interno para operar el servicio y configurar cada cliente.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
