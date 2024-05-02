import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { withImmer } from 'jotai-immer'

export type TTransaction = {
  id: string
  name: string
  amount: number
  type: 'income' | 'expense'
  created_at: string
}

export type TBudget = {
  id: string
  name: string
  transactions: TTransaction[]
}

const budgetsAtom = withImmer(atomWithStorage<TBudget[]>('budgets', []))
export const useBudgetsAtom = () => useAtom(budgetsAtom)
