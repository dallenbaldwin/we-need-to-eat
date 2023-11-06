import { relations } from 'drizzle-orm'
import { sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { users } from './User'

/**
 * this is managed by lucia
 *
 * leave the fields and columns as is
 *
 * @see https://lucia-auth.com/guidebook/drizzle-orm/
 */
export const userKeys = sqliteTable('userKeys', {
  id: text('id').primaryKey(),
  /**
   * @see {@link users.id}
   * @see {@link userKeys}
   */
  user_id: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  /** @see {@link userKeys} */
  hashedPassword: text('hashed_password'),
})
/** @see {@link userKeys} */
export type UserKey = typeof userKeys.$inferSelect
/** @see {@link userKeys} */
export type InsertUserKey = typeof userKeys.$inferInsert
/** @see {@link userKeys} */
export const userKeysRelations = relations(userKeys, ({ one }) => ({
  /** @see {@link users} */
  user: one(users, {
    fields: [userKeys.user_id],
    references: [users.id],
  }),
}))
