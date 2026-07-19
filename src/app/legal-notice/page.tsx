import type { Metadata } from "next";
import { LegalPage, PrivacyContact } from "@/components/legal/legal-page";

export const metadata: Metadata = { title: "Aviso legal", description: "Información legal de FluxBot Studio IA." };

export default function LegalNoticePage() {
  return <LegalPage eyebrow="Información del prestador" title="Aviso legal" summary="Esta web es el canal público de FluxBot Studio IA para información y contratación de sus servicios." sections={[
    { title: "Titular y contacto", content: <p>El titular del servicio se identifica comercialmente como FluxBot Studio IA. Para notificaciones, información sobre contratación o para solicitar los datos de identificación del prestador aplicables a su relación, utilice el <PrivacyContact />.</p> },
    { title: "Uso de la web", content: <p>El acceso a esta web debe realizarse de forma lícita y respetuosa. Queda prohibido alterar su seguridad, extraer contenidos de forma automatizada sin autorización o utilizar la marca y materiales de FluxBot fuera de los usos permitidos por la ley.</p> },
    { title: "Información comercial", content: <p>Las descripciones de producto tienen finalidad informativa. Los precios, límites, funcionalidades y condiciones definitivas son los mostrados durante la contratación o en el acuerdo aplicable. No se adquiere ningún derecho sobre el software salvo la licencia de uso expresamente concedida.</p> },
  ]} />;
}
