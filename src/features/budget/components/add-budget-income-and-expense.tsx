import Button from '@/components/button'
import FormTextInput from '@/components/form-text-input'
import CUSTOM_COLORS from '@/constants/colors'
import { capitalize } from '@/lib/common'
import { TTransaction, useBudgetsAtom } from '@/state/budget'
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet'
import { useLocalSearchParams } from 'expo-router'
import { useMemo, useRef, useState } from 'react'
import { View } from 'react-native'
import uuid from 'react-native-uuid'

const AddBudgetIncomeAndExpense = () => {
  const { id } = useLocalSearchParams()
  const snapPoints = useMemo(() => ['50'], [])
  const bottomSheetRef = useRef<BottomSheetModal>(null)
  const [actionType, setActionType] = useState<TTransaction['type']>('income')
  const [, setBudgets] = useBudgetsAtom()
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')

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
          <FormTextInput
            label="Name"
            value={name}
            onChangeText={setName}
            placeholder="Enter name"
          />
          <FormTextInput
            label="Amount"
            value={amount}
            onChangeText={setAmount}
            placeholder="Enter name"
            keyboardType="number-pad"
          />
          <Button
            onPress={() => {
              setBudgets((draft) => {
                const index = draft.findIndex((item) => item.id === id)
                if (index !== -1) {
                  const newTransaction = {
                    id: uuid.v4() as string,
                    name,
                    amount: Number(amount),
                    created_at: new Date().toLocaleDateString(),
                    type: actionType,
                    is_starred: false,
                    is_paid: false,
                  }
                  draft[index].transactions.push(newTransaction)
                }
              })
              setName('')
              setAmount('')
              bottomSheetRef.current?.close()
            }}
            text={`Create ${capitalize(actionType)}`}
          />
        </View>
      </BottomSheetModal>
    </>
  )
}

export default AddBudgetIncomeAndExpense
