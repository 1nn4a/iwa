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

import img6113 from '../../assets/IMG_6113.jpg';
import img6114 from '../../assets/IMG_6114.jpg';
import img6115 from '../../assets/IMG_6115.jpg';
import img6116 from '../../assets/IMG_6116.jpg';
import img6117 from '../../assets/IMG_6117.jpg';
 import img6120 from '../../assets/IMG_6120.jpg';
import img6121 from '../../assets/IMG_6121.jpg';

const PREVIEW_IMAGES = [img6113,img6114,img6115,img6116,img6117,img6120,img6121];
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