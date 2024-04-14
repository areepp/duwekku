import React from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { Tabs } from 'expo-router'
import CUSTOM_COLORS from '@/constants/colors'
import { Iconify } from 'react-native-iconify'
import tailwindColors from 'tailwindcss/colors'

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
          backgroundColor: CUSTOM_COLORS.backgroundDimmed3,
          borderColor: CUSTOM_COLORS.accent,
        },
        tabBarStyle: {
          backgroundColor: CUSTOM_COLORS.backgroundDimmed3,
          borderColor: CUSTOM_COLORS.accent,
          height: 50,
        },
        tabBarLabelStyle: {
          marginBottom: 3,
        },
        tabBarIconStyle: {
          marginTop: 3,
        },
        tabBarActiveTintColor: CUSTOM_COLORS.accent,
        tabBarInactiveTintColor: tailwindColors.zinc['700'],
        headerTintColor: CUSTOM_COLORS.text,
      }}
    >
      <Tabs.Screen
        name="budgets"
        options={{
          title: 'Budgets',
          tabBarIcon: ({ focused }) => (
            <Iconify
              icon="iconoir:wallet"
              size={24}
              color={
                focused ? CUSTOM_COLORS.accent : tailwindColors.zinc['700']
              }
            />
          ),
        }}
      />
      <Tabs.Screen
        name="expense"
        options={{
          title: 'Expense',
          tabBarIcon: ({ focused }) => (
            <Iconify
              icon="akar-icons:statistic-up"
              size={24}
              color={
                focused ? CUSTOM_COLORS.accent : tailwindColors.zinc['700']
              }
            />
          ),
        }}
      />
    </Tabs>
  )
}
