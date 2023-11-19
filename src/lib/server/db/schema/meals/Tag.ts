import { sqliteTable } from 'drizzle-orm/sqlite-core'
import { relations } from 'drizzle-orm'
import { users } from '../users/User'
import { baseColumns, withName, withUserId } from '../../common'
import { recipesToTags } from '../recipes/RecipeToTag'
import { restaurantsToTags } from '../restaurants/RestaurantToTag'

/**
 * tags allow users to group meals into buckets
 */
export const tags = sqliteTable('tags', {
  ...baseColumns(),
  ...withUserId(),
  ...withName(),
})
/** @see {@link tags} */
export type Tag = typeof tags.$inferSelect
/** @see {@link tags} */
export type InsertTag = typeof tags.$inferInsert
export const tagsRelations = relations(tags, ({ one, many }) => ({
  /** @see {@link users} */
  user: one(users, {
    fields: [tags.userId],
    references: [users.id],
  }),
  /** @see {@link recipesToTags} */
  tagToRecipes: many(recipesToTags),
  /** @see {@link restaurantsToTags} */
  tagToRestaurants: many(restaurantsToTags),
}))
