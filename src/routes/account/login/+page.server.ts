import { dev } from '$app/environment'
import { redirect, type Action } from '@sveltejs/kit'

// TODO follow lucia
const login: Action = async ({ cookies, request }) => {
  const form = await request.formData()
  // TODO create new session for user
  const maxAge = 60 * 60 * 24 * 7
  cookies.set('session', crypto.randomUUID(), {
    domain: '/',
    httpOnly: true,
    sameSite: 'strict',
    secure: !dev,
    maxAge,
  })
  console.log([...form.entries()])
  throw redirect(303, '/eat')
}

export const actions = { login }
