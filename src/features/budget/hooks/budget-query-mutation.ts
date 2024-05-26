import {
  TBudget,
  createBudget,
  createTransaction,
  deleteBudget,
  deleteTransaction,
  editTransaction,
  getAllBudgets,
  getBudgetById,
  getTransactionsByBudgetId,
} from '@/db/services/budget'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

type TQueryOptions = {
  onSuccess?: () => void
}

export const useGetAllBudgets = (options?: TQueryOptions) =>
  useQuery({ queryKey: ['budgets'], queryFn: getAllBudgets, ...options })

export const useGetBudgetById = (
  id: number,
  options?: { onSuccess?: (data: TBudget) => void },
) =>
  useQuery({
    queryKey: ['budgets', id],
    queryFn: async () => {
      const data = await getBudgetById(id)
      options?.onSuccess?.(data[0])
      return data
    },
  })

export const useCreateBudget = (options?: TQueryOptions) => {
  const client = useQueryClient()

  return useMutation({
    mutationFn: (name: string) => createBudget(name),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['budgets'] })
      options?.onSuccess?.()
    },
  })
}

export const useDeleteBudget = (options?: TQueryOptions) => {
  const client = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => deleteBudget(id),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['budgets'] })
      options?.onSuccess?.()
    },
  })
}

export const useGetTransactionsByBudgetId = (id: number) => {
  return useQuery({
    queryKey: ['transactions', id],
    queryFn: () => getTransactionsByBudgetId(id),
  })
}

export const useCreateTransaction = (options?: TQueryOptions) => {
  const client = useQueryClient()

  return useMutation({
    mutationFn: (payload: Parameters<typeof createTransaction>[0]) =>
      createTransaction(payload),
    onSuccess: (_data, payload) => {
      client.invalidateQueries({
        queryKey: ['transactions', payload.budgetId],
      })
      options?.onSuccess?.()
    },
  })
}

export const useEditTransaction = (options?: TQueryOptions) => {
  return useMutation({
    mutationFn: (payload: Parameters<typeof editTransaction>[0]) =>
      editTransaction(payload),
    ...options,
  })
}

export const useDeleteTransaction = (options?: TQueryOptions) => {
  return useMutation({
    mutationFn: (id: number) => deleteTransaction(id),
    ...options,
  })
}
