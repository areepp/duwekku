import {
  createExpense,
  getAllCategories,
  getAllExpenses,
  TCreateExpensePayload,
} from '@/db/services/expenses'
import { useMutation, useQuery } from '@tanstack/react-query'

export const useGetAllCategories = () =>
  useQuery({
    queryKey: ['category-options'],
    queryFn: getAllCategories,
  })

export const useCreateExpense = ({
  options,
}: {
  options?: { onSuccess?: () => void }
}) =>
  useMutation({
    mutationFn: (payload: TCreateExpensePayload) => createExpense(payload),
    ...options,
  })

export const useGetAllExpenses = (date: string) =>
  useQuery({
    queryKey: ['expenses', date],
    queryFn: () => getAllExpenses(date),
  })
