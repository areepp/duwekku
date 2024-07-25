import { Iconify } from 'react-native-iconify'
import { FlatList, Pressable, View } from 'react-native'
import { Link } from 'expo-router'
import CUSTOM_COLORS from '@/constants/colors'
import { useGetAllExpenses } from '../hooks/query-hooks'
import CustomText from '@/components/custom-text'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { TExpense } from '@/db/services/expenses'
import { format } from 'date-fns'
import { parseCurrency } from '@/lib/common'
import Badge from '@/components/badge'

const ExpensesList = () => {
  const { data } = useGetAllExpenses()

  if (data?.length === 0 || !data)
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

  const expensesByDate: Record<string, TExpense[]> = data?.reduce(
    (groups, expense) => {
      const date = expense.date.split('T')[0]
      if (!groups[date]) groups[date] = []
      groups[date].push(expense)
      return groups
    },
    {} as Record<string, TExpense[]>,
  )

  const parsedExpensesArray = Object.entries(expensesByDate).map(
    ([date, expenses]) => ({ date, expenses }),
  )

  return (
    <FlatList
      data={parsedExpensesArray}
      keyExtractor={(item) => item.date}
      contentContainerStyle={{ gap: 12 }}
      renderItem={({ item }) => {
        const date = new Date(item.date)
        const totalExpenseInADay = item.expenses.reduce(
          (total, expense) => total + expense.amount,
          0,
        )
        return (
          <View className="bg-backgroundDimmed3">
            <View
              className="flex flex-row items-center p-3 border-b border-accentDimmed3"
              style={{ gap: 9 }}
            >
              <CustomText customClassName="font-bold text-lg">
                {format(date, 'dd')}
              </CustomText>
              <Badge>
                <CustomText customClassName="text-xs">
                  {format(date, 'eee')}
                </CustomText>
              </Badge>
              <CustomText variant="secondary">
                {parseCurrency(totalExpenseInADay)}
              </CustomText>
            </View>
            <FlatList
              data={item.expenses}
              keyExtractor={(_item) => _item.id.toString()}
              renderItem={({ item: expenseItem }) => (
                <View className="border-b border-accentDimmed3 flex justify-between flex-row px-6 py-3">
                  <CustomText>{expenseItem.categoryId?.toString()}</CustomText>
                  <CustomText>{expenseItem.note}</CustomText>
                  <CustomText variant="secondary">
                    {parseCurrency(totalExpenseInADay)}
                  </CustomText>
                </View>
              )}
            />
          </View>
        )
      }}
    />
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
      <View className="flex flex-row border-t border-b border-accentDimmed3 bg-backgroundDimmed3">
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
