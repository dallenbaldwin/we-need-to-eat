import { fail, redirect, type Actions } from '@sveltejs/kit'
import { auth } from '$lib/server'

export const actions: Actions = {
  default: async ({ request, locals }) => {
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
        attributes: {
          username,
          role: 'user',
          dark_theme: 'dark',
          light_theme: 'light',
        },
      })
      const session = await auth.createSession({
        userId: user.id,
        attributes: {},
      })
      locals.auth.setSession(session)
    } catch (err) {
      return fail(500, {
        reason: err instanceof Error ? err.message : String(err),
      })
    }

    throw redirect(303, '/eat')
  },
}
