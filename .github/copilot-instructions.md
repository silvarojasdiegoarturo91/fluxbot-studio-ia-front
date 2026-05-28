# Copilot Instructions — Fluxbot Studio IA Front

This is the **external widget frontend** for FluxBot Studio. Read `AGENTS.md` and `CLAUDE.md` first for architectural constraints and security boundaries.

## Quick Commands

```bash
npm run dev                # Start dev server (http://localhost:3000)
npm run build              # Production build
npm start                  # Run built app
npm run lint               # Run ESLint
npm run test               # Run Vitest (watch mode)
npm run test -- --run      # Run tests once
npm run typecheck          # TypeScript type check without emitting
npm run api:sync           # Pull contracts and regenerate types
npm run qa:gate            # Run full QA (contracts + typecheck + lint + test)
```

**Single test:** `npm run test -- --run src/lib/widget-security.test.ts`

## Architecture

### Three-Layer Frontend

1. **Landing/Marketing Pages** (`/src/app/*.tsx`)
   - `/`: Hero, benefits, demo chat, CTAs
   - `/pricing`: Plans and features
   - `/contact`: Lead capture form
   - `/install`: Snippet generator and installation guides
   - `/demo`: Widget showcase

2. **Widget Security Gateway** (`/src/app/api/v1/widget/`)
   - **`/session`** (POST) → ephemeral JWT for frontend
   - **`/chat`** (POST) → applies policy + routes to LLM/KB
   - **`/connection-test`** (POST) → validates token/domain/endpoint
   - **`/admin/training`** (GET/PUT) → API for the separate panel project
   - **`/admin/audit`** (GET) → read decision logs
   - All endpoints: CORS-enabled, rate-limited, signature-verified

3. **Embeddable Widget** (`/public/chat-widget.js`)
   - Loads into any external website via `<script>` tag
   - Fetches ephemeral session from gateway
   - Sends messages to `/chat` endpoint with nonce anti-replay
   - Falls back to demo responses if no endpoint configured
   - Configurable via `data-*` attributes (token, domain, gateway, position, color, etc.)

### Key Flows

**Installation on external site:**
```
External HTML/React/WP site
  ↓ include <script src="/chat-widget.js" data-token="..." />
  ↓
Widget boots: reads data-* config
  ↓
POST /api/v1/widget/session (get ephemeral JWT)
  ↓
POST /api/v1/widget/chat per message
  ↓ with anti-replay nonce + authorization header
  ↓
Policy engine evaluates intent/scope
  ↓
If in-scope: answer from KB/LLM
If out-of-scope: "Not designed for this"

Operational configuration lives in the panel project, not in the public site.
```

## Security Model (4-Phase Implementation)

### Phase 1: Token + Allowlist + Session
- `createSessionToken()`: ephemeral JWT (5–15 min TTL)
- Domain allowlist: token can only be used from authorized domains
- `verifySessionToken()`: signature verification + domain match

### Phase 2: Policy Engine + KB Training
- **Policy decision:** `evaluatePolicy(message, tenant)` returns `{inScope, reason, confidence}`
- **Training config:** allowed/blocked topics, purpose, fallback message, KB items
- **KB search:** find matching answers by keyword before calling LLM
- Admin endpoint to read/update training: `/admin/training?tenantId=...` (requires `x-admin-key` header)

### Phase 3: Jailbreak Detection + Rate Limit
- Regex patterns for prompt injection ("ignore instructions", "act as", "bypass")
- Rate limit by IP + tenant (configurable, default 20 req/min)
- Daily quota per tenant

### Phase 4: Audit + Anti-Replay
- Nonce consumption (`consumeNonce()`) prevents replay attacks
- Full decision audit log with tenant/domain/reason/timestamp/IP
- `/admin/audit` endpoint for compliance

## Code Organization

