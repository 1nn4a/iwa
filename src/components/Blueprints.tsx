// Blueprints.tsx
import { useState } from 'react';
import { useTurnstile } from '../hooks/useTurnstile';
import GlossyButton from './GlossyButton';

const BANNER_COLOR = '#083a6f';

export default function Blueprints() {
  const { turnstileContainer, getTurnstileToken } = useTurnstile();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

 const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      const turnstileToken = await getTurnstileToken();
      const res = await fetch('/api/blueprint-interest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          turnstile_token: turnstileToken,
        }),
      });
      if (!res.ok) throw new Error('Request failed');
      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

 return (
    <>
      <div ref={el => { turnstileContainer.current = el }} style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }} />
   <section className="lfc-blueprints" id="blueprints">
        <div className="lfc-blueprints-inner">
          <p className="lfc-faq-eyebrow">Grow your online presence</p>
          <h2 className="lfc-faq-heading">Exist online in more places</h2>
          <p className="lfc-blueprints-copy">
            Turn your cleaning brand into an online asset. Get featured through local area pages, create a stronger digital footprint, and give customers one trusted place to discover your services, reviews and booking options.
          </p>
       <GlossyButton onClick={() => setOpen(true)}>
            Get early access
          </GlossyButton>
        </div>
      </section>

      {open && (
        <div className="lfc-modal-overlay" onClick={() => setOpen(false)}>
          <div className="lfc-modal" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="lfc-modal-close" onClick={() => setOpen(false)} aria-label="Close">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>

  <h3 className="lfc-modal-heading">Build your online presence</h3>
            <p className="lfc-modal-subheading">Leave your details to be notified when new opportunities become available for cleaning businesses to grow their online presence.</p>

            <div className="lfc-modal-body">
              <p>Links For Cleaners is expanding how cleaning businesses can be discovered online.</p>
              <p>From local area features to stronger profile visibility, we are building ways for cleaners to turn their online presence into something that works beyond social media.</p>
            </div>

            {submitted ? (
              <p className="lfc-modal-success">You're on the list. We'll let you know when new ways to grow your cleaning business online become available.</p>
            ) : (
              <form className="lfc-modal-form" onSubmit={handleSubmit}>
                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="lfc-modal-input"
                />
                <button type="submit" className="lfc-btn-primary lfc-modal-submit" disabled={submitting}>
                  {submitting ? 'Submitting' : 'Get notified'}
                </button>
                {error && <p className="lfc-modal-error">{error}</p>}
              </form>
            )}
          </div>
        </div>
      )}

      <style>{`
    .lfc-blueprints {
  background: ${BANNER_COLOR};
  padding: 64px 16px;
}
       .lfc-blueprints-inner {
          max-width: 720px;
          margin: 0 auto;
          padding: 40px;
          border-radius: 20px;
          background: #0a4e8f;
        }
        .lfc-blueprints-inner .lfc-faq-eyebrow {
          color: #ffffff;
          opacity: 0.7;
        }
        .lfc-blueprints-inner .lfc-faq-heading {
          color: #ffffff;
        }
        .lfc-blueprints-copy {
          color: rgba(255,255,255,0.75);
          font-size: 14px;
          line-height: 1.7;
          margin: 0 0 24px;
          max-width: 560px;
        }
       

        .lfc-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(10,10,15,0.55);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          z-index: 1000;
        }
        .lfc-modal {
          position: relative;
          width: 100%;
          max-width: 480px;
          max-height: 90vh;
          overflow-y: auto;
          background: #ffffff;
          border-radius: 24px;
          padding: 32px 28px;
        }
        .lfc-modal-close {
          position: absolute;
          top: 16px;
          right: 16px;
          width: 36px;
          height: 36px;
          border-radius: 999px;
          border: none;
          background: #f7f7f8;
          color: #0a0a0a;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        .lfc-modal-heading {
          font-family: 'Inter', sans-serif;
          font-weight: 900;
          font-size: 24px;
          color: #0a0a0a;
          margin: 4px 0 8px;
        }
        .lfc-modal-subheading {
          font-size: 14px;
          color: rgba(0,0,0,0.6);
          margin: 0 0 24px;
        }
        .lfc-modal-body {
          margin-bottom: 24px;
        }
        .lfc-modal-body p {
          font-size: 14px;
          line-height: 1.7;
          color: rgba(0,0,0,0.7);
          margin: 0 0 12px;
        }
        .lfc-modal-body p:last-child {
          margin-bottom: 0;
        }
        .lfc-modal-form {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
     .lfc-modal-input {
  min-height: 44px;
  padding: 0 16px;
  border-radius: 999px;
  border: 1px solid rgba(0,0,0,0.2);
  font-size: 14px;
  background: #ffffff;
  color: #0a0a0a;
}
      .lfc-modal-submit {
  border: none;
  background: ${BANNER_COLOR};
  color: #ffffff;
  font-weight: 700;
  box-shadow: 0 4px 14px rgba(8,58,111,0.35);
}
        .lfc-modal-success {
          font-size: 14px;
          color: #0a0a0a;
          background: rgba(92,108,255,0.1);
          padding: 14px 16px;
          border-radius: 14px;
          margin: 0;
        }
        .lfc-modal-error {
          font-size: 12px;
          color: #c0392b;
          margin: 0;
        }
      `}</style>
    </>
  );
}