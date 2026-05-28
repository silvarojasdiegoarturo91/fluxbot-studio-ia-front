import { NextRequest } from "next/server";
import {
  answerInScope,
  checkAndConsumeDailyQuota,
  checkRateLimit,
  consumeNonce,
  evaluatePolicy,
  getTenantById,
  recordAuditLog,
  verifySessionToken,
} from "@/lib/widget-security";
import { errorJson, getClientIp, getRequestDomain, okJson, withCors } from "../_utils";

type ChatPayload = {
  message?: string;
  domain?: string;
};

export function OPTIONS(request: NextRequest) {
  return withCors(new Response(null, { status: 204 }), request.headers.get("origin") ?? undefined);
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin") ?? undefined;
  const authorization = request.headers.get("authorization");
  const token = authorization?.startsWith("Bearer ") ? authorization.slice("Bearer ".length) : "";
  if (!token) {
    return errorJson("Missing session token", 401, origin);
  }

  let body: ChatPayload;
  try {
    body = (await request.json()) as ChatPayload;
  } catch {
    return errorJson("Invalid JSON body", 400, origin);
  }

  const message = body.message?.trim() ?? "";
  if (message.length < 2 || message.length > 1000) {
    return errorJson("Message length must be between 2 and 1000 characters", 400, origin);
  }

  const domain = getRequestDomain(request, body.domain);
  if (!domain) {
    return errorJson("Missing or invalid domain", 400, origin);
  }

  const sessionCheck = verifySessionToken(token, domain);
  if ("error" in sessionCheck) {
    return errorJson(String(sessionCheck.error), 401, origin);
  }

  const nonce = request.headers.get("x-widget-nonce") ?? "";
  const nonceResult = consumeNonce(sessionCheck.session.sessionId, nonce);
  if ("error" in nonceResult) {
    return errorJson(String(nonceResult.error), 400, origin);
  }

  const ip = getClientIp(request);
  const rateLimitResult = checkRateLimit(sessionCheck.tenantId, ip);
  if ("error" in rateLimitResult) {
    return errorJson("Rate limit exceeded", 429, origin, {
      retryAfterMs: rateLimitResult.retryAfterMs,
    });
  }

  const dailyQuotaResult = checkAndConsumeDailyQuota(sessionCheck.tenantId);
  if ("error" in dailyQuotaResult) {
    return errorJson("Daily quota exceeded", 429, origin);
  }

  const tenant = getTenantById(sessionCheck.tenantId);
  if (!tenant) {
    return errorJson("Tenant not found", 404, origin);
  }

  const decision = evaluatePolicy(message, tenant);
  const reply = decision.inScope ? answerInScope(message, tenant) : tenant.fallbackMessage;

  recordAuditLog({
    tenantId: tenant.tenantId,
    domain,
    message,
    inScope: decision.inScope,
    blockedByPolicy: decision.blockedByPolicy,
    reason: decision.reason,
    ts: Date.now(),
    ip,
  });

  return okJson(
    {
      reply,
      policy: {
        inScope: decision.inScope,
        reason: decision.reason,
        confidence: decision.confidence,
        matchedTopics: decision.matchedTopics,
        blockedByPolicy: decision.blockedByPolicy,
        llmUsed: false,
      },
      usage: {
        dailyRemaining: dailyQuotaResult.remaining,
      },
    },
    origin,
  );
}
