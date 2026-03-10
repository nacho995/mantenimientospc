export interface ServiceItem {
  readonly id: string;
  readonly icon: string;
  readonly title: string;
  readonly description: string;
  readonly features: readonly string[];
  readonly color: string;
  readonly image: string;
}

export interface TestimonialItem {
  readonly id: string;
  readonly name: string;
  readonly role: string;
  readonly text: string;
  readonly rating: number;
  readonly avatar: string;
}

export interface StatItem {
  readonly id: string;
  readonly value: string;
  readonly label: string;
}

export interface NavLink {
  readonly href: string;
  readonly label: string;
}

export interface ContactInfo {
  readonly phone: string;
  readonly phone2: string;
  readonly phone3: string;
  readonly email: string;
  readonly address: string;
  readonly hours: string;
}

export interface DifferentiatorItem {
  readonly id: string;
  readonly text: string;
}

// ===== Contact Form =====

export interface ContactFormData {
  nombre: string;
  email: string;
  telefono: string;
  empresa: string;
  mensaje: string;
  privacidad: boolean;
}

export interface ContactFormErrors {
  nombre?: string;
  email?: string;
  telefono?: string;
  mensaje?: string;
  privacidad?: string;
}

export type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export interface ApiResponse<T = unknown> {
  readonly ok: boolean;
  readonly data?: T;
  readonly error?: string;
}
