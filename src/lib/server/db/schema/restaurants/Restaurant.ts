import { sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { relations } from 'drizzle-orm'
import { meals } from '../meals'

/**
 * meals you don't eat at home
 */
export const restaurants = sqliteTable('restaurants', {
  /** @see {@link meals.id} */
  mealId: text('mealId')
    .primaryKey()
    .references(() => meals.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  location: text('location'),
})
/** @see {@link restaurants} */
export type Restaurant = typeof restaurants.$inferSelect
/** @see {@link restaurants} */
export type InsertRestaurant = typeof restaurants.$inferInsert
/** @see {@link restaurants} */
export const restaurantsRelations = relations(restaurants, ({ one }) => ({
  /** @see {@link meals} */
  meal: one(meals, {
    fields: [restaurants.mealId],
    references: [meals.id],
  }),
}))
