import { drizzle } from 'drizzle-orm/better-sqlite3'
import { migrate as m } from 'drizzle-orm/better-sqlite3/migrator'
import { building, dev } from '$app/environment'
import { users, userKeys, userSessions } from './schema/User'
import Database from 'better-sqlite3'
import { lucia } from 'lucia'
import { betterSqlite3 } from '@lucia-auth/adapter-sqlite'
import { sveltekit } from 'lucia/middleware'

export * from './schema/User'

const database = 'we-need-to-eat.db' as const
const sqlite = new Database(database)
sqlite.pragma('journal_mode = WAL')

/**
 * drizzle orm wrapper for {@link sqlite|database}
 *
 * @see {@link drizzle}
 */
export const db = drizzle(sqlite, {
  schema: { users, userSessions, userKeys },
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
  middleware: sveltekit(),
  getUserAttributes: (data) => ({ ...data }),
})

export type Auth = typeof auth

/** executes drizzle-orm's migration function */
export async function migrate() {
  if (building) return
  try {
    m(drizzle(sqlite), {
      migrationsFolder: './src/lib/server/db/migrations',
    })
  } catch (err) {
    console.error(err instanceof Error ? err.message : String(err))
  }
}
