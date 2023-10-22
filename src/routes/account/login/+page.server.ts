import { redirect, fail, type Actions } from '@sveltejs/kit'
import { LuciaError } from 'lucia'
import { auth } from '$lib/server'

export const actions: Actions = {
  default: async ({ locals, request }) => {
    const form = await request.formData()
    const username = form.get('username')
    const password = form.get('password')

    if (!username || typeof username !== 'string')
      return fail(400, { reason: 'invalid username' })
    if (!username.length)
      return fail(400, { reason: 'username cannot be empty' })
    if (!password || typeof password !== 'string')
      return fail(400, { reason: 'invalid password' })
    if (password.length < 6)
      return fail(400, { reason: 'password must be at least 6 characters' })

    try {
      const key = await auth.useKey(
        'username',
        username.toLowerCase(),
        password
      )
      const session = await auth.createSession({
        userId: key.userId,
        attributes: {},
      })
      locals.auth.setSession(session)
    } catch (err) {
      if (err instanceof LuciaError) {
        return fail(400, { reason: err.message })
      }
      return fail(500, {
        reason: err instanceof Error ? err.message : String(err),
      })
    }

    throw redirect(302, '/')
  },
}
