import { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export function useScrollTo(): (elementId: string) => void {
  const navigate = useNavigate();
  const location = useLocation();

  return useCallback((elementId: string) => {
    // Si estamos en la home, scroll directo
    if (location.pathname === '/') {
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      return;
    }

    // Si estamos en otra página (legal, etc.), navegar a home con hash
    void navigate(`/#${elementId}`);
  }, [navigate, location.pathname]);
}
