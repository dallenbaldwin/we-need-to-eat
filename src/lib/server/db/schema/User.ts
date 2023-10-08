import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core'

export type User = typeof User.$inferSelect
export type InsertUser = typeof User.$inferInsert
export const User = sqliteTable('users', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  username: text('username').notNull(),
  admin: integer('admin', { mode: 'boolean' }).notNull().default(false),
})
