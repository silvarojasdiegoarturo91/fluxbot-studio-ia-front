import { NextRequest } from "next/server";
import { getTenantByInstallToken, normalizeWidgetDomain } from "@/lib/widget-security";
import { errorJson, okJson, withCors } from "../_utils";

type ConnectionTestPayload = {
  token?: string;
  endpoint?: string;
  domain?: string;
};

export function OPTIONS(request: NextRequest) {
  return withCors(new Response(null, { status: 204 }), request.headers.get("origin") ?? undefined);
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin") ?? undefined;

  let body: ConnectionTestPayload;
  try {
    body = (await request.json()) as ConnectionTestPayload;
  } catch {
    return errorJson("Invalid JSON body", 400, origin);
  }

  const token = body.token?.trim() ?? "";
  const endpoint = body.endpoint?.trim() ?? "";
  const domain = normalizeWidgetDomain(body.domain ?? "");

  if (!token || !endpoint || !domain) {
    return errorJson("Missing required fields", 400, origin);
  }

  let parsedEndpoint: URL;
  try {
    parsedEndpoint = new URL(endpoint);
  } catch {
    return errorJson("Invalid endpoint", 400, origin);
  }
  if (parsedEndpoint.protocol !== "https:" && parsedEndpoint.hostname !== "localhost") {
    return errorJson("Endpoint must use HTTPS", 400, origin);
  }

  const tenant = getTenantByInstallToken(token);
  if (!tenant) {
    return errorJson("Token inválido", 401, origin);
  }

  if (!tenant.allowedDomains.includes(domain)) {
    return errorJson("Dominio no autorizado", 403, origin, {
      allowedDomains: tenant.allowedDomains,
    });
  }

  return okJson(
    {
      valid: true,
      tenantId: tenant.tenantId,
      domain,
      endpoint: parsedEndpoint.origin,
      timestamp: new Date().toISOString(),
      policy: {
        purpose: tenant.purpose,
        allowedTopics: tenant.allowedTopics,
      },
    },
    origin,
  );
}
