import type React from 'react';
import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { Button } from '../ui/Button';
import { IMAGES, STATS, CONTACT_INFO } from '../../constants';
import { useScrollTo } from '../../hooks/useScrollTo';
import { useCountUp } from '../../hooks/useCountUp';
import { AnimatedSection } from '../ui/AnimatedSection';

// Partículas flotantes para efecto tecnológico
interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

function FloatingParticles(): React.JSX.Element {
  const particles = useMemo<Particle[]>(() => 
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 10,
    })),
  []);

  return (
    <div className="hero__particles">
      {particles.map((p) => (
        <div
          key={p.id}
          className="hero__particle"
          style={{
            '--px': `${p.x}%`,
            '--py': `${p.y}%`,
            '--psize': `${p.size}px`,
            '--pdur': `${p.duration}s`,
            '--pdelay': `${p.delay}s`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

// Líneas de conexión estilo circuito
function CircuitLines(): React.JSX.Element {
  return (
    <svg className="hero__circuit" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="circuitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(14,116,144,0.6)" />
          <stop offset="50%" stopColor="rgba(34,211,238,0.4)" />
          <stop offset="100%" stopColor="rgba(14,116,144,0.2)" />
        </linearGradient>
        {/* SVG filter removed for GPU performance */}
      </defs>
      
      {/* Líneas horizontales animadas */}
      <g className="hero__circuit-lines">
        <path d="M-100,150 H400 L450,200 H800 L850,150 H1540" stroke="url(#circuitGrad)" strokeWidth="1.5" fill="none" className="hero__circuit-line hero__circuit-line--1" />
        <path d="M-100,350 H300 L350,400 H600 L650,350 H900 L950,400 H1540" stroke="url(#circuitGrad)" strokeWidth="1" fill="none" className="hero__circuit-line hero__circuit-line--2" />
        <path d="M-100,550 H200 L250,500 H700 L750,550 H1100 L1150,500 H1540" stroke="url(#circuitGrad)" strokeWidth="1.5" fill="none" className="hero__circuit-line hero__circuit-line--3" />
        <path d="M-100,750 H150 L200,700 H500 L550,750 H850 L900,700 H1200 L1250,750 H1540" stroke="url(#circuitGrad)" strokeWidth="1" fill="none" className="hero__circuit-line hero__circuit-line--4" />
      </g>
      
      {/* Nodos de conexión */}
      <g className="hero__circuit-nodes">
        <circle cx="400" cy="150" r="4" fill="rgba(34,211,238,0.8)" className="hero__circuit-node" />
        <circle cx="800" cy="150" r="3" fill="rgba(14,116,144,0.6)" className="hero__circuit-node" />
        <circle cx="300" cy="350" r="3" fill="rgba(34,211,238,0.6)" className="hero__circuit-node" />
        <circle cx="600" cy="400" r="5" fill="rgba(14,116,144,0.8)" className="hero__circuit-node" />
        <circle cx="900" cy="350" r="4" fill="rgba(34,211,238,0.7)" className="hero__circuit-node" />
        <circle cx="250" cy="500" r="4" fill="rgba(14,116,144,0.7)" className="hero__circuit-node" />
        <circle cx="700" cy="550" r="3" fill="rgba(34,211,238,0.6)" className="hero__circuit-node" />
        <circle cx="1100" cy="500" r="5" fill="rgba(14,116,144,0.8)" className="hero__circuit-node" />
        <circle cx="500" cy="750" r="4" fill="rgba(34,211,238,0.7)" className="hero__circuit-node" />
        <circle cx="850" cy="700" r="3" fill="rgba(14,116,144,0.6)" className="hero__circuit-node" />
        <circle cx="1200" cy="750" r="4" fill="rgba(34,211,238,0.8)" className="hero__circuit-node" />
      </g>
      
      {/* Pulsos que viajan por las líneas */}
      <g className="hero__circuit-pulses">
        <circle r="6" fill="rgba(34,211,238,0.9)" className="hero__circuit-pulse hero__circuit-pulse--1">
          <animateMotion dur="8s" repeatCount="indefinite" path="M-100,150 H400 L450,200 H800 L850,150 H1540" />
        </circle>
        <circle r="5" fill="rgba(14,116,144,0.8)" className="hero__circuit-pulse hero__circuit-pulse--2">
          <animateMotion dur="10s" repeatCount="indefinite" path="M-100,350 H300 L350,400 H600 L650,350 H900 L950,400 H1540" />
        </circle>
        <circle r="7" fill="rgba(34,211,238,0.9)" className="hero__circuit-pulse hero__circuit-pulse--3">
          <animateMotion dur="12s" repeatCount="indefinite" path="M-100,550 H200 L250,500 H700 L750,550 H1100 L1150,500 H1540" />
        </circle>
        <circle r="4" fill="rgba(14,116,144,0.7)" className="hero__circuit-pulse hero__circuit-pulse--4">
          <animateMotion dur="9s" repeatCount="indefinite" path="M-100,750 H150 L200,700 H500 L550,750 H850 L900,700 H1200 L1250,750 H1540" />
        </circle>
      </g>
    </svg>
  );
}

interface HeroStatProps {
  readonly value: string;
  readonly label: string;
  readonly icon: React.JSX.Element;
  readonly index: number;
}

function HeroStatCard({ value, label, icon, index }: HeroStatProps): React.JSX.Element {
  const match = /([0-9.]+)(.*)/.exec(value);
  const numeric = match?.[1] !== undefined ? Number(match[1]) : NaN;
  const suffix = match?.[2] ?? '';
  const animatedValue = Number.isFinite(numeric) ? useCountUp(numeric, { duration: 2000 + index * 200 }) : undefined;

  return (
    <div 
      className="hero__stat-card" 
      style={{ '--index': index } as React.CSSProperties}
    >
      <div className="hero__stat-bg" />
      <div className="hero__stat-border" />
      <div className="hero__stat-content">
        <div className="hero__stat-icon">{icon}</div>
        <span className="hero__stat-value">
          {animatedValue !== undefined ? Math.round(animatedValue) : value}
          {animatedValue !== undefined ? suffix : ''}
        </span>
        <span className="hero__stat-label">{label}</span>
      </div>
      <div className="hero__stat-glow" />
    </div>
  );
}

const STAT_ICONS: React.JSX.Element[] = [
  <svg key="exp" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
  </svg>,
  <svg key="resp" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
  </svg>,
  <svg key="sat" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
  </svg>,
  <svg key="res" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
  </svg>,
];

function MorphingBlobs(): React.JSX.Element {
  return (
    <div className="hero__blobs">
      <svg className="hero__blob hero__blob--1" viewBox="0 0 200 200">
        <defs>
          <linearGradient id="blob1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(14,116,144,0.4)" />
            <stop offset="100%" stopColor="rgba(34,184,216,0.2)" />
          </linearGradient>
        </defs>
        <path fill="url(#blob1)" d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.5,90,-16.3,88.5,-0.9C87,14.5,81.4,29,73.1,42.1C64.8,55.2,53.8,66.9,40.4,74.3C27,81.7,11.2,84.8,-3.7,90.2C-18.6,95.6,-32.5,103.3,-45.9,102.3C-59.3,101.3,-72.2,91.6,-80.8,78.3C-89.4,65,-93.7,48.1,-94.8,31.7C-95.9,15.3,-93.8,-0.6,-89.4,-15.5C-85,-30.4,-78.3,-44.3,-67.8,-54.1C-57.3,-63.9,-43,-69.6,-29.2,-77C-15.4,-84.4,-2.1,-93.5,10.1,-92.8C22.3,-92.1,30.6,-83.6,44.7,-76.4Z" transform="translate(100 100)" />
      </svg>
      <svg className="hero__blob hero__blob--2" viewBox="0 0 200 200">
        <defs>
          <linearGradient id="blob2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(245,158,11,0.25)" />
            <stop offset="100%" stopColor="rgba(251,191,36,0.1)" />
          </linearGradient>
        </defs>
        <path fill="url(#blob2)" d="M39.9,-67.8C52.5,-61.3,64.2,-52.6,72.4,-40.8C80.6,-29,85.3,-14.5,85.3,0C85.3,14.5,80.6,29,72.3,41.1C64,53.2,52.1,62.9,38.9,69.8C25.7,76.7,11.1,80.8,-2.9,85.1C-16.9,89.4,-30.2,93.9,-43.4,90.3C-56.6,86.7,-69.7,75,-77.6,60.5C-85.5,46,-88.2,28.7,-88.7,11.7C-89.2,-5.3,-87.5,-22,-81.1,-36.3C-74.7,-50.6,-63.6,-62.5,-50.2,-68.8C-36.8,-75.1,-21.1,-75.8,-6,-77.8C9.1,-79.8,27.3,-74.3,39.9,-67.8Z" transform="translate(100 100)" />
      </svg>
      <svg className="hero__blob hero__blob--3" viewBox="0 0 200 200">
        <defs>
          <linearGradient id="blob3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(14,116,144,0.2)" />
            <stop offset="100%" stopColor="rgba(6,78,99,0.3)" />
          </linearGradient>
        </defs>
        <path fill="url(#blob3)" d="M47.7,-79.1C62.3,-72.3,75,-60.5,82.5,-45.9C90,-31.3,92.3,-13.9,90.2,2.4C88.1,18.7,81.6,33.9,72.1,47.1C62.6,60.3,50.1,71.5,35.7,78.5C21.3,85.5,5,88.3,-10.8,86.8C-26.6,85.3,-41.9,79.5,-54.9,70.1C-67.9,60.7,-78.6,47.7,-84.5,32.7C-90.4,17.7,-91.5,0.7,-88.2,-15.1C-84.9,-30.9,-77.2,-45.5,-65.8,-56.4C-54.4,-67.3,-39.3,-74.5,-24.2,-78.5C-9.1,-82.5,6,-83.3,20.5,-81.4C35,-79.5,33.1,-85.9,47.7,-79.1Z" transform="translate(100 100)" />
      </svg>
    </div>
  );
}

function InteractiveGrid(): React.JSX.Element {
  const gridRef = useRef<HTMLDivElement>(null);
  const rafId = useRef(0);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(() => {
      const el = gridRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty('--mouse-x', `${x}%`);
      el.style.setProperty('--mouse-y', `${y}%`);
    });
  }, []);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    el.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId.current);
    };
  }, [handleMouseMove]);

  return (
    <div 
      ref={gridRef}
      className="hero__grid"
    />
  );
}

