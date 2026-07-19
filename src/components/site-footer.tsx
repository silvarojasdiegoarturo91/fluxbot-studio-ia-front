export function SiteFooter() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-6 py-6 text-sm text-slate-400 md:px-10">
        <p>© {new Date().getFullYear()} Fluxbot Studio IA</p>
        <p>Web pública de ventas e instalación. La operativa vive en un panel separado.</p>
        <a className="w-fit text-sky-300 underline hover:text-sky-200" href="/privacy">
          Política de privacidad
        </a>
      </div>
    </footer>
  );
}
