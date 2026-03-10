/**
 * Servicio de contacto — Single Responsibility.
 * Solo sabe cómo comunicarse con el endpoint de contacto.
 * No sabe nada de UI, hooks ni React.
 * 
 * Interface Segregation: expone solo lo que el formulario necesita.
 * Open/Closed: si añades más endpoints (ej. newsletter), creas otro servicio.
 */
import type { ContactFormData, ApiResponse } from '../types';
import { post } from './api';

interface ContactPayload {
  nombre: string;
  email: string;
  telefono: string;
  empresa: string | null;
  mensaje: string;
}

interface ContactResponse {
  message: string;
}

function toPayload(data: ContactFormData): ContactPayload {
  return {
    nombre: data.nombre.trim(),
    email: data.email.trim().toLowerCase(),
    telefono: data.telefono.trim(),
    empresa: data.empresa.trim() || null,
    mensaje: data.mensaje.trim(),
  };
}

export async function submitContactForm(data: ContactFormData): Promise<ApiResponse<ContactResponse>> {
  const payload = toPayload(data);
  return post<ContactResponse>('/api/contact', payload);
}
