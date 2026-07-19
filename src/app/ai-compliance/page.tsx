import type { Metadata } from "next";
import { LegalPage, PrivacyContact } from "@/components/legal/legal-page";

export const metadata: Metadata = { title: "Uso responsable de IA", description: "Principios de seguridad y transparencia de IA en FluxBot." };

export default function AiCompliancePage() {
  return <LegalPage eyebrow="IA responsable" title="Uso responsable de IA" summary="La IA debe ayudar a vender sin sustituir el criterio, la evidencia ni la responsabilidad humana." sections={[
    { title: "Transparencia y control humano", content: <p>El asistente debe presentarse como sistema automatizado cuando interactúe con visitantes. Las decisiones con impacto relevante, los cambios de catálogo y las acciones comerciales sensibles requieren reglas, trazabilidad y revisión humana según la configuración del comercio.</p> },
    { title: "Calidad y límites", content: <p>Las respuestas se basan en las fuentes conectadas por el comercio, pero pueden ser incompletas o incorrectas. Recomendamos no usar el servicio para diagnóstico médico, asesoramiento jurídico, crédito, empleo u otros usos de alto riesgo sin controles adicionales y supervisión cualificada.</p> },
    { title: "Seguridad y mejora", content: <p>Aplicamos controles de acceso, límites de uso, registro de incidencias y mecanismos para revisar respuestas problemáticas. El comercio puede configurar fuentes, políticas y derivación a una persona. La información de conversaciones no se vende ni se utiliza para publicidad de terceros.</p> },
    { title: "Preguntas", content: <p>Para solicitar información sobre los controles de IA aplicables a una cuenta, use el <PrivacyContact />.</p> },
  ]} />;
}
