import { primaryKey, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { meals } from './Meal'
import { tags } from './Tag'
import { relations } from 'drizzle-orm'

/**
 * enables a many to many with {@link meals} and {@link tags}
 *
 * ---
 *
 * don't set the primary key on each column, just use the 3rd argument callback
 * in {@link sqliteTable}
 */
export const mealsToTags = sqliteTable(
  'meals_to_tags',
  {
    mealId: text('meal_id').references(() => meals.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    tagId: text('tag_id').references(() => tags.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
  },
  ({ mealId, tagId }) => ({ pk: primaryKey(tagId, mealId) })
)
/** @see {@link mealsToTags} */
export type MealToTag = typeof mealsToTags.$inferSelect
/** @see {@link mealsToTags} */
export type InsertMealToTag = typeof mealsToTags.$inferInsert
export const mealsToTagsRelations = relations(mealsToTags, ({ one }) => ({
  /** @see {@link meals} */
  meal: one(meals, {
    fields: [mealsToTags.mealId],
    references: [meals.id],
  }),
  /** @see {@link tags} */
  tag: one(tags, {
    fields: [mealsToTags.tagId],
    references: [tags.id],
  }),
}))
