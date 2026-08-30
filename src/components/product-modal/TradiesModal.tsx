// components/product-modal/TradiesModal.tsx
import ProductModal, { type ProductModalFaq } from './ProductModal';
import aimaLogo from '../../assets/iwa.png';

const faqs: ProductModalFaq[] = [
  { q: 'Who can apply for Links For Tradies?', a: 'Access is invite-only and reviewed individually. Applications are accepted from tradespeople who meet our suitability criteria.' },
  { q: 'What does the profile include?', a: 'Services, reviews, enquiry options and booking tools brought together in one shareable link, built for tradespeople.' },
  { q: 'How are enquiries handled?', a: "You'll receive job details through your dashboard and email, and can connect existing scheduling tools too." },
  { q: 'Can access be revoked?', a: 'Yes. Access may be suspended if participation standards are not met or if activity no longer aligns with the network\u2019s purpose.' },
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function TradiesModal({ isOpen, onClose }: Props) {
  return (
    <ProductModal
      isOpen={isOpen}
      onClose={onClose}
      videoSrc="https://fordesigners.online/product/video/Trades.mp4"
   title="Links For Tradies"
      subtitle="Coming Soon - A tradesperson profile that converts while you're on the job: services, reviews and enquiries in one shareable link."
      brandName="Stay Updated"
      brandHref="https://instagram.com/innovatewithaima"
      brandLogo={aimaLogo}
      ctaLabel="Apply for Early Access"
      ctaHref="/product-trades-form"
      learnMoreHref="/product-trades-form"
      shareUrl="https://innovatewithaima.com"
      shareTitle="Innovate With Aima"
      faqs={faqs}
    />
  );
}