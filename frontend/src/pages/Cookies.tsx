import type React from 'react';
import { LegalPage } from '../components/legal/LegalPage';
import { CONTACT_INFO } from '../constants';

export function Cookies(): React.JSX.Element {
  return (
    <LegalPage title="Política de Cookies" lastUpdated="1 de marzo de 2026">
      <section>
        <h2>1. ¿Qué son las cookies?</h2>
        <p>
          Las cookies son pequeños archivos de texto que los sitios web almacenan en su dispositivo
          (ordenador, tableta o teléfono móvil) cuando los visita. Las cookies permiten que el sitio web
          reconozca su dispositivo y recuerde información sobre su visita, como sus preferencias
          de idioma, tamaño de fuente y otras opciones de visualización.
        </p>
      </section>

      <section>
        <h2>2. ¿Qué tipos de cookies utilizamos?</h2>
        <p>En nuestro Sitio Web utilizamos los siguientes tipos de cookies:</p>
        
        <h3>2.1 Cookies estrictamente necesarias</h3>
        <p>
          Son aquellas imprescindibles para el funcionamiento del Sitio Web. Permiten la navegación
          y el uso de las funciones básicas. Sin estas cookies, el Sitio Web no puede funcionar correctamente.
        </p>
        <table>
          <thead>
            <tr>
              <th>Cookie</th>
              <th>Duración</th>
              <th>Finalidad</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>cookie_consent</code></td>
              <td>12 meses</td>
              <td>Almacena las preferencias de consentimiento del usuario respecto a las cookies.</td>
            </tr>
          </tbody>
        </table>

        <h3>2.2 Cookies analíticas</h3>
        <p>
          Nos permiten cuantificar el número de usuarios, conocer cómo navegan por el Sitio Web
          y medir la actividad del sitio, con el fin de mejorar el servicio ofrecido. La información
          recopilada es anónima y agregada.
        </p>
        <table>
          <thead>
            <tr>
              <th>Cookie</th>
              <th>Proveedor</th>
              <th>Duración</th>
              <th>Finalidad</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>_ga</code></td>
              <td>Google Analytics</td>
              <td>2 años</td>
              <td>Distinguir usuarios únicos mediante un identificador generado aleatoriamente.</td>
            </tr>
            <tr>
              <td><code>_ga_*</code></td>
              <td>Google Analytics</td>
              <td>2 años</td>
              <td>Mantener el estado de sesión.</td>
            </tr>
          </tbody>
        </table>

        <h3>2.3 Cookies de marketing / publicidad</h3>
        <p>
          Se utilizan para mostrar anuncios relevantes al usuario y medir la eficacia de las campañas
          publicitarias. Pueden ser instaladas por nuestros partners publicitarios a través de nuestro
          Sitio Web.
        </p>
        <table>
          <thead>
            <tr>
              <th>Cookie</th>
              <th>Proveedor</th>
              <th>Duración</th>
              <th>Finalidad</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>_gcl_au</code></td>
              <td>Google Ads</td>
              <td>90 días</td>
              <td>Seguimiento de conversiones de Google Ads.</td>
            </tr>
            <tr>
              <td><code>_gac_*</code></td>
              <td>Google Ads</td>
              <td>90 días</td>
              <td>Almacena información de la campaña publicitaria para el usuario.</td>
            </tr>
            <tr>
              <td><code>test_cookie</code></td>
              <td>Google (DoubleClick)</td>
              <td>Sesión</td>
              <td>Comprobar si el navegador acepta cookies.</td>
            </tr>
            <tr>
              <td><code>IDE</code></td>
              <td>Google (DoubleClick)</td>
              <td>13 meses</td>
              <td>Mostrar anuncios personalizados basados en visitas anteriores.</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2>3. Base legal para el uso de cookies</h2>
        <p>
          La base legal para el uso de cookies estrictamente necesarias es el interés legítimo del responsable
          (artículo 6.1.f del RGPD). Para las cookies analíticas y de marketing, la base legal es el
          consentimiento del usuario (artículo 6.1.a del RGPD), que se recaba mediante el banner de cookies
          mostrado en su primera visita al Sitio Web.
        </p>
      </section>

      <section>
        <h2>4. ¿Cómo gestionar las cookies?</h2>
        <p>
          Al acceder al Sitio Web por primera vez, se le muestra un banner informativo sobre el uso de
          cookies donde puede aceptar o rechazar las cookies no esenciales. Puede modificar sus preferencias
          en cualquier momento.
        </p>
        <p>Además, puede configurar su navegador para bloquear o eliminar cookies:</p>
        <ul>
          <li><strong>Google Chrome:</strong> Configuración → Privacidad y seguridad → Cookies y otros datos de sitios</li>
          <li><strong>Mozilla Firefox:</strong> Opciones → Privacidad y seguridad → Cookies y datos del sitio</li>
          <li><strong>Safari:</strong> Preferencias → Privacidad → Cookies y datos de sitios web</li>
          <li><strong>Microsoft Edge:</strong> Configuración → Cookies y permisos del sitio → Cookies y datos almacenados</li>
        </ul>
        <p>
          Tenga en cuenta que la desactivación de cookies puede afectar al funcionamiento de algunas
          características del Sitio Web.
        </p>
      </section>

      <section>
        <h2>5. Transferencias internacionales</h2>
        <p>
          Algunas cookies de terceros (como Google Analytics y Google Ads) pueden implicar transferencias
          de datos fuera del Espacio Económico Europeo. Estos proveedores cumplen con el marco de
          privacidad de datos UE-EE.UU. (EU-U.S. Data Privacy Framework) o cuentan con Cláusulas
          Contractuales Tipo aprobadas por la Comisión Europea como garantía adecuada.
        </p>
      </section>

      <section>
        <h2>6. Actualización de la política de cookies</h2>
        <p>
          Mantenimientos PC Madrid puede modificar esta Política de Cookies en función de cambios legislativos,
          regulatorios o con la finalidad de adaptar dicha política a las instrucciones dictadas por la
          Agencia Española de Protección de Datos. Se recomienda al usuario que revise esta política
          periódicamente.
        </p>
      </section>

      <section>
        <h2>7. Contacto</h2>
        <p>
          Si tiene dudas sobre esta Política de Cookies, puede contactar con nosotros
          en <a href={`mailto:${CONTACT_INFO.email}`}>{CONTACT_INFO.email}</a> o
          llamando al <a href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`}>{CONTACT_INFO.phone}</a>.
        </p>
      </section>
    </LegalPage>
  );
}
