import { InferSelectModel, sql } from 'drizzle-orm'
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

// date format is: year-month. Example: '2024-07'
export const getAllExpenses = (date: string) =>
  db.query.expenses.findMany({
    where: sql`strftime('%Y-%m', date) = ${date}`,
    with: { category: true },
  })
