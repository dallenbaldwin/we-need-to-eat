import { bigint, pgTable, varchar } from 'drizzle-orm/pg-core'
import { users } from './User'

/**
 * @see https://lucia-auth.com/guidebook/drizzle-orm/
 */
export const userSessions = pgTable('user_sessions', {
  id: varchar('id').primaryKey(),
  userId: varchar('user_id')
    .notNull()
    .references(() => users.id),
  activeExpires: bigint('active_expires', { mode: 'number' }).notNull(),
  idleExpires: bigint('idle_expires', { mode: 'number' }).notNull(),
})
export type UserSession = typeof userSessions.$inferSelect
export type InsertUserSession = typeof userSessions.$inferInsert
