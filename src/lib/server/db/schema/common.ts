import { int, text } from 'drizzle-orm/sqlite-core'
import { users } from './User'

/**
 * todo document me
 * @returns
 */
export function id() {
  return text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID())
}

/**
 * todo document me
 * @returns
 */
export function createdDate() {
  return int('created_date', { mode: 'timestamp_ms' })
    .notNull()
    .$defaultFn(() => new Date())
}

/**
 * todo document me
 * @returns
 */
export function archiveDate() {
  return int('archive_date', { mode: 'timestamp_ms' })
}

/**
 * todo document me
 * @returns
 */
export function name() {
  return text('name').notNull()
}

/**
 * todo document me
 * @returns
 */
export function notes() {
  return text('notes')
}

/**
 * todo document me
 * @returns
 */
export function userId() {
  return text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' })
}
