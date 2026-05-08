"use client";

import { FormEvent, useState } from "react";
import { trackEvent } from "@/lib/analytics";

type ContactData = {
  name: string;
  email: string;
  website: string;
  message: string;
};

const initialData: ContactData = {
  name: "",
  email: "",
  website: "",
  message: "",
};

export function ContactForm() {
  const [data, setData] = useState<ContactData>(initialData);
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    trackEvent("contact_form_submit");
  };

  return (
    <form onSubmit={onSubmit} className="card space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-1">
          <span className="text-sm text-slate-300">Nombre</span>
          <input
            required
            value={data.name}
            onChange={(event) => setData({ ...data, name: event.target.value })}
            className="w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2"
          />
        </label>
        <label className="space-y-1">
          <span className="text-sm text-slate-300">Email</span>
          <input
            required
            type="email"
            value={data.email}
            onChange={(event) => setData({ ...data, email: event.target.value })}
            className="w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2"
          />
        </label>
      </div>
      <label className="space-y-1">
        <span className="text-sm text-slate-300">Sitio web</span>
        <input
          required
          value={data.website}
          onChange={(event) => setData({ ...data, website: event.target.value })}
          placeholder="https://miweb.com"
          className="w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2"
        />
      </label>
      <label className="space-y-1">
        <span className="text-sm text-slate-300">Mensaje</span>
        <textarea
          required
          value={data.message}
          onChange={(event) => setData({ ...data, message: event.target.value })}
          className="h-32 w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2"
          placeholder="Cuéntanos tu caso de uso"
        />
      </label>
      <button
        type="submit"
        className="rounded-xl bg-sky-500 px-5 py-3 font-medium text-white hover:bg-sky-400"
      >
        Enviar solicitud
      </button>
      {submitted ? (
        <p className="rounded-lg border border-emerald-400/30 bg-emerald-400/10 p-3 text-emerald-200">
          Gracias. Recibimos tu solicitud y te contactaremos pronto.
        </p>
      ) : null}
    </form>
  );
}
