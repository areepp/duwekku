import CustomText from '@/components/custom-text'
import { TBudget, useBudgetsAtom } from '@/state/budget'
import { FlatList, TouchableOpacity, View } from 'react-native'
import AddBudgetSheet from './add-budget-sheet'
import { Link } from 'expo-router'
import Container from '@/components/container'

const BudgetItem = ({ item }: { item: TBudget }) => {
  return (
    <Link href={`/budgets/${item.id}`} asChild>
      <TouchableOpacity className="bg-backgroundDimmed3 p-6 rounded-xl">
        <CustomText>{item.name}</CustomText>
      </TouchableOpacity>
    </Link>
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
