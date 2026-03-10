import type React from 'react';
import { SERVICES } from '../../constants';
import { AnimatedSection } from '../ui/AnimatedSection';
import { useScrollTo } from '../../hooks/useScrollTo';

function CheckIcon(): React.JSX.Element {
  return (
    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

function ArrowIcon(): React.JSX.Element {
  return (
    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  );
}

export function Services(): React.JSX.Element {
  const featured = SERVICES[0];
  const secondary = SERVICES.slice(1);
  const scrollTo = useScrollTo();

  if (!featured) {
    return <section id="servicios" className="services" />;
  }

  return (
    <section id="servicios" className="services">
      {/* Background elements */}
      <div className="services__bg-pattern" />
      <div className="services__bg-glow services__bg-glow--1" />
      <div className="services__bg-glow services__bg-glow--2" />

      <div className="services__container">
        <AnimatedSection className="services__header">
          <span className="section-label">
            <span className="section-label__icon">
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
              </svg>
            </span>
            Nuestros servicios
          </span>
          <h2 className="section-title">
            Soluciones IT de<br />
            <span className="section-title--gradient">nueva generación</span>
          </h2>
          <p className="section-description">
            Infraestructura tecnológica avanzada, mantenimiento preventivo
            y soporte técnico de respuesta inmediata para tu empresa.
          </p>
        </AnimatedSection>

        <div className="services__bento">
          {/* Featured service — large card */}
          <AnimatedSection>
            <div className="services__featured">
              <div className="services__featured-glow" />
              <div className="services__featured-border" />
              
              <div className="services__featured-image">
                <img src={featured.image} alt={featured.title} loading="lazy" />
                <div className="services__featured-overlay" />
                <div className="services__featured-img-badge">
                  <span className="services__featured-img-badge-dot" />
                  <span>Más solicitado</span>
                </div>
                <div className="services__featured-img-stats">
                  <div className="services__featured-img-stat">
                    <span className="services__featured-img-stat-value">500+</span>
                    <span className="services__featured-img-stat-label">Empresas</span>
                  </div>
                  <div className="services__featured-img-stat">
                    <span className="services__featured-img-stat-value">24/7</span>
                    <span className="services__featured-img-stat-label">Soporte</span>
                  </div>
                </div>
              </div>

              <div className="services__featured-content">
                <span className="services__featured-badge">
                  <span className="services__featured-badge-icon">
                    <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                    </svg>
                  </span>
                  Servicio Premium
                </span>
                <h3 className="services__featured-title">{featured.title}</h3>
                <p className="services__featured-desc">{featured.description}</p>
                <ul className="services__featured-features">
                  {featured.features.map((feature, i) => (
                    <li
                      key={feature}
                      className="services__featured-feature"
                      style={{ '--delay': `${i * 50}ms` } as React.CSSProperties}
                    >
                      <span className="services__featured-check"><CheckIcon /></span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="services__featured-cta">
                  <button
                    className="btn btn--lg btn--primary btn--shimmer btn--glow"
                    type="button"
                    onClick={() => scrollTo('contacto')}
                  >
                    <span>Solicitar este servicio</span>
                    <ArrowIcon />
                  </button>
                  <div className="services__featured-note">
                    <span className="services__featured-note-icon">
                      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </span>
                    Sin permanencias · Precio cerrado
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Secondary cards */}
          <div className="services__secondary-grid">
            {secondary.map((service, index) => (
              <AnimatedSection key={service.id} delay={(index + 1) * 150}>
                <div
                  className="svc-card"
                  style={{ '--card-color': service.color, '--card-index': index } as React.CSSProperties}
                >
                  <div className="svc-card__glow" />
                  <div className="svc-card__border" />
                  
                  <div className="svc-card__image-wrapper">
                    <span className="svc-card__tag">
                      <span className="svc-card__tag-dot" />
                      {service.id === 'repair' ? 'Reparación' : 'Urgente 24h'}
                    </span>
                    <img
                      src={service.image}
                      alt={service.title}
                      className="svc-card__image"
                      loading="lazy"
                    />
                    <div className="svc-card__image-overlay" />
                    <div className="svc-card__image-shine" />
                  </div>

                  <div className="svc-card__body">
                    <h3 className="svc-card__title">{service.title}</h3>
                    <p className="svc-card__desc">{service.description}</p>
                    <ul className="svc-card__features">
                      {service.features.slice(0, 3).map((feature) => (
                        <li key={feature} className="svc-card__feature">
                          <span className="svc-card__check"><CheckIcon /></span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <button
                      className="svc-card__cta"
                      type="button"
                      onClick={() => scrollTo('contacto')}
                    >
                      <span>Más información</span>
                      <span className="svc-card__cta-icon"><ArrowIcon /></span>
                    </button>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
