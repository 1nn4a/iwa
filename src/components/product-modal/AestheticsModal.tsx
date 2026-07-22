// components/product-modal/AestheticsModal.tsx
import ProductModal, { type ProductModalFaq } from './ProductModal';
import aimaLogo from '../../assets/iwa.png';

const faqs: ProductModalFaq[] = [
  { q: 'Who can apply for Links For Aesthetics?', a: 'Access is invite-only and reviewed individually. Applications are accepted from aesthetics professionals who meet our suitability criteria.' },
  { q: 'What does the profile include?', a: 'Services, reviews, enquiry options and booking tools brought together in one shareable link, built for aesthetics professionals.' },
  { q: 'How are enquiries handled?', a: "You'll receive booking details through your dashboard and email, and can connect existing scheduling tools too." },
  { q: 'Can access be revoked?', a: 'Yes. Access may be suspended if participation standards are not met or if activity no longer aligns with the network\u2019s purpose.' },
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function AestheticsModal({ isOpen, onClose }: Props) {
  return (
    <ProductModal
      isOpen={isOpen}
      onClose={onClose}
      videoSrc="https://fordesigners.online/product/video/Aesthetics.MP4"
    title="Links For Aesthetics"
      subtitle="Invite Only - An aesthetics profile that converts while you treat clients: services, reviews and bookings in one shareable link."
      brandName="Stay Updated"
      brandHref="https://instagram.com/innovatewithaima"
      brandLogo={aimaLogo}
      ctaLabel="Apply for Invite"
      ctaHref="/product-beauty-form"
      learnMoreHref="/product-beauty-form"
      shareUrl="https://innovatewithaima.com"
      shareTitle="Innovate With Aima"
      faqs={faqs}
    />
  );
}