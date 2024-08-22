import {
  createExpense,
  getAllCategories,
  getAllExpensesByCategory,
  getAllExpensesByDate,
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

export const useGetAllExpensesByDate = (date: string) =>
  useQuery({
    queryKey: ['expenses', date],
    queryFn: () => getAllExpensesByDate(date),
  })

export const useGetAllExpensesByCategory = (date: string) =>
  useQuery({
    queryKey: ['expense-analytic', date],
    queryFn: () => getAllExpensesByCategory(date),
  })
