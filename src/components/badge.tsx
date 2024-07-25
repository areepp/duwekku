import { View } from 'react-native'

const Badge = ({ children }: { children: React.ReactNode }) => {
  return <View className="border border-text px-2 rounded-xl">{children}</View>
}

export default Badge
