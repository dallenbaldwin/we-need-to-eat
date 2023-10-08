import { redirect, type Handle } from '@sveltejs/kit'
import { db } from '$lib/server/db'

export const handle: Handle = async ({ event, resolve }) => {
  event.locals.db = db
  console.log({ user: event.locals.user })
  // TODO resolve user with cookies

  if (!event.locals.user && protect(event.url.pathname))
    throw redirect(303, '/account')

  return resolve(event)
}

function protect(pathname: string) {
  return (
    pathname.startsWith('/eat') ||
    pathname.startsWith('/meals') ||
    pathname.startsWith('/admin')
  )
}
