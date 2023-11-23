import { relations } from 'drizzle-orm'
import { sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { tags } from '../meals/Tag'
import { userKeys } from './UserKey'
import { userSessions } from './UserSession'

/** @see {@link users.role} */
export const roles = ['user', 'admin'] as const

/**
 * partially managed by lucia
 *
 * lucia does not support default, auto generated, column values
 *
 * @see https://lucia-auth.com/basics/database/#user-table
 */
export const users = sqliteTable('users', {
  /**
   * if you don't generate a uuid, lucia will create a 15 char [a-z]|[0-9] string
   *
   * @see https://lucia-auth.com/basics/users/
   */
  id: text('id').primaryKey(),
  username: text('username').notNull(),
  /**
   * most users have the 'user' role
   *
   * admins have sudo privileges
   *
   * @default 'user'
   * @see {@link roles}
   */
  role: text('role', { enum: roles }).notNull(),
})
/** @see {@link users} */
export type User = typeof users.$inferSelect
/** @see {@link users} */
export type InsertUser = typeof users.$inferInsert
/** @see {@link users} */
export const usersRelations = relations(users, ({ many }) => ({
  /** @see {@link userKeys} */
  userKeys: many(userKeys),
  /** @see {@link userSessions} */
  userSessions: many(userSessions),
  /** @see {@link tags} */
  tags: many(tags),
}))
