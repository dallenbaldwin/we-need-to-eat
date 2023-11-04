/// <reference types="lucia" />

type User = import('$lib/server').User
declare global {
  /** @see https://lucia-auth.com/getting-started/sveltekit/ */
  namespace Lucia {
    type Auth = import('$lib/server').Auth
    /**
     * these have to match the _database_ column names, not what you called them
     * in Drizzle's config
     */
    type DatabaseUserAttributes = {
      username: User['username']
      light_theme: User['lightTheme']
      dark_theme: User['darkTheme']
      role: User['role']
    }
    type DatabaseSessionAttributes = NonNullable<unknown>
  }

  /** @see https://kit.svelte.dev/docs/types#app */
  namespace App {
    // interface Error {}
    interface Locals {
      user: User | undefined
      auth: import('lucia').AuthRequest
    }
    // interface PageData {}
    // interface Platform {}
  }
}

export {}
