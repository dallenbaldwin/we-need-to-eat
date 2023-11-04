import { sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { archiveDate, createdDate, id, name, notes, userId } from '../common'
import { cuisines } from './Cuisine'
import { relations } from 'drizzle-orm'
import { users } from '../User'
import { mealsToTags } from './MealToTag'

/**
 * a "base" entity that includes common properties for all meal types
 *
 * each meal type entity will have a one-to-one with it's meal
 */
export const meals = sqliteTable('meals', {
  id: id(),
  archiveDate: archiveDate(),
  createdDate: createdDate(),
  name: name(),
  notes: notes(),
  cuisineId: text('cuisine_id').references(() => cuisines.id),
  rating: text('rating', { enum: ['1', '2', '3', '4', '5'] }),
  userId: userId(),
})
/** @see {@link meals} */
export type Meal = typeof meals.$inferSelect
/** @see {@link meals} */
export type InsertMeal = typeof meals.$inferInsert
/** @see {@link meals} */
export const mealsRelations = relations(meals, ({ one, many }) => ({
  /** @see {@link cuisines} */
  cuisine: one(cuisines, {
    fields: [meals.cuisineId],
    references: [cuisines.id],
  }),
  /** @see {@link users} */
  user: one(users, {
    fields: [meals.userId],
    references: [users.id],
  }),
  /** @see {@link mealsToTags} */
  mealToTags: many(mealsToTags),
}))
