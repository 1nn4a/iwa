import { Helmet } from "react-helmet-async"

export default function CookiesPage(){
return(
<>
<Helmet>
<title>Cookies Policy | Innovate With Aima</title>
<meta name="description" content="Learn how Innovate With Aima uses cookies, analytics tools and essential website technologies to improve performance and user experience."/>
</Helmet>

<main className="mx-auto max-w-[900px] px-5 pt-32 pb-24">

<h1 className="text-5xl font-semibold mb-8">Cookies Policy</h1>

<p className="text-white/70 mb-2">
Innovate With Aima Ltd – Cookie Policy
</p>

<p className="text-white/50 mb-10">
Last updated: 07/01/2026
</p>

<div className="space-y-8 text-white/75 leading-7">

<section>
<h2 className="text-xl font-semibold mb-2">1. What are cookies?</h2>

<p>
Cookies are small text files stored on your device when you visit a website. They help websites function properly, improve performance, and provide basic analytics.
</p>

<p className="mt-2">
First-party cookies: Set by IWA, e.g., to remember your consent preferences or secure sessions.
</p>

<p className="mt-2">
Third-party cookies: Set by service providers like Google Analytics, used to monitor site performance.
</p>

</section>

<section>
<h2 className="text-xl font-semibold mb-2">2. Cookies We Use</h2>

<h3 className="font-semibold mt-4">Essential Cookies</h3>

<p className="mt-2">
These cookies are required for the Website to function:
</p>

<div className="mt-4 border border-white/10 rounded-xl p-4 text-sm">
<p>csrftoken — Protects against malicious activity and ensures secure form submissions — 29 days</p>
<p>cookie_consent — Stores visitor’s consent preference — 1 year</p>
</div>

<h3 className="font-semibold mt-6">Analytics Cookies (Optional)</h3>

<p className="mt-2">
Used to understand Website performance and improve user experience:
</p>

<div className="mt-4 border border-white/10 rounded-xl p-4 text-sm">
<p>_ga / _gid — Google Analytics – tracks visitor interactions — 2 years / 24 hours</p>
</div>

<p className="mt-3">
Analytics cookies are optional. You may block or delete them via your browser settings.
</p>

</section>

<section>
<h2 className="text-xl font-semibold mb-2">3. How to Control Cookies</h2>

<p>
You can manage cookies through your browser settings:
</p>

<ul className="list-disc list-inside mt-2 space-y-1">
<li>Chrome</li>
<li>Firefox</li>
<li>Safari</li>
<li>Edge</li>
</ul>

<p className="mt-2">
Essential cookies cannot be disabled, as they are required for the Website to function. Analytics cookies can be blocked or deleted without affecting your access.
</p>

</section>

<section>
<h2 className="text-xl font-semibold mb-2">4. Third-Party Services</h2>

<p>
We use third-party service providers such as:
</p>

<ul className="list-disc list-inside mt-2 space-y-1">
<li>WHOP for payments and memberships</li>
<li>Google Analytics for performance data</li>
</ul>

<p className="mt-2">
These services may store cookies on your device. We do not control their privacy practices; please refer to their privacy policies for more information.
</p>

</section>

<section>
<h2 className="text-xl font-semibold mb-2">5. Updates to This Policy</h2>

<p>
We may update this Cookie Policy from time to time. The latest version will always be available on the Website. Continued use of the Website constitutes acceptance of any changes.
</p>

</section>

<section>
<h2 className="text-xl font-semibold mb-2">6. Contact</h2>

<p>
For questions about our use of cookies, email:
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