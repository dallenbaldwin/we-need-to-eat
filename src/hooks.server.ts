import { redirect, type Handle } from '@sveltejs/kit'
import { auth, migrate } from '$lib/server'

migrate()

export const handle: Handle = async ({ event, resolve }) => {
  const handledRequest = auth.handleRequest(event)
  const session = await handledRequest.validate()
  // TODO separate account from login/register. probably merge login/register
  if (!session && protect(event.url.pathname))
    throw redirect(302, '/account/login')

  event.locals.auth = handledRequest
  if (session) event.locals.user = await auth.getUser(session.user.id)

  return resolve(event)
}

function protect(pathname: string) {
  // TODO protect account after separating login/register from account
  const protectedPathnames = ['/eat', '/meals', '/admin'] as const
  return protectedPathnames.some((protectedPathname) =>
    pathname.startsWith(protectedPathname)
  )
}
