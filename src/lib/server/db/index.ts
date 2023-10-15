import { drizzle } from 'drizzle-orm/node-postgres'
import { dev } from '$app/environment'
import { users } from './schema/User'
import { userSessions } from './schema/UserSession'
import { userKeys } from './schema/UserKey'
import { Pool } from 'pg'
import { env } from '$env/dynamic/private'
export { users, type InsertUser, type User } from './schema/User'
export { userKeys, type InsertUserKey, type UserKey } from './schema/UserKey'
export {
  userSessions,
  type InsertUserSession,
  type UserSession,
} from './schema/UserSession'

export const connectionString = dev
  ? 'postgresql://postgres:postgres@localhost:5438/we-need-to-eat'
  : env.DATABASE_URL

const pool = new Pool({ connectionString })

// TODO go back to sqlite, but this time use better sqlite so we can try fly.io
export const db = drizzle(pool, {
  schema: { users, userSessions, userKeys },
})
