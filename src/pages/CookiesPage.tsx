import { Helmet } from "react-helmet-async"

export default function CookiesPage(){
return(
<>
<Helmet>
<title>Cookies Policy | Innovate With Aima</title>
<meta name="description" content="Innovate With Aima does not use cookies, tracking, analytics or ads on this website."/>
<link rel="canonical" href="https://innovatewithaima.com/cookies" />
</Helmet>

<main className="mx-auto max-w-[900px] px-5 pt-32 pb-24">

<h1 className="text-5xl font-semibold mb-8">Cookies Policy</h1>

<p className="text-white/70 mb-2">
Innovate With Aima Ltd – Cookie Policy
</p>

<p className="text-white/50 mb-10">
Last updated: 29/07/2026</p>

<div className="space-y-8 text-white/75 leading-7">

<section>
  <h2 className="text-xl font-semibold text-white mb-3">innovatewithaima.com</h2>
  <p>
    This website doesn't currently use cookies, tracking, analytics, ads, or other technology that stores information on your device.
  </p>
  <p className="mt-4">
    As no cookies are used on this domain, no cookie consent banner is displayed here.
  </p>
</section>

<section>
  <h2 className="text-xl font-semibold text-white mb-3">group.innovatewithaima.com</h2>
  <p>
    Our network hub at <span className="text-white/90 font-medium">group.innovatewithaima.com</span> does use cookies and collects limited data including IP addresses when you submit forms. This is used to make the site work as you'd expect, improve your experience, analyse site usage, and assist our marketing efforts.
  </p>
  <p className="mt-4">
    When you visit that subdomain, you will be asked to either accept or reject all cookies before using the site. Your preference is stored locally on your device and can be changed by clearing your browser's local storage.
  </p>
  <p className="mt-4">
    If you reject cookies, we will not use your data for analytics or marketing purposes. Note that IP addresses may still be processed at the server level as a standard part of how the internet works.
  </p>
</section>

<section>
  <p>
    If you have any questions about this policy, please contact us using the details on our website.
  </p>
</section>

</div>

</main>
</>
)
}