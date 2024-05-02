import { TTransaction, useBudgetsAtom } from '@/state/budget'
import { Iconify } from 'react-native-iconify'
import CUSTOM_COLORS from '@/constants/colors'
import CustomText from '@/components/custom-text'
import { FlatList, View } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { Swipeable } from 'react-native-gesture-handler'

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

const RightActions = () => {
  return (
    <View className="flex flex-row gap-6 px-3">
      <View className="flex items-center justify-center">
        <Iconify icon="ph:copy" size={24} color={CUSTOM_COLORS.accent} />
        <CustomText variant="accent">Copy</CustomText>
      </View>
      <View className="flex items-center justify-center">
        <Iconify
          icon="ph:rectangle-bold"
          size={24}
          color={CUSTOM_COLORS.accent}
        />
        <CustomText variant="accent">Paid</CustomText>
      </View>
      <View className="flex items-center justify-center">
        <Iconify
          icon="mdi:star-outline"
          size={24}
          color={CUSTOM_COLORS.accent}
        />
        <CustomText variant="accent">Star</CustomText>
      </View>
      <View className="flex items-center justify-center">
        <Iconify
          icon="material-symbols:delete-outline"
          size={24}
          color={CUSTOM_COLORS.accent}
        />
        <CustomText variant="accent">Delete</CustomText>
      </View>
    </View>
  )
}

const TransactionItem = ({ item }: { item: TTransaction }) => {
  return (
    <Swipeable
      renderRightActions={() => {
        return <RightActions />
      }}
    >
      <View className="bg-backgroundDimmed3 rounded-xl flex flex-row items-center">
        <View className="flex-1 p-5 flex justify-between flex-row">
          <CustomText>{item.name}</CustomText>
          <CustomText
            variant={item.type === 'expense' ? 'secondary' : 'default'}
          >
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
    </Swipeable>
  )
}

const BudgetTransactions = () => {
  const { id } = useLocalSearchParams()
  const [budgets] = useBudgetsAtom()
  const currentBudget = budgets.find((budget) => budget.id === id)

  return (
    <>
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
    </>
  )
}

export default BudgetTransactions
