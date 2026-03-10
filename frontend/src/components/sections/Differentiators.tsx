import type React from 'react';
import { useMemo, useEffect, useRef, useCallback } from 'react';
import { DIFFERENTIATORS } from '../../constants';
import { AnimatedSection } from '../ui/AnimatedSection';
import { useCountUp } from '../../hooks/useCountUp';

interface DiffItem {
  readonly title: string;
  readonly icon: React.JSX.Element;
  readonly color: string;
  readonly stat?: { value: string; label: string };
}

// Partículas flotantes para efecto tecnológico
interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

function DiffParticles(): React.JSX.Element {
  const particles = useMemo<Particle[]>(() => 
    Array.from({ length: 10 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 25 + 20,
      delay: Math.random() * 15,
      opacity: Math.random() * 0.5 + 0.3,
    })),
  []);

  return (
    <div className="diff__particles">
      {particles.map((p) => (
        <div
          key={p.id}
          className="diff__particle"
          style={{
            '--px': `${p.x}%`,
            '--py': `${p.y}%`,
            '--psize': `${p.size}px`,
            '--pdur': `${p.duration}s`,
            '--pdelay': `${p.delay}s`,
            '--popacity': p.opacity,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

// Hexágonos flotantes estilo tech
function HexGrid(): React.JSX.Element {
  return (
    <svg className="diff__hexgrid" viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id="hexPattern" width="60" height="52" patternUnits="userSpaceOnUse">
          <polygon 
            points="30,0 60,15 60,45 30,60 0,45 0,15" 
            fill="none" 
            stroke="rgba(255,255,255,0.04)" 
            strokeWidth="0.5"
          />
        </pattern>
        <linearGradient id="hexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(34,211,238,0.3)" />
          <stop offset="50%" stopColor="rgba(14,116,144,0.2)" />
          <stop offset="100%" stopColor="rgba(245,158,11,0.15)" />
        </linearGradient>
        {/* filter removed for performance */}
      </defs>
      
      <rect width="100%" height="100%" fill="url(#hexPattern)" opacity="0.6" />
      
      {/* Hexágonos destacados animados */}
      <g className="diff__hex-group">
        <polygon points="180,120 210,135 210,165 180,180 150,165 150,135" fill="url(#hexGradient)" className="diff__hex diff__hex--1" />
        <polygon points="420,80 450,95 450,125 420,140 390,125 390,95" fill="url(#hexGradient)" className="diff__hex diff__hex--2" />
        <polygon points="720,200 750,215 750,245 720,260 690,245 690,215" fill="url(#hexGradient)" className="diff__hex diff__hex--3" />
        <polygon points="1020,100 1050,115 1050,145 1020,160 990,145 990,115" fill="url(#hexGradient)" className="diff__hex diff__hex--4" />
        <polygon points="1260,180 1290,195 1290,225 1260,240 1230,225 1230,195" fill="url(#hexGradient)" className="diff__hex diff__hex--5" />
        <polygon points="300,520 330,535 330,565 300,580 270,565 270,535" fill="url(#hexGradient)" className="diff__hex diff__hex--6" />
        <polygon points="600,620 630,635 630,665 600,680 570,665 570,635" fill="url(#hexGradient)" className="diff__hex diff__hex--7" />
        <polygon points="900,560 930,575 930,605 900,620 870,605 870,575" fill="url(#hexGradient)" className="diff__hex diff__hex--8" />
        <polygon points="1140,650 1170,665 1170,695 1140,710 1110,695 1110,665" fill="url(#hexGradient)" className="diff__hex diff__hex--9" />
      </g>
      
      {/* Líneas de conexión entre hexágonos */}
      <g className="diff__connections" stroke="url(#hexGradient)" strokeWidth="1" fill="none" opacity="0.4">
        <line x1="180" y1="150" x2="420" y2="110" className="diff__connection diff__connection--1" />
        <line x1="420" y1="110" x2="720" y2="230" className="diff__connection diff__connection--2" />
        <line x1="720" y1="230" x2="1020" y2="130" className="diff__connection diff__connection--3" />
        <line x1="1020" y1="130" x2="1260" y2="210" className="diff__connection diff__connection--4" />
        <line x1="300" y1="550" x2="600" y2="650" className="diff__connection diff__connection--5" />
        <line x1="600" y1="650" x2="900" y2="590" className="diff__connection diff__connection--6" />
        <line x1="900" y1="590" x2="1140" y2="680" className="diff__connection diff__connection--7" />
      </g>
    </svg>
  );
}

// Grid interactivo que sigue el mouse
function InteractiveGlow(): React.JSX.Element {
  const glowRef = useRef<HTMLDivElement>(null);
  const rafId = useRef(0);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(() => {
      const el = glowRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty('--glow-x', `${x}%`);
      el.style.setProperty('--glow-y', `${y}%`);
    });
  }, []);

  useEffect(() => {
    const el = glowRef.current;
    if (!el) return;
    el.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId.current);
    };
  }, [handleMouseMove]);

  return (
    <div 
      ref={glowRef}
      className="diff__interactive-glow"
    />
  );
}

// Componente de stat animado
function AnimatedStat({ value, label }: { value: string; label: string }): React.JSX.Element {
  const match = /([<>]?)(\d+)(.*)/.exec(value);
  const prefix = match?.[1] ?? '';
  const numeric = match?.[2] !== undefined ? Number(match[2]) : NaN;
  const suffix = match?.[3] ?? '';
  const animatedValue = Number.isFinite(numeric) ? useCountUp(numeric, { duration: 2500 }) : undefined;

  return (
    <div className="diff__featured-stat">
      <div className="diff__featured-stat-glow" />
      <span className="diff__featured-stat-value">
        {prefix}
        {animatedValue !== undefined ? Math.round(animatedValue) : value}
        {animatedValue !== undefined ? suffix : ''}
      </span>
      <span className="diff__featured-stat-label">{label}</span>
      <div className="diff__featured-stat-ring" />
    </div>
  );
}

const DIFF_DATA: readonly DiffItem[] = [
  {
    title: 'Respuesta inmediata',
    color: '#22d3ee',
    stat: { value: '<4h', label: 'Tiempo de llegada' },
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    title: 'Alta resolución in situ',
    color: '#34d399',
    stat: { value: '75%', label: 'Resuelto en sitio' },
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
      </svg>
    ),
  },
  {
    title: 'Clientes satisfechos',
    color: '#fbbf24',
    stat: { value: '95%', label: 'Satisfacción' },
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
  },
  {
    title: 'Soporte multicanal',
    color: '#a78bfa',
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
      </svg>
    ),
  },
  {
    title: 'Disponibilidad 24/7',
    color: '#fb923c',
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Garantía escrita',
    color: '#4ade80',
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    title: 'Precios transparentes',
    color: '#38bdf8',
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
      </svg>
    ),
  },
] as const;

