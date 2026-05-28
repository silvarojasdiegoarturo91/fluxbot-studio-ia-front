import { NextRequest } from "next/server";
import { getTenantById, updateTenantTraining } from "@/lib/widget-security";
import { errorJson, isAdminAuthorized, okJson, withCors } from "../../_utils";

type TrainingUpdatePayload = {
  purpose?: string;
  allowedDomains?: string[];
  allowedTopics?: string[];
  blockedTopics?: string[];
  fallbackMessage?: string;
  knowledgeBase?: Array<{
    id: string;
    keywords: string[];
    answer: string;
  }>;
  minuteRateLimit?: number;
  dailyQuota?: number;
};

function getTenantId(request: NextRequest) {
  return request.nextUrl.searchParams.get("tenantId")?.trim() ?? "";
}

export function OPTIONS(request: NextRequest) {
  return withCors(new Response(null, { status: 204 }), request.headers.get("origin") ?? undefined);
}

export async function GET(request: NextRequest) {
  const origin = request.headers.get("origin") ?? undefined;
  if (!isAdminAuthorized(request)) {
    return errorJson("Unauthorized", 401, origin);
  }

  const tenantId = getTenantId(request);
  if (!tenantId) {
    return errorJson("tenantId is required", 400, origin);
  }

  const tenant = getTenantById(tenantId);
  if (!tenant) {
    return errorJson("Tenant not found", 404, origin);
  }

  return okJson(
    {
      tenantId: tenant.tenantId,
      purpose: tenant.purpose,
      allowedDomains: tenant.allowedDomains,
      allowedTopics: tenant.allowedTopics,
      blockedTopics: tenant.blockedTopics,
      fallbackMessage: tenant.fallbackMessage,
      knowledgeBase: tenant.knowledgeBase,
      minuteRateLimit: tenant.minuteRateLimit,
      dailyQuota: tenant.dailyQuota,
    },
    origin,
  );
}

export async function PUT(request: NextRequest) {
  const origin = request.headers.get("origin") ?? undefined;
  if (!isAdminAuthorized(request)) {
    return errorJson("Unauthorized", 401, origin);
  }

  const tenantId = getTenantId(request);
  if (!tenantId) {
    return errorJson("tenantId is required", 400, origin);
  }

  let body: TrainingUpdatePayload;
  try {
    body = (await request.json()) as TrainingUpdatePayload;
  } catch {
    return errorJson("Invalid JSON body", 400, origin);
  }

  if (body.allowedTopics && body.allowedTopics.length === 0) {
    return errorJson("allowedTopics cannot be empty", 400, origin);
  }
  if (body.minuteRateLimit && body.minuteRateLimit < 1) {
    return errorJson("minuteRateLimit must be >= 1", 400, origin);
  }
  if (body.dailyQuota && body.dailyQuota < 1) {
    return errorJson("dailyQuota must be >= 1", 400, origin);
  }

  const updated = updateTenantTraining(tenantId, body);
  if (!updated) {
    return errorJson("Tenant not found", 404, origin);
  }

  return okJson(
    {
      success: true,
      tenantId: updated.tenantId,
      updatedAt: new Date().toISOString(),
      config: {
        purpose: updated.purpose,
        allowedDomains: updated.allowedDomains,
        allowedTopics: updated.allowedTopics,
        blockedTopics: updated.blockedTopics,
        fallbackMessage: updated.fallbackMessage,
        knowledgeBase: updated.knowledgeBase,
        minuteRateLimit: updated.minuteRateLimit,
        dailyQuota: updated.dailyQuota,
      },
    },
    origin,
  );
}
