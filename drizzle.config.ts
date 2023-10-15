import type { Config } from 'drizzle-kit'

const lib = './src/lib/server/db'

const e = process.env
export default {
  schema: `${lib}/schema`,
  out: `${lib}/migrations`,
  driver: 'pg',
  verbose: true,
  dbCredentials: {
    connectionString:
      e.NODE_ENV === 'production' && e.DATABASE_URL
        ? e.DATABASE_URL
        : 'postgresql://postgres:postgres@localhost:5438/we-need-to-eat',
  },
} satisfies Config
