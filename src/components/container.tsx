import clsx from 'clsx'
import { View } from 'react-native'

const Container = ({
  children,
  customClassName,
}: {
  children: React.ReactNode
  customClassName?: string
}) => {
  return (
    <View className={clsx('h-full w-full bg-background p-3', customClassName)}>
      {children}
    </View>
  )
}

export default Container
