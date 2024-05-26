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
