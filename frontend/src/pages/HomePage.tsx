import type React from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Hero } from '../components/sections/Hero';
import { Services } from '../components/sections/Services';
import { About } from '../components/sections/About';
import { CtaBanner } from '../components/sections/CtaBanner';
import { Differentiators } from '../components/sections/Differentiators';
import { Testimonials } from '../components/sections/Testimonials';
import { Contact } from '../components/sections/Contact';

export function HomePage(): React.JSX.Element {
  const location = useLocation();

  // Cuando se navega desde una página legal con hash (ej. /#contacto),
  // hacer scroll al elemento correspondiente tras montar.
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (!hash) return;

    // Pequeño delay para que el DOM esté listo tras la navegación
    const timer = setTimeout(() => {
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [location.hash]);

  return (
    <main>
      <Hero />
      <Services />
      <About />
      <CtaBanner />
      <Differentiators />
      <Testimonials />
      <Contact />
    </main>
  );
}
