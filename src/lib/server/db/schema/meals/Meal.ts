import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { cuisines } from './Cuisine'
import { relations } from 'drizzle-orm'
import { users } from '../users/User'
import { mealsToTags } from './MealToTag'
import { ratings } from '../../../..'

/**
 * a "base" entity that includes common properties for all meal types
 *
 * each meal type entity will have a one-to-one with it's meal
 */
export const meals = sqliteTable('meals', {
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
  /** @see {@link cuisines.id} */
  cuisineId: text('cuisineId').references(() => cuisines.id),
  rating: text('rating', { enum: ratings }),
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
  // /** @see {@link recipes} */
  // recipe: one(recipes, {
  //   fields: [meals.id],
  //   references: [recipes.mealId],
  // }),
  // /** @see {@link restaurants} */
  // restaurant: one(restaurants, {
  //   fields: [meals.id],
  //   references: [restaurants.mealId],
  // }),
}))
