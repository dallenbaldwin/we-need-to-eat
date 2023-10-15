import { redirect, type Handle } from '@sveltejs/kit'
import { migrate } from 'drizzle-orm/node-postgres/migrator'
import { connectionString } from '$lib/server/db'
import { building } from '$app/environment'
import { Client } from 'pg'
import { drizzle } from 'drizzle-orm/node-postgres'
import { auth } from '$lib/server/auth'

startup()

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

async function startup() {
  try {
    if (!building) {
      const client = new Client({ connectionString })
      const db = drizzle(client)
      migrate(db, { migrationsFolder: './src/lib/server/db/migrations' })
      console.log('migrated database')
    }
  } catch (err) {
    console.error(err)
  }
}
