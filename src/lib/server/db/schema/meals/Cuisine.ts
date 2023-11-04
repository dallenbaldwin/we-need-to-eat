import { sqliteTable } from 'drizzle-orm/sqlite-core'
import { id, archiveDate, createdDate, name, notes, userId } from '../common'
import { relations } from 'drizzle-orm'
import { meals } from './Meal'
import { users } from '../User'

/**
 * i.e. Chinese, American, Mexican
 */
export const cuisines = sqliteTable('cuisines', {
  id: id(),
  archiveDate: archiveDate(),
  createdDate: createdDate(),
  name: name(),
  notes: notes(),
  userId: userId(),
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
