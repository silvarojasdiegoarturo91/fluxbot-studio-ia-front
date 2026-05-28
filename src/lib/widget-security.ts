import crypto from "node:crypto";

export type TenantTrainingConfig = {
  tenantId: string;
  installToken: string;
  allowedDomains: string[];
  purpose: string;
  allowedTopics: string[];
  blockedTopics: string[];
  fallbackMessage: string;
  knowledgeBase: Array<{
    id: string;
    keywords: string[];
    answer: string;
  }>;
  minuteRateLimit: number;
  dailyQuota: number;
};

type WidgetSession = {
  sessionId: string;
  tenantId: string;
  domain: string;
  expiresAt: number;
  nonces: Set<string>;
};

export type PolicyDecision = {
  inScope: boolean;
  reason: string;
  confidence: number;
  matchedTopics: string[];
  blockedByPolicy: boolean;
};

type AuditLog = {
  tenantId: string;
  domain: string;
  message: string;
  inScope: boolean;
  blockedByPolicy: boolean;
  reason: string;
  ts: number;
  ip: string;
};

const DEV_SECRET = "dev-widget-session-secret-change-in-production";
const sessionSecret = process.env.WIDGET_SESSION_SECRET ?? DEV_SECRET;

const tenants = new Map<string, TenantTrainingConfig>([
  [
    "tenant_demo",
    {
      tenantId: "tenant_demo",
      installToken: "tk_demo_fluxbot_123456",
      allowedDomains: ["localhost", "127.0.0.1", "example.com"],
      purpose:
        "Asistente comercial para resolver preguntas sobre instalación, planes, soporte y demo del chatbot Fluxbot.",
      allowedTopics: [
        "chatbot",
        "instalacion",
        "instalar",
        "widget",
        "precios",
        "planes",
        "demo",
        "soporte",
      ],
      blockedTopics: [
        "politica",
        "religion",
        "hack",
        "malware",
        "violencia",
        "sexual",
      ],
      fallbackMessage:
        "No estoy diseñado para ese fin. Puedo ayudarte con instalación, precios, demo y soporte del chatbot.",
      knowledgeBase: [
        {
          id: "kb_install",
          keywords: ["instalar", "instalacion", "codigo", "script", "html"],
          answer:
            "Para instalar el widget, copia el snippet y pégalo antes de </body>. Si quieres te guío paso a paso.",
        },
        {
          id: "kb_pricing",
          keywords: ["precio", "precios", "plan", "planes", "coste"],
          answer: "Tenemos planes desde 29€/mes. Te recomiendo revisar la sección de precios para comparar opciones.",
        },
        {
          id: "kb_demo",
          keywords: ["demo", "prueba", "test"],
          answer: "Puedes solicitar una demo guiada desde el formulario de contacto para activar una prueba personalizada.",
        },
      ],
      minuteRateLimit: 20,
      dailyQuota: 500,
    },
  ],
]);

const sessions = new Map<string, WidgetSession>();
const minuteBuckets = new Map<string, number[]>();
const dailyUsage = new Map<string, { day: string; count: number }>();
const auditLogs: AuditLog[] = [];

const jailbreakPatterns: RegExp[] = [
  /ignora (todas )?las instrucciones/i,
  /actua como/i,
  /jailbreak/i,
  /system prompt/i,
  /bypass/i,
  /hazme un malware/i,
  /como hackear/i,
];

