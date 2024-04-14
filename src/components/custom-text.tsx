import clsx from 'clsx'
import { Text } from 'react-native'

type TVariant = 'default' | 'accent'
type CustomTextProps = {
  variant?: TVariant
  children: string
  customClassName?: string
}

const variantMapper: Record<TVariant, string> = {
  default: 'text-text',
  accent: 'text-accent',
}

const CustomText = ({
  children,
  customClassName,
  variant = 'default',
}: CustomTextProps) => {
  return (
    <Text className={clsx(variantMapper[variant], customClassName)}>
      {children}
    </Text>
  )
}

export default CustomText
