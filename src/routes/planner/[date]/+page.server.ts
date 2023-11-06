import type { ServerLoad } from '@sveltejs/kit'

export const load: ServerLoad = async ({ locals, params }) => {
  const user = locals.user
  return {
    user,
    date: params.date,
  }
}
