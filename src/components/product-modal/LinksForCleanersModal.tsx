// components/product-modal/LinksForCleanersModal.tsx
import ProductModal, { type ProductModalFaq } from './ProductModal';
const faqs: ProductModalFaq[] = [
  {
    q: 'What are Links For Cleaners?',
    a: (
      <>
        Links For Cleaners is a shareable profile link that brings together everything people need to know about your
        cleaning business or brand in one place — services, reviews, social media, recommended products and enquiry
        options, all designed for cleaning professionals and creators across the UK. Read more at{' '}
        <a href="https://links.forcleaners.co.uk">links.forcleaners.co.uk</a>.
      </>
    ),
  },
  {
    q: 'Can I customise how customers receive quotes?',
    a: 'Yes. Offer instant quotes, fixed-price services, callback requests, walkthrough bookings or booking-first flows, with pricing bands, discounts and service settings tailored to your business.',
  },
  {
    q: 'What happens after someone submits an enquiry?',
    a: "Customers can request a callback, book a walkthrough or continue through your chosen enquiry journey. You'll receive job details through your dashboard and email, and can connect existing scheduling tools too.",
  },
  {
    q: 'Can I see how people interact with my profile?',
    a: 'Yes. Profile Analytics shows unique visitors, total profile views, traffic sources, link clicks, enquiry starts and completed bookings.',
  },
  {
    q: 'Can I share my profile anywhere?',
    a: 'Yes. Every profile is shareable across social media, messaging apps, QR codes, business cards and print, and is also indexable by search engines.',
  },
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function LinksForCleanersModal({ isOpen, onClose }: Props) {
  return (
    <ProductModal
      isOpen={isOpen}
      onClose={onClose}
      videoSrc="https://fordesigners.online/product/video/For Cleaners.mp4"
      title="Links For Cleaners"
      subtitle="LinksForCleaners - Market Your Cleaning Business Online · Personalised marketing pages for cleaning businesses and clean-fluencers in the UK. Instant quotes, booking tools, and social proof all from one link."
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