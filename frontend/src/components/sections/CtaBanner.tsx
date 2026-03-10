import type React from 'react';
import { AnimatedSection } from '../ui/AnimatedSection';
import { useScrollTo } from '../../hooks/useScrollTo';
import { CONTACT_INFO, PLANS_FEATURES, IMAGES } from '../../constants';

export function CtaBanner(): React.JSX.Element {
  const scrollTo = useScrollTo();

  return (
    <section className="cta-banner">
      <div className="cta-banner__bg">
        <div className="cta-banner__bg-glow cta-banner__bg-glow--1" />
        <div className="cta-banner__bg-glow cta-banner__bg-glow--2" />

        <div className="cta-banner__container">
          {/* Left content */}
          <AnimatedSection className="cta-banner__content">
            <span className="cta-banner__label">Planes empresariales</span>
            <h2 className="cta-banner__title">
              IT sin límites<br />para tu empresa
            </h2>
            <p className="cta-banner__text">
              Planes de mantenimiento adaptados a cada negocio.
              Sin permanencias, sin letra pequeña, sin sorpresas.
              Solo resultados.
            </p>

            {/* Teléfonos destacados */}
            <div className="cta-banner__phones">
              <a href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`} className="cta-banner__phone-main">
                <div className="cta-banner__phone-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" width={20} height={20}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </div>
                <div>
                  <span className="cta-banner__phone-label">Llámanos ahora</span>
                  <span className="cta-banner__phone-number">{CONTACT_INFO.phone}</span>
                </div>
              </a>
              <div className="cta-banner__phone-alts">
                <a href={`tel:${CONTACT_INFO.phone2.replace(/\s/g, '')}`} className="cta-banner__phone-alt">
                  {CONTACT_INFO.phone2}
                </a>
                <span>·</span>
                <a href={`tel:${CONTACT_INFO.phone3.replace(/\s/g, '')}`} className="cta-banner__phone-alt">
                  {CONTACT_INFO.phone3}
                </a>
              </div>
            </div>

            <div className="cta-banner__actions">
              <button
                className="btn btn--lg btn--white btn--shimmer"
                onClick={() => scrollTo('contacto')}
                type="button"
              >
                Solicitar plan empresarial
              </button>
            </div>
          </AnimatedSection>

          {/* Right features card */}
          <AnimatedSection delay={150}>
            <div className="cta-banner__card">
              <div className="cta-banner__card-header">
                <div className="cta-banner__card-icon">
                  <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                </div>
                <div>
                  <h3 className="cta-banner__card-title">Todo incluido</h3>
                  <p className="cta-banner__card-subtitle">Sin costes ocultos</p>
                </div>
              </div>
              <ul className="cta-banner__features">
                {PLANS_FEATURES.map((feature) => (
                  <li key={feature} className="cta-banner__feature">
                    <span className="cta-banner__check">
                      <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="cta-banner__card-footer">
                <span className="cta-banner__card-footer-dot" />
                Disponibles 24/7 · Respuesta &lt;4h
              </div>
            </div>

            {/* Mini-galería de instalaciones reales */}
            <div className="cta-banner__gallery">
              <div className="cta-banner__gallery-item">
                <img src={IMAGES.tallerCompleto} alt="Taller de reparación con equipos profesionales" loading="lazy" />
              </div>
              <div className="cta-banner__gallery-item">
                <img src={IMAGES.fuenteAlimentacion} alt="Equipos de diagnóstico y medición" loading="lazy" />
              </div>
              <span className="cta-banner__gallery-label">Nuestras instalaciones reales</span>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
