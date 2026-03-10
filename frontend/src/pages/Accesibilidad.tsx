import type React from 'react';
import { LegalPage } from '../components/legal/LegalPage';
import { CONTACT_INFO } from '../constants';

export function Accesibilidad(): React.JSX.Element {
  return (
    <LegalPage title="Declaración de Accesibilidad" lastUpdated="1 de marzo de 2026">
      <section>
        <h2>1. Compromiso con la accesibilidad</h2>
        <p>
          Mantenimiento PC Madrid se compromete a garantizar la accesibilidad digital de su sitio web
          para todas las personas, incluidas aquellas con discapacidades. Trabajamos continuamente para
          mejorar la experiencia de usuario y aplicar las normas de accesibilidad pertinentes.
        </p>
      </section>

      <section>
        <h2>2. Normas de accesibilidad aplicadas</h2>
        <p>
          Este sitio web ha sido diseñado siguiendo las Pautas de Accesibilidad al Contenido Web (WCAG) 2.1
          del World Wide Web Consortium (W3C), procurando cumplir con el nivel de conformidad AA.
        </p>
        <p>
          Asimismo, cumplimos con los requisitos establecidos en el Real Decreto 1112/2018, de 7 de septiembre,
          sobre accesibilidad de los sitios web y aplicaciones para dispositivos móviles del sector público,
          aplicable como referencia de buenas prácticas para el sector privado.
        </p>
      </section>

      <section>
        <h2>3. Medidas de accesibilidad adoptadas</h2>
        <p>Para garantizar la accesibilidad de nuestro sitio web, hemos implementado las siguientes medidas:</p>
        <ul>
          <li><strong>Estructura semántica:</strong> uso correcto de encabezados (H1-H6), listas, tablas y otros elementos HTML semánticos para una correcta interpretación por tecnologías de asistencia.</li>
          <li><strong>Textos alternativos:</strong> todas las imágenes relevantes incluyen textos alternativos descriptivos (atributo alt).</li>
          <li><strong>Contraste de color:</strong> los colores utilizados cumplen con las ratios mínimas de contraste establecidas en WCAG 2.1 AA.</li>
          <li><strong>Navegación por teclado:</strong> todos los elementos interactivos son accesibles mediante teclado.</li>
          <li><strong>Diseño responsive:</strong> el sitio web se adapta a diferentes tamaños de pantalla y dispositivos.</li>
          <li><strong>Etiquetas ARIA:</strong> uso de atributos ARIA donde es necesario para mejorar la interacción con lectores de pantalla.</li>
          <li><strong>Formularios accesibles:</strong> todos los campos de formulario tienen etiquetas asociadas y mensajes de error claros.</li>
          <li><strong>Tamaño de texto:</strong> el texto puede aumentarse mediante las funciones del navegador sin pérdida de funcionalidad.</li>
          <li><strong>Enlaces descriptivos:</strong> los enlaces tienen textos que describen claramente su destino o función.</li>
        </ul>
      </section>

      <section>
        <h2>4. Contenido no accesible</h2>
        <p>
          Pese a nuestros esfuerzos, es posible que algunos contenidos no cumplan completamente con todos
          los requisitos de accesibilidad. A continuación, indicamos las limitaciones conocidas:
        </p>
        <ul>
          <li>Algunos contenidos de vídeo pueden no disponer de subtítulos o audiodescripción.</li>
          <li>Determinados documentos PDF enlazados pueden no ser completamente accesibles.</li>
          <li>Algunos mapas interactivos de terceros pueden no ser totalmente navegables por teclado.</li>
        </ul>
        <p>
          Estamos trabajando activamente para resolver estas limitaciones y mejorar de forma continua
          la accesibilidad de nuestro sitio web.
        </p>
      </section>

      <section>
        <h2>5. Tecnologías de asistencia compatibles</h2>
        <p>Este sitio web ha sido probado y es compatible con las siguientes tecnologías de asistencia:</p>
        <ul>
          <li>Lectores de pantalla: NVDA, JAWS, VoiceOver (macOS/iOS), TalkBack (Android)</li>
          <li>Navegación por teclado en los principales navegadores (Chrome, Firefox, Safari, Edge)</li>
          <li>Magnificadores de pantalla y funciones de zoom del navegador</li>
        </ul>
      </section>

      <section>
        <h2>6. Fecha de preparación y revisión</h2>
        <p>
          Esta declaración de accesibilidad fue preparada el 1 de marzo de 2026. La última revisión
          se realizó el 1 de marzo de 2026 mediante una autoevaluación llevada a cabo por
          Mantenimiento PC Madrid.
        </p>
      </section>

      <section>
        <h2>7. Observaciones y contacto</h2>
        <p>
          Si encuentra alguna barrera de accesibilidad en nuestro sitio web o desea comunicarnos cualquier
          problema, sugerencia o solicitar información en un formato alternativo, puede contactar con nosotros a través de:
        </p>
        <ul>
          <li><strong>Correo electrónico:</strong> <a href={`mailto:${CONTACT_INFO.email}`}>{CONTACT_INFO.email}</a></li>
          <li><strong>Teléfono:</strong> <a href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`}>{CONTACT_INFO.phone}</a></li>
          <li><strong>Dirección postal:</strong> {CONTACT_INFO.address}</li>
        </ul>
        <p>
          Nos comprometemos a responder en un plazo máximo de 15 días hábiles y a buscar una solución
          adecuada a la incidencia reportada.
        </p>
      </section>

      <section>
        <h2>8. Procedimiento de aplicación</h2>
        <p>
          En caso de que no obtenga una respuesta satisfactoria a su solicitud o reclamación en materia
          de accesibilidad, puede presentar una reclamación ante el Ministerio de Asuntos Económicos
          y Transformación Digital, de conformidad con lo dispuesto en el Real Decreto 1112/2018.
        </p>
      </section>
    </LegalPage>
  );
}
