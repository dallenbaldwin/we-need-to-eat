import { redirect, type Handle } from '@sveltejs/kit'
import { auth } from '$lib/server'

export const handle: Handle = async ({ event, resolve }) => {
  const handledRequest = auth.handleRequest(event)
  const session = await handledRequest.validate()
  event.locals.auth = handledRequest

  if (protect(event.url.pathname) && !session) throw redirect(302, '/login')
  if (session) event.locals.user = await auth.getUser(session.user.id)

  return resolve(event)
}

function protect(pathname: string) {
  const protectedPathnames = [
    '/eat',
    '/meals',
    '/admin',
    '/account',
    '/planner',
  ] as const
  return protectedPathnames.some((protectedPathname) =>
    pathname.startsWith(protectedPathname)
  )
}
