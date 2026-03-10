/**
 * Contact.tsx — Solo presentación (Single Responsibility).
 * No contiene lógica de validación, estado ni llamadas API.
 * Todo eso vive en useContactForm (hook) y contactService (servicio).
 * 
 * Open/Closed: si mañana añades más campos, solo tocas el hook y este render.
 * Liskov: el Button acepta las mismas props que un <button> nativo.
 */
import type React from 'react';
import { Link } from 'react-router-dom';
import { CONTACT_INFO } from '../../constants';
import { Button } from '../ui/Button';
import { AnimatedSection } from '../ui/AnimatedSection';
import { useContactForm } from '../../hooks/useContactForm';

// ===== Iconos (componentes puros, sin lógica) =====

function PhoneIcon(): React.JSX.Element {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
    </svg>
  );
}

function EmailIcon(): React.JSX.Element {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  );
}

function LocationIcon(): React.JSX.Element {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  );
}

function ClockIcon(): React.JSX.Element {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

// ===== Componentes de feedback =====

function SuccessMessage({ onReset }: { readonly onReset: () => void }): React.JSX.Element {
  return (
    <div className="contact__success">
      <div className="contact__success-icon">
        <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h3 className="contact__success-title">Mensaje enviado</h3>
      <p className="contact__success-text">
        Hemos recibido tu consulta. Te responderemos en menos de 24 horas.
      </p>
      <button className="contact__success-btn" onClick={onReset} type="button">
        Enviar otro mensaje
      </button>
    </div>
  );
}

function ErrorMessage({ message }: { readonly message: string }): React.JSX.Element {
  return (
    <div className="contact__error-msg">
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
      </svg>
      <span>{message}</span>
    </div>
  );
}

function FieldError({ message }: { readonly message?: string }): React.JSX.Element | null {
  if (!message) return null;
  return <span className="contact__field-error">{message}</span>;
}

// ===== Componente principal =====

export function Contact(): React.JSX.Element {
  const {
    formData,
    errors,
    status,
    serverError,
    handleChange,
    handleCheckbox,
    handleSubmit,
    resetForm,
  } = useContactForm();

  const isSubmitting = status === 'submitting';

  return (
    <section id="contacto" className="contact">
      <div className="contact__container">
        <AnimatedSection className="contact__header">
          <span className="section-label">Contacto</span>
          <h2 className="section-title">
            Iniciemos tu<br />
            <span className="section-title--gradient">transformacion</span>
          </h2>
          <p className="section-description">
            Estamos en Madrid y cubrimos toda la comunidad.
            Cuentanos que necesitas y te responderemos en menos de 24 horas.
          </p>
        </AnimatedSection>

        <div className="contact__layout">
          {/* Info card */}
          <AnimatedSection className="contact__info-col">
            <div className="contact__info-card">
              <h3 className="contact__info-title">Hablemos</h3>
              <p className="contact__info-subtitle">
                Disponibles 24/7 para emergencias tecnologicas
              </p>

              <div className="contact__info-item">
                <span className="contact__info-icon"><PhoneIcon /></span>
                <div>
                  <h4>Telefonos</h4>
                  <a href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`}>{CONTACT_INFO.phone}</a>
                  <br />
                  <a href={`tel:${CONTACT_INFO.phone2.replace(/\s/g, '')}`}>{CONTACT_INFO.phone2}</a>
                  <br />
                  <a href={`tel:${CONTACT_INFO.phone3.replace(/\s/g, '')}`}>{CONTACT_INFO.phone3}</a>
                </div>
              </div>

              <div className="contact__info-item">
                <span className="contact__info-icon"><EmailIcon /></span>
                <div>
                  <h4>Email</h4>
                  <a href={`mailto:${CONTACT_INFO.email}`}>{CONTACT_INFO.email}</a>
                </div>
              </div>

              <div className="contact__info-item">
                <span className="contact__info-icon"><LocationIcon /></span>
                <div>
                  <h4>Oficina</h4>
                  <p>{CONTACT_INFO.address}</p>
                </div>
              </div>

              <div className="contact__info-item">
                <span className="contact__info-icon"><ClockIcon /></span>
                <div>
                  <h4>Horario</h4>
                  <p>{CONTACT_INFO.hours}</p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Form */}
          <AnimatedSection className="contact__form-col" delay={150}>
            {status === 'success' ? (
              <div className="contact__form">
                <SuccessMessage onReset={resetForm} />
              </div>
            ) : (
              <form
                className={`contact__form ${isSubmitting ? 'contact__form--loading' : ''}`}
                onSubmit={handleSubmit}
                noValidate
              >
                <h3 className="contact__form-title">Enviar mensaje</h3>
                <p className="contact__form-subtitle">Te respondemos en menos de 24h</p>

                {serverError && <ErrorMessage message={serverError} />}

                <div className="contact__form-row">
                  <div className={`contact__field ${errors.nombre ? 'contact__field--error' : ''}`}>
                    <label htmlFor="nombre">Nombre *</label>
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      placeholder="Tu nombre completo"
                      disabled={isSubmitting}
                      autoComplete="name"
                    />
                    <FieldError message={errors.nombre} />
                  </div>
                  <div className={`contact__field ${errors.email ? 'contact__field--error' : ''}`}>
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="tu@empresa.com"
                      disabled={isSubmitting}
                      autoComplete="email"
                    />
                    <FieldError message={errors.email} />
                  </div>
                </div>

                <div className="contact__form-row">
                  <div className={`contact__field ${errors.telefono ? 'contact__field--error' : ''}`}>
                    <label htmlFor="telefono">Telefono *</label>
                    <input
                      type="tel"
                      id="telefono"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      placeholder="+34 600 000 000"
                      disabled={isSubmitting}
                      autoComplete="tel"
                    />
                    <FieldError message={errors.telefono} />
                  </div>
                  <div className="contact__field">
                    <label htmlFor="empresa">Empresa</label>
                    <input
                      type="text"
                      id="empresa"
                      name="empresa"
                      value={formData.empresa}
                      onChange={handleChange}
                      placeholder="Nombre de tu empresa (opcional)"
                      disabled={isSubmitting}
                      autoComplete="organization"
                    />
                  </div>
                </div>

                <div className={`contact__field ${errors.mensaje ? 'contact__field--error' : ''}`}>
                  <label htmlFor="mensaje">Mensaje *</label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    rows={4}
                    value={formData.mensaje}
                    onChange={handleChange}
                    placeholder="Cuentanos brevemente que necesitas..."
                    disabled={isSubmitting}
                  />
                  <FieldError message={errors.mensaje} />
                </div>

                <div className={`contact__consent ${errors.privacidad ? 'contact__consent--error' : ''}`}>
                  <label className="contact__checkbox">
                    <input
                      type="checkbox"
                      name="privacidad"
                      checked={formData.privacidad}
                      onChange={handleCheckbox}
                      disabled={isSubmitting}
                    />
                    <span>
                      Acepto la{' '}
                      <Link to="/privacidad" target="_blank" rel="noopener noreferrer">
                        Politica de Privacidad
                      </Link>{' '}
                      y el tratamiento de mis datos
                    </span>
                  </label>
                  <FieldError message={errors.privacidad} />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="contact__submit btn--primary btn--shimmer"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="contact__spinner" />
                      Enviando...
                    </>
                  ) : (
                    'Enviar mensaje'
                  )}
                </Button>
              </form>
            )}
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
