import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import CustomText, { TCustomTextVariant } from './custom-text'
import clsx from 'clsx'

type TButtonVariant = 'background' | 'accent'

type ButtonProps = {
  text: string
  customClassName?: string
  variant?: TButtonVariant
} & Pick<TouchableOpacityProps, 'onPress'>

const CustomTextVariantMapper: Record<TButtonVariant, TCustomTextVariant> = {
  accent: 'background',
  background: 'accent',
}

const Button = ({
  text,
  onPress,
  customClassName,
  variant = 'background',
}: ButtonProps) => {
  return (
    <TouchableOpacity
      className={clsx(
        'self-center border rounded-lg p-3 border-accent',
        variant === 'background' && 'bg-background ',
        variant === 'accent' && 'bg-accent',
        customClassName,
      )}
      onPress={onPress}
    >
      <CustomText
        variant={CustomTextVariantMapper[variant]}
        customClassName="text-center font-medium"
      >
        {text}
      </CustomText>
    </TouchableOpacity>
  )
}

export default Button
