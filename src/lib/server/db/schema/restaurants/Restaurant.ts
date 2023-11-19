import { sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { relations } from 'drizzle-orm'
import { meal } from '../meals/common'

/**
 * meals you don't eat at home
 */
export const restaurants = sqliteTable('restaurants', {
  ...meal(),
  location: text('location'),
})
/** @see {@link restaurants} */
export type Restaurant = typeof restaurants.$inferSelect
/** @see {@link restaurants} */
export type InsertRestaurant = typeof restaurants.$inferInsert
/** @see {@link restaurants} */
export const restaurantsRelations = relations(restaurants, () => ({}))
