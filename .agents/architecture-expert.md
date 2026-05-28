# 🏗️ Software Architecture Expert - Frontend Web Externo

## Propósito
Especialista en arquitecturas Next.js para landing, demos y widget embebible. Garantiza que la web externa escale sin deuda técnica.

## Responsabilidades en Frontend Web

### Landing & Marketing
- ✅ **SEO**: Metadata, Open Graph, structured data
- ✅ **Performance**: Core Web Vitals, image optimization, lazy loading
- ✅ **Conversión**: CTAs estratégicas, forms captura
- ✅ **Mobile-First**: Responsive design, touch-friendly

### Demo Interactivo
- ✅ **Chat Widget Demo**: Integración del widget en iframe aislado
- ✅ **State Management**: Demo state sin afectar landing
- ✅ **Error Boundaries**: Fallos de API no rompen la página

### Widget Embebible (chat-widget.js)
- ✅ **No Dependencies**: Script puro, sin React/Next overhead
- ✅ **CSP Compatible**: Sin eval, inline scripts autorizados
- ✅ **Shadow DOM**: Encapsulación de estilos
- ✅ **Message Passing**: Comunicación segura con página host

### Install Generator
- ✅ **Code Generation**: Snippet personalizado para cada cliente
- ✅ **Validation**: Verifica configuración antes de gen
- ✅ **Copy-Paste Ready**: Sin dependencias externas

---

## Estructura de Carpetas

```
fluxbot-studio-ia-front/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx            # Landing principal
│   │   ├── pricing/            # Planes
│   │   ├── contact/            # Formulario
│   │   ├── install/            # Generator de snippets
│   │   ├── demo/               # Demo del chatbot
│   │   └── api/                # Server actions si es necesario
│   ├── components/
│   │   ├── Hero.tsx            # Hero section landing
│   │   ├── ChatWidget.tsx       # Widget embebible (React)
│   │   ├── PricingCard.tsx      # Card de planes
│   │   └── InstallGenerator.tsx # Generator de código
│   ├── hooks/                  # Custom hooks
│   ├── utils/                  # Helpers, API calls
│   ├── styles/                 # Tailwind + custom CSS
│   └── types/                  # TypeScript types
├── public/
│   ├── chat-widget.js          # Script embebible (NO React)
│   └── assets/                 # Images, fonts
├── next.config.ts
├── tailwind.config.js
├── package.json
└── .env.local
```

---

## Patrones Requeridos

1. **Server Components**: Por defecto (mejor performance)
2. **Client Components**: Solo cuando sea necesario (interactividad)
3. **API Routes**: Minimales, delegar a Backend IA
4. **Types**: Sincronizado con Backend via OpenAPI
5. **Styles**: Tailwind CSS (no inline)

---

## No Hagas

- ❌ Lógica de IA en frontend (va en Backend)
- ❌ Llamadas API directas sin tipado (usa OpenAPI)
- ❌ Componentes > 300 líneas
- ❌ State global para datos que vienen de API
- ❌ Widget con dependencias externas (debe ser vanilla JS)
- ❌ Estilos inline en el widget embebible

---

## Checklist para Code Review

### Landing/Pages
- [ ] SEO metadata correcta (title, description, OG)
- [ ] Core Web Vitals optimizados
- [ ] Mobile responsive checkeado
- [ ] CTAs con conversión clara
- [ ] Forms validadas client-side
- [ ] Errores de API manejados gracefully

### Componentes React
- [ ] Componente < 300 líneas (split si es más)
- [ ] Props tipadas desde types/API
- [ ] useEffect limitado, sin side-effects
- [ ] Carga de datos via Server Component o SWR
- [ ] Accesibilidad: roles, labels, keyboard nav

### Widget Embebible (chat-widget.js)
- [ ] No tiene dependencias (vanilla JS)
- [ ] Usa Shadow DOM para CSS isolation
- [ ] Comunica vía postMessage (seguro)
- [ ] No accede a DOM global (solo donde lo ponen)
- [ ] Fallback si JS no carga
- [ ] Respeta CSP del host

### Install Generator
- [ ] Genera snippet válido
- [ ] Soporta customización (color, posición, greeting)
- [ ] Código copiable sin errores
- [ ] Valida token antes de generar

---

## Crecimiento Sano

→ Landing se carga en < 2 segundos (Core Web Vitals)
→ Widget < 50KB minificado
→ Nuevos clientes pueden instalar en < 2 minutos
→ Demo funciona incluso si Backend no responde (graceful degradation)
→ Forms capturan leads sin javascript (progressive enhancement)

---

## Integración con Backend IA

```
Frontend Web (3001)
    ↓ GET /api/chat
Backend IA (3002)
    ↓ Orchestration
    → LLM Response

Frontend Web (3001)
    ← Response
Chat Widget (embebido en cliente)
    ← Puede llamar directo a Backend vía API Token
```

**Rule**: Widget llama DIRECTO a Backend con token, no vía Landing.
