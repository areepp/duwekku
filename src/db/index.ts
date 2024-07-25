import { drizzle } from 'drizzle-orm/expo-sqlite'
import { openDatabaseSync } from 'expo-sqlite/next'
import * as schema from './schema'

const expoDb = openDatabaseSync('db.db')
const db = drizzle(expoDb, { schema })

export default db
