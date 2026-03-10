import type React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

interface LegalPageProps {
  readonly title: string;
  readonly lastUpdated: string;
  readonly children: React.ReactNode;
}

export function LegalPage({ title, lastUpdated, children }: LegalPageProps): React.JSX.Element {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <main className="legal">
      <div className="legal__header">
        <div className="legal__header-bg" />
        <div className="legal__header-inner">
          <Link to="/" className="legal__back">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            <span>Volver al inicio</span>
          </Link>
          <h1 className="legal__title">{title}</h1>
          <p className="legal__updated">Última actualización: {lastUpdated}</p>
        </div>
      </div>
      <div className="legal__body">
        <div className="legal__content">
          {children}
        </div>
      </div>
    </main>
  );
}
