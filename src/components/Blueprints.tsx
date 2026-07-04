// Blueprints.tsx
import { useState } from 'react';
import { useTurnstile } from '../hooks/useTurnstile';

const BANNER_COLOR = '#083a6f';

type BlueprintTab = 'getting-started' | 'features' | 'operations';

export default function Blueprints() {
  const { turnstileContainer, getTurnstileToken } = useTurnstile();
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<BlueprintTab>('getting-started');
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
          <h2 className="lfc-faq-heading">Cleaning Blueprints</h2>
          <p className="lfc-blueprints-copy">
            A guided playbook for getting the most out of your profile, from first setup through to day to day running. Getting started steps, feature breakdowns, and the operational playbook, all in one place.
          </p>
          <button type="button" className="lfc-btn-primary lfc-blueprints-btn" onClick={() => setOpen(true)}>
            Notify me
          </button>
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

  <h3 className="lfc-modal-heading">Cleaning Blueprints</h3>
            <p className="lfc-modal-subheading">Sign up to be the first to know when Cleaning Blueprints goes live.</p>

            <div className="lfc-modal-tabs">
              <button type="button" className={`lfc-modal-tab ${tab === 'getting-started' ? 'lfc-modal-tab-active' : ''}`} onClick={() => setTab('getting-started')}>
                Getting started
              </button>
              <button type="button" className={`lfc-modal-tab ${tab === 'features' ? 'lfc-modal-tab-active' : ''}`} onClick={() => setTab('features')}>
                Features in depth
              </button>
              <button type="button" className={`lfc-modal-tab ${tab === 'operations' ? 'lfc-modal-tab-active' : ''}`} onClick={() => setTab('operations')}>
                Operations
              </button>
            </div>

            <div className="lfc-modal-tab-content">
              {tab === 'getting-started' && (
                <p>A guided setup path that gets your profile live, priced, and ready to share in one sitting. Step by step, no guesswork.</p>
              )}
              {tab === 'features' && (
                <p>A full breakdown of quotes, bookings, themes, and analytics: how each one works and how to get the most from it.</p>
              )}
              {tab === 'operations' && (
                <p>The playbook for running day to day: managing enquiries, keeping pricing sharp, and turning visitors into repeat clients.</p>
              )}
            </div>

            {submitted ? (
              <p className="lfc-modal-success">You are on the list. We will let you know the moment Blueprints is ready.</p>
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
                  {submitting ? 'Submitting' : 'Sign up to be the first to know'}
                </button>
                {error && <p className="lfc-modal-error">{error}</p>}
              </form>
            )}
          </div>
        </div>
      )}

      <style>{`
        .lfc-blueprints {
          background: #ffffff;
          padding: 64px 16px;
        }
        .lfc-blueprints-inner {
          max-width: 720px;
          margin: 0 auto;
          padding: 40px;
          border-radius: 20px;
          background: ${BANNER_COLOR};
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
        .lfc-blueprints-btn {
          border: none;
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
        .lfc-modal-tabs {
          display: flex;
          gap: 6px;
          background: #f7f7f8;
          border-radius: 999px;
          padding: 4px;
          margin-bottom: 20px;
        }
        .lfc-modal-tab {
          flex: 1;
          border: none;
          background: transparent;
          border-radius: 999px;
          padding: 8px 10px;
          font-size: 12px;
          font-weight: 700;
          color: rgba(0,0,0,0.5);
          cursor: pointer;
        }
        .lfc-modal-tab-active {
          background: #ffffff;
          color: #083a6f;
          box-shadow: 0 2px 6px rgba(0,0,0,0.08);
        }
        .lfc-modal-tab-content {
          min-height: 72px;
          margin-bottom: 24px;
        }
        .lfc-modal-tab-content p {
          font-size: 14px;
          line-height: 1.7;
          color: rgba(0,0,0,0.7);
          margin: 0;
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
          border: 1px solid rgba(0,0,0,0.15);
          font-size: 14px;
        }
        .lfc-modal-submit {
          border: none;
          background: ${BANNER_COLOR};
          color: #ffffff;
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