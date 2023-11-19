import { sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { relations } from 'drizzle-orm'
import { users } from '../users/User'
import { baseColumns, withName, withUserId } from '../../common'
import { recipes } from '../recipes'
import { restaurants } from '../restaurants'

/**
 * i.e. Chinese, American, Mexican
 */
export const cuisines = sqliteTable('cuisines', {
  ...baseColumns(),
  ...withName(),
  ...withUserId(),
  notes: text('notes'),
})
/** @see {@link cuisines} */
export type Cuisine = typeof cuisines.$inferSelect
/** @see {@link cuisines} */
export type InsertCuisine = typeof cuisines.$inferInsert
/** @see {@link cuisines} */
export const cuisinesRelations = relations(cuisines, ({ one, many }) => ({
  /** @see {@link recipes} */
  recipes: many(recipes),
  /** @see {@link users} */
  user: one(users, {
    fields: [cuisines.userId],
    references: [users.id],
  }),
  /** @see {@link restaurants} */
  restaurants: many(restaurants),
}))
