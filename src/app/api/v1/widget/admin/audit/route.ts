import { NextRequest } from "next/server";
import { readAuditLogs } from "@/lib/widget-security";
import { errorJson, isAdminAuthorized, okJson, withCors } from "../../_utils";

export function OPTIONS(request: NextRequest) {
  return withCors(new Response(null, { status: 204 }), request.headers.get("origin") ?? undefined);
}

export async function GET(request: NextRequest) {
  const origin = request.headers.get("origin") ?? undefined;
  if (!isAdminAuthorized(request)) {
    return errorJson("Unauthorized", 401, origin);
  }

  const tenantId = request.nextUrl.searchParams.get("tenantId")?.trim() ?? undefined;
  const limitParam = request.nextUrl.searchParams.get("limit");
  const limit = limitParam ? Number(limitParam) : 50;
  const rows = readAuditLogs(tenantId, Number.isFinite(limit) ? limit : 50);

  return okJson(
    {
      count: rows.length,
      rows,
    },
    origin,
  );
}
