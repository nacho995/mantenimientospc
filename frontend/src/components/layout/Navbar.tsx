import type React from 'react';
import { useState, useCallback } from 'react';
import { NAV_LINKS, CONTACT_INFO } from '../../constants';
import { useScrollTo } from '../../hooks/useScrollTo';

export function Navbar(): React.JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const scrollTo = useScrollTo();

  const handleNavClick = useCallback(
    (href: string) => {
      const id = href.replace('#', '');
      scrollTo(id);
      setIsMenuOpen(false);
    },
    [scrollTo]
  );

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  return (
    <nav className="navbar">
      {/* Top bar con teléfono */}
      <div className="navbar__topbar">
        <div className="navbar__topbar-inner">
          <span className="navbar__topbar-text">
            <span className="navbar__topbar-dot" />
            Disponibles 24/7 para emergencias
          </span>
          <div className="navbar__topbar-phones">
            <a href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`} className="navbar__topbar-phone">
              <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              {CONTACT_INFO.phone}
            </a>
            <span className="navbar__topbar-sep">·</span>
            <a href={`tel:${CONTACT_INFO.phone2.replace(/\s/g, '')}`} className="navbar__topbar-phone">
              {CONTACT_INFO.phone2}
            </a>
          </div>
        </div>
      </div>

      <div className="navbar__container">
        <a href="#inicio" className="navbar__brand" onClick={() => handleNavClick('#inicio')}>
          <div className="navbar__logo">
            <img src="/logo.jpeg" alt="Mantenimiento PC" width="64" height="64" style={{ borderRadius: '10px', objectFit: 'contain' }} />
          </div>
          <span className="navbar__name">Mantenimiento<strong>PC</strong></span>
        </a>

        <div className={`navbar__links ${isMenuOpen ? 'navbar__links--open' : ''}`}>
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="navbar__link"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contacto"
            className="navbar__cta"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#contacto');
            }}
          >
            Contactar ahora
          </a>
        </div>

        <button
          className={`navbar__burger ${isMenuOpen ? 'navbar__burger--open' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
          type="button"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  );
}
