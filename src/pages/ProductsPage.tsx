// ProductsPage.tsx
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import bgImg from '../assets/iwa@.20260701.png';
import linksForBrandImg from '../assets/linksfor@.q01072026.jpg';
import cleanfluencerImg from '../assets/linksforcleaners@.cprogramme.jpg';
import linksForTradiesImg from '../assets/linksfortradies@.q3062026.jpg';
import linksForCleanersImg from '../assets/linksforcleaners@.instantq.jpg';
import linksForManagersImg from '../assets/linksformangers@.q3062026.jpg';
import linksForAestheticsImg from '../assets/linksforaesthetics@.q3010726.jpg';
import GlossyButton from '../components/GlossyButton';

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

type ProductCard = {
  product_line: string;
  section?: string;
  title: string;
  subtitle: string;
  img: string;
  href?: string;
  internal?: boolean;
  darkText?: boolean;
};

const marketingCard: ProductCard = {
  product_line: 'product_line_marketing_hub',
  section: '',
  title: 'LinksFor',
  subtitle: 'Where your audience becomes your customers',
  img: linksForBrandImg,
  darkText: true,
};

const firstCard: ProductCard = {
  product_line: 'product_line_creator_monetisation',
  title: 'Content Rewards',
  subtitle: 'Turn what you already post into revenue',
  img: cleanfluencerImg,
  href: '/en/cleaning-programme',
};

const businessSolutions: ProductCard[] = [
  {
  
  product_line: 'product_line_trade_services',
  title: 'LinksForTradies',
  subtitle: 'Invite only',
  img: linksForTradiesImg,
  href: '/product-trades-form',
  internal: true,
  darkText: true,
},
  {
    product_line: 'product_line_home_services',
    title: 'LinksForCleaners',
    subtitle: 'Market your entire cleaning business online',
    img: linksForCleanersImg,
    href: '/en/links-for-cleaners',
  },
  {
    product_line: 'product_line_property_management',
    title: 'LinksForManagers',
    subtitle: 'Invite only',
    img: linksForManagersImg,
    href: '/product-property-form',
    internal: true,
  },
  {
    product_line: 'product_line_beauty_wellness',
    title: 'LinksForAesthetics',
    subtitle: 'Invite only',
    img: linksForAestheticsImg,
    href: '/product-beauty-form',
    internal: true,
  },
];

function ProductCardTile({ card }: { card: ProductCard }) {
  const inner = (
    <>
      <div
        className="absolute inset-0 bg-cover bg-center select-none"
        style={{ backgroundImage: `url(${card.img})`, WebkitTouchCallout: 'none', WebkitUserSelect: 'none', userSelect: 'none' }}
        onContextMenu={(e) => e.preventDefault()}
        draggable={false}
      />
  {card.title && (
  <div className="absolute top-0 left-0 right-0 h-2/3 flex items-start pointer-events-none">
    <div className="pl-[120px] md:pl-[140px] pt-11.5 text-left">
      <h3 className={`text-lg font-black font-['Inter'] leading-tight ${card.darkText ? 'text-black' : 'text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.6)]'}`}>
        {card.title}
      </h3>
      <p className={`text-xs font-medium font-['Inter'] leading-tight ${card.darkText ? 'text-black' : 'text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.6)]'}`}>
        {card.subtitle}
      </p>
    </div>
  </div>
)}
  {card.href && (
        <GlossyButton as="span" shape="circle" className="absolute bottom-4 right-4 z-10">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </GlossyButton>
      )}
    </>
  );

const cls = "relative block w-full max-w-[430px] aspect-[660/1020] rounded-[45px] overflow-hidden bg-[#5c6cff]";
  if (!card.href) return <div className={cls}>{inner}</div>;
  if (card.internal) return <Link to={card.href} className={cls}>{inner}</Link>;
  return (
    <a href={card.href} target="_blank" rel="noopener noreferrer" className={cls}>
      {inner}
    </a>
  );
}

export default function ProductsPage() {
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const previousBackground = document.body.style.background;
    document.body.style.background = `url(${bgImg}) center top / cover no-repeat, #083a6f`;
    return () => {
      document.body.style.background = previousBackground;
    };
  }, []);

  return (
    <>
  <Helmet>
  <title>Products</title>
  <meta name="robots" content="noindex, nofollow" />
  <link rel="canonical" href="https://innovatewithaima.com/en/products" />
</Helmet>

   <div
        className="fixed inset-0 -z-10"
        style={{
          backgroundImage: `url(${bgImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          backgroundRepeat: 'no-repeat',
        }}
      />
      <div className="relative min-h-screen">
<main className="relative mx-auto max-w-[1180px] px-4 pb-24 pt-10 md:px-8">
          <section data-product-line={firstCard.product_line}>
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              animate="show"
              transition={{ duration: 0.5 }}
              className="text-xl font-black font-['Inter'] text-white leading-tight [text-shadow:0_1px_3px_rgba(0,0,0,0.6)] md:text-2xl"
            >
              Creator Industry Solutions - Monetisation
            </motion.h2>

            <div className="mt-4 flex flex-col gap-4 md:flex-row">
              <ProductCardTile card={firstCard} />
              <ProductCardTile card={marketingCard} />
            </div>
          </section>

          <section className="mt-14">
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              animate="show"
              transition={{ duration: 0.5 }}
              className="text-xl font-black font-['Inter'] text-white leading-tight [text-shadow:0_1px_3px_rgba(0,0,0,0.6)] md:text-2xl"
            >
              Business Solutions - Productivity
            </motion.h2>

        <div className="mt-4 flex flex-col gap-4 md:flex-row md:flex-wrap">
              {businessSolutions.map((card) => (
                <div key={card.product_line} data-product-line={card.product_line} className="md:w-[430px]">
                  <ProductCardTile card={card} />
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </>
  );
}