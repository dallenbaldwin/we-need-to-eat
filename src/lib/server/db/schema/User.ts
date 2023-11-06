import { relations } from 'drizzle-orm'
import { sqliteTable, text, blob } from 'drizzle-orm/sqlite-core'
import { meals } from './meals/Meal'
import { tags } from './meals/Tag'
import { darkThemes, lightThemes, roles } from '../../../'

/**
 * lucia does not support default, auto generated, column values
 *
 * @see https://lucia-auth.com/basics/database/#user-table
 */
export const users = sqliteTable('users', {
  /**
   * generated and managed by lucia
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
  /**
   * the theme to use when the system color scheme is light
   *
   * @default 'light'
   * @see {@link lightThemes}
   */
  lightTheme: text('lightTheme', { enum: lightThemes }).notNull(),
  /**
   * the theme to use when the system color scheme is dark
   *
   * @default 'dark'
   * @see {@link darkThemes}
   */
  darkTheme: text('darkTheme', { enum: darkThemes }).notNull(),
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
  /** @see {@link meals} */
  meals: many(meals),
  /** @see {@link tags} */
  tags: many(tags),
}))

/**
 * leave the fields and columns as is
 *
 * @see https://lucia-auth.com/guidebook/drizzle-orm/
 */
export const userKeys = sqliteTable('userKeys', {
  id: text('id').primaryKey(),
  /** @see {@link users.id} */
  user_id: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
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

/**
 * leave the columns and fields as is
 *
 * @see https://lucia-auth.com/guidebook/drizzle-orm/
 */
export const userSessions = sqliteTable('userSessions', {
  id: text('id').primaryKey(),
  /** @see {@link users.id} */
  user_id: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  active_expires: blob('active_expires', { mode: 'bigint' }).notNull(),
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
