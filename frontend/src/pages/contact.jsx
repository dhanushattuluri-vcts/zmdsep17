import React from 'react';
import '../assets/css/contact.css';
import hyderabadIcon from '../assets/images/contact/hyderabad-icon-v2.webp';

function ContactIcon({ name }) {
  const paths = {
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 7 9-7" /></>,
    pin: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
    phone: <path d="M21 16.5v3a2 2 0 0 1-2.2 2 19.7 19.7 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.7 19.7 0 0 1 1.1 3.8 2 2 0 0 1 3.1 1.6h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L7 9.6a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2Z" />,
    send: <><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></>,
  };

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

function LocationIcon({ name }) {
  if (name === 'china') {
    return (
      <svg className="contact-location-icon contact-location-icon--china" viewBox="0 0 80 80" aria-hidden="true">
        <path d="M6 35c13 1 25-3 34-13 9 10 21 14 34 13M10 39c19 5 41 5 60 0M16 32h48" />
        <path d="M21 25c6 0 13-3 19-9 6 6 13 9 19 9M25 27h30M32 17h16M37 13l3-7 3 7" />
        <path d="M16 39v27M64 39v27M22 42v24M31 42v24M40 42v24M49 42v24M58 42v24" />
        <path d="M13 66h54M9 71h62M21 50h38M21 58h38M25 50v8M34 50v8M46 50v8M55 50v8" />
        <path d="M13 66 9 71M67 66l4 5M5 34l5 5M75 34l-5 5" />
      </svg>
    );
  }

  if (name === 'bengaluru') {
    return (
      <svg className="contact-location-icon contact-location-icon--bengaluru" viewBox="0 0 80 80" aria-hidden="true">
        <path d="M8 71h64M12 67h56M15 67V39h15v28M50 67V39h15v28M30 67V27h20v40" />
        <path d="M14 39h17M49 39h17M18 34h9M53 34h9M20 29h5M55 29h5" />
        <path d="M21 29v-9M59 29v-9M18 20l4-7 5 7M53 20l6-9 6 9M22 13V8M59 11V6" />
        <path d="M33 27h14M35 21h10M37 16h6M40 16V5M36 13l4-8 4 8" />
        <path d="M34 67V50c0-8 12-8 12 0v17M19 46h7M19 54h7M19 61h7M54 46h7M54 54h7M54 61h7" />
        <path d="M21 46v4M21 54v4M21 61v4M59 46v4M59 54v4M59 61v4M37 34h6M37 40h6" />
        <path d="M12 67 8 71M68 67l4 4M28 27l2 5M52 27l-2 5" />
      </svg>
    );
  }

  if (name === 'taiwan') {
    return (
      <svg className="contact-location-icon contact-location-icon--taiwan" viewBox="0 0 80 80" aria-hidden="true">
        <path d="M40 4v8M36 12h8M33 17h14M35 17v8M45 17v8" />
        <path d="M26 25c5 0 10-2 14-7 4 5 9 7 14 7M29 28h22" />
        <path d="M21 36c7 0 13-3 19-9 6 6 12 9 19 9M24 39h32" />
        <path d="M16 48c9 0 17-3 24-10 7 7 15 10 24 10M19 51h42" />
        <path d="M10 61c11 0 21-4 30-12 9 8 19 12 30 12M13 64h54" />
        <path d="M27 28v36M53 28v36M32 20v44M48 20v44M36 17v47M44 17v47" />
        <path d="M21 36v5M59 36v5M16 48v5M64 48v5M10 61v5M70 61v5M23 43h34M18 55h44" />
        <path d="M15 70h50M21 64v6M59 64v6M32 33h16M28 45h24M24 57h32" />
      </svg>
    );
  }

  return (
    <svg className="contact-location-icon contact-location-icon--hyderabad" viewBox="0 0 80 80" aria-hidden="true">
      <path d="M7 71h66M11 67h58M13 67V30h18v37M49 67V30h18v37M31 67V42h18v25" />
      <path d="M13 30h18M49 30h18M16 25h12M52 25h12M18 20h8M54 20h8" />
      <path d="M20 20V9M60 20V9M16 9h8M56 9h8M18 8l2-4 2 4M58 8l2-4 2 4" />
      <path d="M34 67V53c0-8 12-8 12 0v14M31 42c3-7 15-7 18 0M17 37h10M53 37h10M17 47h10M53 47h10M17 57h10M53 57h10" />
      <path d="M20 37v5M24 37v5M56 37v5M60 37v5M20 47v5M24 47v5M56 47v5M60 47v5M20 57v5M24 57v5M56 57v5M60 57v5" />
      <path d="M11 67 7 71M69 67l4 4M28 30l3 4M52 30l-3 4M37 46h6" />
    </svg>
  );
}

const LOCATIONS = [
  { name: 'China', icon: 'china' },
  { name: 'Bengaluru', icon: 'bengaluru' },
  { name: 'Taiwan', icon: 'taiwan' },
  { name: 'Whitefield', icon: 'hyderabad' },
];

export default function ContactPage() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Website enquiry from ${form.get('name')}`);
    const body = encodeURIComponent([
      `Name: ${form.get('name')}`,
      `Phone: ${form.get('phone') || 'Not provided'}`,
      `Email: ${form.get('email')}`,
      '',
      form.get('message'),
    ].join('\n'));

    window.location.href = `mailto:hello@zmd.tech?subject=${subject}&body=${body}`;
  };

  return (
    <div className="contact-page">
      <div className="contact-corner-dots" aria-hidden="true" />

      <section className="contact-content" aria-labelledby="contact-title">
        <header className="contact-heading contact-heading--center">
          <span className="contact-kicker">Get in touch</span>
          <h1 id="contact-title">Let’s <span>Connect</span></h1>
          <i aria-hidden="true" />
          <p>We’re here to help and answer any question you might have.</p>
        </header>

        <div className="contact-shell">
          <section className="contact-message-panel" aria-labelledby="contact-form-title">
            <h2 id="contact-form-title">Send Us a Message</h2>

            <form className="contact-form" onSubmit={handleSubmit}>
              <label htmlFor="contact-name">Your name</label>
              <div className="contact-field">
                <ContactIcon name="user" />
                <input id="contact-name" name="name" type="text" placeholder="Your Name" autoComplete="name" required />
              </div>

              <label htmlFor="contact-phone">Phone number</label>
              <div className="contact-field">
                <ContactIcon name="phone" />
                <input id="contact-phone" name="phone" type="tel" placeholder="Phone Number" autoComplete="tel" />
              </div>

              <label htmlFor="contact-email">Business email</label>
              <div className="contact-field">
                <ContactIcon name="mail" />
                <input id="contact-email" name="email" type="email" placeholder="Business Email" autoComplete="email" required />
              </div>

              <label htmlFor="contact-message">Your message</label>
              <div className="contact-field contact-field--message">
                <textarea id="contact-message" name="message" placeholder="Your Message" rows="5" required />
              </div>

              <button type="submit" className="contact-submit">
                Send Message <ContactIcon name="send" />
              </button>
            </form>
          </section>

          <aside className="contact-details-panel" aria-label="ZMD contact details and locations">
          <section className="contact-info-card">
            <h2>Contact Information</h2>

            <div className="contact-info-item">
              <span className="contact-info-icon"><ContactIcon name="phone" /></span>
              <div>
                <a href="tel:+919281015550">9281015550</a>
                <p>Mon – Sat: 9:00 AM – 6:00 PM</p>
              </div>
            </div>

            <div className="contact-info-item">
              <span className="contact-info-icon"><ContactIcon name="mail" /></span>
              <div>
                <a href="mailto:hello@zmd.tech">hello@zmd.tech</a>
                <p>We reply within 24 hours</p>
              </div>
            </div>

            <div className="contact-info-item contact-info-item--address">
              <span className="contact-info-icon"><ContactIcon name="pin" /></span>
              <div>
                <strong>ZMD Technologies Pvt. Ltd.</strong>
                <address>Sy. No. 65/6, Nallurahalli Main Road, Mourya Building, near HP Petrol Pump, Whitefield, Bengaluru, Karnataka 560066</address>
              </div>
            </div>
          </section>

          <section className="contact-locations-card">
            <h2>Our Locations</h2>
            <div className="contact-locations-grid">
              {LOCATIONS.map((location) => (
                <div className="contact-location" key={location.name}>
                  {location.icon === 'hyderabad'
                    ? <img className="contact-location-icon contact-location-icon--hyderabad" src={hyderabadIcon} alt="" aria-hidden="true" />
                    : <LocationIcon name={location.icon} />}
                  <span>{location.name}</span>
                </div>
              ))}
            </div>
          </section>
          </aside>
        </div>
      </section>
    </div>
  );
}
