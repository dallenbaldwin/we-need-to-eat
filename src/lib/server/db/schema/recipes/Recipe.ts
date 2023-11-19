import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { relations } from 'drizzle-orm'
import { meal } from '../meals/common'
import { recipesToTags } from './RecipeToTag'

/**
 * recipes are "home-cooked" meals
 */
export const recipes = sqliteTable('recipes', {
  ...meal(),
  directions: text('directions'),
  portions: int('portions', { mode: 'number' }),
  minutesToPrepare: int('minutesToPrepare', { mode: 'number' }),
})
/** @see {@link recipes} */
export type Recipe = typeof recipes.$inferSelect
/** @see {@link recipes} */
export type InsertRecipe = typeof recipes.$inferInsert
/** @see {@link recipes} */
export const recipesRelations = relations(recipes, ({ many }) => ({
  /** @see {@link recipesToTags} */
  recipeToTags: many(recipesToTags),
}))
