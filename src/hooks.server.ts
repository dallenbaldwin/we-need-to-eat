import { redirect, type Handle } from '@sveltejs/kit'
import { auth } from '$lib/server'

export const handle: Handle = async ({ event, resolve }) => {
  const handledRequest = auth.handleRequest(event)
  const session = await handledRequest.validate()
  if (!session && protect(event.url.pathname)) throw redirect(303, '/account')

  event.locals.auth = handledRequest
  return resolve(event)
}

function protect(pathname: string) {
  const protectedPathnames = ['/eat', '/meals', '/admin'] as const
  return protectedPathnames.some((protectedPathname) =>
    pathname.startsWith(protectedPathname)
  )
}
