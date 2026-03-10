import type React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

const COOKIE_KEY = 'cookie_consent';

type ConsentState = 'pending' | 'accepted' | 'rejected' | 'custom';

interface CookiePreferences {
  necessary: true; // siempre true
  analytics: boolean;
  marketing: boolean;
}

function getStoredConsent(): ConsentState | null {
  try {
    const stored = localStorage.getItem(COOKIE_KEY);
    if (!stored) return null;
    const parsed = JSON.parse(stored) as { state: ConsentState };
    return parsed.state ?? null;
  } catch {
    return null;
  }
}

function storeConsent(state: ConsentState, preferences: CookiePreferences): void {
  localStorage.setItem(COOKIE_KEY, JSON.stringify({
    state,
    preferences,
    timestamp: new Date().toISOString(),
  }));
}

export function CookieBanner(): React.JSX.Element | null {
  const [visible, setVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const consent = getStoredConsent();
    if (!consent) {
      // Delay para que no aparezca instantáneamente
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = useCallback(() => {
    storeConsent('accepted', { necessary: true, analytics: true, marketing: true });
    setVisible(false);
  }, []);

  const handleRejectAll = useCallback(() => {
    storeConsent('rejected', { necessary: true, analytics: false, marketing: false });
    setVisible(false);
  }, []);

  const handleSavePreferences = useCallback(() => {
    storeConsent('custom', { necessary: true, analytics, marketing });
    setVisible(false);
  }, [analytics, marketing]);

  if (!visible) return null;

  return (
    <div className="cookie-banner" role="dialog" aria-label="Configuración de cookies">
      <div className="cookie-banner__overlay" />
      <div className="cookie-banner__card">
        <div className="cookie-banner__icon">
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
          </svg>
        </div>
        
        <div className="cookie-banner__text">
          <h3 className="cookie-banner__title">Tu privacidad es importante</h3>
          <p className="cookie-banner__desc">
            Utilizamos cookies para mejorar tu experiencia, analizar el tráfico del sitio y personalizar
            el contenido. Puedes aceptar todas, rechazarlas o configurar tus preferencias.
            Consulta nuestra <Link to="/cookies" className="cookie-banner__link">Política de Cookies</Link> y
            nuestra <Link to="/privacidad" className="cookie-banner__link">Política de Privacidad</Link>.
          </p>
        </div>

        {showSettings && (
          <div className="cookie-banner__settings">
            <label className="cookie-banner__option cookie-banner__option--disabled">
              <input type="checkbox" checked disabled />
              <div className="cookie-banner__option-info">
                <span className="cookie-banner__option-name">Cookies necesarias</span>
                <span className="cookie-banner__option-desc">Imprescindibles para el funcionamiento del sitio web. Siempre activas.</span>
              </div>
              <span className="cookie-banner__option-badge">Siempre activas</span>
            </label>

            <label className="cookie-banner__option">
              <input
                type="checkbox"
                checked={analytics}
                onChange={(e) => setAnalytics(e.target.checked)}
              />
              <div className="cookie-banner__option-info">
                <span className="cookie-banner__option-name">Cookies analíticas</span>
                <span className="cookie-banner__option-desc">Nos ayudan a entender cómo interactúas con el sitio web (Google Analytics).</span>
              </div>
            </label>

            <label className="cookie-banner__option">
              <input
                type="checkbox"
                checked={marketing}
                onChange={(e) => setMarketing(e.target.checked)}
              />
              <div className="cookie-banner__option-info">
                <span className="cookie-banner__option-name">Cookies de marketing</span>
                <span className="cookie-banner__option-desc">Permiten mostrar anuncios relevantes y medir campañas (Google Ads).</span>
              </div>
            </label>
          </div>
        )}

        <div className="cookie-banner__actions">
          {showSettings ? (
            <>
              <button className="cookie-banner__btn cookie-banner__btn--primary" onClick={handleSavePreferences} type="button">
                Guardar preferencias
              </button>
              <button className="cookie-banner__btn cookie-banner__btn--secondary" onClick={() => setShowSettings(false)} type="button">
                Volver
              </button>
            </>
          ) : (
            <>
              <button className="cookie-banner__btn cookie-banner__btn--primary" onClick={handleAcceptAll} type="button">
                Aceptar todo
              </button>
              <button className="cookie-banner__btn cookie-banner__btn--outline" onClick={() => setShowSettings(true)} type="button">
                Configurar
              </button>
              <button className="cookie-banner__btn cookie-banner__btn--ghost" onClick={handleRejectAll} type="button">
                Rechazar
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
