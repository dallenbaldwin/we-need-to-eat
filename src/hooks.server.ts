import { redirect, type Handle } from '@sveltejs/kit'
import { migrate } from 'drizzle-orm/bun-sqlite/migrator'
import { db } from '$lib/server/db'

startup()

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

async function startup() {
  try {
    migrate(db, { migrationsFolder: './src/lib/server/db/migrations' })
    console.log('migrated database')
  } catch (err) {
    console.error(err)
  }
}
