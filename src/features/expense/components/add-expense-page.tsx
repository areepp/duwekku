import Button from '@/components/button'
import CustomText from '@/components/custom-text'
import FormDatePicker, { TDatePickerValue } from '@/components/form-date-picker'
import FormTextInput from '@/components/form-text-input'
import { useState } from 'react'
import { View } from 'react-native'
import { FormProvider, useForm } from 'react-hook-form'
import ExpenseCategoryOptions from './expense-category-options'
import { useCreateExpense } from '../hooks/query-hooks'
import { QueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'

export type TCreateExpenseForm = {
  amount: string
  transaction_date: TDatePickerValue
  category: {
    name: string
    id: number
  }
  note?: string
}

const AddExpensePage = () => {
  const queryClient = new QueryClient()
  const [showCategories, setShowCategories] = useState(false)
  const [selectedCategoryIcon, setSelectedCategoryIcon] = useState<
    JSX.Element | undefined
  >(undefined)
  const methods = useForm<TCreateExpenseForm>()
  const { mutate } = useCreateExpense({
    options: {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [
            'expenses',
            format(methods.getValues('transaction_date.date'), 'yyyy-MM'),
          ],
        })
        methods.reset()
        setSelectedCategoryIcon(undefined)
        setShowCategories(false)
      },
    },
  })

  const onSubmit = methods.handleSubmit((data) => {
    mutate({
      amount: Number(data.amount),
      date: data.transaction_date.date.toISOString(),
      categoryId: data.category.id,
      note: data.note,
    })
  })

  return (
    <FormProvider {...methods}>
      <View className="p-6 flex bg-background" style={{ gap: 9 }}>
        <View className="flex flex-row items-center">
          <CustomText customClassName="w-20">Date</CustomText>
          <FormDatePicker name="transaction_date" />
        </View>
        <View className="flex flex-row items-center">
          <CustomText customClassName="w-20">Amount</CustomText>
          <FormTextInput
            name="amount"
            placeholder="Enter amount"
            customClassName="flex-1"
            keyboardType="number-pad"
          />
        </View>
        <View className="flex flex-row items-center">
          <CustomText customClassName="w-20">Category</CustomText>
          <FormTextInput
            name="category.name"
            placeholder="Enter category"
            customClassName="flex-1"
            showSoftInputOnFocus={false}
            onFocus={() => {
              setShowCategories(true)
            }}
            onBlur={() => {
              setShowCategories(false)
            }}
            icon={selectedCategoryIcon}
          />
        </View>
        <View className="flex flex-row items-center">
          <CustomText customClassName="w-20">Note</CustomText>
          <FormTextInput
            name="note"
            placeholder="Enter note"
            customClassName="flex-1"
          />
        </View>
        <Button
          onPress={onSubmit}
          customClassName="mt-3"
          text="Create Expense"
        />
      </View>
      {showCategories && (
        <ExpenseCategoryOptions
          setSelectedCategoryIcon={setSelectedCategoryIcon}
        />
      )}
    </FormProvider>
  )
}

export default AddExpensePage
