import sanitizeHtml from "sanitize-html"

export const onRequestPost = async ({ request, env }: any) => {

const body = await request.json()


const firstName = sanitizeHtml(body.firstName || "", { allowedTags: [] }).trim()

const workEmail = sanitizeHtml(body.workEmail || "", { allowedTags: [] })
.trim()
.toLowerCase()

const workPhone = sanitizeHtml(body.workPhone || "", { allowedTags: [] }).trim()

const message = sanitizeHtml(body.message || "", {
allowedTags: [],
allowedAttributes: {}
}).trim()

const accurateInformation = Boolean(body.accurateInformation)


if(!firstName || !workEmail){
return new Response("Missing fields",{status:400})
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

if(!emailRegex.test(workEmail)){
return new Response("Invalid email",{status:400})
}


const verify = await fetch(
"https://www.google.com/recaptcha/api/siteverify",
{
method:"POST",
headers:{
"Content-Type":"application/x-www-form-urlencoded"
},
body:`secret=${env.RECAPTCHA_SECRET}&response=${body.captcha}`
})

const captchaData = await verify.json()

if(!captchaData.success){
return new Response("captcha failed",{status:400})
}


await fetch(`https://api.airtable.com/v0/${env.AIRTABLE_BASE_ID}/${env.AIRTABLE_TABLE_NAME}`,{
method:"POST",
headers:{
Authorization:`Bearer ${env.AIRTABLE_TOKEN}`,
"Content-Type":"application/json"
},
body:JSON.stringify({
records:[
{
fields:{
"First Name": firstName,
"Work Email": workEmail,
"Work Phone": workPhone,
"Message": message,
"Accurate Information": accurateInformation,
"Created": new Date().toISOString()
}
}
]
})
})

return new Response("ok")
}