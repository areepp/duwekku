import CUSTOM_COLORS from '@/constants/colors'
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet'
import { useCallback, useMemo, useRef } from 'react'
import { View, Text, Pressable } from 'react-native'
import { Iconify } from 'react-native-iconify'

const AddBudgetSheet = () => {
  const snapPoints = useMemo(() => ['50%'], [])
  const bottomSheetRef = useRef<BottomSheetModal>(null)

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
        <View>
          <Text className="text-text">Awesome</Text>
        </View>
      </BottomSheetModal>
    </>
  )
}

export default AddBudgetSheet
