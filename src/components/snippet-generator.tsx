"use client";

import { useMemo, useState } from "react";
import { trackEvent } from "@/lib/analytics";

type WidgetConfig = {
  token: string;
  position: "left" | "right";
  primaryColor: string;
  greeting: string;
  endpoint: string;
};

const initialConfig: WidgetConfig = {
  token: "demo-token-123",
  position: "right",
  primaryColor: "#0ea5e9",
  greeting: "Hola, ¿en qué puedo ayudarte hoy?",
  endpoint: "https://api.tu-dominio.com/chat",
};

export function SnippetGenerator() {
  const [config, setConfig] = useState<WidgetConfig>(initialConfig);
  const [copied, setCopied] = useState(false);
  const scriptUrl =
    typeof window === "undefined"
      ? "https://tu-dominio.com/chat-widget.js"
      : `${window.location.origin}/chat-widget.js`;

  const snippet = useMemo(
    () =>
      `<script
  src="${scriptUrl}"
  data-token="${config.token}"
  data-position="${config.position}"
  data-primary-color="${config.primaryColor}"
  data-greeting="${config.greeting}"
  data-endpoint="${config.endpoint}"
  defer
></script>`,
    [config, scriptUrl],
  );

  const copySnippet = async () => {
    await navigator.clipboard.writeText(snippet);
    setCopied(true);
    trackEvent("install_snippet_copied");
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-1">
          <span className="text-sm text-slate-300">Token</span>
          <input
            value={config.token}
            onChange={(event) => setConfig({ ...config, token: event.target.value })}
            className="w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2"
          />
        </label>
        <label className="space-y-1">
          <span className="text-sm text-slate-300">Posición</span>
          <select
            value={config.position}
            onChange={(event) =>
              setConfig({ ...config, position: event.target.value as "left" | "right" })
            }
            className="w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2"
          >
            <option value="right">Derecha</option>
            <option value="left">Izquierda</option>
          </select>
        </label>
        <label className="space-y-1">
          <span className="text-sm text-slate-300">Color principal</span>
          <input
            value={config.primaryColor}
            onChange={(event) => setConfig({ ...config, primaryColor: event.target.value })}
            className="w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2"
          />
        </label>
        <label className="space-y-1">
          <span className="text-sm text-slate-300">Endpoint API</span>
          <input
            value={config.endpoint}
            onChange={(event) => setConfig({ ...config, endpoint: event.target.value })}
            className="w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2"
          />
        </label>
      </div>
      <label className="block space-y-1">
        <span className="text-sm text-slate-300">Mensaje inicial</span>
        <input
          value={config.greeting}
          onChange={(event) => setConfig({ ...config, greeting: event.target.value })}
          className="w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2"
        />
      </label>

      <div className="space-y-3">
        <pre className="overflow-x-auto rounded-xl border border-white/10 bg-slate-950 p-4 text-sm text-slate-200">
          <code>{snippet}</code>
        </pre>
        <button
          type="button"
          onClick={copySnippet}
          className="rounded-xl bg-sky-500 px-4 py-2 text-sm font-medium text-white hover:bg-sky-400"
        >
          {copied ? "Snippet copiado" : "Copiar snippet"}
        </button>
      </div>
    </div>
  );
}
