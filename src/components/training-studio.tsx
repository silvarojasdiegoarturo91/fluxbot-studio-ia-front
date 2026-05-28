"use client";

import { FormEvent, useMemo, useState } from "react";

type TrainingConfig = {
  purpose: string;
  allowedTopics: string;
  blockedTopics: string;
  allowedDomains: string;
  fallbackMessage: string;
  minuteRateLimit: number;
  dailyQuota: number;
};

const defaultConfig: TrainingConfig = {
  purpose: "",
  allowedTopics: "",
  blockedTopics: "",
  allowedDomains: "",
  fallbackMessage: "",
  minuteRateLimit: 20,
  dailyQuota: 500,
};

export function TrainingStudio() {
  const [tenantId, setTenantId] = useState("tenant_demo");
  const [adminKey, setAdminKey] = useState("");
  const [installToken, setInstallToken] = useState("tk_demo_fluxbot_123456");
  const [config, setConfig] = useState<TrainingConfig>(defaultConfig);
  const [status, setStatus] = useState<string>("");
  const [testMessage, setTestMessage] = useState("");
  const [testReply, setTestReply] = useState("");

  const trainingUrl = useMemo(
    () => `/api/v1/widget/admin/training?tenantId=${encodeURIComponent(tenantId)}`,
    [tenantId],
  );

  const loadConfig = async () => {
    setStatus("Cargando configuración...");
    const response = await fetch(trainingUrl, {
      headers: { "x-admin-key": adminKey },
    });
    if (!response.ok) {
      setStatus(`Error al cargar (${response.status})`);
      return;
    }
    const data = await response.json();
    setConfig({
      purpose: data.purpose ?? "",
      allowedTopics: (data.allowedTopics ?? []).join(", "),
      blockedTopics: (data.blockedTopics ?? []).join(", "),
      allowedDomains: (data.allowedDomains ?? []).join(", "),
      fallbackMessage: data.fallbackMessage ?? "",
      minuteRateLimit: data.minuteRateLimit ?? 20,
      dailyQuota: data.dailyQuota ?? 500,
    });
    setStatus("Configuración cargada.");
  };

  const saveConfig = async (event: FormEvent) => {
    event.preventDefault();
    setStatus("Guardando...");
    const response = await fetch(trainingUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-admin-key": adminKey,
      },
      body: JSON.stringify({
        purpose: config.purpose,
        allowedTopics: config.allowedTopics
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        blockedTopics: config.blockedTopics
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        allowedDomains: config.allowedDomains
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        fallbackMessage: config.fallbackMessage,
        minuteRateLimit: Number(config.minuteRateLimit),
        dailyQuota: Number(config.dailyQuota),
      }),
    });

    if (!response.ok) {
      setStatus(`No se pudo guardar (${response.status})`);
      return;
    }
    setStatus("Configuración guardada.");
  };

  const runPolicyTest = async () => {
    setStatus("Probando política...");
    setTestReply("");
    const sessionResponse = await fetch("/api/v1/widget/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: installToken,
        domain: "localhost",
      }),
    });
    if (!sessionResponse.ok) {
      setStatus("No fue posible crear sesión para prueba.");
      return;
    }
    const sessionData = await sessionResponse.json();
    const chatResponse = await fetch("/api/v1/widget/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionData.sessionToken}`,
        "X-Widget-Nonce": crypto.randomUUID(),
      },
      body: JSON.stringify({
        message: testMessage,
        domain: "localhost",
      }),
    });
    const chatData = await chatResponse.json();
    if (!chatResponse.ok) {
      setStatus(`Error en test (${chatResponse.status})`);
      setTestReply(chatData.error ?? "Error desconocido");
      return;
    }
    setStatus(
      chatData.policy?.inScope
        ? "Mensaje aceptado como in-scope."
        : "Mensaje fuera de alcance: respuesta de bloqueo aplicada.",
    );
    setTestReply(chatData.reply ?? "");
  };

  return (
    <div className="space-y-6">
      <div className="card space-y-4">
        <h2 className="text-xl font-semibold">Acceso de administración</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <label className="space-y-1">
            <span className="text-sm text-slate-300">Tenant ID</span>
            <input
              value={tenantId}
              onChange={(event) => setTenantId(event.target.value)}
              className="w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2"
            />
          </label>
          <label className="space-y-1">
            <span className="text-sm text-slate-300">Admin key</span>
            <input
              value={adminKey}
              onChange={(event) => setAdminKey(event.target.value)}
              className="w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2"
              placeholder="dev-admin-key"
            />
          </label>
          <label className="space-y-1">
            <span className="text-sm text-slate-300">Install token (test)</span>
            <input
              value={installToken}
              onChange={(event) => setInstallToken(event.target.value)}
              className="w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2"
            />
          </label>
        </div>
        <button
          type="button"
          onClick={loadConfig}
          className="rounded-lg bg-sky-500 px-4 py-2 text-sm font-medium text-white hover:bg-sky-400"
        >
          Cargar configuración
        </button>
      </div>

      <form onSubmit={saveConfig} className="card space-y-4">
        <h2 className="text-xl font-semibold">Entrenamiento y límites</h2>
        <label className="block space-y-1">
          <span className="text-sm text-slate-300">Propósito del chatbot</span>
          <textarea
            value={config.purpose}
            onChange={(event) => setConfig({ ...config, purpose: event.target.value })}
            className="h-20 w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2"
          />
        </label>
        <label className="block space-y-1">
          <span className="text-sm text-slate-300">Temas permitidos (coma)</span>
          <input
            value={config.allowedTopics}
            onChange={(event) => setConfig({ ...config, allowedTopics: event.target.value })}
            className="w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2"
          />
        </label>
        <label className="block space-y-1">
          <span className="text-sm text-slate-300">Temas bloqueados (coma)</span>
          <input
            value={config.blockedTopics}
            onChange={(event) => setConfig({ ...config, blockedTopics: event.target.value })}
            className="w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2"
          />
        </label>
        <label className="block space-y-1">
          <span className="text-sm text-slate-300">Dominios permitidos (coma)</span>
          <input
            value={config.allowedDomains}
            onChange={(event) => setConfig({ ...config, allowedDomains: event.target.value })}
            className="w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2"
          />
        </label>
        <label className="block space-y-1">
          <span className="text-sm text-slate-300">Mensaje fuera de alcance</span>
          <input
            value={config.fallbackMessage}
            onChange={(event) => setConfig({ ...config, fallbackMessage: event.target.value })}
            className="w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2"
          />
        </label>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-1">
            <span className="text-sm text-slate-300">Rate limit (req/min)</span>
            <input
              type="number"
              min={1}
              value={config.minuteRateLimit}
              onChange={(event) =>
                setConfig({ ...config, minuteRateLimit: Number(event.target.value) })
              }
              className="w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2"
            />
          </label>
          <label className="space-y-1">
            <span className="text-sm text-slate-300">Cuota diaria</span>
            <input
              type="number"
              min={1}
              value={config.dailyQuota}
              onChange={(event) => setConfig({ ...config, dailyQuota: Number(event.target.value) })}
              className="w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2"
            />
          </label>
        </div>
        <button
          type="submit"
          className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-400"
        >
          Guardar entrenamiento
        </button>
      </form>

      <section className="card space-y-4">
        <h2 className="text-xl font-semibold">Prueba de alcance</h2>
        <input
          value={testMessage}
          onChange={(event) => setTestMessage(event.target.value)}
          className="w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2"
          placeholder="Escribe una pregunta para validar in-scope/out-of-scope"
        />
        <button
          type="button"
          onClick={runPolicyTest}
          className="rounded-lg bg-violet-500 px-4 py-2 text-sm font-medium text-white hover:bg-violet-400"
        >
          Ejecutar prueba
        </button>
        {testReply ? (
          <div className="rounded-lg border border-white/10 bg-slate-900 p-3 text-sm text-slate-200">
            {testReply}
          </div>
        ) : null}
      </section>

      {status ? (
        <p className="rounded-lg border border-white/10 bg-slate-900 p-3 text-sm text-slate-200">
          {status}
        </p>
      ) : null}
    </div>
  );
}
