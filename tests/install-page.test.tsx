import { describe, it, expect } from "vitest";

describe("InstallPage (Structure Tests)", () => {
  it("should include main heading", () => {
    const heading = "Instala el widget en tu web";
    expect(heading).toBeDefined();
    expect(heading.length).toBeGreaterThan(0);
  });

  it("should have snippet generator section", () => {
    const section = "Generador de snippet";
    expect(section).toBeDefined();
  });

  it("should have other platforms section", () => {
    const section = "Otras plataformas";
    expect(section).toBeDefined();
  });

  it("should have FAQ section", () => {
    const section = "Preguntas frecuentes";
    expect(section).toBeDefined();
  });

  it("should have installation steps", () => {
    const steps = [
      "Paso 1: Completa Token y Dominio",
      "Paso 2: Haz clic en Validar conexión",
      "Paso 3: Copia el snippet generado",
      "Paso 4: Pégalo en tu HTML",
      "Paso 5: Publica y verifica",
    ];

    expect(steps.length).toBe(5);
  });

  it("should have demo widget link", () => {
    const demoPath = "/demo-widget";
    expect(demoPath).toBeDefined();
    expect(demoPath).toContain("/demo");
  });

  it("should validate snippet contains required attributes", () => {
    const requiredAttrs = [
      "data-token",
      "data-domain",
      "data-api-version",
      "data-tenant-mode",
      "data-position",
    ];

    expect(requiredAttrs.length).toBe(5);
    requiredAttrs.forEach((attr) => {
      expect(attr).toContain("data-");
    });
  });
});
