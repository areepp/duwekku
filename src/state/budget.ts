import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

export type TBudget = {
  id: string
  name: string
}

const budgetsAtom = atomWithStorage<TBudget[]>('budgets', [])
export const useBudgetsAtom = () => useAtom(budgetsAtom)
