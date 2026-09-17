import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import './DatasheetModal.css';

const emptyForm = {
  email: '',
  phone: '',
  company: '',
  message: '',
};

export default function ContactModal({
  isOpen,
  onClose,
  endpoint = '/api/delibot/contact',
}) {
  const [formData, setFormData] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const emailInputRef = useRef(null);
  const onCloseRef = useRef(onClose);
  const isSubmittingRef = useRef(isSubmitting);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    isSubmittingRef.current = isSubmitting;
  }, [isSubmitting]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && !isSubmittingRef.current) {
        onCloseRef.current();
      }
    };

    const previousBodyOverflow = document.body.style.overflow;
    const focusFrame = window.requestAnimationFrame(() => emailInputRef.current?.focus());

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.cancelAnimationFrame(focusFrame);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousBodyOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setFormData(emptyForm);
      setErrors({});
      setSubmitError('');
      setIsSubmitting(false);
      setIsSuccess(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: '' }));
    setSubmitError('');
  };

  const validate = () => {
    const nextErrors = {};
    if (!formData.email.trim()) {
      nextErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      nextErrors.email = 'Enter a valid email address';
    }
    if (!formData.phone.trim()) {
      nextErrors.phone = 'Phone number is required';
    } else if (!/^[0-9+() .-]{7,20}$/.test(formData.phone.trim())) {
      nextErrors.phone = 'Enter a valid phone number';
    }
    if (!formData.message.trim()) nextErrors.message = 'Message is required';

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          company: formData.company.trim() || null,
          message: formData.message.trim(),
        }),
      });
      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        if (payload.errors) {
          setErrors(Object.fromEntries(
            Object.entries(payload.errors).map(([field, messages]) => [field, messages[0]]),
          ));
        }
        setSubmitError(
          payload.message
          || (response.status >= 500
            ? 'Email service is unavailable. Make sure the Laravel backend is running on port 8000.'
            : 'Unable to send the email. Please try again.'),
        );
        return;
      }

      setIsSuccess(true);
    } catch {
      setSubmitError('Unable to connect to the server. Please try again shortly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return ReactDOM.createPortal(
    <div className="starship-modal-backdrop" onClick={isSubmitting ? undefined : onClose}>
      <div
        className="starship-modal-card"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Contact form"
      >
        <div className="starship-modal-header">
          <button
            type="button"
            className="starship-modal-close"
            onClick={onClose}
            aria-label="Close contact form"
            disabled={isSubmitting}
          >
            ×
          </button>
        </div>

        {!isSuccess ? (
          <form onSubmit={handleSubmit} className="starship-modal-form" noValidate>
            <div className="starship-field-group">
              <input
                ref={emailInputRef}
                type="email"
                name="email"
                className={`starship-input ${errors.email ? 'input-err' : ''}`}
                placeholder="Email*"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                aria-invalid={Boolean(errors.email)}
              />
              {errors.email && <span className="starship-err-text">{errors.email}</span>}
            </div>

            <div className="starship-field-group">
              <input
                type="tel"
                name="phone"
                className={`starship-input ${errors.phone ? 'input-err' : ''}`}
                placeholder="Phone Number*"
                value={formData.phone}
                onChange={handleChange}
                autoComplete="tel"
                inputMode="tel"
                aria-invalid={Boolean(errors.phone)}
              />
              {errors.phone && <span className="starship-err-text">{errors.phone}</span>}
            </div>

            <div className="starship-field-group">
              <input
                type="text"
                name="company"
                className="starship-input"
                placeholder="Company"
                value={formData.company}
                onChange={handleChange}
                autoComplete="organization"
              />
            </div>

            <div className="starship-field-group starship-message-group">
              <textarea
                name="message"
                className={`starship-textarea ${errors.message ? 'input-err' : ''}`}
                placeholder="Message*"
                value={formData.message}
                onChange={handleChange}
                aria-invalid={Boolean(errors.message)}
              />
              {errors.message && <span className="starship-err-text">{errors.message}</span>}
            </div>

            {submitError && <div className="starship-submit-error" role="alert">{submitError}</div>}

            <div className="starship-btn-container">
              <button type="submit" className="starship-submit-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Submit'}
              </button>
            </div>
          </form>
        ) : (
          <div className="starship-success-view" role="status">
            <div className="starship-success-check" aria-hidden="true">✓</div>
            <h3 className="starship-success-title">Thank you for contacting</h3>
            <p className="starship-success-msg">A confirmation email has been sent to your inbox.</p>
            <div className="starship-btn-container starship-success-actions">
              <button type="button" className="starship-submit-btn" onClick={onClose}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
