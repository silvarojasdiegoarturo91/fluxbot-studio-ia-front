# Fluxbot Studio IA Front

Landing frontend para vender el chatbot a clientes sin Shopify e incluir su
instalación con script embebible. La operativa se gestiona en un panel separado.

## Getting Started

Instala dependencias y ejecuta el proyecto:

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Estructura principal

- `/` Landing principal con propuesta de valor y demo.
- `/pricing` Página de planes.
- `/contact` Formulario de captación.
- `/install` Generador de snippet para instalar widget.
- `/demo` Demo aislada del chatbot.
- `/public/chat-widget.js` Script embebible para webs externas.

## Separación de superficies

- **Web pública:** landing, precios, contacto, demo e instalación.
- **Panel:** gestión operativa, entrenamiento, políticas, cuotas y auditoría.
- Recomendación de dominio: `panel.tu-dominio.com` o un nombre equivalente de administración.

## Build de producción

```bash
npm run build
npm run start
```

Nota: `npm run dev` y `npm run build` están configurados para usar fallback WASM de SWC con webpack por compatibilidad en entornos Linux donde el binario nativo de SWC puede fallar con `Bus error (core dumped)`.

## Snippet de instalación

El snippet se genera desde `/install`, pero este es el formato base:

```html
<script
  src="https://panel.tu-dominio.com/chat-widget.js"
  data-token="tu-token"
  data-domain="tu-dominio.com"
  data-gateway="https://panel.tu-dominio.com/api/v1/widget"
  data-security-mode="gateway"
  data-position="right"
  data-primary-color="#0ea5e9"
  data-greeting="Hola, ¿en qué te ayudo?"
  defer
></script>
```

Pégalo antes de `</body>` en tu sitio.

Tutorial completo: [`TUTORIAL_INSTALACION_WIDGET_EXTERNO.md`](./TUTORIAL_INSTALACION_WIDGET_EXTERNO.md)

## Endpoints principales

- `POST /api/v1/widget/session` → emite sesión efímera.
- `POST /api/v1/widget/chat` → aplica política y responde.
- `POST /api/v1/widget/connection-test` → valida token/dominio/endpoint.
- `GET|PUT /api/v1/widget/admin/training?tenantId=...` → API de operativa para el panel.
- `GET /api/v1/widget/admin/audit?tenantId=...` → revisar trazas.

La UI de operativa ya no se publica en esta web; se moverá al proyecto panel.

Para rutas admin, enviar header `x-admin-key` (por defecto local: `dev-admin-key`).

## Deploy

Recomendado: Vercel para la landing y CDN/hosting estático para el script del
widget.
