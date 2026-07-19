import type { Metadata } from "next";
import { LegalPage, PrivacyContact } from "@/components/legal/legal-page";

export const metadata: Metadata = { title: "Política de cookies", description: "Información sobre cookies y tecnologías similares en FluxBot." };

export default function CookiesPage() {
  return <LegalPage eyebrow="Cookies" title="Política de cookies" summary="Esta página describe el uso actual de cookies y cómo cambiaremos esa información si se incorporan tecnologías no esenciales." sections={[
    { title: "Uso actual", content: <p>La web pública no instala actualmente cookies publicitarias ni de analítica de terceros. Los eventos de interacción se colocan en una capa de datos en memoria del navegador; por sí sola no crea una cookie ni permite identificar a una persona.</p> },
    { title: "Cookies estrictamente necesarias", content: <p>Podemos usar almacenamiento técnico estrictamente necesario para seguridad, sesión, preferencias esenciales o prevención de abuso cuando el servicio lo requiera. Estas tecnologías no necesitan consentimiento cuando sean imprescindibles para prestar el servicio solicitado.</p> },
    { title: "Cambios y control", content: <p>Antes de activar cookies de medición, personalización o publicidad no esenciales, mostraremos un mecanismo de consentimiento que permita aceptar, rechazar o configurar categorías con la misma facilidad. Actualizaremos esta política con su finalidad, proveedor, duración y forma de retirar el consentimiento.</p> },
    { title: "Contacto", content: <p>Para consultas sobre tecnologías de seguimiento o privacidad, use el <PrivacyContact />.</p> },
  ]} />;
}
