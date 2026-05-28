# Tutorial: instalar el widget externo de Fluxbot

Este tutorial explica cómo instalar el widget en cualquier web que **no use Shopify**.

## 1. Requisitos

Necesitas:

- URL pública del script del widget (`chat-widget.js`)
- (Opcional) endpoint de backend para respuestas reales
- token de autenticación (si tu endpoint lo requiere)

## 2. Copia el snippet base

Pega este bloque justo antes de `</body>` en tu página:

```html
<script
  src="https://TU-DOMINIO.com/chat-widget.js"
  data-token="tu-token"
  data-domain="tuweb.com"
  data-gateway="https://TU-DOMINIO.com/api/v1/widget"
  data-security-mode="gateway"
  data-position="right"
  data-primary-color="#0ea5e9"
  data-greeting="Hola, ¿en qué te ayudo?"
  data-title="Asistente Fluxbot"
  defer
></script>
```

## 3. Parámetros disponibles (`data-*`)

| Parámetro | Obligatorio | Ejemplo | Descripción |
|---|---|---|---|
| `src` | Sí | `https://TU-DOMINIO.com/chat-widget.js` | URL del script |
| `data-token` | No | `abc123` | Se envía como `Authorization: Bearer <token>` |
| `data-domain` | Sí | `miweb.com` | Dominio autorizado para este widget |
| `data-gateway` | Sí (modo seguro) | `https://panel.tu-dominio.com/api/v1/widget` | Gateway de seguridad |
| `data-security-mode` | No | `gateway` / `direct` | `gateway` recomendado |
| `data-position` | No | `right` / `left` | Lado donde aparece el botón |
| `data-primary-color` | No | `#0ea5e9` | Color principal del widget |
| `data-greeting` | No | `Hola, ¿en qué te ayudo?` | Mensaje inicial |
| `data-title` | No | `Asistente Fluxbot` | Título en la cabecera del chat |
| `data-endpoint` | No | `https://api.tu-dominio.com/chat` | API para respuestas reales |

Si usas `data-security-mode="gateway"`, el widget primero crea sesión efímera y luego envía mensajes al endpoint `/chat` del gateway.

## 4. Contrato esperado del endpoint

El widget envía:

```json
{
  "message": "texto del usuario"
}
```

Con headers:

- `Content-Type: application/json`
- `Authorization: Bearer <token>` (solo si `data-token` tiene valor)

Tu endpoint debe responder `200` con alguno de estos campos:

```json
{
  "reply": "respuesta del bot"
}
```

o

```json
{
  "message": "respuesta del bot"
}
```

## 5. Ejemplos por tipo de web

### HTML plano

Edita tu `index.html` y pega el snippet antes de `</body>`.

### WordPress

1. Ve a **Apariencia > Editor de temas** o usa un plugin de “Header/Footer scripts”.
2. Inserta el snippet en el bloque de scripts del footer.
3. Guarda y limpia caché.

### Webflow / Wix / similares

1. Abre la configuración de código personalizado.
2. Pega el snippet en `Footer`.
3. Publica de nuevo el sitio.

## 6. Verificación rápida

1. Abre tu web publicada.
2. Debe aparecer un botón flotante 💬.
3. Haz clic, envía un mensaje y confirma respuesta.
4. Si usas endpoint, valida en la pestaña **Network** que el `POST` responde `200`.

## 7. Problemas comunes

### No aparece el botón

- Revisa que `src` sea accesible públicamente.
- Verifica que el snippet está antes de `</body>`.
- Comprueba errores en consola del navegador.

### Responde “No se pudo conectar al endpoint configurado”

- Confirma que `data-endpoint` está bien escrito.
- Revisa CORS en tu API.
- Verifica que el endpoint devuelve `200` y JSON válido.

### El token no llega

- Asegúrate de haber definido `data-token`.
- Revisa en Network el header `Authorization`.

## 8. Recomendaciones de producción

- Sirve `chat-widget.js` desde HTTPS y CDN.
- Versiona el script (`chat-widget.v1.js`) para despliegues seguros.
- Monitorea errores del endpoint y latencia.
- Añade rate limit en tu API si el widget es público.
- Define `WIDGET_SESSION_SECRET` y `WIDGET_ADMIN_KEY` en entorno seguro.
