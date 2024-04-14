import clsx from 'clsx'
import { forwardRef } from 'react'
import { TextInput, TextInputProps, View } from 'react-native'
import colors from 'tailwindcss/colors'
import CustomText from './custom-text'

type FormTextInputProps = TextInputProps & {
  customClassName?: string
  label?: string
}

const FormTextInput = forwardRef<TextInput, FormTextInputProps>(
  ({ onChangeText, value, placeholder, customClassName, label }, ref) => {
    return (
      <View
        className={clsx(
          'border-b py-3 border-accent text-text flex flex-row',
          customClassName,
        )}
        style={{
          gap: 24,
        }}
      >
        {label && (
          <CustomText customClassName="translate-y-1">{label}</CustomText>
        )}
        <TextInput
          ref={ref}
          onChangeText={onChangeText}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={colors.zinc[700]}
          className="text-text flex-1"
        />
      </View>
    )
  },
)

export default FormTextInput
