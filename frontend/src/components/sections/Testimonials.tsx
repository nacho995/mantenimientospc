import type React from 'react';
import { TESTIMONIALS } from '../../constants';
import { AnimatedSection } from '../ui/AnimatedSection';

function StarRating({ rating }: { readonly rating: number }): React.JSX.Element {
  return (
    <div className="testimonial-card__stars">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={`testimonial-card__star${i < rating ? '' : ' testimonial-card__star--empty'}`}>
          ★
        </span>
      ))}
    </div>
  );
}

function VerifiedBadge(): React.JSX.Element {
  return (
    <div className="testimonial-card__verified">
      <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
      Cliente verificado
    </div>
  );
}

export function Testimonials(): React.JSX.Element {
  const featured = TESTIMONIALS[0];
  const rest = TESTIMONIALS.slice(1);

  if (!featured) {
    return <section id="testimonios" className="testimonials" />;
  }

  return (
    <section id="testimonios" className="testimonials">
      {/* Rating global header */}
      <div className="testimonials__global-bar">
        <div className="testimonials__global-bar-inner">
          <div className="testimonials__global-score">
            <span className="testimonials__global-num">4.9</span>
            <div>
              <div className="testimonials__global-stars">
                {Array.from({ length: 5 }, (_, i) => (
                  <span key={i} style={{ color: '#f59e0b', fontSize: '18px' }}>★</span>
                ))}
              </div>
              <span className="testimonials__global-label">Valoración media · +500 clientes</span>
            </div>
          </div>
          <div className="testimonials__global-divider" />
          <div className="testimonials__global-platforms">
            <div className="testimonials__platform">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#4285F4' }}>
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span>Google Reviews</span>
            </div>
            <div className="testimonials__platform">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#0A66C2">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              <span>LinkedIn</span>
            </div>
          </div>
        </div>
      </div>

      <div className="testimonials__container">
        <AnimatedSection className="testimonials__header">
          <span className="section-label">Testimonios reales</span>
          <h2 className="section-title">
            Clientes que<br />
            <span className="section-title--gradient">confían en nosotros</span>
          </h2>
          <p className="section-description" style={{ margin: '0 auto' }}>
            Más de 500 empresas madrileñas nos avalan. Lee lo que dicen sobre nosotros.
          </p>
        </AnimatedSection>

        <div className="testimonials__grid">
          {/* Featured testimonial */}
          <AnimatedSection>
            <div className="testimonial-card testimonial-card--featured">
              <div className="testimonial-card__top">
                <StarRating rating={featured.rating} />
                <VerifiedBadge />
              </div>
              <p className="testimonial-card__text">&ldquo;{featured.text}&rdquo;</p>
              <div className="testimonial-card__author">
                <img
                  className="testimonial-card__avatar"
                  src={featured.avatar}
                  alt={featured.name}
                  loading="lazy"
                />
                <div className="testimonial-card__author-info">
                  <p className="testimonial-card__name">{featured.name}</p>
                  <p className="testimonial-card__role">{featured.role}</p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Secondary testimonials */}
          {rest.map((testimonial, index) => (
            <AnimatedSection key={testimonial.id} delay={(index + 1) * 100}>
              <div className="testimonial-card">
                <div className="testimonial-card__top">
                  <StarRating rating={testimonial.rating} />
                  <VerifiedBadge />
                </div>
                <p className="testimonial-card__text">&ldquo;{testimonial.text}&rdquo;</p>
                <div className="testimonial-card__author">
                  <img
                    className="testimonial-card__avatar"
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    loading="lazy"
                  />
                  <div className="testimonial-card__author-info">
                    <p className="testimonial-card__name">{testimonial.name}</p>
                    <p className="testimonial-card__role">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
