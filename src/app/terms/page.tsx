import type { Metadata } from "next";
import { LegalPage, PrivacyContact } from "@/components/legal/legal-page";

export const metadata: Metadata = { title: "Términos de servicio", description: "Términos de uso de FluxBot Studio IA." };

export default function TermsPage() {
  return <LegalPage eyebrow="Contrato de servicio" title="Términos de servicio" summary="Estas condiciones regulan el uso de FluxBot por los comercios y sus usuarios autorizados." sections={[
    { title: "Servicio y cuenta", content: <p>FluxBot ofrece herramientas de IA para atención y venta conversacional. El comercio debe aportar datos veraces, mantener sus credenciales protegidas y asegurar que sus usuarios autorizados cumplen estas condiciones. La contratación, alcance y precio aplicables serán los acordados en el plan o pedido correspondiente.</p> },
    { title: "Responsabilidades del comercio", content: <p>El comercio conserva la responsabilidad sobre su catálogo, precios, stock, políticas, contenido, consentimiento y relación con sus clientes. Debe revisar la configuración del asistente, no usarlo para actividades ilícitas, discriminatorias o de alto riesgo, y establecer revisión humana cuando una respuesta pueda producir efectos relevantes para una persona.</p> },
    { title: "Uso aceptable y propiedad intelectual", content: <p>No se permite interferir con el servicio, eludir límites de seguridad, introducir código malicioso ni usar FluxBot para infringir derechos de terceros. Cada parte conserva sus derechos sobre sus datos, marcas y contenido. FluxBot conserva los derechos sobre la plataforma, salvo las licencias necesarias para prestar el servicio.</p> },
    { title: "Disponibilidad, IA y limitación", content: <p>La IA puede generar respuestas inexactas. El comercio debe verificar información comercial crítica antes de publicarla o automatizar una acción. El servicio se presta conforme a los niveles contratados; salvo que la ley disponga otra cosa, no se garantizan resultados de ventas ni disponibilidad ininterrumpida.</p> },
    { title: "Suspensión y finalización", content: <p>Podemos suspender el acceso de forma proporcionada para proteger el servicio, investigar un uso indebido o cumplir una obligación legal. Al finalizar, se aplicarán los periodos de exportación, devolución o supresión previstos en el contrato y la política de privacidad.</p> },
    { title: "Contacto", content: <p>Para cuestiones contractuales, privacidad o soporte, utilice el <PrivacyContact />. Las condiciones particulares acordadas con el comercio prevalecen sobre estas condiciones generales cuando exista conflicto.</p> },
  ]} />;
}
