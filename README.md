# Fluxbot Studio IA Front

Landing frontend para vender el chatbot a clientes sin Shopify e incluir su
instalación con script embebible.

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

## Build de producción

```bash
npm run build
npm run start
```

## Snippet de instalación

El snippet se genera desde `/install`, pero este es el formato base:

```html
<script
  src="https://tu-dominio.com/chat-widget.js"
  data-token="tu-token"
  data-position="right"
  data-primary-color="#0ea5e9"
  data-greeting="Hola, ¿en qué te ayudo?"
  data-endpoint="https://api.tu-dominio.com/chat"
  defer
></script>
```

Pégalo antes de `</body>` en tu sitio.

## Deploy

Recomendado: Vercel para la landing y CDN/hosting estático para el script del
widget.
