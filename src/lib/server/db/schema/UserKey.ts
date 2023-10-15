import { pgTable, varchar } from 'drizzle-orm/pg-core'
import { users } from './User'

/**
 * @see https://lucia-auth.com/guidebook/drizzle-orm/
 */
export const userKeys = pgTable('user_keys', {
  id: varchar('id').primaryKey(),
  userId: varchar('user_id')
    .notNull()
    .references(() => users.id),
  hashedPassword: varchar('hashed_password'),
})
export type UserKey = typeof userKeys.$inferSelect
export type InsertUserKey = typeof userKeys.$inferInsert
