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
          headerShown: true,
          headerTitle: 'Budgets',
        }}
      />
      <Stack.Screen name="add" options={{ headerTitleAlign: 'center' }} />
    </Stack>
  )
}

export default ExpenseLayout
