"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics";

interface ConnectionTesterProps {
  onValidationChange?: (isValid: boolean) => void;
}

type Status = "idle" | "testing" | "success" | "error";

interface ErrorDetail {
  code: number;
  message: string;
}

export function ConnectionTester({ onValidationChange }: ConnectionTesterProps) {
  const [token, setToken] = useState("");
  const [endpoint, setEndpoint] = useState("");
  const [domain, setDomain] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<ErrorDetail | null>(null);
  const [isValid, setIsValid] = useState(false);

  const getErrorMessage = (code: number): string => {
    switch (code) {
      case 401:
        return "Token inválido o expirado";
      case 403:
        return "Dominio no autorizado";
      case 500:
        return "Error del servidor. Intenta más tarde.";
      case 0:
        return "Error de conexión. Verifica el endpoint.";
      default:
        return `Error desconocido (${code})`;
    }
  };

  const testConnection = async () => {
    if (!token || !endpoint || !domain) {
      setError({ code: 400, message: "Completa todos los campos" });
      return;
    }

    setStatus("testing");
    setError(null);

    try {
      const response = await fetch("/api/v1/widget/connection-test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, endpoint, domain }),
      });

      if (response.ok) {
        setStatus("success");
        setIsValid(true);
        onValidationChange?.(true);
        trackEvent("connection_test_passed", { domain });
      } else {
        const code = response.status;
        setStatus("error");
        setIsValid(false);
        setError({ code, message: getErrorMessage(code) });
        onValidationChange?.(false);
        trackEvent("connection_test_failed", { domain, code });
      }
    } catch {
      setStatus("error");
      setIsValid(false);
      setError({ code: 0, message: "Error de conexión" });
      onValidationChange?.(false);
      trackEvent("connection_test_error", { domain });
    }
  };

  const reset = () => {
    setStatus("idle");
    setError(null);
    setIsValid(false);
    onValidationChange?.(false);
  };

  return (
    <div className="space-y-4 rounded-xl border border-white/10 bg-slate-900/50 p-4">
      <h3 className="text-sm font-semibold text-slate-200">Validar conexión</h3>

      <div className="grid gap-3 sm:grid-cols-3">
        <label className="space-y-1">
          <span className="text-xs text-slate-400">Token API *</span>
          <input
            type="password"
            placeholder="tk_..."
            value={token}
            onChange={(e) => setToken(e.target.value)}
            disabled={status === "testing"}
            className="w-full rounded-lg border border-white/10 bg-slate-800 px-3 py-2 text-sm text-white placeholder-slate-500 disabled:opacity-50"
            aria-label="API Token"
          />
        </label>

        <label className="space-y-1">
          <span className="text-xs text-slate-400">Dominio *</span>
          <input
            type="text"
            placeholder="example.com"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            disabled={status === "testing"}
            className="w-full rounded-lg border border-white/10 bg-slate-800 px-3 py-2 text-sm text-white placeholder-slate-500 disabled:opacity-50"
            aria-label="Domain"
          />
        </label>

        <label className="space-y-1">
          <span className="text-xs text-slate-400">Endpoint API *</span>
          <input
            type="url"
            placeholder="https://api.ejemplo.com"
            value={endpoint}
            onChange={(e) => setEndpoint(e.target.value)}
            disabled={status === "testing"}
            className="w-full rounded-lg border border-white/10 bg-slate-800 px-3 py-2 text-sm text-white placeholder-slate-500 disabled:opacity-50"
            aria-label="API Endpoint"
          />
        </label>
      </div>

      <div className="flex gap-2">
        <button
          onClick={testConnection}
          disabled={status === "testing" || !token || !endpoint || !domain}
          className="flex items-center gap-2 rounded-lg bg-sky-500 px-4 py-2 text-sm font-medium text-white hover:bg-sky-400 disabled:opacity-50"
          aria-busy={status === "testing"}
        >
          {status === "testing" ? (
            <>
              <span className="inline-block animate-spin">⟳</span>
              Validando...
            </>
          ) : (
            <>✓ Validar conexión</>
          )}
        </button>

        {(isValid || error) && (
          <button
            onClick={reset}
            className="rounded-lg border border-white/20 px-3 py-2 text-sm text-slate-300 hover:border-white/40"
            aria-label="Reset validation"
          >
            Reset
          </button>
        )}
      </div>

      {status === "success" && (
        <div className="flex items-start gap-2 rounded-lg border border-green-500/30 bg-green-500/10 p-3">
          <span className="text-lg text-green-400">✓</span>
          <div>
            <p className="text-sm font-medium text-green-400">Conexión válida</p>
            <p className="text-xs text-green-300">Dominio autorizado. Ya puedes copiar el snippet.</p>
          </div>
        </div>
      )}

      {status === "error" && error && (
        <div className="flex items-start gap-2 rounded-lg border border-red-500/30 bg-red-500/10 p-3">
          <span className="text-lg text-red-400">✕</span>
          <div>
            <p className="text-sm font-medium text-red-400">{error.message}</p>
            {error.code === 403 && (
              <p className="text-xs text-red-300">
                Contacta al equipo para autorizar este dominio.
              </p>
            )}
            {error.code === 401 && (
              <p className="text-xs text-red-300">
                Verifica que el token sea correcto y no haya expirado.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
