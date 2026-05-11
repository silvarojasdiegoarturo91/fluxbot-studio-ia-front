# FluxBot External Widget — Rules for AI Agents

Este repo forma parte de la familia FluxBot Studio y **NO contiene backend de negocio**.

## Repos de la familia

- `fluxbot-studio-ia`: Admin Shopify, dashboard, configuración
- `fluxbot-studio-back-ia`: Backend central, IA, RAG, tenants, tokens, conversaciones, **fuente única de verdad**
- `fluxbot-studio-contracts`: Contratos OpenAPI compartidos
- **Este repo**: Widget embebible externo para webs sin Shopify

## Fuente de verdad

**Contrato oficial:** `contracts/fluxbot-widget-api.v1.yaml`

Si algo no está en el contrato, no existe en este repo.

## Prohibido (no implementar aquí)

- ❌ Crear endpoints backend nuevos
- ❌ Crear base de datos propia
- ❌ Crear modelos de Tenant, Usuario, Conversación, Mensaje
- ❌ Simular lógica real si existe en `fluxbot-studio-back-ia`
- ❌ Inventar request/response payloads
- ❌ Duplicar interfaces manualmente si existen en tipos generados
- ❌ Cambiar `data-endpoint` para apuntar a servicios inventados
- ❌ Crear lógica de autenticación de tokens (eso es del backend)
- ❌ Crear gestión de dominios permitidos (eso es del backend)
- ❌ Crear rate limit local (eso es del backend)
- ❌ Crear persistencia de conversaciones (eso es del backend)

## Permitido (implementar aquí)

- ✅ Mejorar el loader del widget (lectura de data-* atributos)
- ✅ Mejorar UI/UX del chat (renderizado, estilos, transiciones)
- ✅ Añadir retry, timeout, abort controller en client HTTP
- ✅ Añadir persistencia en sessionStorage (sesión visual)
- ✅ Añadir accesibilidad (WCAG, aria, focus, teclado)
- ✅ Añadir presets de instalación (HTML, WordPress, Webflow, React)
- ✅ Consumir backend mediante cliente generado desde OpenAPI
- ✅ Añadir tests de contrato contra mocks generados desde OpenAPI
- ✅ Mejorar telemetría/logs (observabilidad, no recolectar datos de usuario)

## Regla principal

**Si una funcionalidad requiere:**
- Datos (usuario, tenant, etc.)
- Persistencia (conversaciones, historial)
- Gestión de tokens
- Allowlist de dominios
- Rate limit
- RAG o IA
- Onboarding/signup

**Entonces:**
1. Revisar primero `contracts/fluxbot-widget-api.v1.yaml`
2. Si no existe en el contrato → proponer cambio en `fluxbot-studio-contracts`
3. **NO implementarlo localmente en este repo**

## Flujo de cambios

### Cambio A: Mejora visual del widget
```
Tarea: "Mejorar UI del chat"
  ↓
Modificar: src/widget/ui.ts
  ↓
Tests: npm run test
  ↓
Lint: npm run lint
  ↓
Commit
  ↓
Done
```

### Cambio B: Nuevo campo en respuesta (ej: suggestedActions)
```
Tarea: "Soportar suggestedActions en respuesta IA"
  ↓
1. fluxbot-studio-contracts
   Modificar: fluxbot-widget-api.v1.yaml (agregar field)
   Tests: validación de schema
   Commit
  ↓
2. fluxbot-studio-back-ia
   Modificar: endpoint para devolver suggestedActions
   Tests: contrato
   Commit
  ↓
3. fluxbot-external-widget
   Ejecutar: npm run api:sync
   Modificar: src/widget/ui.ts (renderizar field)
   Tests: npm run test
   Lint: npm run lint
   Commit
```

## Antes de implementar cualquier cosa

1. **Registra en OpenSpec** como requisito en este repo
2. **Ejecuta `npm run api:sync`** para sincronizar contrato
3. **Genera tipos/cliente** con `npm run api:generate`
4. **Implementa usando únicamente** el cliente/tipos generados
5. **No inventes request/response**
6. **No dupliques interfaces**
7. **Si falta algo en el contrato** → STOP y propone cambio en `fluxbot-studio-contracts`
8. Si necesitas persistencia/auth/tenant/RAG → **Va en `fluxbot-studio-back-ia`, no aquí**
9. **Ejecuta `npm run qa:gate`** antes de cerrar (contracts:pull + typecheck + lint + test)

## Frase que governa todo

> El widget externo no sabe cómo funciona FluxBot por dentro.  
> Solo sabe hablar con FluxBot mediante un contrato versionado.

Si dudas, esta frase te dice si algo debe estar aquí o en otro repo.