function normalizeDomain(rawDomain: string) {
  const domain = rawDomain.trim().toLowerCase().replace(/^https?:\/\//, "").replace(/\/.*$/, "");
  return domain;
}

function base64UrlEncode(value: string) {
  return Buffer.from(value).toString("base64url");
}

function base64UrlDecode(value: string) {
  return Buffer.from(value, "base64url").toString("utf8");
}

function signPayload(payloadBase64: string) {
  return crypto.createHmac("sha256", sessionSecret).update(payloadBase64).digest("base64url");
}

function safeEqual(a: string, b: string) {
  const aBuffer = Buffer.from(a);
  const bBuffer = Buffer.from(b);
  if (aBuffer.length !== bBuffer.length) {
    return false;
  }
  return crypto.timingSafeEqual(aBuffer, bBuffer);
}

export function getTenantByInstallToken(installToken: string) {
  for (const tenant of tenants.values()) {
    if (tenant.installToken === installToken) {
      return tenant;
    }
  }
  return null;
}

export function getTenantById(tenantId: string) {
  return tenants.get(tenantId) ?? null;
}

export function updateTenantTraining(
  tenantId: string,
  update: Partial<Omit<TenantTrainingConfig, "tenantId" | "installToken">>,
) {
  const tenant = tenants.get(tenantId);
  if (!tenant) {
    return null;
  }

  const next: TenantTrainingConfig = {
    ...tenant,
    ...update,
    allowedDomains: update.allowedDomains ? [...new Set(update.allowedDomains.map(normalizeDomain))] : tenant.allowedDomains,
    allowedTopics: update.allowedTopics ? update.allowedTopics.map((topic) => topic.toLowerCase()) : tenant.allowedTopics,
    blockedTopics: update.blockedTopics ? update.blockedTopics.map((topic) => topic.toLowerCase()) : tenant.blockedTopics,
  };

  tenants.set(tenantId, next);
  return next;
}

export function createSessionToken(input: {
  installToken: string;
  domain: string;
  ttlSeconds?: number;
}) {
  const tenant = getTenantByInstallToken(input.installToken);
  if (!tenant) {
    return { error: "INVALID_TOKEN" as const };
  }

  const domain = normalizeDomain(input.domain);
  if (!tenant.allowedDomains.includes(domain)) {
    return { error: "DOMAIN_NOT_ALLOWED" as const };
  }

  const now = Date.now();
  const ttlSeconds = input.ttlSeconds ?? 600;
  const sessionId = crypto.randomUUID();
  const payload = {
    sid: sessionId,
    tid: tenant.tenantId,
    dom: domain,
    iat: now,
    exp: now + ttlSeconds * 1000,
  };
  const payloadBase64 = base64UrlEncode(JSON.stringify(payload));
  const signature = signPayload(payloadBase64);
  const token = `${payloadBase64}.${signature}`;

  sessions.set(sessionId, {
    sessionId,
    tenantId: tenant.tenantId,
    domain,
    expiresAt: payload.exp,
    nonces: new Set<string>(),
  });

  return {
    token,
    expiresIn: ttlSeconds,
    tenantId: tenant.tenantId,
    purpose: tenant.purpose,
    allowedTopics: tenant.allowedTopics,
  };
}

export function verifySessionToken(token: string, domain: string) {
  const [payloadBase64, signature] = token.split(".");
  if (!payloadBase64 || !signature) {
    return { error: "INVALID_SESSION_TOKEN" as const };
  }

  const expectedSignature = signPayload(payloadBase64);
  if (!safeEqual(signature, expectedSignature)) {
    return { error: "INVALID_SIGNATURE" as const };
  }

  const payload = JSON.parse(base64UrlDecode(payloadBase64)) as {
    sid: string;
    tid: string;
    dom: string;
    iat: number;
    exp: number;
  };

  if (Date.now() > payload.exp) {
    sessions.delete(payload.sid);
    return { error: "SESSION_EXPIRED" as const };
  }

  const session = sessions.get(payload.sid);
  if (!session || session.tenantId !== payload.tid) {
    return { error: "SESSION_NOT_FOUND" as const };
  }

  const normalizedDomain = normalizeDomain(domain);
  if (normalizedDomain !== payload.dom || normalizedDomain !== session.domain) {
    return { error: "DOMAIN_MISMATCH" as const };
  }

  return { session, tenantId: payload.tid };
}

export function consumeNonce(sessionId: string, nonce: string) {
  const session = sessions.get(sessionId);
  if (!session) {
    return { error: "SESSION_NOT_FOUND" as const };
  }
  if (!nonce || nonce.length < 8) {
    return { error: "INVALID_NONCE" as const };
  }
  if (session.nonces.has(nonce)) {
    return { error: "REPLAY_DETECTED" as const };
  }
  session.nonces.add(nonce);
  if (session.nonces.size > 200) {
    const firstValue = session.nonces.values().next().value;
    if (firstValue) {
      session.nonces.delete(firstValue);
    }
  }
  return { ok: true as const };
}

export function checkRateLimit(tenantId: string, ip: string) {
  const tenant = tenants.get(tenantId);
  if (!tenant) {
    return { error: "TENANT_NOT_FOUND" as const };
  }
  const key = `${tenantId}:${ip}`;
  const now = Date.now();
  const windowStart = now - 60_000;
  const requests = minuteBuckets.get(key) ?? [];
  const active = requests.filter((ts) => ts >= windowStart);
  if (active.length >= tenant.minuteRateLimit) {
    minuteBuckets.set(key, active);
    return { error: "RATE_LIMIT_EXCEEDED" as const, retryAfterMs: active[0] + 60_000 - now };
  }
  active.push(now);
  minuteBuckets.set(key, active);
  return { ok: true as const };
}

export function checkAndConsumeDailyQuota(tenantId: string) {
  const tenant = tenants.get(tenantId);
  if (!tenant) {
    return { error: "TENANT_NOT_FOUND" as const };
  }
  const day = new Date().toISOString().slice(0, 10);
  const usage = dailyUsage.get(tenantId);
  if (!usage || usage.day !== day) {
    dailyUsage.set(tenantId, { day, count: 1 });
    return { ok: true as const, remaining: tenant.dailyQuota - 1 };
  }
  if (usage.count >= tenant.dailyQuota) {
    return { error: "DAILY_QUOTA_EXCEEDED" as const };
  }
  usage.count += 1;
  dailyUsage.set(tenantId, usage);
  return { ok: true as const, remaining: tenant.dailyQuota - usage.count };
}

function tokenize(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .split(/[^a-z0-9]+/g)
    .filter((word) => word.length >= 3);
}

function findKnowledgeMatch(message: string, tenant: TenantTrainingConfig) {
  const tokens = new Set(tokenize(message));
  let bestScore = 0;
  let bestAnswer: string | null = null;

  for (const item of tenant.knowledgeBase) {
    const score = item.keywords.reduce((acc, keyword) => {
      return acc + (tokens.has(keyword.toLowerCase()) ? 1 : 0);
    }, 0);
    if (score > bestScore) {
      bestScore = score;
      bestAnswer = item.answer;
    }
  }

  return {
    bestScore,
    answer: bestAnswer,
  };
}

export function evaluatePolicy(message: string, tenant: TenantTrainingConfig): PolicyDecision {
  const normalizedMessage = message.toLowerCase();

  if (jailbreakPatterns.some((pattern) => pattern.test(normalizedMessage))) {
    return {
      inScope: false,
      reason: "jailbreak_detected",
      confidence: 0.99,
      matchedTopics: [],
      blockedByPolicy: true,
    };
  }

  const blockedHits = tenant.blockedTopics.filter((topic) => normalizedMessage.includes(topic));
  if (blockedHits.length > 0) {
    return {
      inScope: false,
      reason: "blocked_topic",
      confidence: 0.95,
      matchedTopics: [],
      blockedByPolicy: true,
    };
  }

  const matchedTopics = tenant.allowedTopics.filter((topic) => normalizedMessage.includes(topic));
  const kbMatch = findKnowledgeMatch(message, tenant);
  const confidence = Math.min(
    1,
    matchedTopics.length * 0.25 + (kbMatch.bestScore > 0 ? 0.4 : 0),
  );

  if (matchedTopics.length === 0 && kbMatch.bestScore === 0) {
    return {
      inScope: false,
      reason: "out_of_scope",
      confidence: 0.85,
      matchedTopics: [],
      blockedByPolicy: false,
    };
  }

  return {
    inScope: true,
    reason: "in_scope",
    confidence,
    matchedTopics,
    blockedByPolicy: false,
  };
}

export function answerInScope(message: string, tenant: TenantTrainingConfig) {
  const match = findKnowledgeMatch(message, tenant);
  if (match.answer) {
    return match.answer;
  }
  return `Estoy diseñado para ayudarte con ${tenant.allowedTopics.slice(0, 4).join(", ")}. ¿Qué necesitas?`;
}

export function recordAuditLog(log: AuditLog) {
  auditLogs.push(log);
  if (auditLogs.length > 2000) {
    auditLogs.shift();
  }
}

export function readAuditLogs(tenantId?: string, limit = 50) {
  const logs = tenantId ? auditLogs.filter((item) => item.tenantId === tenantId) : auditLogs;
  return logs.slice(-Math.max(1, Math.min(limit, 500))).reverse();
}

export function normalizeWidgetDomain(rawDomain: string) {
  return normalizeDomain(rawDomain);
}
