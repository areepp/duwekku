import { Stack } from 'expo-router'
import CUSTOM_COLORS from '@/constants/colors'

const ExpenseLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: CUSTOM_COLORS.text,
        },
        headerStyle: {
          backgroundColor: CUSTOM_COLORS.backgroundDimmed3,
        },
        headerTintColor: CUSTOM_COLORS.text,
        contentStyle: {
          backgroundColor: CUSTOM_COLORS.background,
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="add"
        options={{ headerTitleAlign: 'center', headerTitle: 'Add Expense' }}
      />
      <Stack.Screen
        name="[date_in_view]"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  )
}

export default ExpenseLayout
