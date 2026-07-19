import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description: "Política de privacidad pública de Fluxbot Studio IA.",
};

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl space-y-8 text-slate-300">
      <header className="space-y-3">
        <p className="text-sm font-medium text-sky-300">Última actualización: 19 de julio de 2026</p>
        <h1 className="text-4xl font-semibold tracking-tight text-white">Política de privacidad</h1>
        <p>
          Esta política explica cómo Fluxbot Studio IA trata datos personales al ofrecer su widget,
          sus servicios de inteligencia artificial y su aplicación para comercios.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-white">Datos que tratamos</h2>
        <p>
          Podemos tratar datos de contacto e información que un visitante escriba en el chat,
          identificadores técnicos de sesión, datos de configuración del comercio y contenido del
          catálogo o de las páginas que el comercio decide sincronizar. Cuando el comercio habilita
          funciones de pedidos o atención al cliente, el tratamiento se limita a los datos necesarios
          para prestar esa función.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-white">Finalidades y base de uso</h2>
        <p>
          Usamos esos datos para responder conversaciones, configurar y mejorar el asistente del
          comercio, prevenir abuso, mantener la seguridad y atender solicitudes de soporte. El
          comercio es responsable de informar a sus visitantes y de obtener las bases legales o los
          consentimientos que correspondan en su jurisdicción.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-white">Proveedores y transferencias</h2>
        <p>
          Para generar respuestas, Fluxbot puede usar proveedores de infraestructura y de modelos de
          inteligencia artificial configurados para el servicio. No vendemos datos personales. Antes
          de activar una integración, el comercio debe revisar los términos y el anexo de tratamiento
          aplicable del proveedor. La información actualizada sobre subprocesadores y regiones puede
          solicitarse mediante nuestro canal de contacto.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-white">Conservación y seguridad</h2>
        <p>
          Conservamos los datos solo durante el tiempo necesario para operar el servicio, cumplir las
          obligaciones legales y aplicar la configuración de retención del comercio. Aplicamos
          controles de acceso, autenticación de servicios, cifrado en tránsito y registros operativos
          limitados. Las copias de seguridad se gestionan mediante ciclos de retención independientes.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-white">Solicitudes de acceso, exportación y eliminación</h2>
        <p>
          Las personas interesadas pueden ejercer sus derechos a través del comercio con el que
          interactuaron. Los comercios que usan Shopify también pueden iniciar las solicitudes GDPR
          de Shopify; Fluxbot las propaga al sistema de IA para su procesamiento. Para consultas de
          privacidad o soporte, utiliza nuestro <a className="text-sky-300 underline hover:text-sky-200" href="/contact">formulario de contacto</a>.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-white">Cambios de esta política</h2>
        <p>
          Podemos actualizar esta política para reflejar cambios normativos, operativos o del
          servicio. Publicaremos la nueva fecha de actualización en esta página.
        </p>
      </section>
    </article>
  );
}
