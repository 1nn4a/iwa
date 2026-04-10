import { useEffect, useState } from "react"

export default function CookieBanner(){

const [show,setShow]=useState(false)

useEffect(()=>{
const accepted = localStorage.getItem("cookie-consent")
if(!accepted) setShow(true)
},[])

function accept(){
localStorage.setItem("cookie-consent","yes")
setShow(false)
}

if(!show) return null

return (
<div className="fixed bottom-3 left-3 right-3 md:left-1/2 md:right-auto md:-translate-x-1/2 z-50">

<div className="
bg-black
border border-white/10
rounded-2xl
p-4
md:p-6
backdrop-blur-xl
shadow-2xl
max-w-[620px]
mx-auto
">

<p className="text-sm text-white/80 leading-relaxed">
We use cookies to improve your experience. By continuing to use this site,
you agree to our cookie policy.
</p>

<div className="flex flex-col sm:flex-row gap-2 mt-4">

<button
onClick={accept}
className="w-full sm:w-auto bg-[#5c6cff] px-4 py-2 rounded-full text-sm font-medium"
>
Accept
</button>

<a
href="/cookies"
className="w-full sm:w-auto text-center border border-white/20 px-4 py-2 rounded-full text-sm"
>
Learn more
</a>

</div>

</div>
</div>
)
}