"use client";

declare global {
  interface Window {
    dataLayer?: Record<string, string | number | boolean>[];
  }
}

export function trackEvent(
  event: string,
  properties: Record<string, string | number | boolean> = {},
) {
  if (typeof window === "undefined") {
    return;
  }

  const payload = { event, ...properties };
  if (!window.dataLayer) {
    window.dataLayer = [];
  }

  window.dataLayer.push(payload);
}
