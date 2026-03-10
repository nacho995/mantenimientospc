import type { ServiceItem, TestimonialItem, StatItem, NavLink, ContactInfo, DifferentiatorItem } from '../types';

export const NAV_LINKS: readonly NavLink[] = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#servicios', label: 'Funciones' },
  { href: '#contacto', label: 'Contacto' },
] as const;

export const SERVICES: readonly ServiceItem[] = [
  {
    id: 'maintenance',
    icon: 'shield',
    title: 'Mantenimiento Informatico Integral',
    description: 'Planes personalizados para empresas y autonomos. Nos encargamos de que tus equipos esten siempre listos para rendir al maximo, con mantenimiento preventivo, correctivo y soporte tecnico continuo.',
    features: ['Revision periodica de sistemas', 'Copias de seguridad automatizadas', 'Monitorizacion de servidores y redes', 'Actualizaciones de software y antivirus', 'Asistencia remota y presencial'],
    color: '#4696a9',
    image: '/images/diagnostico-placa.jpg',
  },
  {
    id: 'repair',
    icon: 'wrench',
    title: 'Reparacion de Ordenadores',
    description: 'Tu equipo no arranca, va lento o tiene errores? Lo reparamos.',
    features: ['Sustitucion de piezas y componentes', 'Limpieza interna y optimizacion de rendimiento', 'Recuperacion de datos y eliminacion de virus', 'Reparacion de portatiles, sobremesa, Mac y PC'],
    color: '#65164b',
    image: '/images/estacion-microscopio.jpg',
  },
  {
    id: 'support',
    icon: 'clock',
    title: 'Soporte Tecnico Urgente',
    description: 'Cuando cada minuto cuenta, estamos contigo.',
    features: ['Asistencia tecnica en menos de 4 horas', 'Diagnostico inmediato y resolucion remota cuando sea posible', 'Desplazamiento urgente de tecnicos cualificados', 'Atencion los 365 dias del ano'],
    color: '#e67e22',
    image: '/images/diagnostico-disco.jpg',
  },
] as const;

export const PLANS_FEATURES: readonly string[] = [
  'Soporte ilimitado',
  'Atencion prioritaria',
  'Gestion de redes, impresoras y servidores',
  'Instalacion de software y configuracion de equipos',
  'Asistencia 24/7',
] as const;

export const STATS: readonly StatItem[] = [
  { id: 'experience', value: '30+', label: 'Anos de experiencia' },
  { id: 'response', value: '<4h', label: 'Tiempo de respuesta' },
  { id: 'satisfaction', value: '95%', label: 'Satisfaccion clientes' },
  { id: 'resolution', value: '75%', label: 'Resolucion in situ' },
] as const;

export const DIFFERENTIATORS: readonly DifferentiatorItem[] = [
  { id: 'd1', text: 'Asistencia en menos de 4 horas' },
  { id: 'd2', text: 'Resolucion in situ en el 75% de los casos' },
  { id: 'd3', text: '95% de satisfaccion de nuestros clientes' },
  { id: 'd4', text: 'Soporte presencial, remoto y telefonico' },
  { id: 'd5', text: 'Atencion 24/7 ante cualquier incidencia' },
  { id: 'd6', text: 'Garantia por escrito en todas nuestras intervenciones' },
  { id: 'd7', text: 'Politica de precios justa y sin sorpresas' },
] as const;

export const TESTIMONIALS: readonly TestimonialItem[] = [
  {
    id: '1',
    name: 'Carlos Martinez',
    role: 'Clinica Dental Sonrisa',
    text: 'Nos recuperaron datos criticos de un servidor que dimos por perdido. Respuesta inmediata y profesionalidad total.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face',
  },
  {
    id: '2',
    name: 'Laura Fernandez',
    role: 'Estudio Creativo LF',
    text: 'El mantenimiento preventivo nos ahorro miles de euros en posibles fallos. Un equipo de confianza absoluta.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=face',
  },
  {
    id: '3',
    name: 'Miguel Angel Torres',
    role: 'Restaurante El Olivo',
    text: 'Montaron toda nuestra red y sistema de TPVs en un fin de semana. Servicio impecable y sin sorpresas.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=face',
  },
] as const;

export const CONTACT_INFO: ContactInfo = {
  phone: '646 46 63 81',
  phone2: '91 935 64 64',
  phone3: '666 89 65 95',
  email: 'info@mantenimientopcmadrid.com',
  address: 'Calle General Alvarez de Castro, 23 LOCAL 9 Y 10, Madrid, 28010',
  hours: 'Lun - Dom: Abierto las 24 Horas',
} as const;

export const IMAGES = {
  // Video principal - circuitos tecnológicos profesionales
  heroVideo: 'https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4',
  // Video alternativo - data center / servidores
  heroVideoAlt: 'https://videos.pexels.com/video-files/5377684/5377684-uhd_2560_1440_24fps.mp4',
  // Poster mientras carga el video
  heroPoster: '/images/procesador-circuitos.jpg',
  // Sección About — laboratorio real
  about: '/images/laboratorio-principal.jpg',
  // Galería de trabajo real
  tallerCompleto: '/images/taller-completo.jpg',
  fuenteAlimentacion: '/images/fuente-alimentacion.jpg',
  diagnosticoPlaca: '/images/diagnostico-placa.jpg',
} as const;
