import { Helmet } from "react-helmet-async"

export default function PrivacyPage(){
return(
<>
<Helmet>
<title>Privacy Policy | Innovate With Aima</title>
<meta name="description" content="Privacy policy for Innovate With Aima explaining how we collect, use and protect personal data in accordance with UK data protection laws."/>
</Helmet>

<main className="mx-auto max-w-[900px] px-5 pt-32 pb-24">

<h1 className="text-5xl font-semibold mb-8">Privacy Policy</h1>

<p className="text-white/70 mb-2">
Innovatewithaima Ltd – Privacy Policy
</p>

<p className="text-white/50 mb-10">
Last updated: 07/01/2026
</p>

<div className="space-y-8 text-white/75 leading-7">

<section>
<h2 className="text-xl font-semibold mb-2">1. Company Information</h2>

<p>
Innovatewithaima Ltd<br/>
Registered Office: Innovatewithaima, 124 City Road, London, England, EC1V 2NX<br/>
Registered in England and Wales | Company No. 15198798<br/>
Contact email: contact@innovatewithaima.com
</p>

<p className="mt-2">
We are the data controller for all personal data collected through our website, forms, or communications.
</p>
</section>

<section>
<h2 className="text-xl font-semibold mb-2">2. Personal Data We Collect</h2>

<p>We collect personal data only when you engage with us, such as:</p>

<ul className="mt-2 space-y-1 list-disc list-inside">
<li>Name, email, phone number, and company details via contact forms</li>
<li>Notes or information shared during calls or meetings with Partners</li>
<li>Basic technical data when using our website</li>
</ul>

<p className="mt-2">
We do not collect sensitive personal data (e.g., financial account info beyond payment processing via WHOP, racial/ethnic data, health info).
</p>
</section>

<section>
<h2 className="text-xl font-semibold mb-2">3. How We Use Your Data</h2>

<p>We process personal data for the following purposes:</p>

<ul className="mt-2 space-y-1 list-disc list-inside">
<li>To respond to inquiries and provide information about our network</li>
<li>To manage relationships with Partners and Clients</li>
<li>To facilitate membership and participation in opportunities</li>
<li>To improve our website, tools, and communications</li>
<li>To comply with legal obligations</li>
</ul>

<p className="mt-2">
We rely primarily on legitimate interest as the legal basis for processing, and consent where required (e.g., marketing emails if opted in).
</p>
</section>

<section>
<h2 className="text-xl font-semibold mb-2">4. Data Sharing</h2>

<p>We will never sell your personal data. Data may be shared with:</p>

<ul className="mt-2 space-y-1 list-disc list-inside">
<li>Partners, when necessary to provide opportunities or manage relationships</li>
<li>Service providers, such as hosting providers, WHOP (for payment/membership), and email tools</li>
<li>Legal or regulatory bodies, if required by law</li>
</ul>

<p className="mt-2">
Data shared is limited to what is strictly necessary for the purpose.
</p>
</section>

<section>
<h2 className="text-xl font-semibold mb-2">5. Data Retention</h2>

<p>We keep personal data only as long as necessary:</p>

<ul className="mt-2 space-y-1 list-disc list-inside">
<li>Contact-form and call information: retained for a reasonable period to manage relationships (~3–5 years or as required by law)</li>
<li>Membership-related data: retained for the duration of membership + any required accounting or legal periods</li>
</ul>

<p className="mt-2">
Inactive or outdated accounts may be anonymised or deleted.
</p>
</section>

<section>
<h2 className="text-xl font-semibold mb-2">6. Security of Data</h2>

<p>
We implement reasonable technical and organisational measures to protect personal data against unauthorised access, disclosure, alteration, or destruction.
</p>

<p className="mt-2">
No system can be 100% secure; by using our services, you acknowledge this residual risk.
</p>
</section>

<section>
<h2 className="text-xl font-semibold mb-2">7. Your Rights</h2>

<p>Under UK data protection law, you have the right to:</p>

<ul className="mt-2 space-y-1 list-disc list-inside">
<li>Access your personal data</li>
<li>Request correction of inaccurate data</li>
<li>Request erasure of personal data</li>
<li>Restrict or object to processing</li>
<li>Request data portability</li>
</ul>

<p className="mt-2">
Requests can be made via contact@innovatewithaima.com. We will respond within legal timeframes.
</p>
</section>

<section>
<h2 className="text-xl font-semibold mb-2">8. International Data Transfers</h2>

<p>
Some services we use (e.g., WHOP, email tools) may process data outside the UK. Appropriate safeguards are in place, including standard contractual clauses where required.
</p>
</section>

<section>
<h2 className="text-xl font-semibold mb-2">9. Changes to This Policy</h2>

<p>
We may update this Privacy Policy from time to time. The latest version will always be available on our website. Continued use of our services constitutes acceptance of any updates.
</p>
</section>

<section>
<h2 className="text-xl font-semibold mb-2">10. Contact Us</h2>

<p>
For any questions, concerns, or data requests, contact us at:
</p>

<p className="mt-2">
contact@innovatewithaima.com
</p>

</section>

</div>

</main>
</>
)
}