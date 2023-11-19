import { primaryKey, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { tags } from '../meals/Tag'
import { relations } from 'drizzle-orm'
import { restaurants } from './Restaurant'

/**
 * enables a many to many with {@link restaurants} and {@link tags}
 *
 * ---
 *
 * don't set the primary key on each column, just use the 3rd argument callback
 * in {@link sqliteTable}
 */
export const restaurantsToTags = sqliteTable(
  'restaurantsToTags',
  {
    /** @see {@link meals.id} */
    recipeId: text('recipeId')
      .notNull()
      .references(() => restaurants.id, {
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
/** @see {@link restaurantsToTags} */
export type RestaurantToTag = typeof restaurantsToTags.$inferSelect
/** @see {@link restaurantsToTags} */
export type InsertRestaurantToTag = typeof restaurantsToTags.$inferInsert
/** @see {@link restaurantsToTags} */
export const restaurantsToTagsRelations = relations(
  restaurantsToTags,
  ({ one }) => ({
    /** @see {@link restaurants} */
    meal: one(restaurants, {
      fields: [restaurantsToTags.recipeId],
      references: [restaurants.id],
    }),
    /** @see {@link tags} */
    tag: one(tags, {
      fields: [restaurantsToTags.tagId],
      references: [tags.id],
    }),
  })
)
