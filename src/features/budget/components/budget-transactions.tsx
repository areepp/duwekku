import { TTransaction, useBudgetsAtom } from '@/state/budget'
import { Iconify } from 'react-native-iconify'
import CUSTOM_COLORS from '@/constants/colors'
import CustomText from '@/components/custom-text'
import { FlatList, View } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { Swipeable } from 'react-native-gesture-handler'
import { TouchableOpacity } from '@gorhom/bottom-sheet'
import clsx from 'clsx'
import { useRef } from 'react'

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

const RightActions = ({
  item,
  closeSwipeable,
}: {
  item: TTransaction
  closeSwipeable: () => void
}) => {
  const { id } = useLocalSearchParams()
  const [budgets, setBudgets] = useBudgetsAtom()
  const currentBudgetIndex = budgets.findIndex((budget) => budget.id === id)

  const handleDeleteTransaction = () => {
    setBudgets((draft) => {
      const transactionIndex = draft[currentBudgetIndex].transactions.findIndex(
        (transaction) => transaction.id === item.id,
      )
      transactionIndex !== -1 &&
        draft[currentBudgetIndex].transactions.splice(transactionIndex, 1)
    })
    closeSwipeable()
  }

  const handleTransactionStar = () => {
    setBudgets((draft) => {
      const transactionIndex = draft[currentBudgetIndex].transactions.findIndex(
        (transaction) => transaction.id === item.id,
      )
      if (transactionIndex !== -1)
        draft[currentBudgetIndex].transactions[transactionIndex].is_starred =
          !item.is_starred
    })
    closeSwipeable()
  }

  const handleTransactionPaid = () => {
    setBudgets((draft) => {
      const transactionIndex = draft[currentBudgetIndex].transactions.findIndex(
        (transaction) => transaction.id === item.id,
      )
      if (transactionIndex !== -1)
        draft[currentBudgetIndex].transactions[transactionIndex].is_paid =
          !item.is_paid
    })
    closeSwipeable()
  }

  return (
    <View className="flex flex-row gap-6 px-3 items-center justify-center">
      <TouchableOpacity
        className="flex items-center justify-center"
        onPress={handleTransactionPaid}
      >
        <View className="mx-auto">
          {item.is_paid ? (
            <Iconify
              icon="ph:check-square-bold"
              size={24}
              color={CUSTOM_COLORS.accent}
            />
          ) : (
            <Iconify
              icon="ph:square-bold"
              size={24}
              color={CUSTOM_COLORS.accent}
            />
          )}
        </View>
        <CustomText variant="accent">Paid</CustomText>
      </TouchableOpacity>
      <TouchableOpacity
        // className="flex flex-col justify-center items-center"
        onPress={handleTransactionStar}
      >
        <View className="mx-auto">
          {item.is_starred ? (
            <Iconify icon="mdi:star" size={24} color={CUSTOM_COLORS.accent} />
          ) : (
            <Iconify
              icon="mdi:star-outline"
              size={24}
              color={CUSTOM_COLORS.accent}
            />
          )}
        </View>
        <CustomText variant="accent">
          {item.is_starred ? 'Unstar' : 'Star'}
        </CustomText>
      </TouchableOpacity>
      <TouchableOpacity
        className="flex items-center justify-center"
        onPress={handleDeleteTransaction}
      >
        <View className="mx-auto">
          <Iconify
            icon="material-symbols:delete-outline"
            size={24}
            color={CUSTOM_COLORS.accent}
          />
        </View>
        <CustomText variant="accent">Delete</CustomText>
      </TouchableOpacity>
    </View>
  )
}

const TransactionItem = ({ item }: { item: TTransaction }) => {
  const swipeableRef = useRef<Swipeable | null>(null)

  const closeSwipeable = () => swipeableRef.current?.close()

  return (
    <Swipeable
      renderRightActions={() => {
        return <RightActions item={item} closeSwipeable={closeSwipeable} />
      }}
      ref={swipeableRef}
    >
      <View className="bg-backgroundDimmed3 rounded-xl flex flex-row items-center">
        <View className="flex-1 p-5 flex justify-between flex-row">
          <CustomText
            variant={item.is_paid ? 'subtle' : undefined}
            customClassName={clsx(item.is_paid && 'line-through')}
          >
            {item.name}
          </CustomText>
          <View className="flex flex-row items-center">
            <CustomText
              variant={
                item.is_paid
                  ? 'subtle'
                  : item.type === 'expense'
                  ? 'secondary'
                  : 'default'
              }
              customClassName={clsx(item.is_paid && 'line-through')}
            >
              {parseTransactionAmount({ amount: item.amount, type: item.type })}
            </CustomText>
            <View className="ml-3">
              {item.is_starred && (
                <Iconify
                  icon="mdi:star"
                  size={12}
                  color={CUSTOM_COLORS.accent}
                />
              )}
            </View>
          </View>
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
