//HomePage.tsx
import { motion } from 'framer-motion';

import { Link, useSearchParams } from 'react-router-dom';
import linksCleanersMobile from '../assets/linksforcleaners@.q3062026.jpg'
import linksTradiesMobile from '../assets/linksfortradies@.q3062026.jpg'
import linksManagersMobile from '../assets/linksformangers@.q3062026.jpg'
import aimaDesktopImg from '../assets/aima@.q602014412.jpg'
import aimaMobileImg from '../assets/aima@.q3010726.jpg'
import linksAestheticsMobile from '../assets/linksforaesthetics@.q3010726.jpg'
import GlossyButton from '../components/GlossyButton';
import LinksForCleanersModal from '../components/product-modal/LinksForCleanersModal';
import AimaModal from '../components/product-modal/AimaModal';
import TradiesModal from '../components/product-modal/TradiesModal';
import ManagersModal from '../components/product-modal/ManagersModal';
import AestheticsModal from '../components/product-modal/AestheticsModal';


import { Helmet } from "react-helmet-async"

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

const linkCards = [
 {
    key: 'aima',
    title: ' ',
    subtext: null,
    href: undefined,
    mobileImg: aimaMobileImg,
    desktopImg: aimaDesktopImg,
  },
  {
    key: 'cleaners',
    title: ' ',
    subtext: 'Grow your entire cleaning business online with LinksForCleaners',
    href: '/en/links-for-cleaners',
    mobileImg: linksCleanersMobile,
    desktopImg: linksCleanersMobile,
  },
  {
    key: 'tradies',
    title: ' ',
    subtext: null,
    href: '/product-trades-form',
    internal: true,
    mobileImg: linksTradiesMobile,
    desktopImg: linksTradiesMobile,
  },
  {
    key: 'managers',
    title: ' ',
    subtext: null,
    href: '/product-property-form',
    internal: true,
    mobileImg: linksManagersMobile,
    desktopImg: linksManagersMobile,
  },
  {
    key: 'aesthetics',
    title: ' ',
    subtext: null,
    href: '/product-beauty-form',
    internal: true,
    mobileImg: linksAestheticsMobile,
    desktopImg: linksAestheticsMobile,
  },
];

