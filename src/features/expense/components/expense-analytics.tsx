import { FlatList, View } from 'react-native'
import CustomText from '@/components/custom-text'
import { useGetAllExpensesByCategory } from '../hooks/query-hooks'
import { useLocalSearchParams } from 'expo-router'
import { parseCurrency } from '@/lib/common'
import { CATEGORY_COLOR, CategoryIcon } from '../utils/categories-constant'
import { PieChart } from 'react-native-gifted-charts'
import CUSTOM_COLORS from '@/constants/colors'

const Box = ({
  percentage,
  backgroundColor,
}: {
  percentage: string
  backgroundColor: string
}) => {
  return (
    <CustomText
      customClassName="rounded px-2 py-1 text-center"
      style={{
        backgroundColor,
        width: 45,
      }}
      variant="background"
    >
      {percentage}
    </CustomText>
  )
}

const ExpenseAnalytics = () => {
  const { date_in_view } = useLocalSearchParams()
  const { data } = useGetAllExpensesByCategory(date_in_view as string)

  if (!data) return null

  return (
    <View className="flex h-full" style={{ gap: 6 }}>
      <View className="h-1/2 bg-backgroundDimmed3 w-full flex items-center justify-center">
        <PieChart
          textColor={CUSTOM_COLORS['background']}
          data={data?.map((el) => ({
            value: el.percentage,
            color: CATEGORY_COLOR[el.category],
          }))}
        />
      </View>
      <View>
        <FlatList
          data={data}
          keyExtractor={(item) => item.category}
          renderItem={({ item }) => (
            <View className="border-b border-accentDimmed3 flex justify-between flex-row px-6 py-3">
              <View className="flex flex-row items-center" style={{ gap: 6 }}>
                <Box
                  percentage={item.perecentageRounded}
                  backgroundColor={CATEGORY_COLOR[item.category]}
                />
                <View className="flex flex-row items-center" style={{ gap: 3 }}>
                  {CategoryIcon[item.category]}
                  <CustomText>{item.category}</CustomText>
                </View>
              </View>

              <CustomText customClassName="text-center" variant="secondary">
                {parseCurrency(item.total)}
              </CustomText>
            </View>
          )}
        />
      </View>
    </View>
  )
}

export default ExpenseAnalytics
