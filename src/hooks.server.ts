import type { Handle } from '@sveltejs/kit'
import { db } from '$lib/server/db'

export const handle: Handle = async ({ event, resolve }) => {
  event.locals.db = db
  event.locals.user = undefined
  return resolve(event)
}
