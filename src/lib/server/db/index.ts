import { drizzle } from 'drizzle-orm/better-sqlite3'
import { migrate as m } from 'drizzle-orm/better-sqlite3/migrator'
import { building, dev } from '$app/environment'
import Database from 'better-sqlite3'
import { lucia } from 'lucia'
import { betterSqlite3 } from '@lucia-auth/adapter-sqlite'
import { sveltekit } from 'lucia/middleware'
import * as schema from './schema'
export * from './schema'

const database = 'we-need-to-eat.db' as const
const sqlite = new Database(database)
sqlite.pragma('journal_mode = WAL')

/**
 * drizzle orm wrapper for {@link sqlite|database}
 *
 * @see {@link drizzle}
 */
export const db = drizzle(sqlite, {
  // logger: { logQuery: (query, params) => console.info({ query, params }) },
  schema,
})

/**
 * lucia auth wrapper for {@link sqlite|database}
 *
 * @see {@link lucia}
 */
export const auth = lucia({
  env: dev ? 'DEV' : 'PROD',
  adapter: betterSqlite3(sqlite, {
    user: 'users',
    key: 'userKeys',
    session: 'userSessions',
  }),
  // experimental: { debugMode: dev },
  middleware: sveltekit(),
  getUserAttributes: (data) => ({ ...data }),
})

/** @see {@link auth} */
export type Auth = typeof auth

/** executes drizzle-orm's migration function */
export async function migrate() {
  if (building) return
  console.group('running migrations...')
  try {
    m(drizzle(sqlite, { logger: true }), {
      migrationsFolder: './src/lib/server/db/migrations',
    })
  } catch (err) {
    console.error(err instanceof Error ? err.message : String(err))
  }
  console.groupEnd()
  console.log('done!')
}
