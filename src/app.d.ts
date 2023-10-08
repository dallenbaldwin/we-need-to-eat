import type { User } from '$lib/server/db/schema/User'
import type { db } from '$lib/server/db'

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      db: typeof db
      user: User | undefined
    }
    // interface PageData {}
    // interface Platform {}
  }
}

export {}
