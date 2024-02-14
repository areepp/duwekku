import { AddBudgetSheet } from '@/features/budget'
import { View } from 'react-native'

const BudgetPage = () => {
  return (
    <View className="h-full w-full relative bg-background">
      <AddBudgetSheet />
    </View>
  )
}

export default BudgetPage
