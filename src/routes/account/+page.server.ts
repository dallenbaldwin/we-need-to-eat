import { redirect, type Actions } from '@sveltejs/kit'

export const actions: Actions = {
  register: async ({ locals, request }) => {
    const form = await request.formData()
    // TODO create new user
    // TODO create session for user
    locals.user = { admin: true, id: 1, username: 'dallen' }
    console.log([...form.entries()])
    throw redirect(303, '/eat')
  },
  login: async ({ locals, request }) => {
    const form = await request.formData()
    // TODO create new session for user
    locals.user = { admin: true, id: 1, username: 'dallen' }
    console.log([...form.entries()])
    throw redirect(303, '/eat')
  },
  logout: async ({ locals }) => {
    // todo clear session somehow
    locals.user = undefined
    throw redirect(303, '/')
  },
}
