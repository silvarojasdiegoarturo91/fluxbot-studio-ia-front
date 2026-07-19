import type { Metadata } from "next";
import { LegalPage, PrivacyContact } from "@/components/legal/legal-page";

export const metadata: Metadata = { title: "Encargo de tratamiento", description: "Resumen del acuerdo de tratamiento de datos de FluxBot." };

export default function DataProcessingPage() {
  return <LegalPage eyebrow="Protección de datos" title="Encargo de tratamiento" summary="Este resumen explica las garantías que deben formar parte del acuerdo entre FluxBot y cada comercio cuando FluxBot trate datos personales por su cuenta." sections={[
    { title: "Instrucciones y finalidad", content: <p>FluxBot solo tratará los datos personales de visitantes y clientes de la tienda conforme a las instrucciones documentadas del comercio, para alojar, configurar, operar, proteger y dar soporte al servicio de comercio conversacional.</p> },
    { title: "Confidencialidad, seguridad y subencargados", content: <p>El personal autorizado está sujeto a confidencialidad. FluxBot aplicará medidas técnicas y organizativas adecuadas y comunicará los subencargados relevantes con los mecanismos de oposición o información que establezca el contrato. Los subencargados solo podrán tratar datos para prestar los servicios contratados.</p> },
    { title: "Asistencia y fin del servicio", content: <p>FluxBot ayudará razonablemente al comercio a atender derechos de las personas, incidentes de seguridad y evaluaciones de impacto en la medida exigible. Al terminar el servicio, devolverá o suprimirá los datos personales conforme a las instrucciones del comercio, salvo conservación legal obligatoria.</p> },
    { title: "Formalización", content: <p>Este texto no sustituye el acuerdo de encargo de tratamiento firmado. El comercio puede solicitar el anexo contractual vigente mediante el <PrivacyContact /> antes de activar el tratamiento de datos personales.</p> },
  ]} />;
}
