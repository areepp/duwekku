import { relations, sql } from 'drizzle-orm'
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const budgets = sqliteTable('budgets', {
  id: integer('id').primaryKey(),
  name: text('name'),
})

export const budgetsRelations = relations(budgets, ({ many }) => ({
  transactions: many(transactions),
}))

export const transactions = sqliteTable('transactions', {
  id: integer('id').primaryKey(),
  budgetId: integer('budget_id'),
  createdAt: text('created_at')
    .notNull()
    .default(sql`(current_timestamp)`),
  name: text('name'),
  amount: integer('amount'),
  type: text('type', { enum: ['income', 'expense'] }),
  isStarred: integer('is_starred', { mode: 'boolean' }),
  isPaid: integer('is_paid', { mode: 'boolean' }),
})

export const transactionsRelations = relations(transactions, ({ one }) => ({
  budget: one(budgets, {
    fields: [transactions.budgetId],
    references: [budgets.id],
  }),
}))

// TODO: CREATE TYPES FOR THE NAMES, AND THEN INTEGRATE IT WITH CATEGORIES CONSTANT
export const categories = sqliteTable('categories', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
})

export const categoriesRelation = relations(categories, ({ many }) => ({
  expenses: many(expenses),
}))

export const expenses = sqliteTable('expenses', {
  id: integer('id').primaryKey(),
  amount: integer('amount').notNull(),
  date: text('date').notNull(),
  note: text('note'),
  categoryId: integer('category_id'),
})

export const expensesRelation = relations(expenses, ({ one }) => ({
  category: one(categories, {
    fields: [expenses.categoryId],
    references: [categories.id],
  }),
}))
