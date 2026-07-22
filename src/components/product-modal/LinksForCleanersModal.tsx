// components/product-modal/LinksForCleanersModal.tsx
import ProductModal, { type ProductModalFaq } from './ProductModal';
const faqs: ProductModalFaq[] = [
  {
    q: 'What is Links For Cleaners?',
    a: (
      <>
        Links For Cleaners helps UK cleaning businesses build a stronger online presence with a professional business profile. Bring together your services, reviews, before and after work, booking options, social links and more in one place. Learn more at{' '}
        <a href="https://links.forcleaners.co.uk">links.forcleaners.co.uk</a>.
      </>
    ),
  },
  {
    q: 'How do enquiries work?',
    a: 'Choose how customers contact you with instant quotes, fixed pricing, callback requests, walkthrough bookings or booking first journeys. Every enquiry is built around the way your business operates.',
  },
  {
    q: 'What happens after someone gets in touch?',
    a: 'Receive new enquiries through your dashboard and email with the information you need to follow up quickly. You can also connect your existing scheduling workflow.',
  },
  {
    q: 'Can I measure how my profile is performing?',
    a: 'Yes. Track profile views, unique visitors, traffic sources, link clicks, enquiry starts and completed bookings from one analytics dashboard.',
  },
  {
    q: 'Where can I share my profile?',
    a: 'Your profile works across Instagram, TikTok, Facebook, WhatsApp, QR codes, business cards and printed marketing materials. It can also be discovered through search engines.',
  },
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const PREVIEW_IMAGES = Array.from({ length: 8 }, (_, i) => `https://fordesigners.online/ui/preview/IMG_${6113 + i}.jpeg`);

export default function LinksForCleanersModal({ isOpen, onClose }: Props) {
  return (
    <ProductModal
      isOpen={isOpen}
      onClose={onClose}
      previewImages={PREVIEW_IMAGES}
      videoSrc="https://fordesigners.online/product/video/For Cleaners.mp4"
      title="Links For Cleaners"
      subtitle="Professional business profiles built for UK cleaning businesses. Stay visible, capture enquiries and bring everything your customers need into one place."
      brandName="Links For Cleaners"
      brandHref="https://instagram.com/linksforcleaners"
      brandLogo="https://links.forcleaners.co.uk/linksforcleanerscouk.png"
      ctaLabel="Create a Profile"
      ctaHref="https://profile.forcleaners.co.uk/create"
      learnMoreHref="/en/links-for-cleaners"
      shareUrl="https://links.forcleaners.co.uk"
      shareTitle="LinksForCleaners"
      faqs={faqs}
    />
  );
}