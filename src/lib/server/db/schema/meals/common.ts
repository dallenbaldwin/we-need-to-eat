import { text } from 'drizzle-orm/sqlite-core'
import { cuisines } from './Cuisine'
import { baseColumns, withUserId } from '../../common'

/** @see {@link meal} */
export const ratings = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
] as const

/**
 * a set of properties that every meal "type" should have
 *
 * @see {@link baseColumns}
 * @see {@link cuisines}
 */
export function meal() {
  return {
    ...baseColumns(),
    ...withUserId(),
    name: text('name').notNull(),
    notes: text('notes'),
    /** @see {@link cuisines.id} */
    cuisineId: text('cuisineId').references(() => cuisines.id),
    /**
     * a ten point scale so we can make use of half stars in the ui
     */
    rating: text('rating', { enum: ratings }),
  }
}
