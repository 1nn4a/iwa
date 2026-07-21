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
      subtitle="Details coming soon."
      brandName="AIMA API"
      brandHref="#"
      brandLogo={aimaLogo}
      ctaLabel="Coming soon"
      ctaHref="#"
      learnMoreHref="#"
      shareUrl="#"
      faqs={faqs}
    />
  );
}