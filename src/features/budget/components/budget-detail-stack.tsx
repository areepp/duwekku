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

  useGetBudgetById(Number(id), {
    onSuccess: (data) => {
      navigation.setOptions({
        headerTitle: data.name,
      })
    },
  })

  const { data } = useGetTransactionsByBudgetId(Number(id))

  return (
    <Container>
      <BudgetTransactions />
      <AddBudgetIncomeAndExpense />
      <View className="w-screen absolute bottom-0 left-0 bg-backgroundDimmed3 flex flex-row p-3">
        <View className="w-1/2 h-full flex justify-center">
          <CustomText>
            Income {'    '}: {parseCurrency(data?.total.income ?? 0)}
          </CustomText>
          <CustomText>
            Expenses : {parseCurrency(data?.total.expenses ?? 0)}
          </CustomText>
        </View>
        <View className="w-1/2 h-full flex justify-center">
          <CustomText customClassName="text-lg">Balance:</CustomText>
          <CustomText customClassName="text-lg font-semibold -mt-1">
            {parseCurrency(
              (data?.total.income ?? 0) - (data?.total.expenses ?? 0),
            )}
          </CustomText>
        </View>
      </View>
    </Container>
  )
}

export default BudgetDetailStack
