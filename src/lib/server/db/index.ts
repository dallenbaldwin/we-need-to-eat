import { drizzle } from 'drizzle-orm/bun-sqlite'
import { Database } from 'bun:sqlite'
import { dev } from '$app/environment'
import { users } from './schema/User'
export { users, type InsertUser, type User } from './schema/User'

const sqlite = new Database(dev ? ':memory:' : 'sqlite.db')
export const db = drizzle(sqlite, {
  schema: {
    users,
  },
})
