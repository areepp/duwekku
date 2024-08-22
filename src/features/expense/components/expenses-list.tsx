import { FlatList, View } from 'react-native'
import { parseCurrency } from '@/lib/common'
import Badge from '@/components/badge'
import { CategoryIcon } from './expense-category-options'
import { useGetAllExpensesByDate } from '../hooks/query-hooks'
import { useLocalSearchParams } from 'expo-router'
import { Iconify } from 'react-native-iconify'
import CustomText from '@/components/custom-text'
import CUSTOM_COLORS from '@/constants/colors'
import { format } from 'date-fns'
import clsx from 'clsx'

const ExpensesList = () => {
  const { date_in_view } = useLocalSearchParams()
  const { data } = useGetAllExpensesByDate(date_in_view as string)

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

  return (
    <FlatList
      data={data}
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
                  <View
                    className="flex flex-row items-center flex-1"
                    style={{ gap: 3 }}
                  >
                    {CategoryIcon[expenseItem.category?.name as string]}
                    <CustomText>{expenseItem.category?.name}</CustomText>
                  </View>
                  <CustomText
                    customClassName={clsx(
                      'flex-1',
                      !expenseItem.note && 'text-transparent',
                    )}
                  >
                    {expenseItem.note ?? 'invisible text'}
                  </CustomText>
                  <CustomText
                    customClassName="flex-1 text-center"
                    variant="secondary"
                  >
                    {parseCurrency(expenseItem.amount)}
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

export default ExpensesList
