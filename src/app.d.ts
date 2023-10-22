/// <reference types="lucia" />
declare global {
  /** @see https://lucia-auth.com/getting-started/sveltekit/ */
  namespace Lucia {
    type Auth = import('$lib/server/db').Auth
    type DatabaseUserAttributes = Omit<import('$lib/server').User, 'id'>
    type DatabaseSessionAttributes = NonNullable<unknown>
  }

  /** @see https://kit.svelte.dev/docs/types#app */
  namespace App {
    // interface Error {}
    interface Locals {
      user: import('$lib/server').User | undefined
      auth: import('lucia').AuthRequest
    }
    // interface PageData {}
    // interface Platform {}
  }
}

export {}
