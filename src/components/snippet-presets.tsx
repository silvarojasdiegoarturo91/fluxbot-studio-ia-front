"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics";

type PresetType = "html" | "wordpress" | "webflow" | "react" | "nextjs" | "netlify" | "vercel";

interface PresetSnippet {
  label: string;
  description: string;
  content: string;
  format: "html" | "javascript" | "env" | "markdown";
}

function getPreset(type: PresetType, domain: string, token: string): PresetSnippet {
  const scriptUrl = typeof window !== "undefined" ? `${window.location.origin}/chat-widget.js` : "https://tu-dominio.com/chat-widget.js";

  const presets: Record<PresetType, PresetSnippet> = {
    html: {
      label: "HTML estático",
      description: "Copiar y pegar directamente en tu HTML",
      format: "html",
      content: `<!-- Fluxbot Chat Widget -->
<script
  src="${scriptUrl}"
  data-token="${token}"
  data-domain="${domain}"
  data-api-version="v1"
  data-tenant-mode="external"
  data-position="right"
  data-primary-color="#0ea5e9"
  data-greeting="Hola, ¿en qué puedo ayudarte?"
  defer
></script>`,
    },
    wordpress: {
      label: "WordPress",
      description: "Usar plugin Code Snippets o pegar en functions.php",
      format: "javascript",
      content: `// Opción 1: Usando Code Snippets plugin (recomendado)
// 1. Instala "Code Snippets" desde WordPress.org
// 2. Crear nuevo snippet y pega este código:

add_action('wp_footer', 'add_fluxbot_widget');
function add_fluxbot_widget() {
    ?>
    <!-- Fluxbot Chat Widget -->
    <script
      src="${scriptUrl}"
      data-token="${token}"
      data-domain="${domain}"
      data-api-version="v1"
      data-tenant-mode="external"
      data-position="right"
      defer
    ></script>
    <?php
}

// Opción 2: En functions.php de tu tema
// Añade el código anterior al final de wp-content/themes/tu-tema/functions.php`,
    },
    webflow: {
      label: "Webflow",
      description: "Embed custom en el footer",
      format: "html",
      content: `<!-- Fluxbot Chat Widget -->
<!-- 1. Ve a Proyecto Settings > Custom Code > Footer Code -->
<!-- 2. Pega este script: -->
<script
  src="${scriptUrl}"
  data-token="${token}"
  data-domain="${domain}"
  data-api-version="v1"
  data-tenant-mode="external"
  data-position="right"
  defer
></script>
<!-- 3. Publica los cambios -->`,
    },
    react: {
      label: "React",
      description: "Usar useEffect en tu layout o componente principal",
      format: "javascript",
      content: `import { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "${scriptUrl}";
    script.setAttribute('data-token', '${token}');
    script.setAttribute('data-domain', '${domain}');
    script.setAttribute('data-api-version', 'v1');
    script.setAttribute('data-tenant-mode', 'external');
    script.setAttribute('data-position', 'right');
    script.defer = true;
    
    document.body.appendChild(script);
    
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <div>
      {/* Tu contenido aquí */}
    </div>
  );
}`,
    },
    nextjs: {
      label: "Next.js",
      description: "En tu layout.tsx con Script de Next.js",
      format: "javascript",
      content: `import Script from 'next/script';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        {children}
        <Script
          src="${scriptUrl}"
          data-token="${token}"
          data-domain="${domain}"
          data-api-version="v1"
          data-tenant-mode="external"
          data-position="right"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}`,
    },
    netlify: {
      label: "Netlify",
      description: "Usar Netlify Build Plugin (próximamente)",
      format: "markdown",
      content: `# Netlify Integration (Próximamente)

Por ahora, usa el método HTML estático en tu archivo base.

Esperado en futuras versiones:
- Netlify Edge Functions para validación de token
- Build plugin para inyección automática
- Netlify Analytics integración`,
    },
    vercel: {
      label: "Vercel",
      description: "Variables de entorno + Next.js Script",
      format: "env",
      content: `# 1. En Vercel Dashboard > Settings > Environment Variables
# Añade estas variables:
NEXT_PUBLIC_FLUXBOT_TOKEN=${token}
NEXT_PUBLIC_FLUXBOT_DOMAIN=${domain}
NEXT_PUBLIC_FLUXBOT_API_VERSION=v1

# 2. En tu layout.tsx:
import Script from 'next/script';

export default function RootLayout() {
  return (
    <html>
      <body>
        <Script
          src="/chat-widget.js"
          data-token={process.env.NEXT_PUBLIC_FLUXBOT_TOKEN}
          data-domain={process.env.NEXT_PUBLIC_FLUXBOT_DOMAIN}
          data-api-version={process.env.NEXT_PUBLIC_FLUXBOT_API_VERSION}
          data-tenant-mode="external"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}`,
    },
  };

  return presets[type];
}

interface SnippetPresetsProps {
  domain?: string;
  token?: string;
}

export function SnippetPresets({ domain = "example.com", token = "your-token-here" }: SnippetPresetsProps) {
  const [activePreset, setActivePreset] = useState<PresetType>("html");
  const [copied, setCopied] = useState(false);

  const presets: PresetType[] = ["html", "wordpress", "webflow", "react", "nextjs", "netlify", "vercel"];
  const current = getPreset(activePreset, domain, token);

  const copySnippet = async () => {
    await navigator.clipboard.writeText(current.content);
    setCopied(true);
    trackEvent("snippet_preset_copied", { preset: activePreset });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {presets.map((preset) => (
          <button
            key={preset}
            onClick={() => setActivePreset(preset)}
            className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              activePreset === preset
                ? "bg-sky-500 text-white"
                : "border border-white/10 bg-slate-900 text-slate-300 hover:bg-slate-800"
            }`}
            aria-pressed={activePreset === preset}
          >
            {preset === "nextjs" ? "Next.js" : preset.charAt(0).toUpperCase() + preset.slice(1)}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        <div>
          <h4 className="text-sm font-medium text-slate-200">{current.label}</h4>
          <p className="text-xs text-slate-400">{current.description}</p>
        </div>

        <pre className="overflow-x-auto rounded-xl border border-white/10 bg-slate-950 p-4 text-xs text-slate-200">
          <code>{current.content}</code>
        </pre>

        <button
          type="button"
          onClick={copySnippet}
          className="rounded-lg bg-sky-500 px-3 py-2 text-sm font-medium text-white hover:bg-sky-400 disabled:opacity-50"
          aria-label="Copy code snippet"
        >
          {copied ? "✓ Copiado" : "Copiar"}
        </button>
      </div>
    </div>
  );
}
