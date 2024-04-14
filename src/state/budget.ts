import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

type TBudget = {
  id: string
  name: string
}

const budgetsAtom = atomWithStorage<TBudget[]>('budgets', [])
export const useBudgetsAtom = () => useAtom(budgetsAtom)
