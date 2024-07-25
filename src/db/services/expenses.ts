import { InferSelectModel } from 'drizzle-orm'
import db from '..'
import { categories, expenses } from '../schema'

type TCategory = InferSelectModel<typeof categories>

export const createCategories = async (names: Array<{ name: string }>) =>
  db.insert(categories).values(names)

export type TExpense = InferSelectModel<typeof expenses> & {
  category: TCategory | null
}

export const getAllCategories = async () => db.select().from(categories)

export type TCreateExpensePayload = {
  amount: number
  categoryId: number
  date: string
  note?: string
}

export const createExpense = async ({
  amount,
  categoryId,
  date,
  note,
}: TCreateExpensePayload) =>
  db.insert(expenses).values({ amount, categoryId, date, note })

export const getAllExpenses = () =>
  db.query.expenses.findMany({ with: { category: true } })
