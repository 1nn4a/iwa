export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url)

    if (url.hostname === 'innovatewithaima.com') {
      url.hostname = 'www.innovatewithaima.com'
      return Response.redirect(url.toString(), 301)
    }

    return fetch(request)
  },
}