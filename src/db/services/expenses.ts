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
export const getAllExpensesByDate = async (date: string) => {
  const rawData = await db.query.expenses.findMany({
    where: sql`strftime('%Y-%m', date) = ${date}`,
    with: { category: true },
  })
  const expensesByDate: Record<string, TExpense[]> = rawData?.reduce(
    (groups, expense) => {
      const date = expense.date.split('T')[0]
      if (!groups[date]) groups[date] = []
      groups[date].push(expense)
      return groups
    },
    {} as Record<string, TExpense[]>,
  )

  return Object.entries(expensesByDate).map(([date, expenses]) => ({
    date,
    expenses,
  }))
}

// date format is: year-month. Example: '2024-07'
export const getAllExpensesByCategory = async (date: string) => {
  const rawData = await db.query.expenses.findMany({
    where: sql`strftime('%Y-%m', date) = ${date}`,
    with: { category: true },
  })
  const expensesByDate: Record<string, TExpense[]> = rawData?.reduce(
    (groups, expense) => {
      const date = expense.date.split('T')[0]
      if (!groups[date]) groups[date] = []
      groups[date].push(expense)
      return groups
    },
    {} as Record<string, TExpense[]>,
  )

  return Object.entries(expensesByDate).map(([date, expenses]) => ({
    date,
    expenses,
  }))
}
