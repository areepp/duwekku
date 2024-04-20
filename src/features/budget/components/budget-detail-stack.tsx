import Button from '@/components/button'
import Container from '@/components/container'
import CustomText from '@/components/custom-text'
import { useBudgetsAtom } from '@/state/budget'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { useEffect } from 'react'
import { View } from 'react-native'

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
      <CustomText>{id as string}</CustomText>
      <View
        className="absolute bottom-20 flex flex-row w-screen p-3"
        style={{ gap: 16 }}
      >
        <Button text="Add Income" customClassName="flex-1" variant="accent" />
        <Button text="Add Expense" customClassName="flex-1" />
      </View>
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
