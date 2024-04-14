import Button from '@/components/button'
import FormTextInput from '@/components/form-text-input'
import CUSTOM_COLORS from '@/constants/colors'
import { useBudgetsAtom } from '@/state/budget'
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet'
import { useMemo, useRef, useState } from 'react'
import { View, Pressable } from 'react-native'
import { Iconify } from 'react-native-iconify'
import uuid from 'react-native-uuid'

const AddBudgetSheet = () => {
  const snapPoints = useMemo(() => ['50%'], [])
  const bottomSheetRef = useRef<BottomSheetModal>(null)
  const [newBudgetName, setNewBudgetName] = useState('')
  const [, setBudgets] = useBudgetsAtom()

  return (
    <>
      <Pressable
        onPress={() => bottomSheetRef.current?.present()}
        className="bg-backgroundDimmed3 rounded-full absolute right-3 bottom-3 border border-accent w-16 h-16 flex items-center justify-center"
      >
        <Iconify icon="iconoir:plus" size={32} color={CUSTOM_COLORS.accent} />
      </Pressable>
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
            label="Budget name"
            value={newBudgetName}
            onChangeText={setNewBudgetName}
          />
          <Button
            onPress={() => {
              setBudgets((prev) => [
                ...prev,
                { id: uuid.v4() as string, name: newBudgetName },
              ])
              setNewBudgetName('')
              bottomSheetRef.current?.close()
            }}
            text="Create Budget"
          />
        </View>
      </BottomSheetModal>
    </>
  )
}

export default AddBudgetSheet