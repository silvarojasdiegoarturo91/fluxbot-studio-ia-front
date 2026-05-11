import { NextResponse, NextRequest } from "next/server";

interface ConnectionTestPayload {
  token: string;
  endpoint: string;
  domain: string;
}

interface ConnectionTestResponse {
  valid: boolean;
  domain: string;
  timestamp: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ConnectionTestPayload = await request.json();
    const { token, endpoint, domain } = body;

    if (!token || !endpoint || !domain) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate token format (basic check)
    if (!token.startsWith("tk_") && token.length < 10) {
      return NextResponse.json({ error: "Token inválido" }, { status: 401 });
    }

    // Validate domain format
    try {
      new URL(`https://${domain}`);
    } catch {
      return NextResponse.json({ error: "Dominio inválido" }, { status: 400 });
    }

    // Validate endpoint URL
    try {
      new URL(endpoint);
    } catch {
      return NextResponse.json(
        { error: "Endpoint inválido" },
        { status: 400 }
      );
    }

    // Mock validation - in production, this would call your backend
    const response: ConnectionTestResponse = {
      valid: true,
      domain: domain,
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Connection test error:", error);
    return NextResponse.json(
      { error: "Error del servidor" },
      { status: 500 }
    );
  }
}
