import { sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { baseColumns } from '../../common'
import { relations } from 'drizzle-orm'
import { recipes } from '.'

export const ingredients = sqliteTable('ingredients', {
  ...baseColumns(),
  /** @see {@link recipes.id} */
  recipeId: text('recipeId')
    .notNull()
    .references(() => recipes.id),
})

/** @see {@link ingredients} */
export type Ingredient = typeof ingredients.$inferSelect
/** @see {@link ingredients} */
export type InsertIngredient = typeof ingredients.$inferInsert
/** @see {@link ingredients} */
export const ingredientsRelations = relations(ingredients, ({ one }) => ({
  recipe: one(recipes, {
    fields: [ingredients.recipeId],
    references: [recipes.id],
  }),
}))
