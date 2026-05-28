"use client";

import { useState, useEffect } from "react";

interface WidgetSettings {
  token: string;
  endpoint: string;
  gateway: string;
  securityMode: "gateway" | "direct";
  domain: string;
  color: string;
  greeting: string;
}

const initialSettings: WidgetSettings = {
  token: "tk_demo_fluxbot_123456",
  endpoint: "https://api.tu-dominio.com/chat",
  gateway: "https://panel.tu-dominio.com/api/v1/widget",
  securityMode: "gateway",
  domain: "localhost",
  color: "#0ea5e9",
  greeting: "Hola, ¿en qué puedo ayudarte?",
};

export default function DemoWidgetPage() {
  const [settings, setSettings] = useState<WidgetSettings>(initialSettings);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    const scriptUrl = `https://panel.tu-dominio.com/chat-widget.js`;
    const existingScript = document.querySelector('script[data-token]');

    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement("script");
    script.src = scriptUrl;
    script.setAttribute("data-token", settings.token);
    script.setAttribute("data-domain", settings.domain);
    script.setAttribute("data-gateway", settings.gateway);
    script.setAttribute("data-security-mode", settings.securityMode);
    script.setAttribute("data-endpoint", settings.endpoint);
    script.setAttribute("data-primary-color", settings.color);
    script.setAttribute("data-greeting", settings.greeting);
    script.setAttribute("data-api-version", "v1");
    script.setAttribute("data-tenant-mode", "external");
    script.setAttribute("data-position", "right");
    script.defer = true;

    script.onload = () => setScriptLoaded(true);
    script.onerror = () => setScriptLoaded(false);

    document.body.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [settings]);

  const handleReset = () => {
    setSettings(initialSettings);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <header className="mb-8">
          <h1 className="text-3xl font-semibold text-white">Widget Demo</h1>
          <p className="mt-2 text-slate-400">Configura y prueba el widget en tiempo real</p>
        </header>

        <div className="card space-y-6">
          <section className="space-y-4">
            <h2 className="text-lg font-medium text-slate-200">Configuración</h2>

            <label className="block space-y-1">
              <span className="text-sm font-medium text-slate-300">Token API</span>
              <input
                type="password"
                value={settings.token}
                onChange={(e) => setSettings({ ...settings, token: e.target.value })}
                className="w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-white focus:border-sky-500 focus:outline-none"
                placeholder="tk_demo_fluxbot_123456"
              />
            </label>

            <label className="block space-y-1">
              <span className="text-sm font-medium text-slate-300">Dominio</span>
              <input
                type="text"
                value={settings.domain}
                onChange={(e) => setSettings({ ...settings, domain: e.target.value })}
                className="w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-white focus:border-sky-500 focus:outline-none"
                placeholder="example.com"
              />
            </label>

            <label className="block space-y-1">
              <span className="text-sm font-medium text-slate-300">Modo seguridad</span>
              <select
                value={settings.securityMode}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    securityMode: e.target.value as "gateway" | "direct",
                  })
                }
                className="w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-white focus:border-sky-500 focus:outline-none"
              >
                <option value="gateway">Gateway seguro</option>
                <option value="direct">Directo al endpoint</option>
              </select>
            </label>

            <label className="block space-y-1">
              <span className="text-sm font-medium text-slate-300">Gateway seguridad</span>
              <input
                type="text"
                value={settings.gateway}
                onChange={(e) => setSettings({ ...settings, gateway: e.target.value })}
                className="w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-white focus:border-sky-500 focus:outline-none"
                placeholder="https://panel.tu-dominio.com/api/v1/widget"
              />
            </label>

            <label className="block space-y-1">
              <span className="text-sm font-medium text-slate-300">Endpoint API</span>
              <input
                type="url"
                value={settings.endpoint}
                onChange={(e) => setSettings({ ...settings, endpoint: e.target.value })}
                className="w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-white focus:border-sky-500 focus:outline-none"
                placeholder="https://api.tu-dominio.com/chat"
              />
            </label>

            <label className="block space-y-1">
              <span className="text-sm font-medium text-slate-300">Color primario</span>
              <div className="flex gap-3">
                <input
                  type="color"
                  value={settings.color}
                  onChange={(e) => setSettings({ ...settings, color: e.target.value })}
                  className="h-10 w-16 cursor-pointer rounded-lg border border-white/10"
                />
                <input
                  type="text"
                  value={settings.color}
                  onChange={(e) => setSettings({ ...settings, color: e.target.value })}
                  className="flex-1 rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-white"
                  placeholder="#0ea5e9"
                />
              </div>
            </label>

            <label className="block space-y-1">
              <span className="text-sm font-medium text-slate-300">Mensaje de bienvenida</span>
              <input
                type="text"
                value={settings.greeting}
                onChange={(e) => setSettings({ ...settings, greeting: e.target.value })}
                className="w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-white focus:border-sky-500 focus:outline-none"
                placeholder="Hola, ¿en qué puedo ayudarte?"
              />
            </label>

            <div className="flex gap-2">
              <button
                onClick={handleReset}
                className="rounded-lg border border-white/20 px-4 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800"
              >
                Reset
              </button>
              <button
                disabled={!scriptLoaded}
                className="ml-auto rounded-lg bg-sky-500 px-4 py-2 text-sm font-medium text-white hover:bg-sky-400 disabled:opacity-50"
              >
                {scriptLoaded ? "✓ Widget cargado" : "⟳ Cargando..."}
              </button>
            </div>
          </section>

          <div className="rounded-lg border border-white/10 bg-slate-900/50 p-4">
            <h3 className="text-sm font-medium text-slate-300">Vista previa:</h3>
            <p className="mt-2 text-xs text-slate-400">
              El widget debe aparecer en la esquina inferior derecha de la pantalla.
            </p>
          </div>
        </div>

        <section className="card mt-8">
          <h2 className="mb-4 text-lg font-medium text-slate-200">Debug Info</h2>
          <pre className="overflow-x-auto rounded-lg border border-white/10 bg-slate-950 p-4 text-xs text-slate-400">
            {JSON.stringify(
              {
                settings,
                widgetUrl: "https://panel.tu-dominio.com/chat-widget.js",
                timestamp: new Date().toISOString(),
              },
              null,
              2,
            )}
          </pre>
        </section>
      </div>
    </div>
  );
}
