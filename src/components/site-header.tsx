import Link from "next/link";

const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/pricing", label: "Precios" },
  { href: "/install", label: "Instalación" },
  { href: "/contact", label: "Contacto" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-white/10 bg-slate-950/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 md:px-10">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Fluxbot Studio IA
        </Link>
        <nav className="flex items-center gap-4 text-sm text-slate-300">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
