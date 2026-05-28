import { NextRequest, NextResponse } from "next/server";
import { normalizeWidgetDomain } from "@/lib/widget-security";

export function getClientIp(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() ?? "unknown";
  }
  return request.headers.get("x-real-ip") ?? "unknown";
}

export function getRequestDomain(request: NextRequest, bodyDomain?: string) {
  if (bodyDomain && bodyDomain.trim().length > 0) {
    return normalizeWidgetDomain(bodyDomain);
  }

  const origin = request.headers.get("origin");
  if (origin) {
    try {
      return normalizeWidgetDomain(new URL(origin).hostname);
    } catch {
      return "";
    }
  }

  return "";
}

export function withCors(response: Response, origin?: string) {
  if (origin) {
    response.headers.set("Access-Control-Allow-Origin", origin);
  } else {
    response.headers.set("Access-Control-Allow-Origin", "*");
  }
  response.headers.set("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Widget-Nonce, X-Admin-Key");
  response.headers.set("Vary", "Origin");
  return response;
}

export function okJson<T>(payload: T, origin?: string) {
  return withCors(NextResponse.json(payload), origin);
}

export function errorJson(message: string, status: number, origin?: string, details?: Record<string, unknown>) {
  return withCors(
    NextResponse.json(
      {
        error: message,
        ...(details ?? {}),
      },
      { status },
    ),
    origin,
  );
}

export function isAdminAuthorized(request: NextRequest) {
  const expected = process.env.WIDGET_ADMIN_KEY ?? "dev-admin-key";
  const provided = request.headers.get("x-admin-key");
  return Boolean(provided && provided === expected);
}
