import { useState } from 'react'
import ReCAPTCHA from "react-google-recaptcha"


type FormState = {
  firstName: string
  workEmail: string
  workPhone: string
  message: string
  accurateInformation: boolean
}

const initialState: FormState = {
  firstName: '',
  workEmail: '',
  workPhone: '',
  message: '',
  accurateInformation: false,
}

export default function ApplyPage() {

  const [form, setForm] = useState<FormState>(initialState)
  const [status, setStatus] = useState<'idle'|'sending'|'success'|'error'>('idle')
  const [captcha, setCaptcha] = useState<string | null>(null)

  const update = (key: keyof FormState, value: string | boolean) =>
    setForm(prev => ({...prev,[key]:value}))

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

}catch(err){
console.error(err)
setStatus("error")
}
}

  return (
    
  <main className="mx-auto max-w-[1180px] px-5 pt-28">

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

      <div>

        <h1 className="text-5xl font-semibold">
          Membership Application
        </h1>

        <p className="mt-6 text-white/70">
          Innovate With Aima operates on a selective membership basis.
          Applications are reviewed individually.
        </p>

        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-4">
            Opening Hours
          </h3>

          <div className="space-y-1 text-white/70">
            <p>Monday: 08:00am - 17:00pm</p>
            <p>Tuesday: 08:00am - 17:00pm</p>
            <p>Wednesday: 08:00am - 17:00pm</p>
            <p>Thursday: 08:00am - 17:00pm</p>
            <p>Friday: 08:00am - 17:00pm</p>
            <p>Saturday: 08:00am - 17:00pm</p>
            <p>Sunday: 08:00am - 17:00pm</p>
          </div>

        </div>

      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white/5 p-6 rounded-2xl"
      >

        <input
          placeholder="First name"
          value={form.firstName}
          onChange={e=>update('firstName',e.target.value)}
          className="w-full p-3 rounded-xl bg-black/40"
          required
        />

        <input
          placeholder="Work email"
          value={form.workEmail}
          onChange={e=>update('workEmail',e.target.value)}
          className="w-full p-3 rounded-xl bg-black/40"
          required
        />

        <input
          placeholder="Work phone"
          value={form.workPhone}
          onChange={e=>update('workPhone',e.target.value)}
          className="w-full p-3 rounded-xl bg-black/40"
          required
        />

        <textarea
          placeholder="Message"
          value={form.message}
          onChange={e=>update('message',e.target.value)}
          className="w-full p-3 rounded-xl bg-black/40"
          required
        />

        <label className="flex gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.accurateInformation}
            onChange={e=>update('accurateInformation',e.target.checked)}
            required
          />
          I confirm I provided accurate information
        </label>

        <ReCAPTCHA
          sitekey="6LfNWlMsAAAAAB2kkDpOPOf3sXYqYqUxMovVxtsq"
          theme="dark"
          onChange={(val)=>setCaptcha(val)}
        />

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
Submission failed. Try again.
</p>
)}

      </form>

    </div>

  </main>
  )
}