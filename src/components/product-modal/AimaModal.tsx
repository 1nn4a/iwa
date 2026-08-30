// components/product-modal/AimaModal.tsx
import ProductModal, { type ProductModalFaq } from './ProductModal';
import aimaLogo from '../../assets/aima.png';

// Not currently linked from the site — kept in reserve, content pending.
const faqs: ProductModalFaq[] = [
  { q: 'What is the AIMA API?', a: 'Details for this product are still being finalised.' },
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function AimaModal({ isOpen, onClose }: Props) {
  return (
    <ProductModal
      isOpen={isOpen}
      onClose={onClose}
      videoSrc="https://www.fordesigners.co.uk/product/video/aima.mp4"
      title="AIMA API"
      subtitle="Access to AIMA API is on a selective membership basis. Applications are reviewed individually. Acceptance is not guaranteed and depends on suitability, experience, and current network demand."
      brandName="AIMA API"
      brandHref="#"
      brandLogo={aimaLogo}
      ctaLabel="Membership"
      ctaHref="https://innovatewithaima.com/group/submit-an-opportunity"
      learnMoreHref="/apply"
      shareUrl="https://www.innovatewithaima.com/apply"
      faqs={faqs}
    />
  );
}