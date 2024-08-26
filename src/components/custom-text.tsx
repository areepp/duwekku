import clsx from 'clsx'
import { StyleProp, Text, TextStyle } from 'react-native'

export type TCustomTextVariant =
  | 'default'
  | 'accent'
  | 'background'
  | 'secondary'
  | 'subtle'

type TCustomTextProps = {
  variant?: TCustomTextVariant
  children: string | string[] | null | undefined
  onPress?: () => void
  customClassName?: string
  style?: StyleProp<TextStyle>
}

const variantMapper: Record<TCustomTextVariant, string> = {
  default: 'text-text',
  accent: 'text-accent',
  background: 'text-background',
  secondary: 'text-secondary',
  subtle: 'text-slate-500',
}

const CustomText = ({
  children,
  customClassName,
  onPress,
  variant = 'default',
  style,
}: TCustomTextProps) => {
  if (!children) return null

  return (
    <Text
      className={clsx(variantMapper[variant], customClassName)}
      onPress={onPress}
      style={style}
    >
      {children}
    </Text>
  )
}

export default CustomText
