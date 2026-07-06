import { Helmet } from "react-helmet-async"

export default function ApplyPage(){

return(
<>
<Helmet>
<title>Apply | Innovate With Aima</title>
<meta name="description" content="Apply to join the Innovate With Aima network. Membership is selective and reviewed individually." />
<link rel="canonical" href="https://innovatewithaima.com/apply" />
</Helmet>

<main className="mx-auto max-w-[1100px] px-4 md:px-8 pt-32 pb-24">

<div className="grid grid-cols-1 md:grid-cols-2 gap-12">

 
<div>

<h1 className="text-4xl font-semibold mb-6">
Membership Application
</h1>

<p className="text-white/70 leading-7">
Innovate With Aima operates on a selective membership basis.
Applications are reviewed individually. Acceptance is not guaranteed
and depends on suitability, experience, and current network demand.
</p>



<div className="mt-10 text-sm text-white/70 space-y-1">
<p>Monday: 08:00am - 17:00pm</p>
<p>Tuesday: 08:00am - 17:00pm</p>
<p>Wednesday: 08:00am - 17:00pm</p>
<p>Thursday: 08:00am - 17:00pm</p>
<p>Friday: 08:00am - 17:00pm</p>
<p>Saturday: 08:00am - 17:00pm</p>
<p>Sunday: 08:00am - 17:00pm</p>
</div>

</div>

 
<div className="space-y-6">

<div>
<p className="text-xs uppercase tracking-[0.3em] text-white/55 mb-2">
To apply
</p>

<a href="mailto:apply@innovatewithaima.com"
className="text-2xl font-medium text-[#8da2ff] hover:underline break-all"
>
apply@innovatewithaima.com
</a>
</div>

<div>
<p className="text-xs uppercase tracking-[0.3em] text-white/55 mb-2">
For enquiries
</p>

<a href="mailto:business@innovatewithaima.com"
className="text-2xl font-medium text-[#8da2ff] hover:underline break-all"
>
business@innovatewithaima.com
</a>
</div>

<p className="text-sm text-white/60 leading-7">
We aim to respond to all messages within 2 days.
</p>

</div>

</div>

</main>
</>
)
}