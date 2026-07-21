// components/product-modal/ProductModal.tsx
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import GlossyButton from '../GlossyButton';

export interface ProductModalFaq {
  q: string;
  a: React.ReactNode;
}

export interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc?: string;
  posterSrc?: string;
  title: string;
  subtitle: string;
  brandName: string;
  brandHref: string;
  brandLogo: string;
  ctaLabel: string;
  ctaHref: string;
  learnMoreHref: string;
  shareUrl: string;
  shareTitle?: string;
  faqs: ProductModalFaq[];
}

export default function ProductModal({
  isOpen,
  onClose,
  videoSrc,
  posterSrc,
  title,
  subtitle,
  brandName,
  brandHref,
  brandLogo,
  ctaLabel,
  ctaHref,
  learnMoreHref,
  shareUrl,
  shareTitle,
  faqs,
}: ProductModalProps) {
  const [videoState, setVideoState] = useState<'loading' | 'ready' | 'error'>('loading');
  const [isPlaying, setIsPlaying] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    setVideoState(videoSrc ? 'loading' : 'error');
    setIsPlaying(true);
    setMenuOpen(false);
    setOpenFaq(null);
    setCopied(false);
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, videoSrc]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const replayVideo = () => {
    const el = videoRef.current;
    if (!el) return;
    el.currentTime = 0;
    el.play();
    setIsPlaying(true);
  };

  const handleShare = async () => {
    setMenuOpen(false);
    const data = { title: shareTitle ?? title, text: subtitle, url: shareUrl };
    if (navigator.share) {
      try {
        await navigator.share(data);
        return;
      } catch {
        return;
      }
    }
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* noop */
    }
  };

  return createPortal(
    <div className="pm-overlay" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="pm-panel" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="pm-close" onClick={onClose} aria-label="Close">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <div className="pm-top">
          <div className="pm-video-wrap">
            {videoState !== 'ready' && (
              <div className="pm-skeleton">
                {posterSrc ? (
                  <img src={posterSrc} alt="" className="pm-poster" />
                ) : (
                  <div className="pm-shimmer" />
                )}
                {videoState === 'error' && (
                  <div className="pm-video-placeholder">
                    {!posterSrc && (
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 10l5-3v10l-5-3" />
                        <rect x="1" y="5" width="14" height="14" rx="2.5" />
                      </svg>
                    )}
                    <span>Video coming soon</span>
                  </div>
                )}
              </div>
            )}
            {videoSrc && (
              <video
                ref={videoRef}
                className="pm-video"
                src={videoSrc}
                autoPlay
                muted
                playsInline
                onLoadedData={() => setVideoState('ready')}
                onError={() => setVideoState('error')}
                onEnded={() => setIsPlaying(false)}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                style={{ opacity: videoState === 'ready' ? 1 : 0 }}
              />
            )}
            {videoState === 'ready' && !isPlaying && (
              <button type="button" className="pm-replay-overlay" onClick={replayVideo} aria-label="Play video">
                <span className="pm-replay-btn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </button>
            )}
          </div>

          <div className="pm-info">
            <h2 className="pm-title">{title}</h2>
            <p className="pm-subtitle">{subtitle}</p>

            <div className="pm-brand-row">
              <a href={brandHref} target="_blank" rel="noopener noreferrer" className="pm-brand-link">
                <img src={brandLogo} alt="" className="pm-brand-logo" />
                <span className="pm-brand-name">{brandName}</span>
              </a>
              <a href={brandHref} target="_blank" rel="noopener noreferrer" className="pm-follow-btn">
                Follow
              </a>
            </div>

            <div className="pm-cta-row">
              <GlossyButton as="a" href={ctaHref} target="_blank" rel="noopener noreferrer" className="pm-cta-btn">
                {ctaLabel}
              </GlossyButton>

              <div className="pm-dots-wrap">
                <GlossyButton shape="circle" onClick={() => setMenuOpen((v) => !v)} aria-label="More options">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="5" cy="12" r="1.8" />
                    <circle cx="12" cy="12" r="1.8" />
                    <circle cx="19" cy="12" r="1.8" />
                  </svg>
                </GlossyButton>
                {menuOpen && (
                  <div className="pm-dots-menu">
                    <a href={learnMoreHref} className="pm-dots-item" onClick={() => setMenuOpen(false)}>
                      Learn more
                    </a>
                    <button type="button" className="pm-dots-item" onClick={handleShare}>
                      {copied ? 'Link copied' : 'Share'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="pm-faq">
          <p className="pm-faq-eyebrow">FAQ</p>
          {faqs.map((f, i) => {
            const open = openFaq === i;
            return (
              <div key={i} className="pm-faq-item">
                <button type="button" className="pm-faq-q" onClick={() => setOpenFaq(open ? null : i)}>
                  <span>{f.q}</span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`pm-faq-chevron ${open ? 'is-open' : ''}`}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                {open && <p className="pm-faq-a">{f.a}</p>}
              </div>
            );
          })}
        </div>
      </div>
      <style>{PM_STYLES}</style>
    </div>,
    document.body
  );
}

const PM_STYLES = `
.pm-overlay {
  position: fixed; inset: 0; z-index: 100;
  background: rgba(5,7,14,0.72);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  display: flex; align-items: center; justify-content: center;
  padding: 16px;
}
.pm-panel {
  position: relative;
  width: 100%; max-width: 980px; max-height: 90vh;
  overflow-y: auto;
  background: #0c1220;
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 32px;
  box-shadow: 0 30px 80px rgba(0,0,0,0.5);
  padding: 28px;
}
.pm-close {
  position: absolute; top: 20px; right: 20px; z-index: 5;
  width: 36px; height: 36px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  background: rgba(255,255,255,0.08); color: #ffffff; border: none; cursor: pointer;
}
.pm-close:hover { background: rgba(255,255,255,0.16); }
.pm-top { display: flex; flex-direction: column; gap: 24px; }
.pm-video-wrap {
  position: relative; width: 100%; max-width: 300px; margin: 0 auto;
  aspect-ratio: 9 / 16; border-radius: 22px; overflow: hidden;
  background: linear-gradient(180deg, #142049, #0c1220);
}
.pm-video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; transition: opacity 0.3s ease; }
.pm-replay-overlay {
  position: absolute; inset: 0; z-index: 3;
  display: flex; align-items: center; justify-content: center;
  background: rgba(0,0,0,0.25);
  border: none; padding: 0; cursor: pointer;
  transition: background 0.2s ease;
}
.pm-replay-overlay:hover { background: rgba(0,0,0,0.35); }
.pm-replay-btn {
  width: 56px; height: 56px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  background: rgba(255,255,255,0.18);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  color: #ffffff;
  box-shadow: 0 6px 20px rgba(0,0,0,0.3);
  transition: transform 0.2s ease;
}
.pm-replay-overlay:hover .pm-replay-btn { transform: scale(1.06); }
.pm-skeleton { position: absolute; inset: 0; overflow: hidden; display: flex; align-items: center; justify-content: center; }
.pm-shimmer {
  position: absolute; inset: 0;
  background: linear-gradient(100deg, rgba(255,255,255,0.03) 30%, rgba(255,255,255,0.09) 50%, rgba(255,255,255,0.03) 70%);
  background-size: 200% 100%;
  animation: pm-shimmer 1.4s ease-in-out infinite;
}
@keyframes pm-shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
.pm-video-placeholder {
  position: relative; z-index: 2; display: flex; flex-direction: column; align-items: center; gap: 8px;
  color: rgba(255,255,255,0.55); font-size: 12px; font-weight: 600;
}
.pm-info { flex: 1; min-width: 0; text-align: center; }
.pm-title { font-family: 'Inter', sans-serif; font-weight: 800; font-size: 26px; color: #ffffff; margin: 0; }
.pm-subtitle { margin: 8px auto 0; max-width: 480px; font-size: 13px; line-height: 1.6; color: rgba(255,255,255,0.55); }
.pm-brand-row { margin: 18px auto 0; display: flex; align-items: center; justify-content: center; gap: 10px; flex-wrap: wrap; }
.pm-brand-link { display: inline-flex; align-items: center; gap: 8px; text-decoration: none; }
.pm-brand-logo { width: 26px; height: 26px; border-radius: 50%; object-fit: cover; background: #ffffff; }
.pm-brand-name { font-size: 13px; font-weight: 600; color: rgba(255,255,255,0.8); }
.pm-follow-btn {
  display: inline-flex; align-items: center; justify-content: center;
  min-height: 32px; padding: 0 16px; border-radius: 999px;
  background: transparent; border: 1px solid rgba(255,255,255,0.3);
  color: #ffffff; font-size: 12px; font-weight: 700; text-decoration: none;
  transition: background 0.2s ease;
}
.pm-follow-btn:hover { background: rgba(255,255,255,0.08); }
.pm-poster { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0.9; }
.pm-cta-row { margin-top: 18px; display: flex; align-items: center; justify-content: center; gap: 10px; position: relative; }
.pm-dots-wrap { position: relative; }
.pm-dots-menu {
  position: absolute; top: 48px; right: 0; min-width: 150px;
  background: #141b2e; border: 1px solid rgba(255,255,255,0.1); border-radius: 14px;
  padding: 6px; display: flex; flex-direction: column; box-shadow: 0 12px 30px rgba(0,0,0,0.4); z-index: 10;
}
.pm-dots-item {
  display: block; width: 100%; text-align: left; padding: 9px 12px; border-radius: 9px;
  background: transparent; border: none; color: rgba(255,255,255,0.85); font-size: 13px; cursor: pointer; text-decoration: none;
}
.pm-dots-item:hover { background: rgba(255,255,255,0.08); }
.pm-faq { margin-top: 36px; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 24px; }
.pm-faq-eyebrow { font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #8da2ff; margin: 0 0 12px; }
.pm-faq-item { border-top: 1px solid rgba(255,255,255,0.08); }
.pm-faq-q {
  width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 12px;
  padding: 16px 0; background: none; border: none; color: #ffffff; font-size: 15px; font-weight: 600; text-align: left; cursor: pointer;
}
.pm-faq-chevron { transition: transform 0.2s ease; flex-shrink: 0; }
.pm-faq-chevron.is-open { transform: rotate(180deg); }
.pm-faq-a { margin: 0 0 16px; font-size: 13px; line-height: 1.7; color: rgba(255,255,255,0.6); }
.pm-faq-a a { color: #ffffff; text-decoration: underline; text-decoration-style: dotted; text-underline-offset: 3px; }

@media (min-width: 768px) {
  .pm-panel { padding: 40px; border-radius: 40px; }
  .pm-top { flex-direction: row; align-items: center; gap: 40px; }
  .pm-video-wrap { max-width: 280px; flex-shrink: 0; }
  .pm-info { text-align: left; }
  .pm-subtitle { margin-left: 0; }
  .pm-brand-row { justify-content: flex-start; margin-left: 0; }
  .pm-cta-row { justify-content: flex-start; }
}
`;