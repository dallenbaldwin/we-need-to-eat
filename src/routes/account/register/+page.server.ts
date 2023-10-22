import { fail, redirect, type Actions } from '@sveltejs/kit'
import { auth } from '$lib/server'
import { DrizzleError } from 'drizzle-orm'

export const actions: Actions = {
  default: async ({ request, locals }) => {
    // TODO test flow
    const form = await request.formData()
    const username = form.get('username')
    const password = form.get('password')
    const confirm = form.get('confirm')

    if (!username || typeof username !== 'string')
      return fail(400, { reason: 'invalid username' })
    if (!username.length)
      return fail(400, { reason: 'username cannot be empty' })
    if (!password || typeof password !== 'string')
      return fail(400, { reason: 'invalid password' })
    if (password.length < 6)
      return fail(400, { reason: 'password must be at least 6 characters' })
    if (!confirm || typeof confirm !== 'string')
      return fail(400, { reason: 'invalid confirm' })
    if (password !== confirm)
      return fail(400, { reason: 'passwords must match' })

    try {
      // create user with username method
      const user = await auth.createUser({
        key: {
          providerId: 'username',
          password,
          // lowercase to ensure uniqueness
          providerUserId: username.toLowerCase(),
        },
        attributes: { username, admin: false },
      })
      const session = await auth.createSession({
        userId: user.id,
        attributes: {},
      })
      locals.auth.setSession(session)
    } catch (err) {
      if (err instanceof DrizzleError) return fail(500, { reason: err.message })
      return fail(500, {
        reason: err instanceof Error ? err.message : String(err),
      })
    }

    throw redirect(303, '/account')
  },
}
