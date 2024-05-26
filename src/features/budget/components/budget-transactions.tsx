import { Iconify } from 'react-native-iconify'
import CUSTOM_COLORS from '@/constants/colors'
import CustomText from '@/components/custom-text'
import { FlatList, View } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { Swipeable } from 'react-native-gesture-handler'
import { TouchableOpacity } from '@gorhom/bottom-sheet'
import clsx from 'clsx'
import { useRef } from 'react'
import {
  useDeleteTransaction,
  useEditTransaction,
  useGetTransactionsByBudgetId,
} from '../hooks/budget-query-mutation'
import { TTransaction } from '@/db/services/budget'
import { useQueryClient } from '@tanstack/react-query'

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
  }).format(amount as number)
  return `${prefix} ${amouuntInCurrency}`
}

const RightActions = ({
  item,
  closeSwipeable,
}: {
  item: TTransaction
  closeSwipeable: () => void
}) => {
  const queryClient = useQueryClient()
  const { id } = useLocalSearchParams()

  const { mutate: editTransactionMutation } = useEditTransaction({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions', Number(id)] })
      closeSwipeable()
    },
  })

  const { mutate: deleteTransactionMutation } = useDeleteTransaction({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions', Number(id)] })
      closeSwipeable()
    },
  })

  const handleDeleteTransaction = () => {
    deleteTransactionMutation(item.id)
  }

  const handleTransactionStar = () => {
    editTransactionMutation({ id: item.id, isStarred: !item.isStarred })
  }

  const handleTransactionPaid = () => {
    editTransactionMutation({ id: item.id, isPaid: !item.isPaid })
  }

  return (
    <View className="flex flex-row gap-6 px-3 items-center justify-center">
      <TouchableOpacity
        className="flex items-center justify-center"
        onPress={handleTransactionPaid}
      >
        <View className="mx-auto">
          {item.isPaid ? (
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
          {item.isStarred ? (
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
          {item.isStarred ? 'Unstar' : 'Star'}
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
            variant={item.isPaid ? 'subtle' : undefined}
            customClassName={clsx(item.isPaid && 'line-through')}
          >
            {item.name}
          </CustomText>
          <View className="flex flex-row items-center">
            <CustomText
              variant={
                item.isPaid
                  ? 'subtle'
                  : item.type === 'expense'
                  ? 'secondary'
                  : 'default'
              }
              customClassName={clsx(item.isPaid && 'line-through')}
            >
              {parseTransactionAmount({ amount: item.amount, type: item.type })}
            </CustomText>
            <View className="ml-3">
              {item.isStarred && (
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
  const { data } = useGetTransactionsByBudgetId(Number(id))

  return (
    <>
      {data && data?.length > 0 && (
        <FlatList
          data={data}
          keyExtractor={(item) => String(item.id)}
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
