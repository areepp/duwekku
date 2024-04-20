import { Stack } from 'expo-router'
import CUSTOM_COLORS from '@/constants/colors'

const BudgetLayout = () => {
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
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          headerTitle: 'Budgets',
        }}
      />
      <Stack.Screen name="[id]" options={{ headerTitleAlign: 'center' }} />
    </Stack>
  )
}

export default BudgetLayout
