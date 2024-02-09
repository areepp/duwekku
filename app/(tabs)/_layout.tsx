import React from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { Tabs } from 'expo-router'
import CUSTOM_COLORS from '@/constants/colors'

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(
  props: Readonly<{
    name: React.ComponentProps<typeof FontAwesome>['name']
    color: string
  }>,
) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />
}

export default function TabLayout() {
  return (
    <Tabs
      sceneContainerStyle={{ backgroundColor: CUSTOM_COLORS.background }}
      screenOptions={{
        headerShown: true,
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: CUSTOM_COLORS.text,
        },
        headerStyle: {
          backgroundColor: CUSTOM_COLORS.backgroundCard,
        },
        tabBarStyle: {
          backgroundColor: CUSTOM_COLORS.backgroundCard,
        },
      }}
    >
      <Tabs.Screen
        name="budget"
        options={{
          title: 'Budget',
        }}
      />
      <Tabs.Screen
        name="expense"
        options={{
          title: 'Expense',
        }}
      />
    </Tabs>
  )
}
