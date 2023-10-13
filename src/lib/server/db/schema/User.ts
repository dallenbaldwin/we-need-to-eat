import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core'

export const users = sqliteTable('users', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  username: text('username').notNull().unique(),
  admin: integer('admin', { mode: 'boolean' }).notNull().default(false),
})
export type User = typeof users.$inferSelect
export type InsertUser = typeof users.$inferInsert
