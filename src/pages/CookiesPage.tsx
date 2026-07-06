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
Last updated: 06/07/2026
</p>

<div className="space-y-8 text-white/75 leading-7">

<section>
<p>
This website doesn't currently use cookies, tracking, analytics, ads, or other tech that store info on your device.
</p>

<p className="mt-4">
As no cookies are used, no cookie consent banner is displayed.
</p>

<p className="mt-4">
If we introduce cookies or similar technology in the future, this policy will be updated accordingly.
</p>

<p className="mt-4">
If you have any questions about this policy, please contact us using the details on our website.
</p>
</section>

</div>

</main>
</>
)
}