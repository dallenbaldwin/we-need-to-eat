import { redirect, type Handle } from '@sveltejs/kit'

export const handle: Handle = async ({ event, resolve }) => {
  // TODO resolve user with cookies

  if (!event.locals.user && protect(event.url.pathname))
    throw redirect(303, '/account')

  return resolve(event)
}

function protect(pathname: string) {
  const protectedPathnames = ['/eat', '/meals', '/admin'] as const
  return protectedPathnames.some((protectedPathname) =>
    pathname.startsWith(protectedPathname)
  )
}
