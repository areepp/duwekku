import Button from '@/components/button'
import { CustomTextInput } from '@/components/form-text-input'
import CUSTOM_COLORS from '@/constants/colors'
import { capitalize } from '@/lib/common'
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet'
import { useLocalSearchParams } from 'expo-router'
import { useMemo, useRef, useState } from 'react'
import { View } from 'react-native'
import { useCreateTransaction } from '../hooks/budget-query-mutation'
import { TTransaction } from '@/db/services/budget'

const AddBudgetIncomeAndExpense = () => {
  const { id } = useLocalSearchParams()
  const snapPoints = useMemo(() => ['50'], [])
  const bottomSheetRef = useRef<BottomSheetModal>(null)
  const [actionType, setActionType] =
    useState<NonNullable<TTransaction['type']>>('income')
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')

  const { mutate } = useCreateTransaction({
    onSuccess: () => {
      setName('')
      setAmount('')
      bottomSheetRef.current?.close()
    },
  })

  return (
    <>
      <View
        className="absolute bottom-20 flex flex-row w-screen p-3"
        style={{ gap: 16 }}
      >
        <Button
          onPress={() => {
            setActionType('income')
            bottomSheetRef.current?.present()
          }}
          text="Add Income"
          customClassName="flex-1"
          variant="accent"
        />
        <Button
          onPress={() => {
            setActionType('expense')
            bottomSheetRef.current?.present()
          }}
          text="Add Expense"
          customClassName="flex-1"
        />
      </View>
      <BottomSheetModal
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        backgroundStyle={{
          backgroundColor: CUSTOM_COLORS.backgroundDimmed3,
        }}
        backdropComponent={(props) => (
          <BottomSheetBackdrop {...props} disappearsOnIndex={-1} />
        )}
      >
        <View className="p-6 flex" style={{ gap: 24 }}>
          <CustomTextInput
            label="Name"
            value={name}
            onChangeText={setName}
            placeholder="Enter name"
          />
          <CustomTextInput
            label="Amount"
            value={amount}
            onChangeText={setAmount}
            placeholder="Enter name"
            keyboardType="number-pad"
          />
          <Button
            onPress={() => {
              mutate({
                budgetId: Number(id),
                name,
                amount: Number(amount),
                type: actionType,
              })
            }}
            text={`Create ${capitalize(actionType)}`}
          />
        </View>
      </BottomSheetModal>
    </>
  )
}

export default AddBudgetIncomeAndExpense
