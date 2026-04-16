import type React from 'react';
import { Link } from 'react-router-dom';
import { CONTACT_INFO } from '../../constants';
import { useScrollTo } from '../../hooks/useScrollTo';

export function Footer(): React.JSX.Element {
  const currentYear = new Date().getFullYear();
  const scrollTo = useScrollTo();

  return (
    <footer className="footer">
      <div className="footer__container">
        {/* Top section */}
        <div className="footer__top">
          <div className="footer__brand">
            <div className="footer__brand-logo">
              <img src="/logo.jpeg" alt="Mantenimiento PC" width="64" height="64" style={{ borderRadius: '10px', objectFit: 'contain' }} />
              <div>
                <p className="footer__name">
                  Mantenimiento<strong>PC</strong> Madrid
                </p>
                <p className="footer__tagline">
                  Tecnologia de confianza desde 1995. Tu partner IT en Madrid.
                </p>
              </div>
            </div>
          </div>
          <div className="footer__cta-group">
            <button
              className="btn btn--md btn--primary"
              onClick={() => scrollTo('contacto')}
              type="button"
            >
              Contactar
            </button>
            <a
              href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`}
              className="btn btn--md btn--outline"
            >
              Llamar ahora
            </a>
          </div>
        </div>

        {/* Grid */}
        <div className="footer__grid">
          <div className="footer__col">
            <h4 className="footer__heading">Servicios</h4>
            <ul className="footer__list">
              <li><a href="#servicios" className="footer__link" onClick={(e) => { e.preventDefault(); scrollTo('servicios'); }}>Mantenimiento IT</a></li>
              <li><a href="#servicios" className="footer__link" onClick={(e) => { e.preventDefault(); scrollTo('servicios'); }}>Reparacion equipos</a></li>
              <li><a href="#servicios" className="footer__link" onClick={(e) => { e.preventDefault(); scrollTo('servicios'); }}>Soporte urgente 24h</a></li>
              <li><a href="#contacto" className="footer__link" onClick={(e) => { e.preventDefault(); scrollTo('contacto'); }}>Planes empresas</a></li>
            </ul>
          </div>

          <div className="footer__col">
            <h4 className="footer__heading">Empresa</h4>
            <ul className="footer__list">
              <li><a href="#nosotros" className="footer__link" onClick={(e) => { e.preventDefault(); scrollTo('nosotros'); }}>Sobre nosotros</a></li>
              <li><a href="#testimonios" className="footer__link" onClick={(e) => { e.preventDefault(); scrollTo('testimonios'); }}>Casos de exito</a></li>
              <li><a href="#contacto" className="footer__link" onClick={(e) => { e.preventDefault(); scrollTo('contacto'); }}>Trabaja con nosotros</a></li>
            </ul>
          </div>

          <div className="footer__col">
            <h4 className="footer__heading">Legal</h4>
            <ul className="footer__list">
              <li><Link to="/aviso-legal" className="footer__link">Aviso legal</Link></li>
              <li><Link to="/privacidad" className="footer__link">Privacidad</Link></li>
              <li><Link to="/cookies" className="footer__link">Cookies</Link></li>
              <li><Link to="/accesibilidad" className="footer__link">Accesibilidad</Link></li>
            </ul>
          </div>

          <div className="footer__col">
            <h4 className="footer__heading">Contacto</h4>
            <p className="footer__info">
              <a href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`} className="footer__link">
                {CONTACT_INFO.phone}
              </a>
            </p>
            <p className="footer__info">
              <a href={`mailto:${CONTACT_INFO.email}`} className="footer__link">
                {CONTACT_INFO.email}
              </a>
            </p>
            <p className="footer__info" style={{ marginTop: '12px', fontSize: '13px' }}>
              {CONTACT_INFO.address}
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="footer__bottom">
          <p>&copy; {currentYear} Mantenimiento PC Madrid. Todos los derechos reservados.</p>
          <div className="footer__social">
            <a href="#" className="footer__social-link" aria-label="LinkedIn">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a href="#" className="footer__social-link" aria-label="Twitter">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="#" className="footer__social-link" aria-label="Instagram">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
