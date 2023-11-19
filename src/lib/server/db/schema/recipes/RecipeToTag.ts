import { primaryKey, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { tags } from '../meals/Tag'
import { relations } from 'drizzle-orm'
import { recipes } from './Recipe'

/**
 * enables a many to many with {@link recipes} and {@link tags}
 *
 * ---
 *
 * don't set the primary key on each column, just use the 3rd argument callback
 * in {@link sqliteTable}
 */
export const recipesToTags = sqliteTable(
  'recipesToTags',
  {
    /** @see {@link meals.id} */
    recipeId: text('recipeId')
      .notNull()
      .references(() => recipes.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
    /** @see {@link tags.id} */
    tagId: text('tagId')
      .notNull()
      .references(() => tags.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
  },
  ({ recipeId, tagId }) => ({ pk: primaryKey(tagId, recipeId) })
)
/** @see {@link recipesToTags} */
export type RecipeToTag = typeof recipesToTags.$inferSelect
/** @see {@link recipesToTags} */
export type InsertRecipeToTag = typeof recipesToTags.$inferInsert
/** @see {@link recipesToTags} */
export const recipesToTagsRelations = relations(recipesToTags, ({ one }) => ({
  /** @see {@link recipes} */
  recipe: one(recipes, {
    fields: [recipesToTags.recipeId],
    references: [recipes.id],
  }),
  /** @see {@link tags} */
  tag: one(tags, {
    fields: [recipesToTags.tagId],
    references: [tags.id],
  }),
}))