```
src/
├── app/
│   ├── api/v1/widget/
│   │   ├── session/route.ts              # emit ephemeral token
│   │   ├── chat/route.ts                 # policy + KB + LLM call
│   │   ├── connection-test/route.ts      # validate setup
│   │   ├── admin/
│   │   │   ├── training/route.ts         # read/update tenant config
│   │   │   └── audit/route.ts            # read decision log
│   │   ├── _utils.ts                     # CORS, IP extraction, admin check
│   ├── [page].tsx                        # landing, pricing, contact, etc.
│   ├── layout.tsx                        # root wrapper (header + footer)
│   ├── globals.css                       # tailwind + theme
│   └── sitemap.ts                        # SEO
├── components/
│   ├── site-header.tsx                   # nav
│   ├── site-footer.tsx                   # footer
│   ├── snippet-generator.tsx             # UI for token+domain+config
│   ├── snippet-presets.tsx               # presets (HTML, WP, React, Next, etc.)
│   ├── training-studio.tsx               # admin panel for policies
│   ├── contact-form.tsx                  # lead capture
│   ├── demo-chat.tsx                     # mock chat for homepage
│   └── connection-tester.tsx             # validate connection before copying
├── lib/
│   ├── widget-security.ts                # core security: session, policy, audit
│   └── analytics.ts                      # lightweight event tracking
└── public/
    └── chat-widget.js                    # embeddable script (production bundle)

tests/
├── widget-security.test.ts               # test policy engine, session creation
├── snippet-generator.test.tsx            # test snippet builder
├── connection-tester.test.tsx            # test validation logic
└── install-page.test.tsx                 # test page structure
```

## Key Conventions

### Component Size & Responsibility
- Components **< 200 lines** or clearly separated concerns
- Use descriptive names: `training-studio.tsx` not `admin.tsx`
- Props interface at top of file, no deeply nested prop drilling

### API Routes (Next.js Server Functions)
- Always export `OPTIONS` for CORS preflight
- Use `withCors()` helper to set consistent headers
- Return `errorJson(msg, status, origin)` for errors
- Return `okJson(payload, origin)` for success
- Get client IP via `getClientIp(request)` (check `x-forwarded-for` first)
- Check admin auth with `isAdminAuthorized(request)` (looks for `x-admin-key` header)

### Security Library (`src/lib/widget-security.ts`)
- **Don't duplicate** tenant config or token logic — centralized in `widget-security.ts`
- **Tenants map:** stores config per `tenantId` (hardcoded in dev, pulled from DB in prod)
- **Session signing:** `createSessionToken()` → Base64-encoded payload + HMAC-SHA256 signature
- **Verification:** `verifySessionToken()` → timing-safe comparison, expiry check, domain match
- **Policy:** `evaluatePolicy()` → returns decision object (not just true/false), confidence score, matched topics
- **Audit:** `recordAuditLog()` → append-only, in-memory in dev, persisted in prod

### TypeScript
- Strict mode enabled: `"strict": true` in `tsconfig.json`
- No `any` unless absolutely necessary (mark with `// eslint-disable-next-line @typescript-eslint/no-explicit-any`)
- Discriminated unions for error handling: `{ error: "..." } | { session: ... }`
- Extract discriminator for clarity: `if ("error" in result) { ... } else { ... }`

### Styling
- **Tailwind CSS v4** with `@tailwindcss/postcss`
- Use **design tokens** in `globals.css` (CSS variables for theme)
- `.card` class in globals for consistent modal/panel styling
- Mobile-first approach: default mobile, then `md:`, `lg:` breakpoints
- No inline styles except for dynamic values (use Tailwind classes)

### Testing
- **Vitest** with jsdom environment
- Place tests in `tests/` directory, match structure of `src/`
- Test naming: describe blocks by feature, it blocks by assertion
- Unit tests for pure functions (`widget-security.ts` logic)
- Integration tests for components (render + interaction)
- Mock external APIs and browser APIs (e.g., `crypto.randomUUID`)