export function Differentiators(): React.JSX.Element {
  const featured = DIFFERENTIATORS[0];
  const rest = DIFFERENTIATORS.slice(1);
  const featuredData = DIFF_DATA[0];

  if (!featured || !featuredData) {
    return <section className="differentiators" />;
  }

  return (
    <section className="differentiators">
      {/* Background layers */}
      <div className="diff__bg" />
      <HexGrid />
      <DiffParticles />
      <InteractiveGlow />
      <div className="diff__noise" />
      <div className="diff__vignette" />
      
      <div className="differentiators__container">
        <AnimatedSection className="differentiators__header">
          <div className="diff__header-badge">
            <span className="diff__header-badge-dot" />
            <span>Por qué elegirnos</span>
          </div>
          <h2 className="diff__title">
            <span className="diff__title-line">La diferencia está en</span>
            <span className="diff__title-accent">los detalles</span>
          </h2>
          <p className="diff__subtitle">
            7 razones por las que más de <strong>500 empresas</strong> madrileñas confían en nosotros cada día.
          </p>
        </AnimatedSection>

        <div className="diff__grid">
          {/* Featured card - Bento grande */}
          <AnimatedSection className="diff__featured-wrap">
            <div className="diff__featured"
              style={{ '--card-color': featuredData.color } as React.CSSProperties}
            >
              <div className="diff__featured-glow" />
              <div className="diff__featured-border" />
              
              <div className="diff__featured-content">
                <div className="diff__featured-icon">
                  <div className="diff__featured-icon-bg" />
                  <div className="diff__featured-icon-inner">
                    {featuredData.icon}
                  </div>
                  <div className="diff__featured-icon-ring" />
                </div>
                
                <div className="diff__featured-text">
                  <span className="diff__featured-label">Destacado</span>
                  <h3 className="diff__featured-title">{featuredData.title}</h3>
                  <p className="diff__featured-desc">{featured.text}</p>
                </div>
              </div>
              
              {featuredData.stat && (
                <AnimatedStat value={featuredData.stat.value} label={featuredData.stat.label} />
              )}
            </div>
          </AnimatedSection>

          {/* Secondary cards - Bento grid */}
          {rest.map((item, index) => {
            const data = DIFF_DATA[index + 1];
            if (!data) return null;
            
            const isLarge = index === 0 || index === 3; // Algunas cards más grandes
            
            return (
              <AnimatedSection 
                key={item.id} 
                delay={(index + 1) * 80}
                className={`diff__card-wrap ${isLarge ? 'diff__card-wrap--large' : ''}`}
              >
                <div
                  className={`diff__card ${isLarge ? 'diff__card--large' : ''}`}
                  style={{ '--card-color': data.color } as React.CSSProperties}
                >
                  <div className="diff__card-glow" />
                  <div className="diff__card-border" />
                  <div className="diff__card-shine" />
                  
                  <div className="diff__card-icon">
                    {data.icon}
                  </div>
                  
                  <div className="diff__card-content">
                    <h3 className="diff__card-title">{data.title}</h3>
                    <p className="diff__card-text">{item.text}</p>
                  </div>
                  
                  {data.stat && (
                    <div className="diff__card-stat">
                      <span className="diff__card-stat-value">{data.stat.value}</span>
                      <span className="diff__card-stat-label">{data.stat.label}</span>
                    </div>
                  )}
                  
                  <div className="diff__card-arrow">
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
        
        {/* Bottom stats bar */}
        <AnimatedSection delay={600}>
          <div className="diff__stats-bar">
            <div className="diff__stats-bar-glow" />
            <div className="diff__stat-item">
              <span className="diff__stat-value">30+</span>
              <span className="diff__stat-label">Años de experiencia</span>
            </div>
            <div className="diff__stats-divider" />
            <div className="diff__stat-item">
              <span className="diff__stat-value">500+</span>
              <span className="diff__stat-label">Empresas confían en nosotros</span>
            </div>
            <div className="diff__stats-divider" />
            <div className="diff__stat-item">
              <span className="diff__stat-value">24/7</span>
              <span className="diff__stat-label">Disponibilidad total</span>
            </div>
            <div className="diff__stats-divider" />
            <div className="diff__stat-item">
              <span className="diff__stat-value">100%</span>
              <span className="diff__stat-label">Garantía escrita</span>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
