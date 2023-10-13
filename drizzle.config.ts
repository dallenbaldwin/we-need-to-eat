import type { Config } from 'drizzle-kit'

const lib = './src/lib/server/db'

export default {
  schema: `${lib}/schema`,
  out: `${lib}/migrations`,
  driver: 'better-sqlite',
  verbose: true,
  dbCredentials: {
    url: 'sqlite.db',
  },
} satisfies Config
