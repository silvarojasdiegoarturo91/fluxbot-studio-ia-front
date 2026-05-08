import { ContactForm } from "@/components/contact-form";

export default function ContactPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <h1 className="text-4xl font-semibold">Solicitar demo / alta</h1>
        <p className="max-w-2xl text-slate-300">
          Cuéntanos sobre tu negocio y te proponemos una configuración de
          chatbot adaptada a tu web.
        </p>
      </header>
      <ContactForm />
    </div>
  );
}
