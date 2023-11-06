import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { relations } from 'drizzle-orm'
import { users } from '../users/User'
import { mealsToTags } from './MealToTag'

/**
 * tags allow users to group meals into buckets
 */
export const tags = sqliteTable('tags', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  archiveDate: int('archiveDate', { mode: 'timestamp_ms' }),
  createdDate: int('createdDate', { mode: 'timestamp_ms' })
    .notNull()
    .$defaultFn(() => new Date()),
  name: text('name').notNull(),
  /** @see {@link users.id} */
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
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
