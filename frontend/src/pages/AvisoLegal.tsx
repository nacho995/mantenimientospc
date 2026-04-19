import type React from 'react';
import { LegalPage } from '../components/legal/LegalPage';
import { CONTACT_INFO } from '../constants';

export function AvisoLegal(): React.JSX.Element {
  return (
    <LegalPage title="Aviso Legal" lastUpdated="1 de marzo de 2026">
      <section>
        <h2>1. Datos identificativos del titular</h2>
        <p>
          En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad
          de la Información y Comercio Electrónico (LSSI-CE), se informan los datos identificativos
          del titular de este sitio web:
        </p>
        <ul>
          <li><strong>Denominación:</strong> Mantenimientos PC Madrid</li>
          <li><strong>Domicilio social:</strong> {CONTACT_INFO.address}</li>
          <li><strong>Correo electrónico:</strong> {CONTACT_INFO.email}</li>
          <li><strong>Teléfono:</strong> {CONTACT_INFO.phone}</li>
          <li><strong>Actividad:</strong> Servicios de mantenimiento informático, reparación de equipos y soporte técnico para empresas y particulares</li>
        </ul>
      </section>

      <section>
        <h2>2. Objeto</h2>
        <p>
          El presente Aviso Legal regula el uso del sitio web <strong>mantenimientospcmadrid.es</strong> (en adelante, el «Sitio Web»).
          La navegación por el Sitio Web atribuye la condición de usuario del mismo e implica la aceptación
          plena y sin reservas de todas y cada una de las disposiciones incluidas en este Aviso Legal.
        </p>
      </section>

      <section>
        <h2>3. Propiedad intelectual e industrial</h2>
        <p>
          Todos los contenidos del Sitio Web, incluyendo, sin carácter limitativo, textos, fotografías,
          gráficos, imágenes, iconos, tecnología, software, links y demás contenidos audiovisuales,
          así como su diseño gráfico y códigos fuente, son propiedad intelectual de Mantenimientos PC Madrid
          o de terceros, sin que puedan entenderse cedidos al usuario ninguno de los derechos de explotación
          reconocidos por la normativa vigente en materia de propiedad intelectual.
        </p>
        <p>
          Las marcas, nombres comerciales o signos distintivos publicados en el Sitio Web son titularidad
          de Mantenimientos PC Madrid o de terceros, sin que el acceso al mismo pueda atribuir derecho alguno
          sobre los mismos.
        </p>
      </section>

      <section>
        <h2>4. Condiciones de uso</h2>
        <p>El usuario se compromete a hacer un uso adecuado de los contenidos y servicios que Mantenimientos PC Madrid ofrece a través de su Sitio Web y, con carácter enunciativo pero no limitativo, a no emplearlos para:</p>
        <ul>
          <li>Incurrir en actividades ilícitas, ilegales o contrarias a la buena fe y al orden público.</li>
          <li>Provocar daños en los sistemas físicos y lógicos del Sitio Web, de sus proveedores o de terceros.</li>
          <li>Introducir o difundir en la red virus informáticos o cualesquiera otros sistemas que sean susceptibles de provocar daños.</li>
          <li>Intentar acceder, utilizar o manipular los datos de Mantenimientos PC Madrid, terceros proveedores y otros usuarios.</li>
          <li>Reproducir, copiar, distribuir o poner a disposición de terceros los contenidos del Sitio Web sin autorización previa.</li>
        </ul>
      </section>

      <section>
        <h2>5. Exclusión de responsabilidad</h2>
        <p>
          Mantenimientos PC Madrid no se hace responsable, en ningún caso, de los daños y perjuicios de cualquier
          naturaleza que pudieran ocasionar, a título enunciativo: errores u omisiones en los contenidos,
          falta de disponibilidad del Sitio Web o la transmisión de virus o programas maliciosos en los contenidos,
          a pesar de haber adoptado todas las medidas tecnológicas necesarias para evitarlo.
        </p>
      </section>

      <section>
        <h2>6. Enlaces (links)</h2>
        <p>
          En el caso de que en el Sitio Web se incluyesen enlaces o hipervínculos hacia otros sitios de Internet,
          Mantenimientos PC Madrid no ejercerá ningún tipo de control sobre dichos sitios y contenidos.
          En ningún caso asumirá responsabilidad alguna por los contenidos de algún enlace perteneciente
          a un sitio web ajeno, ni garantizará la disponibilidad técnica, calidad, fiabilidad, exactitud,
          amplitud, veracidad, validez y constitucionalidad de cualquier material o información contenida
          en ninguno de dichos hipervínculos u otros sitios de Internet.
        </p>
      </section>

      <section>
        <h2>7. Derecho de exclusión</h2>
        <p>
          Mantenimientos PC Madrid se reserva el derecho a denegar o retirar el acceso al Sitio Web y/o
          los servicios ofrecidos sin necesidad de preaviso, a instancia propia o de un tercero, a aquellos
          usuarios que incumplan el presente Aviso Legal.
        </p>
      </section>

      <section>
        <h2>8. Legislación aplicable y jurisdicción</h2>
        <p>
          La relación entre Mantenimientos PC Madrid y el usuario se regirá por la normativa española vigente.
          Todas las disputas y reclamaciones derivadas de este aviso legal se resolverán por los juzgados
          y tribunales de Madrid, España.
        </p>
      </section>

      <section>
        <h2>9. Contacto</h2>
        <p>
          Para cualquier consulta o sugerencia relacionada con este Aviso Legal, puede contactar con nosotros
          a través de <a href={`mailto:${CONTACT_INFO.email}`}>{CONTACT_INFO.email}</a> o
          llamando al <a href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`}>{CONTACT_INFO.phone}</a>.
        </p>
      </section>
    </LegalPage>
  );
}
