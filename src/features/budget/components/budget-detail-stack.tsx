import Container from '@/components/container'
import CustomText from '@/components/custom-text'
import { useBudgetsAtom } from '@/state/budget'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { useEffect } from 'react'
import { View } from 'react-native'
import AddBudgetIncomeAndExpense from './add-budget-income-and-expense'
import BudgetTransactions from './budget-transactions'

const BudgetDetailStack = () => {
  const { id } = useLocalSearchParams()
  const [budgets] = useBudgetsAtom()
  const navigation = useNavigation()

  useEffect(() => {
    navigation.setOptions({
      headerTitle: budgets.find((budget) => budget.id === id)?.name,
    })
  }, [])

  return (
    <Container>
      <BudgetTransactions />
      <AddBudgetIncomeAndExpense />
      <View className="w-screen absolute bottom-0 left-0 bg-backgroundDimmed3 flex flex-row p-3">
        <View className="w-1/2 h-full flex justify-center">
          <CustomText>Income {'    '}: Rp 0</CustomText>
          <CustomText>Expenses : Rp 0</CustomText>
        </View>
        <View className="w-1/2 h-full flex justify-center">
          <CustomText customClassName="text-lg">Balance:</CustomText>
          <CustomText customClassName="text-lg font-semibold -mt-1">
            Rp 0
          </CustomText>
        </View>
      </View>
    </Container>
  )
}

export default BudgetDetailStack
