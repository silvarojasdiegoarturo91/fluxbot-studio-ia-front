import type { Metadata } from "next";
import { LegalPage, PrivacyContact } from "@/components/legal/legal-page";

export const metadata: Metadata = { title: "Accesibilidad", description: "Declaración de accesibilidad de FluxBot." };

export default function AccessibilityPage() {
  return <LegalPage eyebrow="Accesibilidad" title="Declaración de accesibilidad" summary="Nuestro objetivo es que la web y el asistente puedan utilizarse con teclado, lector de pantalla, zoom y preferencias de movimiento reducido." sections={[
    { title: "Compromiso", content: <p>Diseñamos FluxBot con referencia a WCAG 2.2 nivel AA. Priorizamos semántica HTML, foco visible, contraste, textos alternativos, formularios etiquetados y compatibilidad con las preferencias del sistema, incluida la reducción de movimiento.</p> },
    { title: "Estado y mejoras", content: <p>La accesibilidad se revisa durante el diseño y las pruebas. Algunas integraciones de terceros, contenido aportado por comercios o funciones en evolución pueden presentar limitaciones temporales. Registramos las incidencias y las priorizamos según su impacto.</p> },
    { title: "Canal de ayuda", content: <p>Si encuentra una barrera, indique la URL, el dispositivo y la tecnología de apoyo utilizada a través del <PrivacyContact />. Estudiaremos una alternativa accesible y responderemos dentro de un plazo razonable.</p> },
  ]} />;
}
