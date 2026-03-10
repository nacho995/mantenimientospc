import type React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { WhatsAppButton } from './components/ui/WhatsAppButton';
import { CookieBanner } from './components/ui/CookieBanner';
import { HomePage } from './pages/HomePage';
import { AvisoLegal } from './pages/AvisoLegal';
import { Privacidad } from './pages/Privacidad';
import { Cookies } from './pages/Cookies';
import { Accesibilidad } from './pages/Accesibilidad';

export function App(): React.JSX.Element {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/aviso-legal" element={<AvisoLegal />} />
        <Route path="/privacidad" element={<Privacidad />} />
        <Route path="/cookies" element={<Cookies />} />
        <Route path="/accesibilidad" element={<Accesibilidad />} />
      </Routes>
      <Footer />
      <WhatsAppButton />
      <CookieBanner />
    </BrowserRouter>
  );
}
