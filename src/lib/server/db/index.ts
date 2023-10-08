import { drizzle } from 'drizzle-orm/bun-sqlite'
import { Database } from 'bun:sqlite'
import { schema } from './schema'
export { eq, lt, gte, ne, sql } from 'drizzle-orm'

const sqlite = new Database('sqlite.db')
export const db = drizzle(sqlite, { schema })
