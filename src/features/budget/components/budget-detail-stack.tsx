import Container from '@/components/container'
import CustomText from '@/components/custom-text'
import { TTransaction, useBudgetsAtom } from '@/state/budget'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { useEffect } from 'react'
import { FlatList, View } from 'react-native'
import AddBudgetIncomeAndExpense from './add-budget-income-and-expense'
import { Iconify } from 'react-native-iconify'
import CUSTOM_COLORS from '@/constants/colors'

const parseTransactionAmount = ({
  type,
  amount,
}: {
  type: TTransaction['type']
  amount: TTransaction['amount']
}) => {
  const prefix = type === 'expense' ? '-' : '+'
  const amouuntInCurrency = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(amount)
  return `${prefix} ${amouuntInCurrency}`
}

const TransactionItem = ({ item }: { item: TTransaction }) => {
  return (
    <View className="bg-backgroundDimmed3 rounded-xl flex flex-row items-center">
      <View className="flex-1 p-5 flex justify-between flex-row">
        <CustomText>{item.name}</CustomText>
        <CustomText variant={item.type === 'expense' ? 'secondary' : 'default'}>
          {parseTransactionAmount({ amount: item.amount, type: item.type })}
        </CustomText>
      </View>
      <View className="w-fit border-l py-5 px-3">
        <Iconify
          icon="pepicons-pencil:dots-y"
          size={24}
          color={CUSTOM_COLORS.text}
        />
      </View>
    </View>
  )
}

const BudgetDetailStack = () => {
  const { id } = useLocalSearchParams()
  const [budgets] = useBudgetsAtom()
  const navigation = useNavigation()

  const currentBudget = budgets.find((budget) => budget.id === id)

  useEffect(() => {
    navigation.setOptions({
      headerTitle: budgets.find((budget) => budget.id === id)?.name,
    })
  }, [])

  return (
    <Container>
      {currentBudget?.transactions && currentBudget.transactions.length > 0 && (
        <FlatList
          data={[...currentBudget.transactions].sort(
            (a, b) =>
              new Date(a.created_at).getTime() -
              new Date(b.created_at).getTime(),
          )}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TransactionItem item={item} />}
          contentContainerStyle={{
            gap: 6,
          }}
        />
      )}
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