### Accessibility
- Test pages at least with keyboard navigation (`Tab`, `Enter`, `Escape`)
- Use semantic HTML: `<button>`, `<form>`, `<label>`
- Add `aria-label` to icon-only buttons
- Focus management: modals trap focus, buttons visible on focus
- Test with screen reader (VoiceOver on macOS, NVDA on Windows)

## Important Files

- **`AGENTS.md`**: Boundary rules (what goes here vs. backend/contracts)
- **`CLAUDE.md`**: References to Next.js breaking changes
- **`README.md`**: Installation, snippet format, endpoints reference, sales/panel split
- **`TUTORIAL_INSTALACION_WIDGET_EXTERNO.md`**: User-facing installation guide
- **`src/lib/widget-security.ts`**: Heart of security — read before adding features
- **`.agents/config.json`**: Architecture expert agent config (scope, capabilities, review checklist)

## Common Tasks

### Add a new page
1. Create `src/app/[page]/page.tsx`
2. Export default component
3. Add to sitemap in `src/app/sitemap.ts`
4. Add to navigation in `src/components/site-header.tsx` if public
5. No need for separate route file (Next.js 16 App Router handles it)

### Modify widget security policy
1. Edit `src/lib/widget-security.ts` (policy rules, KB, audit)
2. Add tests in `tests/widget-security.test.ts`
3. Update admin endpoint logic in `src/app/api/v1/widget/admin/training/route.ts` if needed
4. Run `npm run qa:gate` before committing

### Add snippet preset (new platform)
1. Edit `src/components/snippet-presets.tsx` → add new `PresetType` and case in `getPreset()`
2. Write installation instructions for that platform
3. Add button to presets list: `presets: PresetType[] = [...]`
4. Test: verify generated snippet is valid for platform

### Update widget `data-*` attributes
1. Edit `public/chat-widget.js` → read new attribute with `currentScript.dataset.xyz`
2. Add to config object and pass through API calls if needed
3. Update snippet generator (`src/components/snippet-generator.tsx`) to display field
4. Update presets to include new attribute
5. Update docs (`README.md`, `TUTORIAL_INSTALACION_WIDGET_EXTERNO.md`)

### Test a specific feature
```bash
# Run tests for widget security
npm run test -- --run tests/widget-security.test.ts

# Run tests matching pattern
npm run test -- --run tests/ -t "policy"

# Debug: open inspector
npm run test -- --inspect --no-coverage
```

## Environment Variables

**Development (defaults in code):**
- `WIDGET_SESSION_SECRET`: JWT signing key (default: `dev-widget-session-secret-...`)
- `WIDGET_ADMIN_KEY`: admin endpoint auth (default: `dev-admin-key`)

**Production (set in CI/Vercel):**
- `WIDGET_SESSION_SECRET`: 64+ character strong key
- `WIDGET_ADMIN_KEY`: strong random key

## Deployment

- **Vercel** recommended for Next.js 16
- Set environment variables in Vercel Settings
- Script `chat-widget.js` served from CDN (Vercel default or custom CDN)
- Build command: `npm run build`
- Start command: `npm start`
- **Monitoring**: Check `npm run qa:gate` in CI before merge

## When In Doubt

1. **Is it backend logic?** (user auth, tenant DB, token storage, LLM orchestration) → Check `AGENTS.md` — likely belongs in `fluxbot-studio-back-ia`
2. **Is it a contract change?** (new response field, new endpoint) → Sync with `fluxbot-studio-contracts` first, then `npm run api:sync`
3. **Is it a security issue?** → Review `src/lib/widget-security.ts` and update accordingly; run `npm run qa:gate`
4. **Is it a visual issue?** → Check component size, add tests, ensure accessibility
5. **Stuck on build/test errors?** → Run `npm install` to ensure deps are synced, then `npm run qa:gate` to validate full pipeline

## See Also

- [Next.js 16 Docs](https://nextjs.org/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Vitest Docs](https://vitest.dev/)
- `AGENTS.md` — boundaries and architecture constraints
- `CLAUDE.md` — breaking changes in this Next.js version
