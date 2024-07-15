import db from '..'
import { categories } from '../schema'

export const createCategories = async (names: Array<{ name: string }>) =>
  db.insert(categories).values(names)

export const getAllCategories = async () => db.select().from(categories)
