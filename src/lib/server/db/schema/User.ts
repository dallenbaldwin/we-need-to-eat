import { pgTable, boolean, varchar } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  /**
   * generated by lucia
   *
   * @see https://lucia-auth.com/basics/users/
   */
  id: varchar('id').primaryKey(),
  username: varchar('username').notNull(),
  admin: boolean('admin').notNull().default(false),
})
export type User = typeof users.$inferSelect
export type InsertUser = typeof users.$inferInsert
