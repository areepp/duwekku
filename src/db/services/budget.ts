import { InferSelectModel, eq } from 'drizzle-orm'
import db from '..'
import { budgets, transactions } from '../schema'

export type TBudget = InferSelectModel<typeof budgets>

export type TTransaction = InferSelectModel<typeof transactions>

export const getAllBudgets = async () => db.select().from(budgets)

export const getBudgetById = async (id: number) =>
  db.select().from(budgets).where(eq(budgets.id, id))

export const createBudget = async (name: string) =>
  db.insert(budgets).values({ name })

export const deleteBudget = async (id: number) =>
  db.delete(budgets).where(eq(budgets.id, id))

export const getTransactionsByBudgetId = async (id: number) =>
  db.select().from(transactions).where(eq(transactions.budgetId, id))

export const createTransaction = async ({
  budgetId,
  name,
  amount,
  type,
}: {
  budgetId: number
  name: string
  amount: number
  type: 'income' | 'expense'
}) => db.insert(transactions).values({ budgetId, name, amount, type })

export const editTransaction = async ({
  id,
  isStarred = false,
  isPaid = false,
}: {
  id: number
  isStarred?: boolean
  isPaid?: boolean
}) =>
  db
    .update(transactions)
    .set({ isPaid, isStarred })
    .where(eq(transactions.id, id))

export const deleteTransaction = async (id: number) =>
  db.delete(transactions).where(eq(transactions.id, id))
