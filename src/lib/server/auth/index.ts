import { dev } from '$app/environment'
import { lucia } from 'lucia'
import { sveltekit } from 'lucia/middleware'
import { pg } from '@lucia-auth/adapter-postgresql'
import { Pool } from 'pg'
import { connectionString } from '../db'

const pool = new Pool({ connectionString })

export const auth = lucia({
  env: dev ? 'DEV' : 'PROD',
  middleware: sveltekit(),
  adapter: pg(pool, {
    user: 'users',
    key: 'user_keys',
    session: 'user_sessions',
  }),
  getUserAttributes: (databaseUser) => databaseUser,
})

export type Auth = typeof auth
