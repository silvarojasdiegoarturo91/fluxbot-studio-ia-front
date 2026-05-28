"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { ConnectionTester } from "./connection-tester";

type WidgetConfig = {
  token: string;
  domain: string;
  gateway: string;
  securityMode: "gateway" | "direct";
  position: "left" | "right";
  primaryColor: string;
  greeting: string;
  endpoint: string;
};

const initialConfig: WidgetConfig = {
  token: "demo-token-123",
  domain: "example.com",
  gateway: "https://panel.tu-dominio.com/api/v1/widget",
  securityMode: "gateway",
  position: "right",
  primaryColor: "#0ea5e9",
  greeting: "Hola, ¿en qué puedo ayudarte hoy?",
  endpoint: "https://api.tu-dominio.com/chat",
};

export function SnippetGenerator() {
  const searchParams = useSearchParams();
  const [config, setConfig] = useState<WidgetConfig>(() => {
    if (typeof window !== "undefined" && searchParams) {
      const domainParam = searchParams.get("domain");
      if (domainParam) {
        return { ...initialConfig, domain: domainParam };
      }
    }
    return initialConfig;
  });
  const [copied, setCopied] = useState(false);
  const [isConnectionValid, setIsConnectionValid] = useState(false);
  const [showConnectionTester, setShowConnectionTester] = useState(false);

  const scriptUrl =
    typeof window === "undefined"
      ? "https://tu-dominio.com/chat-widget.js"
      : `https://panel.tu-dominio.com/chat-widget.js`;

  const snippet = useMemo(
    () =>
      `<script
  src="${scriptUrl}"
  data-token="${config.token}"
  data-domain="${config.domain}"
  data-gateway="${config.gateway}"
  data-security-mode="${config.securityMode}"
  data-api-version="v1"
  data-tenant-mode="external"
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
    trackEvent("install_snippet_copied", { domain: config.domain });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-1">
          <span className="text-sm text-slate-300">Token *</span>
          <input
            value={config.token}
            onChange={(event) => setConfig({ ...config, token: event.target.value })}
            className="w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2"
            aria-label="API Token"
          />
        </label>
        <label className="space-y-1">
          <span className="text-sm text-slate-300">Dominio *</span>
          <input
            value={config.domain}
            onChange={(event) => setConfig({ ...config, domain: event.target.value })}
            className="w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2"
            placeholder="example.com"
            aria-label="Domain"
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
            aria-label="Position"
          >
            <option value="right">Derecha</option>
            <option value="left">Izquierda</option>
          </select>
        </label>
        <label className="space-y-1">
          <span className="text-sm text-slate-300">Modo de seguridad</span>
          <select
            value={config.securityMode}
            onChange={(event) =>
              setConfig({ ...config, securityMode: event.target.value as "gateway" | "direct" })
            }
            className="w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2"
            aria-label="Security mode"
          >
            <option value="gateway">Gateway seguro (recomendado)</option>
            <option value="direct">Directo al endpoint</option>
          </select>
        </label>
        <label className="space-y-1">
          <span className="text-sm text-slate-300">Color principal</span>
          <input
            type="color"
            value={config.primaryColor}
            onChange={(event) => setConfig({ ...config, primaryColor: event.target.value })}
            className="h-10 w-full rounded-lg border border-white/10 cursor-pointer"
            aria-label="Primary color"
          />
        </label>
        <label className="space-y-1">
          <span className="text-sm text-slate-300">Gateway de seguridad</span>
          <input
            value={config.gateway}
            onChange={(event) => setConfig({ ...config, gateway: event.target.value })}
            className="w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-sm"
            placeholder="https://panel.tu-dominio.com/api/v1/widget"
            aria-label="Security gateway"
          />
        </label>
        <label className="space-y-1">
          <span className="text-sm text-slate-300">Endpoint API</span>
          <input
            value={config.endpoint}
            onChange={(event) => setConfig({ ...config, endpoint: event.target.value })}
            className="w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-sm"
            placeholder="https://api.ejemplo.com"
            aria-label="API Endpoint"
          />
        </label>
      </div>

      <label className="block space-y-1">
        <span className="text-sm text-slate-300">Mensaje inicial</span>
        <input
          value={config.greeting}
          onChange={(event) => setConfig({ ...config, greeting: event.target.value })}
          className="w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2"
          aria-label="Greeting message"
        />
      </label>

      <div className="rounded-xl border border-white/10 bg-slate-900/50 p-4">
        <button
          type="button"
          onClick={() => setShowConnectionTester(!showConnectionTester)}
          className="text-sm font-medium text-sky-400 hover:text-sky-300"
        >
          {showConnectionTester ? "◀ Ocultar" : "▶ Validar conexión"} (recomendado)
        </button>

        {showConnectionTester && (
          <div className="mt-4">
            <ConnectionTester onValidationChange={setIsConnectionValid} />
          </div>
        )}
      </div>

      <div className="space-y-3">
        <div>
          <h3 className="mb-2 text-sm font-semibold text-slate-200">Tu snippet listo:</h3>
          <pre className="overflow-x-auto rounded-xl border border-white/10 bg-slate-950 p-4 text-xs text-slate-200">
            <code>{snippet}</code>
          </pre>
        </div>
        <button
          type="button"
          onClick={copySnippet}
          disabled={showConnectionTester && !isConnectionValid}
          className="rounded-xl bg-sky-500 px-4 py-2 text-sm font-medium text-white hover:bg-sky-400 disabled:opacity-50 disabled:cursor-not-allowed"
          title={showConnectionTester && !isConnectionValid ? "Valida la conexión primero" : undefined}
        >
          {copied ? "✓ Snippet copiado" : "Copiar snippet"}
        </button>
        <p className="text-xs text-slate-400">Pega este código antes del cierre de &lt;/body&gt;</p>
      </div>
    </div>
  );
}
