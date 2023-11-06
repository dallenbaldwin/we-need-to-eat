import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { relations } from 'drizzle-orm'
import { meals } from '../meals'

/**
 * recipes are "home-cooked" meals
 */
export const recipes = sqliteTable('recipes', {
  /** @see {@link meals} */
  mealId: text('mealId')
    .primaryKey()
    .references(() => meals.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  directions: text('directions'),
  portions: int('portions', { mode: 'number' }),
  minutesToPrepare: int('minutesToPrepare', { mode: 'number' }),
})
/** @see {@link recipes} */
export type Recipe = typeof recipes.$inferSelect
/** @see {@link recipes} */
export type InsertRecipe = typeof recipes.$inferInsert
/** @see {@link recipes} */
export const recipesRelations = relations(recipes, ({ one }) => ({
  /** @see {@link meals} */
  meal: one(meals, {
    fields: [recipes.mealId],
    references: [meals.id],
  }),
}))
