// GlossyButton.tsx
import type { ReactNode } from 'react';
import type { ElementType } from 'react';

type Shape = 'pill' | 'circle';
const sharedStyle = `
  .glossy-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    isolation: isolate;
    overflow: hidden;
    border: none;
    cursor: pointer;
    text-decoration: none;
    color: #ffffff;
background: radial-gradient(
      ellipse 110% 120% at 50% 18%,
      #A0CAEE 0%,
      #80B7EA 15%,
      #5FA3E7 25%,
      #3E91E5 35%,
      #1C7CE3 45%,
      #166DCA 55%,
      #1261B5 65%,
      #0E54A0 75%,
      #0B4A8E 83%,
      #0A4380 90%,
      #083B72 95%,
      #063260 100%
    );
    box-shadow:
      0 6px 22px 0 rgba(8, 58, 111, 0.35),
      inset 0 1px 1px rgba(255, 255, 255, 0.85);
  }
   .glossy-btn::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    pointer-events: none;
    z-index: 1;
    background: linear-gradient(
      to bottom,
      rgba(255,255,255,0.40) 0%,
      rgba(255,255,255,0.22) 20%,
      rgba(255,255,255,0.08) 38%,
      rgba(255,255,255,0.00) 45%
    );
  }
.glossy-btn:hover {
    transform: translateY(-2px);
    box-shadow:
      0 10px 30px 0 rgba(8, 58, 111, 0.42),
      inset 0 1px 1px rgba(255, 255, 255, 0.85);
  }
  .glossy-btn:active {
    transform: translateY(0px);
    box-shadow:
      0 3px 12px 0 rgba(8, 58, 111, 0.26),
      inset 0 1px 1px rgba(255, 255, 255, 0.85);
  }
  .glossy-btn-content {
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
  }

  /* Pill shape — for text CTAs */
  .glossy-btn-pill {
    border-radius: 999px;
    min-height: 44px;
    padding: 0 22px;
    font-size: 13px;
    font-weight: 700;
    text-shadow: 0 1px 2px rgba(0,0,0,0.25);
  }

  /* Circle shape — for icon-only arrow badges */
  .glossy-btn-circle {
    border-radius: 50%;
    width: 36px;
    height: 36px;
    flex-shrink: 0;
  }
`;

interface GlossyButtonProps {
  shape?: Shape;
  children: ReactNode;
  className?: string;
  as?: ElementType;
  [key: string]: any;
}

export default function GlossyButton({ shape = 'pill', children, className = '', as, style, ...rest }: GlossyButtonProps) {
  const shapeClass = shape === 'circle' ? 'glossy-btn-circle' : 'glossy-btn-pill';
  const cls = `glossy-btn ${shapeClass} ${className}`;
  const Component: ElementType = as ?? 'button';
  const extraProps = Component === 'button' ? { type: 'button' } : {};
  const hasExplicitPosition = /\b(relative|absolute|fixed|sticky)\b/.test(className);
  const mergedStyle = hasExplicitPosition ? style : { position: 'relative', ...style };

  return (
    <>
      <Component className={cls} style={mergedStyle} {...extraProps} {...rest}>
        <span className="glossy-btn-content">{children}</span>
      </Component>
      <style>{sharedStyle}</style>
    </>
  );
}