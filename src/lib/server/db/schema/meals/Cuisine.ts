import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { relations } from 'drizzle-orm'
import { meals } from './Meal'
import { users } from '../User'

/**
 * i.e. Chinese, American, Mexican
 */
export const cuisines = sqliteTable('cuisines', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  archiveDate: int('archiveDate', { mode: 'timestamp_ms' }),
  createdDate: int('createdDate', { mode: 'timestamp_ms' })
    .notNull()
    .$defaultFn(() => new Date()),
  name: text('name').notNull(),
  notes: text('notes'),
  /** @see {@link users.id} */
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
})
/** @see {@link cuisines} */
export type Cuisine = typeof cuisines.$inferSelect
/** @see {@link cuisines} */
export type InsertCuisine = typeof cuisines.$inferInsert
/** @see {@link cuisines} */
export const cuisinesRelations = relations(cuisines, ({ one, many }) => ({
  /** @see {@link meals} */
  meals: many(meals),
  /** @see {@link users} */
  user: one(users, {
    fields: [cuisines.userId],
    references: [users.id],
  }),
}))
