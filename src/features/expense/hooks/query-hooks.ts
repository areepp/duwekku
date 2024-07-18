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

export const useCreateExpense = () =>
  useMutation({
    mutationFn: (payload: TCreateExpensePayload) => createExpense(payload),
  })

export const useGetAllExpenses = () =>
  useQuery({ queryKey: ['expenses'], queryFn: getAllExpenses })
