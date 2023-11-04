import { sqliteTable } from 'drizzle-orm/sqlite-core'
import { archiveDate, createdDate, id, name, userId } from '../common'
import { relations } from 'drizzle-orm'
import { users } from '../User'
import { mealsToTags } from './MealToTag'

/**
 * tags allow users to group meals into buckets
 */
export const tags = sqliteTable('tags', {
  id: id(),
  archiveDate: archiveDate(),
  createdDate: createdDate(),
  /** @see {@link users} */
  userId: userId(),
  name: name(),
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
  /** @see {@link mealsToTags} */
  tagToMeals: many(mealsToTags),
}))
