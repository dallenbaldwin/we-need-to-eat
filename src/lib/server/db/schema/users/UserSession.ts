import { relations } from 'drizzle-orm'
import { blob, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { users } from './User'

/**
 * this is managed by lucia
 *
 * leave the columns and fields as is
 *
 * @see https://lucia-auth.com/guidebook/drizzle-orm/
 */
export const userSessions = sqliteTable('userSessions', {
  id: text('id').primaryKey(),
  /**
   * @see {@link users.id}
   * @see {@link userSessions}
   */
  user_id: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  /** @see {@link userSessions} */
  active_expires: blob('active_expires', { mode: 'bigint' }).notNull(),
  /** @see {@link userSessions} */
  idle_expires: blob('idle_expires', { mode: 'bigint' }).notNull(),
})
/** @see {@link userSessions} */
export type UserSession = typeof userSessions.$inferSelect
/** @see {@link userSessions} */
export type InsertUserSession = typeof userSessions.$inferInsert
/** @see {@link userSessions} */
export const userSessionsRelations = relations(userSessions, ({ one }) => ({
  /** @see {@link users} */
  user: one(users, {
    fields: [userSessions.user_id],
    references: [users.id],
  }),
}))
