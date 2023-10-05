import type { User } from '$lib'
import type { LayoutLoad } from './$types'

export const load: LayoutLoad<{ user: User | undefined }> = async () => {
  const user: User | undefined = {
    admin: true,
    preferredName: 'Dallen',
    surname: 'Baldwin',
    username: 'db',
  }
  return { user }
}
