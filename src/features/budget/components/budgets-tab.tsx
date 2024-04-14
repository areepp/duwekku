import CustomText from '@/components/custom-text'
import { TBudget, useBudgetsAtom } from '@/state/budget'
import { FlatList, View } from 'react-native'
import AddBudgetSheet from './add-budget-sheet'

const BudgetItem = ({ item }: { item: TBudget }) => {
  return (
    <View className="bg-backgroundDimmed3 p-6 rounded-xl">
      <CustomText>{item.name}</CustomText>
    </View>
  )
}

const BudgetsTab = () => {
  const [budgets] = useBudgetsAtom()

  return (
    <View className="h-full w-full relative p-3 bg-background">
      <FlatList
        data={budgets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <BudgetItem item={item} />}
        contentContainerStyle={{
          gap: 6,
        }}
      />
      <AddBudgetSheet />
    </View>
  )
}

export default BudgetsTab
