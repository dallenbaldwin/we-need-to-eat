import { int, text } from 'drizzle-orm/sqlite-core'
import { users } from './schema/users/User'

export function withUserId() {
  return {
    userId: text('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  }
}

/**
 * required name
 */
export function withName() {
  return { name: text('name').notNull() }
}

export function baseColumns() {
  return {
    /**
     * a primary uuid generated with {@link crypto.generateUUID}
     */
    id: text('id')
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    /**
     * the date this record was archived
     *
     * archived records are considered inactive, not shown with active records,
     * and can reactivated later
     *
     * like a soft-delete
     */
    archiveDate: int('archiveDate', { mode: 'timestamp_ms' }),
    /**
     * the date this record was created in the database
     */
    createdDate: int('createdDate', { mode: 'timestamp_ms' })
      .notNull()
      .$defaultFn(() => new Date()),
  }
}
