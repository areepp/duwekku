import Container from '@/components/container'
import CustomText from '@/components/custom-text'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { View } from 'react-native'
import AddBudgetIncomeAndExpense from './add-budget-income-and-expense'
import BudgetTransactions from './budget-transactions'
import {
  useGetBudgetById,
  useGetTransactionsByBudgetId,
} from '../hooks/budget-query-mutation'
import { parseCurrency } from '@/lib/common'
import { useState } from 'react'

const BudgetDetailStack = () => {
  const { id } = useLocalSearchParams()
  const navigation = useNavigation()
  const [total, setTotal] = useState({ income: 0, expenses: 0 })

  useGetBudgetById(Number(id), {
    onSuccess: (data) => {
      navigation.setOptions({
        headerTitle: data.name,
      })
    },
  })

  useGetTransactionsByBudgetId(Number(id), {
    onSuccess: (_data) => {
      const _total = _data.reduce(
        (totals, item) => {
          if (item.type === 'income') {
            totals.income += item.amount as number
          } else if (item.type === 'expense') {
            totals.expenses += item.amount as number
          }
          return totals
        },
        { income: 0, expenses: 0 },
      )
      setTotal(_total)
    },
  })

  return (
    <Container>
      <BudgetTransactions />
      <AddBudgetIncomeAndExpense />
      <View className="w-screen absolute bottom-0 left-0 bg-backgroundDimmed3 flex flex-row p-3">
        <View className="w-1/2 h-full flex justify-center">
          <CustomText>
            Income {'    '}: {parseCurrency(total.income)}
          </CustomText>
          <CustomText>Expenses : {parseCurrency(total.expenses)}</CustomText>
        </View>
        <View className="w-1/2 h-full flex justify-center">
          <CustomText customClassName="text-lg">Balance:</CustomText>
          <CustomText customClassName="text-lg font-semibold -mt-1">
            {parseCurrency(total.income - total.expenses)}
          </CustomText>
        </View>
      </View>
    </Container>
  )
}

export default BudgetDetailStack
