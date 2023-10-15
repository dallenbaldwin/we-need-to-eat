import { fail, redirect, type Actions } from '@sveltejs/kit'
import { eq } from 'drizzle-orm'
import { db, users } from '$lib/server/db'

export const actions: Actions = {
  default: async ({ request }) => {
    // TODO follow lucia
    const form = await request.formData()
    const username = form.get('username')
    const password = form.get('password')
    const confirm = form.get('confirm')

    if (!username || typeof username !== 'string')
      return fail(400, { reason: 'invalid username' })
    if (!password || typeof password !== 'string')
      return fail(400, { reason: 'invalid password' })
    if (!confirm || typeof confirm !== 'string')
      return fail(400, { reason: 'invalid confirm' })
    if (password !== confirm)
      return fail(400, { reason: 'passwords must match' })

    try {
      const user = await db.query.users.findFirst({
        where: (users) => eq(users.username, username),
      })
      if (user) return fail(400, { reason: 'username already exists' })
      await db.insert(users).values({
        username,
        id: crypto.randomUUID(),
      })
    } catch (err) {
      return fail(500, {
        reason: err instanceof Error ? err.message : String(err),
      })
    }

    throw redirect(303, '/account')
  },
}
