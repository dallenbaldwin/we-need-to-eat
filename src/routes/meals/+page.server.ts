import type { Actions } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals: { user } }) => {
  return { user }
}

export const actions: Actions = {}
