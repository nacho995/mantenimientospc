import type React from 'react';
import { AnimatedSection } from '../ui/AnimatedSection';
import { Button } from '../ui/Button';
import { IMAGES } from '../../constants';
import { useScrollTo } from '../../hooks/useScrollTo';
import { useCountUp } from '../../hooks/useCountUp';

const TIMELINE: readonly { year: string; event: string; icon: React.JSX.Element }[] = [
  {
    year: '1995',
    event: 'Fundación en Madrid',
    icon: (
      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
      </svg>
    ),
  },
  {
    year: '2005',
    event: 'Soporte empresarial',
    icon: (
      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
      </svg>
    ),
  },
  {
    year: '2015',
    event: 'Soporte 24/7',
    icon: (
      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    year: '2024',
    event: 'Líderes en Madrid',
    icon: (
      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
      </svg>
    ),
  },
] as const;

function AnimatedStat({ value, label }: { value: number; label: string }): React.JSX.Element {
  const animatedValue = useCountUp(value);
  return (
    <div className="about__stat">
      <span className="about__stat-value">{Math.round(animatedValue)}%</span>
      <span className="about__stat-label">{label}</span>
    </div>
  );
}

export function About(): React.JSX.Element {
  const scrollTo = useScrollTo();

  return (
    <section id="nosotros" className="about">
      {/* Background elements */}
      <div className="about__bg-pattern" />
      <div className="about__bg-glow about__bg-glow--1" />
      <div className="about__bg-glow about__bg-glow--2" />

      <div className="about__container">
        <div className="about__layout">
          <AnimatedSection className="about__visual">
            <div className="about__image-container">
              <div className="about__image-glow" />
              <div className="about__image-wrapper">
                <img
                  className="about__image"
                  src={IMAGES.about}
                  alt="Equipo técnico profesional"
                  loading="lazy"
                />
                <div className="about__image-overlay" />
                <div className="about__image-grid" />
              </div>

              {/* Badge flotante años */}
              <div className="about__metric">
                <div className="about__metric-glow" />
                <span className="about__metric-value">30+</span>
                <span className="about__metric-label">Años liderando</span>
                <div className="about__metric-ring" />
              </div>

              {/* Badge flotante rating */}
              <div className="about__metric-2">
                <div className="about__metric-2-stars">
                  {Array.from({ length: 5 }, (_, i) => (
                    <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#f59e0b">
                      <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                    </svg>
                  ))}
                </div>
                <span className="about__metric-2-value">4.9 / 5</span>
                <span className="about__metric-2-label">+500 valoraciones</span>
              </div>

              {/* Badge verificado */}
              <div className="about__badge-verified">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                </svg>
                <span>Empresa verificada</span>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection className="about__content" delay={200}>
            <span className="section-label">
              <span className="section-label__icon">
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                </svg>
              </span>
              Sobre nosotros
            </span>
            <h2 className="section-title">
              Pioneros en<br />
              <span className="section-title--gradient">soporte IT</span>
            </h2>

            <p className="about__quote">
              <span className="about__quote-mark">"</span>
              Desde 1995 transformamos la manera en que las empresas
              gestionan su tecnología. Somos más que soporte, somos tu equipo.
            </p>

            <p className="about__text">
              Nuestro equipo de ingenieros certificados combina décadas de
              experiencia con las últimas tecnologías para ofrecer soluciones
              que realmente impulsan tu negocio.
            </p>

            {/* Timeline espectacular */}
            <div className="about__timeline">
              <div className="about__timeline-line">
                <div className="about__timeline-line-fill" />
              </div>
              {TIMELINE.map((item, i) => (
                <div
                  key={item.year}
                  className="about__timeline-item"
                  style={{ '--delay': `${i * 100}ms` } as React.CSSProperties}
                >
                  <div className="about__timeline-dot">
                    <div className="about__timeline-dot-ring" />
                    <div className="about__timeline-dot-icon">{item.icon}</div>
                  </div>
                  <div className="about__timeline-content">
                    <span className="about__timeline-year">{item.year}</span>
                    <span className="about__timeline-event">{item.event}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats row */}
            <div className="about__stats">
              <AnimatedStat value={95} label="Satisfacción" />
              <div className="about__stats-divider" />
              <div className="about__stat">
                <span className="about__stat-value">&lt;4h</span>
                <span className="about__stat-label">Respuesta</span>
              </div>
              <div className="about__stats-divider" />
              <AnimatedStat value={75} label="In situ" />
            </div>

            <div className="about__cta">
              <Button variant="secondary" size="lg" onClick={() => scrollTo('contacto')} className="btn--glow">
                <span>Solicitar presupuesto</span>
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