export function Hero(): React.JSX.Element {
  const scrollTo = useScrollTo();
  const [isLoaded, setIsLoaded] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleVideoLoaded = useCallback(() => {
    setVideoLoaded(true);
  }, []);

  return (
    <section id="inicio" className={`hero ${isLoaded ? 'hero--loaded' : ''} ${videoLoaded ? 'hero--video-loaded' : ''}`}>
      {/* Capa base oscura */}
      <div className="hero__bg" />
      
      {/* VIDEO PRINCIPAL - Fondo inmersivo */}
      <div className="hero__video-container">
        <video
          ref={videoRef}
          className="hero__video"
          autoPlay
          muted
          loop
          playsInline
          poster={IMAGES.heroPoster}
          onLoadedData={handleVideoLoaded}
        >
          <source src={IMAGES.heroVideo} type="video/mp4" />
        </video>
        {/* Overlay cinematográfico sobre el video */}
        <div className="hero__video-overlay" />
        <div className="hero__video-color-grade" />
      </div>
      
      {/* Efectos visuales superpuestos */}
      <MorphingBlobs />
      <CircuitLines />
      <FloatingParticles />
      <InteractiveGrid />
      
      {/* Efectos de post-procesado */}
      <div className="hero__vignette" />
      <div className="hero__noise" />
      <div className="hero__gradient-bottom" />

      <div className="hero__content-wrapper">
        <div className="hero__inner">
          <AnimatedSection className="hero__content">
            {/* Status badge */}
            <div className="hero__status">
              <span className="hero__status-dot">
                <span className="hero__status-pulse" />
              </span>
              <span className="hero__status-text">Disponible 24/7</span>
              <span className="hero__status-divider" />
              <span className="hero__status-text">Desde 1995</span>
              <span className="hero__status-divider" />
              <span className="hero__status-text">Madrid</span>
            </div>

            {/* Título con efecto de texto */}
            <h1 className="hero__title">
              <span className="hero__title-line">
                <span className="hero__title-word" style={{ '--i': 0 } as React.CSSProperties}>Tu</span>
                <span className="hero__title-word" style={{ '--i': 1 } as React.CSSProperties}>empresa</span>
              </span>
              <span className="hero__title-line">
                <span className="hero__title-accent" style={{ '--i': 2 } as React.CSSProperties}>
                  siempre operativa
                </span>
              </span>
              <span className="hero__title-line">
                <span className="hero__title-word" style={{ '--i': 3 } as React.CSSProperties}>con</span>
                <span className="hero__title-word" style={{ '--i': 4 } as React.CSSProperties}>expertos</span>
                <span className="hero__title-highlight" style={{ '--i': 5 } as React.CSSProperties}>IT</span>
              </span>
            </h1>

            <p className="hero__description">
              <span className="hero__description-line">
                Más de 30 años protegiendo la infraestructura tecnológica
              </span>
              <span className="hero__description-line">
                de empresas en Madrid. <strong>Respuesta garantizada en menos de 4 horas.</strong>
              </span>
            </p>

            {/* CTAs */}
            <div className="hero__cta-group">
              <Button
                variant="primary"
                size="lg"
                onClick={() => scrollTo('contacto')}
                className="hero__cta-primary"
              >
                <span>Solicitar presupuesto</span>
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
              </Button>

              <a href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`} className="hero__cta-phone">
                <span className="hero__cta-phone-icon">
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  <span className="hero__cta-phone-ring" />
                </span>
                <span className="hero__cta-phone-info">
                  <span className="hero__cta-phone-label">Llámanos ahora</span>
                  <span className="hero__cta-phone-number">{CONTACT_INFO.phone}</span>
                </span>
              </a>
            </div>

            {/* Trust badges */}
            <div className="hero__trust">
              <div className="hero__trust-item">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
                <span>Garantía escrita</span>
              </div>
              <div className="hero__trust-item hero__trust-item--gold">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                </svg>
                <span>5.0 en Google</span>
              </div>
              <div className="hero__trust-item">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Sin permanencia</span>
              </div>
            </div>
          </AnimatedSection>

          {/* Stats */}
          <AnimatedSection className="hero__stats" delay={400}>
            <div className="hero__stats-grid">
              {STATS.map((stat, i) => (
                <HeroStatCard
                  key={stat.id}
                  value={stat.value}
                  label={stat.label}
                  icon={STAT_ICONS[i] ?? STAT_ICONS[0]!}
                  index={i}
                />
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero__scroll-indicator">
        <div className="hero__scroll-track">
          <div className="hero__scroll-thumb" />
        </div>
        <span className="hero__scroll-label">Scroll</span>
      </div>
    </section>
  );
}
