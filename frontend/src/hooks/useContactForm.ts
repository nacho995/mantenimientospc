/**
 * Hook useContactForm — Single Responsibility.
 * Gestiona TODO el estado del formulario: datos, validación, envío, resultado.
 * El componente Contact.tsx solo renderiza — no tiene lógica.
 * 
 * Dependency Inversion: recibe el servicio como dependencia implícita vía import,
 * pero la lógica de validación está aquí, no en el componente.
 */
import { useState, useCallback } from 'react';
import type { ContactFormData, ContactFormErrors, FormStatus } from '../types';
import { submitContactForm } from '../services/contactService';

const INITIAL_FORM: ContactFormData = {
  nombre: '',
  email: '',
  telefono: '',
  empresa: '',
  mensaje: '',
  privacidad: false,
};

// ===== Validación pura (sin side effects, testeable) =====

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[+]?[\d\s()-]{6,20}$/;

function validateForm(data: ContactFormData): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (!data.nombre.trim()) {
    errors.nombre = 'El nombre es obligatorio';
  } else if (data.nombre.trim().length < 2) {
    errors.nombre = 'El nombre debe tener al menos 2 caracteres';
  }

  if (!data.email.trim()) {
    errors.email = 'El email es obligatorio';
  } else if (!EMAIL_REGEX.test(data.email.trim())) {
    errors.email = 'Introduce un email válido';
  }

  if (!data.telefono.trim()) {
    errors.telefono = 'El teléfono es obligatorio';
  } else if (!PHONE_REGEX.test(data.telefono.trim())) {
    errors.telefono = 'Introduce un teléfono válido';
  }

  if (!data.mensaje.trim()) {
    errors.mensaje = 'El mensaje es obligatorio';
  } else if (data.mensaje.trim().length < 10) {
    errors.mensaje = 'El mensaje debe tener al menos 10 caracteres';
  }

  if (!data.privacidad) {
    errors.privacidad = 'Debes aceptar la política de privacidad';
  }

  return errors;
}

function hasErrors(errors: ContactFormErrors): boolean {
  return Object.keys(errors).length > 0;
}

// ===== Hook =====

interface UseContactFormReturn {
  formData: ContactFormData;
  errors: ContactFormErrors;
  status: FormStatus;
  serverError: string | null;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleCheckbox: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  resetForm: () => void;
}

export function useContactForm(): UseContactFormReturn {
  const [formData, setFormData] = useState<ContactFormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<FormStatus>('idle');
  const [serverError, setServerError] = useState<string | null>(null);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Limpia el error de ese campo al escribir
    setErrors(prev => {
      if (!prev[name as keyof ContactFormErrors]) return prev;
      const next = { ...prev };
      delete next[name as keyof ContactFormErrors];
      return next;
    });
  }, []);

  const handleCheckbox = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
    if (checked) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[name as keyof ContactFormErrors];
        return next;
      });
    }
  }, []);

  const resetForm = useCallback(() => {
    setFormData(INITIAL_FORM);
    setErrors({});
    setStatus('idle');
    setServerError(null);
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    // Validar
    const validationErrors = validateForm(formData);
    if (hasErrors(validationErrors)) {
      setErrors(validationErrors);
      return;
    }

    // Enviar
    setStatus('submitting');
    const result = await submitContactForm(formData);

    if (result.ok) {
      setStatus('success');
      setFormData(INITIAL_FORM);
      setErrors({});
    } else {
      setStatus('error');
      setServerError(result.error ?? 'Error al enviar el mensaje. Inténtalo de nuevo.');
    }
  }, [formData]);

  return {
    formData,
    errors,
    status,
    serverError,
    handleChange,
    handleCheckbox,
    handleSubmit,
    resetForm,
  };
}