export default function HomePage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const activeProduct = searchParams.get('product');

    const openProduct = (key: string) => {
      const next = new URLSearchParams(searchParams);
      next.set('product', key);
      setSearchParams(next);
    };
    const closeProduct = () => {
      const next = new URLSearchParams(searchParams);
      next.delete('product');
      setSearchParams(next);
    };

  return (
    <>
   <Helmet>
  <title>Innovatewithaima</title>
  <meta name="description" content="We build and operate a growing portfolio of focused software products designed to help businesses and creators attract customers, manage their work, and grow online." />
  <link rel="canonical" href="https://innovatewithaima.com/" />
</Helmet>
   <main>
<section className="relative mx-auto max-w-[1180px] px-4 md:px-8 pt-10 md:pt-18">
      <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
           
            <h1 className="max-w-3xl mx-auto text-4xl leading-[0.95] font-semibold tracking-tight md:text-6xl">
              Arming Brands with Technology
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-xs leading-6 text-white/65 md:text-sm">
Innovatewithaima is a UK software group building the next generation of business tools. Our focused software products are designed to help brands attract customers, manage their work, and grow online.           </p>
          </motion.div>

 <div className="relative mt-10">
      <div className="relative md:hidden flex flex-col gap-4">
          {linkCards.map((card) => {
            const inner = (
              <>
                <div
                  className="absolute inset-0 bg-cover bg-center select-none"
                  style={{ backgroundImage: `url(${card.mobileImg})`, WebkitTouchCallout: 'none', WebkitUserSelect: 'none', userSelect: 'none' }}
                  onContextMenu={(e) => e.preventDefault()}
                  draggable={false}
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 pointer-events-none" />
                {card.title && (
                  <div className="absolute top-0 left-0 right-0 h-2/3 flex items-start pointer-events-none">
                    <h3 className="pl-[130px] pt-16 text-left text-lg font-black font-['Inter'] text-white leading-tight [text-shadow:0_1px_3px_rgba(0,0,0,0.6)]">
                      {card.title}
                    </h3>
                  </div>
                )}
                {card.href && (
             <GlossyButton as="span" shape="circle" className="absolute bottom-4 right-4 z-10">
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17L17 7M9 7h8v8" />
  </svg>
</GlossyButton>
                )}
              </>
            )

            const cls = "group relative block w-full aspect-[660/1020] rounded-[45px] overflow-hidden bg-[#5c6cff] text-left"

            return (
              <button key={card.key} type="button" onClick={() => openProduct(card.key)} className={cls}>
                {inner}
              </button>
            )
          })}

          
          </div>

           <div className="relative hidden md:block">
  <div className="grid grid-cols-[2fr_1fr] gap-4 justify-center">
    <button
      type="button"
      onClick={() => openProduct(linkCards[0].key)}
      className="group relative block w-full aspect-[794/600] rounded-[45px] overflow-hidden bg-[#5c6cff] text-left"
    >
      <div
        className="absolute inset-0 bg-cover bg-center select-none"
        style={{
          backgroundImage: `url(${linkCards[0].desktopImg})`,
          WebkitTouchCallout: 'none',
          WebkitUserSelect: 'none',
          userSelect: 'none',
        }}
        onContextMenu={(e) => e.preventDefault()}
        draggable={false}
      />
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 pointer-events-none" />
      {linkCards[0].title && (
        <div className="absolute top-0 left-0 right-0 h-2/3 flex items-start pointer-events-none">
          <h3 className="pl-[6%] pt-[7%] text-left text-2xl font-black font-['Inter'] text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.6)]">
            {linkCards[0].title}
          </h3>
        </div>
      )}
    </button>

    <button
      type="button"
      onClick={() => openProduct(linkCards[1].key)}
      className="group relative block w-full aspect-[387/600] rounded-[45px] overflow-hidden bg-[#5c6cff] text-left"
    >
      <div
        className="absolute inset-0 bg-cover bg-center select-none"
        style={{
          backgroundImage: `url(${linkCards[1].mobileImg})`,
          WebkitTouchCallout: 'none',
          WebkitUserSelect: 'none',
          userSelect: 'none',
        }}
        onContextMenu={(e) => e.preventDefault()}
        draggable={false}
      />
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 pointer-events-none" />
      {linkCards[1].title && (
        <div className="absolute top-0 left-0 right-0 h-2/3 flex items-start pointer-events-none">
          <h3 className="pl-[10%] pt-[12%] text-left text-xl font-black font-['Inter'] text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.6)]">
            {linkCards[1].title}
          </h3>
        </div>
      )}
      <GlossyButton as="span" shape="circle" className="absolute bottom-4 right-4 z-10">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 17L17 7M9 7h8v8" />
        </svg>
      </GlossyButton>
    </button>
  </div>

  <div className="mt-4 grid grid-cols-3 gap-4">
    <button
      type="button"
      onClick={() => openProduct(linkCards[3].key)}
      className="group relative block w-full aspect-[388/600] rounded-[45px] overflow-hidden bg-[#5c6cff] text-left"
    >
      <div
        className="absolute inset-0 bg-cover bg-center select-none"
        style={{
          backgroundImage: `url(${linkCards[3].mobileImg})`,
          WebkitTouchCallout: 'none',
          WebkitUserSelect: 'none',
          userSelect: 'none',
        }}
        onContextMenu={(e) => e.preventDefault()}
        draggable={false}
      />
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 pointer-events-none" />
      {linkCards[3].title && (
        <div className="absolute top-0 left-0 right-0 h-2/3 flex items-start pointer-events-none">
          <h3 className="pl-[9%] pt-[11%] text-left text-xl font-semi font-['Inter'] text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.6)]">
            {linkCards[3].title}
          </h3>
        </div>
      )}
      <GlossyButton as="span" shape="circle" className="absolute bottom-4 right-4 z-10">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 17L17 7M9 7h8v8" />
        </svg>
      </GlossyButton>
    </button>

    <button
      type="button"
      onClick={() => openProduct(linkCards[2].key)}
      className="group relative block w-full aspect-[388/600] rounded-[45px] overflow-hidden bg-[#5c6cff] text-left"
    >
      <div
        className="absolute inset-0 bg-cover bg-center select-none"
        style={{
          backgroundImage: `url(${linkCards[2].mobileImg})`,
          WebkitTouchCallout: 'none',
          WebkitUserSelect: 'none',
          userSelect: 'none',
        }}
        onContextMenu={(e) => e.preventDefault()}
        draggable={false}
      />
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 pointer-events-none" />
      {linkCards[2].title && (
        <div className="absolute top-0 left-0 right-0 h-2/3 flex items-start pointer-events-none">
          <h3 className="pl-[11%] pt-[11%] text-left text-xl font-semi font-['Inter'] text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.6)]">
            {linkCards[2].title}
          </h3>
        </div>
      )}
      <GlossyButton as="span" shape="circle" className="absolute bottom-4 right-4 z-10">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 17L17 7M9 7h8v8" />
        </svg>
      </GlossyButton>
    </button>

    <button
      type="button"
      onClick={() => openProduct(linkCards[4].key)}
      className="group relative block w-full aspect-[388/600] rounded-[45px] overflow-hidden bg-[#5c6cff] text-left"
    >
      <div
        className="absolute inset-0 bg-cover bg-center select-none"
        style={{
          backgroundImage: `url(${linkCards[4].desktopImg})`,
          WebkitTouchCallout: 'none',
          WebkitUserSelect: 'none',
          userSelect: 'none',
        }}
        onContextMenu={(e) => e.preventDefault()}
        draggable={false}
      />
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 pointer-events-none" />
      {linkCards[4].title && (
        <div className="absolute top-0 left-0 right-0 h-2/3 flex items-start pointer-events-none">
          <h3 className="pl-[11%] pt-[11%] text-left text-xl font-semi font-['Inter'] text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.6)]">
            {linkCards[4].title}
          </h3>
        </div>
      )}
     <GlossyButton as="span" shape="circle" className="absolute bottom-4 right-4 z-10">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 17L17 7M9 7h8v8" />
        </svg>
      </GlossyButton>
    </button>
  </div>
</div>
</div>

     <div className="mt-6 mb-24 flex justify-center">
           <GlossyButton as={Link} to="/en/products">
  More
</GlossyButton>
          </div>
        </section>

        <LinksForCleanersModal isOpen={activeProduct === 'cleaners'} onClose={closeProduct} />
        <AimaModal isOpen={activeProduct === 'aima'} onClose={closeProduct} />
        <TradiesModal isOpen={activeProduct === 'tradies'} onClose={closeProduct} />
        <ManagersModal isOpen={activeProduct === 'managers'} onClose={closeProduct} />
        <AestheticsModal isOpen={activeProduct === 'aesthetics'} onClose={closeProduct} />
      </main>
    </>
  );
}