// components/product-modal/ManagersModal.tsx
import ProductModal, { type ProductModalFaq } from './ProductModal';
import aimaLogo from '../../assets/iwa.png';

const faqs: ProductModalFaq[] = [
  { q: 'Who can apply for Links For Managers?', a: 'Access is invite-only and reviewed individually. Applications are accepted from property managers who meet our suitability criteria.' },
  { q: 'What does the profile include?', a: 'Listings, reviews, enquiry options and booking tools brought together in one shareable link, built for property managers.' },
  { q: 'How are enquiries handled?', a: "You'll receive enquiry details through your dashboard and email, and can connect existing tools too." },
  { q: 'Can access be revoked?', a: 'Yes. Access may be suspended if participation standards are not met or if activity no longer aligns with the network\u2019s purpose.' },
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
}


export default function ManagersModal({ isOpen, onClose }: Props) {
  return (
    <ProductModal
      isOpen={isOpen}
      onClose={onClose}
      videoSrc="https://fordesigners.online/product/video/Managers.MP4"
       title="Links For Managers"
      subtitle="Invite Only - A property management profile that converts while you operate: listings, reviews and enquiries in one shareable link."
      brandName="Stay Updated"
      brandHref="https://instagram.com/@innovatewithaima"
      brandLogo={aimaLogo}
      ctaLabel="Apply for Invite"
      ctaHref="/product-property-form"
      learnMoreHref="/product-property-form"
      shareUrl="https://innovatewithaima.com"
      shareTitle="Innovate With Aima"
      faqs={faqs}
   />
  );
}