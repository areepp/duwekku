import CustomText from '@/components/custom-text'
import { FlatList, TouchableOpacity, View } from 'react-native'
import AddBudgetSheet from './add-budget-sheet'
import { Link } from 'expo-router'
import Container from '@/components/container'
import { Iconify } from 'react-native-iconify'
import CUSTOM_COLORS from '@/constants/colors'
import { Swipeable } from 'react-native-gesture-handler'
import { useRef } from 'react'
import {
  useCreateBudget,
  useDeleteBudget,
  useGetAllBudgets,
} from '../hooks/budget-query-mutation'
import { TBudget } from '@/db/services/budget'

const RightActions = ({
  item,
  closeSwipeable,
}: {
  item: TBudget
  closeSwipeable: () => void
}) => {
  const { mutate } = useCreateBudget({
    onSuccess: () => {
      closeSwipeable()
    },
  })

  const { mutate: deleteBudgetMutation } = useDeleteBudget({
    onSuccess: () => {
      closeSwipeable()
    },
  })

  const handleCopyBudget = () => {
    mutate(item.name + ' (Copy)')
  }

  const handleDeleteBudget = () => {
    deleteBudgetMutation(item.id)
  }

  return (
    <View className="flex flex-row gap-6 px-3 items-center justify-center">
      <TouchableOpacity
        className="flex items-center justify-center"
        onPress={handleCopyBudget}
      >
        <View className="mx-auto">
          <Iconify icon="ph:copy" size={24} color={CUSTOM_COLORS.accent} />
        </View>
        <CustomText variant="accent">Copy</CustomText>
      </TouchableOpacity>
      <TouchableOpacity
        className="flex items-center justify-center"
        onPress={handleDeleteBudget}
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

const BudgetItem = ({ item }: { item: TBudget }) => {
  const swipeableRef = useRef<Swipeable | null>(null)

  const closeSwipeable = () => swipeableRef.current?.close()

  return (
    <Swipeable
      ref={swipeableRef}
      renderRightActions={() => {
        return <RightActions item={item} closeSwipeable={closeSwipeable} />
      }}
    >
      <Link href={`/budgets/${item.id}`} asChild>
        <TouchableOpacity className="bg-backgroundDimmed3 p-6 rounded-xl">
          <CustomText>{item.name}</CustomText>
        </TouchableOpacity>
      </Link>
    </Swipeable>
  )
}

const BudgetsTab = () => {
  const { data } = useGetAllBudgets()

  return (
    <Container customClassName="relative">
      <FlatList
        data={data}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <BudgetItem item={item} />}
        contentContainerStyle={{
          gap: 6,
        }}
      />
      <AddBudgetSheet />
    </Container>
  )
}

export default BudgetsTab
