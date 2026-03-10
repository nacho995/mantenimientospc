import type React from 'react';
import { LegalPage } from '../components/legal/LegalPage';
import { CONTACT_INFO } from '../constants';

export function Privacidad(): React.JSX.Element {
  return (
    <LegalPage title="Política de Privacidad" lastUpdated="1 de marzo de 2026">
      <section>
        <h2>1. Responsable del tratamiento</h2>
        <p>De conformidad con lo dispuesto en el Reglamento General de Protección de Datos (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD), le informamos que:</p>
        <ul>
          <li><strong>Responsable:</strong> Mantenimiento PC Madrid</li>
          <li><strong>Dirección:</strong> {CONTACT_INFO.address}</li>
          <li><strong>Correo electrónico:</strong> {CONTACT_INFO.email}</li>
          <li><strong>Teléfono:</strong> {CONTACT_INFO.phone}</li>
        </ul>
      </section>

      <section>
        <h2>2. Finalidad del tratamiento de datos</h2>
        <p>Los datos personales que nos facilite a través de los formularios del Sitio Web serán tratados con las siguientes finalidades:</p>
        <ul>
          <li><strong>Gestión de contacto:</strong> atender sus consultas, solicitudes de presupuesto y peticiones de información sobre nuestros servicios.</li>
          <li><strong>Prestación de servicios:</strong> gestionar la relación contractual derivada de la contratación de nuestros servicios de mantenimiento informático, reparación o soporte técnico.</li>
          <li><strong>Comunicaciones comerciales:</strong> enviarle información sobre nuestros servicios, ofertas y novedades, siempre que haya dado su consentimiento expreso para ello.</li>
          <li><strong>Cumplimiento legal:</strong> atender las obligaciones legales que nos resulten de aplicación.</li>
        </ul>
      </section>

      <section>
        <h2>3. Legitimación del tratamiento</h2>
        <p>La base legal para el tratamiento de sus datos personales es:</p>
        <ul>
          <li><strong>Consentimiento del interesado:</strong> al rellenar y enviar el formulario de contacto, usted consiente expresamente el tratamiento de sus datos para las finalidades indicadas.</li>
          <li><strong>Ejecución de un contrato:</strong> cuando el tratamiento sea necesario para la ejecución de los servicios contratados.</li>
          <li><strong>Interés legítimo:</strong> para la gestión administrativa y la mejora de nuestros servicios.</li>
          <li><strong>Obligación legal:</strong> para el cumplimiento de las obligaciones legales aplicables.</li>
        </ul>
      </section>

      <section>
        <h2>4. Datos recabados</h2>
        <p>A través del formulario de contacto del Sitio Web recabamos los siguientes datos personales:</p>
        <ul>
          <li>Nombre y apellidos</li>
          <li>Correo electrónico</li>
          <li>Número de teléfono</li>
          <li>Nombre de la empresa (opcional)</li>
          <li>Mensaje o descripción del servicio requerido</li>
        </ul>
        <p>Le informamos que todos los campos marcados como obligatorios son necesarios para gestionar su solicitud. La negativa a proporcionarlos impedirá que podamos atenderle correctamente.</p>
      </section>

      <section>
        <h2>5. Plazo de conservación de los datos</h2>
        <p>Los datos personales proporcionados se conservarán:</p>
        <ul>
          <li>Mientras se mantenga la relación comercial o contractual con usted.</li>
          <li>Durante los plazos legalmente establecidos para el cumplimiento de obligaciones legales (generalmente entre 3 y 6 años según la legislación fiscal y mercantil aplicable).</li>
          <li>Hasta que revoque su consentimiento, en el caso de comunicaciones comerciales.</li>
        </ul>
      </section>

      <section>
        <h2>6. Destinatarios de los datos</h2>
        <p>Sus datos personales no serán cedidos a terceros, salvo obligación legal. No se realizan transferencias internacionales de datos fuera del Espacio Económico Europeo (EEE).</p>
        <p>Podrán tener acceso a sus datos los siguientes encargados del tratamiento:</p>
        <ul>
          <li>Proveedor de alojamiento web (hosting) dentro de la UE.</li>
          <li>Proveedor de correo electrónico profesional.</li>
          <li>Asesoría contable y fiscal, en caso de relación contractual.</li>
        </ul>
      </section>

      <section>
        <h2>7. Derechos del interesado</h2>
        <p>Usted tiene derecho a ejercer los siguientes derechos en relación con sus datos personales:</p>
        <ul>
          <li><strong>Acceso:</strong> conocer qué datos personales estamos tratando.</li>
          <li><strong>Rectificación:</strong> solicitar la corrección de datos inexactos o incompletos.</li>
          <li><strong>Supresión:</strong> solicitar la eliminación de sus datos cuando ya no sean necesarios.</li>
          <li><strong>Oposición:</strong> oponerse al tratamiento de sus datos en determinadas circunstancias.</li>
          <li><strong>Limitación del tratamiento:</strong> solicitar la limitación del tratamiento en los casos previstos por la ley.</li>
          <li><strong>Portabilidad:</strong> recibir sus datos en un formato estructurado y de uso común.</li>
          <li><strong>Retirada del consentimiento:</strong> retirar su consentimiento en cualquier momento sin que ello afecte a la licitud del tratamiento previo.</li>
        </ul>
        <p>
          Para ejercer estos derechos, puede dirigirse a nosotros mediante correo electrónico a{' '}
          <a href={`mailto:${CONTACT_INFO.email}`}>{CONTACT_INFO.email}</a>, indicando en el asunto
          «Ejercicio de derechos RGPD» y adjuntando copia de su DNI o documento identificativo equivalente.
        </p>
        <p>
          Asimismo, le informamos de su derecho a presentar una reclamación ante la Agencia Española
          de Protección de Datos (AEPD) — <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">www.aepd.es</a> — si
          considera que el tratamiento de sus datos no se ajusta a la normativa vigente.
        </p>
      </section>

      <section>
        <h2>8. Medidas de seguridad</h2>
        <p>
          Mantenimiento PC Madrid ha adoptado las medidas técnicas y organizativas necesarias para garantizar
          la seguridad e integridad de los datos personales que trata, evitando su alteración, pérdida,
          tratamiento o acceso no autorizado, conforme al estado de la tecnología, la naturaleza de los
          datos almacenados y los riesgos a los que están expuestos.
        </p>
      </section>

      <section>
        <h2>9. Modificaciones de la política de privacidad</h2>
        <p>
          Mantenimiento PC Madrid se reserva el derecho a modificar la presente Política de Privacidad para
          adaptarla a novedades legislativas o jurisprudenciales, así como a prácticas del sector. En dichos
          supuestos, se anunciará en esta página los cambios introducidos con razonable antelación a su puesta
          en práctica.
        </p>
      </section>
    </LegalPage>
  );
}
