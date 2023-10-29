import type { ServerLoad } from '@sveltejs/kit'

export const load: ServerLoad = ({ parent }) => {
  return parent()
}
