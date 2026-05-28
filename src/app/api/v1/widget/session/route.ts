import { NextRequest } from "next/server";
import { createSessionToken } from "@/lib/widget-security";
import { errorJson, getRequestDomain, okJson, withCors } from "../_utils";

type SessionPayload = {
  token?: string;
  domain?: string;
};

export function OPTIONS(request: NextRequest) {
  return withCors(new Response(null, { status: 204 }), request.headers.get("origin") ?? undefined);
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin") ?? undefined;
  let body: SessionPayload;
  try {
    body = (await request.json()) as SessionPayload;
  } catch {
    return errorJson("Invalid JSON body", 400, origin);
  }

  if (!body.token) {
    return errorJson("Missing token", 400, origin);
  }

  const domain = getRequestDomain(request, body.domain);
  if (!domain) {
    return errorJson("Missing or invalid domain", 400, origin);
  }

  const sessionResult = createSessionToken({
    installToken: body.token,
    domain,
  });

  if ("error" in sessionResult) {
    if (sessionResult.error === "INVALID_TOKEN") {
      return errorJson("Invalid token", 401, origin);
    }
    if (sessionResult.error === "DOMAIN_NOT_ALLOWED") {
      return errorJson("Domain not allowed", 403, origin);
    }
    return errorJson("Cannot create session", 500, origin);
  }

  return okJson(
    {
      sessionToken: sessionResult.token,
      expiresIn: sessionResult.expiresIn,
      tenantId: sessionResult.tenantId,
      purpose: sessionResult.purpose,
      allowedTopics: sessionResult.allowedTopics,
    },
    origin,
  );
}
