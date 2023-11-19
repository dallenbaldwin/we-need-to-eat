import { relations } from 'drizzle-orm'
import { sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { tags } from '../meals/Tag'
import { userKeys } from './UserKey'
import { userSessions } from './UserSession'

/** @see {@link users.role} */
export const roles = ['user', 'admin'] as const

/**
 * light theme options
 *
 * light if the text color is dark
 *
 * @see {@link https://daisyui.com/docs/themes/}
 * @see {@link users.lightTheme}
 */
export const lightThemes = [
  'light',
  'cupcake',
  'bumblebee',
  'emerald',
  'corporate',
  'retro',
  'cyberpunk',
  'valentine',
  'garden',
  'lofi',
  'pastel',
  'fantasy',
  'wireframe',
  'cmyk',
  'autumn',
  'acid',
  'lemonade',
  'winter',
] as const

/**
 * dark theme options
 *
 * dark if the text color is light
 *
 * @see {@link https://daisyui.com/docs/themes/}
 * @see {@link users.darkTheme}
 */
export const darkThemes = [
  'dark',
  'synthwave',
  'halloween',
  'forest',
  'aqua',
  'black',
  'luxury',
  'dracula',
  'business',
  'night',
  'coffee',
] as const

/**
 * partially managed by lucia
 *
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
  /** @see {@link tags} */
  tags: many(tags),
}))
