// QuickNav.tsx
import { useState } from 'react';

interface QuickNavProps {
  onTellColleague: () => void;
  tellLabel: string;
}

export default function QuickNav({ onTellColleague, tellLabel }: QuickNavProps) {
  const [open, setOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  const items = [
    { id: 'faq', label: 'Quick answers' },
    { id: 'blueprints', label: 'Cleaning Blueprints' },
    { id: 'changelog', label: 'ChangeLog' },
  ];

  return (
    <div className="lfc-quicknav">
      <div className="lfc-quicknav-inner">
        <button
          type="button"
          className="lfc-quicknav-toggle"
          onClick={() => setOpen(v => !v)}
          aria-expanded={open}
        >
          Sections
          <svg
            width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"
            style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>

        {open && (
          <div className="lfc-quicknav-panel">
            {items.map((item) => (
              <button
                key={item.id}
                type="button"
                className="lfc-quicknav-panel-item"
                onClick={() => scrollTo(item.id)}
              >
                {item.label}
              </button>
            ))}
            <button
              type="button"
              className="lfc-quicknav-panel-item"
              onClick={() => { onTellColleague(); setOpen(false); }}
            >
              {tellLabel}
            </button>
          </div>
        )}
      </div>

      <style>{`
        .lfc-quicknav {
          background: #ffffff;
          padding: 20px 16px;
          border-bottom: 1px solid rgba(0,0,0,0.08);
        }
        .lfc-quicknav-inner {
          max-width: 900px;
          margin: 0 auto;
          position: relative;
        }
        .lfc-quicknav-toggle {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          min-height: 44px;
          padding: 0 20px;
          border-radius: 999px;
          background: #f7f7f8;
          border: 1px solid rgba(0,0,0,0.08);
          color: #083a6f;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
        }
        .lfc-quicknav-toggle:hover {
          background: rgba(8,58,111,0.06);
        }
        .lfc-quicknav-panel {
          position: absolute;
          top: calc(100% + 8px);
          left: 0;
          display: flex;
          flex-direction: column;
          background: #ffffff;
          border: 1px solid rgba(0,0,0,0.1);
          border-radius: 14px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.12);
          overflow: hidden;
          min-width: 200px;
          z-index: 10;
        }
        .lfc-quicknav-panel-item {
          border: none;
          background: transparent;
          color: #083a6f;
          font-size: 13px;
          font-weight: 700;
          text-align: left;
          padding: 13px 18px;
          cursor: pointer;
          min-height: 44px;
          border-bottom: 1px solid rgba(0,0,0,0.06);
        }
        .lfc-quicknav-panel-item:last-child {
          border-bottom: none;
        }
        .lfc-quicknav-panel-item:hover {
          background: rgba(8,58,111,0.06);
        }
      `}</style>
    </div>
  );
}