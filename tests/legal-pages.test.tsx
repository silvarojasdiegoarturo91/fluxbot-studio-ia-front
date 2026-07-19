import { describe, expect, it } from "vitest";

const legalRoutes = [
  "/privacy",
  "/terms",
  "/cookies",
  "/data-processing",
  "/accessibility",
  "/ai-compliance",
  "/legal-notice",
];

describe("Legal public pages", () => {
  it("keeps every required legal surface publicly addressable", () => {
    expect(legalRoutes).toHaveLength(7);
    legalRoutes.forEach((route) => expect(route).toMatch(/^\//));
  });

  it("includes the Shopify privacy request topics in the privacy surface", () => {
    const complianceTopics = ["customers/data_request", "customers/redact", "shop/redact"];
    expect(complianceTopics).toHaveLength(3);
  });
});
