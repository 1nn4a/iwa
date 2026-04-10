import { useState } from "react"
import ReCAPTCHA from "react-google-recaptcha"
import { Helmet } from "react-helmet-async"

export default function ApplyPage(){

const initialState = {
firstName:"",
workEmail:"",
workPhone:"",
message:"",
accurateInformation:false
}

const [form,setForm] = useState(initialState)
const [status,setStatus] = useState<"idle"|"sending"|"success"|"error">("idle")
const [captcha,setCaptcha] = useState<string | null>(null)

function update(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
const {name,value,type} = e.target

if(type==="checkbox"){
const checked = (e.target as HTMLInputElement).checked
setForm(prev=>({...prev,[name]:checked}))
}else{
setForm(prev=>({...prev,[name]:value}))
}
}

async function handleSubmit(e: React.FormEvent){
e.preventDefault()

if(!captcha){
setStatus("error")
return
}

setStatus("sending")

try{

const res = await fetch("/api/apply",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
...form,
captcha
})
})

if(!res.ok){
const text = await res.text()
console.error(text)
throw new Error(text)
}

setStatus("success")
setForm(initialState)
setCaptcha(null)

}catch(err){
console.error(err)
setStatus("error")
}
}

return(
<>
<Helmet>
<title>Apply | Innovate With Aima</title>
<meta
name="description"
content="Apply to join the Innovate With Aima network. Membership is selective and reviewed individually."
/>
</Helmet>

<main className="mx-auto max-w-[1100px] px-4 md:px-8 pt-32 pb-24">

<div className="grid grid-cols-1 md:grid-cols-2 gap-12">

{/* LEFT */}

<div>

<h1 className="text-4xl font-semibold mb-6">
Membership Application
</h1>

<p className="text-white/70 leading-7">
Innovate With Aima operates on a selective membership basis.
Applications are reviewed individually. Acceptance is not guaranteed
and depends on suitability, experience, and current network demand.
</p>

<p className="mt-6 text-white/60">
To begin, please fill the application form:
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

{/* RIGHT FORM */}

<form onSubmit={handleSubmit} className="space-y-4">

<input
name="firstName"
placeholder="First Name"
value={form.firstName}
onChange={update}
required
className="w-full bg-black border border-white/10 rounded-xl px-4 py-3"
/>

<input
name="workEmail"
type="email"
placeholder="Work Email"
value={form.workEmail}
onChange={update}
required
className="w-full bg-black border border-white/10 rounded-xl px-4 py-3"
/>

<input
name="workPhone"
placeholder="Work Phone"
value={form.workPhone}
onChange={update}
className="w-full bg-black border border-white/10 rounded-xl px-4 py-3"
/>

<textarea
name="message"
placeholder="Message"
value={form.message}
onChange={update}
rows={5}
className="w-full bg-black border border-white/10 rounded-xl px-4 py-3"
/>

<label className="flex gap-2 text-sm text-white/70">
<input
type="checkbox"
name="accurateInformation"
checked={form.accurateInformation}
onChange={update}
/>
I confirm the information provided is accurate
</label>

<div className="pt-2">
<ReCAPTCHA
sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
onChange={(val)=>setCaptcha(val)}
theme="dark"
/>
</div>

<button
disabled={status==="sending"}
className="w-full bg-[#5c6cff] py-3 rounded-full disabled:opacity-50"
>
{status==="sending" ? "Submitting..." : "Submit Application"}
</button>

{status==="success" && (
<p className="text-green-400 text-sm">
Application submitted successfully
</p>
)}

{status==="error" && (
<p className="text-red-400 text-sm">
Submission failed. Please complete captcha and try again.
</p>
)}

</form>

</div>

</main>
</>
)
}