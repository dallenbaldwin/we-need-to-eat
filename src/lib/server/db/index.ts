import { drizzle } from 'drizzle-orm/better-sqlite3'
import { dev } from '$app/environment'
import { users, userKeys, userSessions } from './schema/User'
import Database from 'better-sqlite3'
import { lucia } from 'lucia'
import { betterSqlite3 } from '@lucia-auth/adapter-sqlite'
import { sveltekit } from 'lucia/middleware'

export * from './schema/User'

const sqlite = new Database(dev ? '' : 'we-need-to-eat.db')
sqlite.pragma('journal_mode = WAL')

export const db = drizzle(sqlite, {
  schema: { users, userSessions, userKeys },
})

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
