import clsx from 'clsx'
import { Text } from 'react-native'

export type TCustomTextVariant =
  | 'default'
  | 'accent'
  | 'background'
  | 'secondary'

type TCustomTextProps = {
  variant?: TCustomTextVariant
  children: string | string[]
  customClassName?: string
}

const variantMapper: Record<TCustomTextVariant, string> = {
  default: 'text-text',
  accent: 'text-accent',
  background: 'text-background',
  secondary: 'text-secondary',
}

const CustomText = ({
  children,
  customClassName,
  variant = 'default',
}: TCustomTextProps) => {
  return (
    <Text className={clsx(variantMapper[variant], customClassName)}>
      {children}
    </Text>
  )
}

export default CustomText
