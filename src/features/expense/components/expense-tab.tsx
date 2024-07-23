import Container from '@/components/container'
import { Iconify } from 'react-native-iconify'
import { Pressable, View } from 'react-native'
import { Link } from 'expo-router'
import CUSTOM_COLORS from '@/constants/colors'
import { useGetAllExpenses } from '../hooks/query-hooks'
import CustomText from '@/components/custom-text'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const ExpensesList = () => {
  const { data } = useGetAllExpenses()

  return (
    <View className="w-full h-full flex justify-center items-center">
      <Iconify
        icon="ph:money-wavy-light"
        size={128}
        color={CUSTOM_COLORS.secondary}
      />
      <CustomText customClassName="text-xl" variant="secondary">
        No data available.
      </CustomText>
    </View>
  )
}

const ExpenseTab = () => {
  const insets = useSafeAreaInsets()

  return (
    <View className="flex h-full">
      <View
        className="flex flex-row items-center px-3 pb-6 bg-backgroundDimmed3"
        style={{ gap: 6, paddingTop: insets.top }}
      >
        <Iconify
          icon="ic:round-chevron-left"
          size={24}
          color={CUSTOM_COLORS.accent}
        />
        <CustomText variant="default" customClassName="text-lg font-bold">
          March 2024
        </CustomText>
        <Iconify
          icon="ic:round-chevron-right"
          size={24}
          color={CUSTOM_COLORS.accent}
        />
      </View>
      <View className="flex flex-row border-t border-b border-secondary bg-backgroundDimmed3">
        <View className="flex-grow py-3">
          <CustomText variant="accent" customClassName="text-center">
            Daily
          </CustomText>
        </View>
        <View className="flex-grow py-3 bg-background">
          <CustomText variant="accent" customClassName="text-center">
            Analytic
          </CustomText>
        </View>
      </View>
      <View className="relative w-full flex-1">
        <ExpensesList />
        <Link href="/(tabs)/expense/add" asChild>
          <Pressable className="bg-backgroundDimmed3 rounded-full absolute right-3 bottom-3 border border-accent w-16 h-16 flex items-center justify-center">
            <Iconify
              icon="iconoir:plus"
              size={32}
              color={CUSTOM_COLORS.accent}
            />
          </Pressable>
        </Link>
      </View>
    </View>
  )
}

export default ExpenseTab
