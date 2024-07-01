import Container from '@/components/container'
import { Iconify } from 'react-native-iconify'
import { Pressable } from 'react-native'
import { Link } from 'expo-router'
import CUSTOM_COLORS from '@/constants/colors'

const ExpenseTab = () => {
  // const { data } = useGetAllBudgets()

  return (
    <Container customClassName="relative">
      {/* <FlatList
        data={data}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <BudgetItem item={item} />}
        contentContainerStyle={{
          gap: 6,
        }}
      /> */}
      <Link href="/(tabs)/expense/add" asChild>
        <Pressable className="bg-backgroundDimmed3 rounded-full absolute right-3 bottom-3 border border-accent w-16 h-16 flex items-center justify-center">
          <Iconify icon="iconoir:plus" size={32} color={CUSTOM_COLORS.accent} />
        </Pressable>
      </Link>
    </Container>
  )
}

export default ExpenseTab
