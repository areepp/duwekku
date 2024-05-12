import CustomText from '@/components/custom-text'
import { TBudget, useBudgetsAtom } from '@/state/budget'
import { FlatList, TouchableOpacity, View } from 'react-native'
import AddBudgetSheet from './add-budget-sheet'
import { Link } from 'expo-router'
import Container from '@/components/container'
import { Iconify } from 'react-native-iconify'
import CUSTOM_COLORS from '@/constants/colors'
import { Swipeable } from 'react-native-gesture-handler'
import uuid from 'react-native-uuid'

const RightActions = ({ item }: { item: TBudget }) => {
  const [, setBudgets] = useBudgetsAtom()

  const handleCopyBudget = () => {
    setBudgets((draft) => {
      const budgetIndex = draft.findIndex((budget) => budget.id === item.id)
      budgetIndex !== -1 &&
        draft.push({
          ...draft[budgetIndex],
          name: draft[budgetIndex].name + ' (Copy)',
          id: uuid.v4() as string,
        })
    })
  }

  const handleDeleteBudget = () => {
    setBudgets((draft) => {
      const budgetIndex = draft.findIndex((budget) => budget.id === item.id)
      budgetIndex !== -1 && draft.splice(budgetIndex, 1)
    })
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
  return (
    <Swipeable
      renderRightActions={() => {
        return <RightActions item={item} />
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
  const [budgets] = useBudgetsAtom()

  return (
    <Container customClassName="relative">
      <FlatList
        data={budgets}
        keyExtractor={(item) => item.id}
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
