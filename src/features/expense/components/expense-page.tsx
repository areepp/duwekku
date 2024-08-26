import { Iconify } from 'react-native-iconify'
import { TouchableOpacity, View } from 'react-native'
import { Link, useLocalSearchParams, useRouter } from 'expo-router'
import CUSTOM_COLORS from '@/constants/colors'
import CustomText from '@/components/custom-text'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { addMonths, format, subMonths } from 'date-fns'

import clsx from 'clsx'
import { useState } from 'react'
import ExpensesList from './expenses-list'
import ExpenseAnalytics from './expense-analytics'

const ExpenseTab = () => {
  const router = useRouter()
  const insets = useSafeAreaInsets()
  const { date_in_view } = useLocalSearchParams()
  const activeDate = new Date(date_in_view as string)
  const [activeTab, setActiveTab] = useState<'daily' | 'analytic'>('daily')

  const handleChangeMonth = (target: 'next' | 'previous') => {
    const targetDate =
      target === 'next' ? addMonths(activeDate, 1) : subMonths(activeDate, 1)

    router.push(`/expense/${format(targetDate, 'yyyy-MM')}`)
  }

  return (
    <View className="flex h-full">
      <View
        className="flex flex-row items-center px-3 pb-6 bg-backgroundDimmed3"
        style={{ gap: 6, paddingTop: insets.top }}
      >
        <TouchableOpacity onPress={() => handleChangeMonth('previous')}>
          <Iconify
            icon="ic:round-chevron-left"
            size={24}
            color={CUSTOM_COLORS.accent}
          />
        </TouchableOpacity>
        <CustomText variant="default" customClassName="text-lg font-bold">
          {format(activeDate, 'MMMM yyyy')}
        </CustomText>
        <TouchableOpacity onPress={() => handleChangeMonth('next')}>
          <Iconify
            icon="ic:round-chevron-right"
            size={24}
            color={CUSTOM_COLORS.accent}
          />
        </TouchableOpacity>
      </View>
      <View className="flex flex-row bg-backgroundDimmed3">
        <TouchableOpacity
          onPress={() => setActiveTab('daily')}
          className={clsx(
            'flex-grow py-3',
            activeTab === 'daily' &&
              'border-b-2 border-accentDimmed3 font-bold',
          )}
        >
          <CustomText variant="accent" customClassName="text-center">
            Daily
          </CustomText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab('analytic')}
          className={clsx(
            'flex-grow py-3 ',
            activeTab === 'analytic' &&
              'border-b-2 border-accentDimmed3 font-bold',
          )}
        >
          <CustomText variant="accent" customClassName="text-center">
            Analytic
          </CustomText>
        </TouchableOpacity>
      </View>
      <View className="relative w-full flex-1">
        {activeTab === 'daily' ? (
          <>
            <ExpensesList />
            <Link href="/(tabs)/expense/add" asChild>
              <TouchableOpacity className="bg-backgroundDimmed3 rounded-full absolute right-3 bottom-3 border border-accent w-16 h-16 flex items-center justify-center">
                <Iconify
                  icon="iconoir:plus"
                  size={32}
                  color={CUSTOM_COLORS.accent}
                />
              </TouchableOpacity>
            </Link>
          </>
        ) : (
          <ExpenseAnalytics />
        )}
      </View>
    </View>
  )
}

export default ExpenseTab
