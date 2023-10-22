import type { Config } from 'drizzle-kit'

const db = './src/lib/server/db'
export default {
  schema: `${db}/schema`,
  out: `${db}/migrations`,
  driver: 'better-sqlite',
  dbCredentials: {
    url: 'we-need-to-eat.db',
  },
} satisfies Config
